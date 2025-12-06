
import { GoogleGenAI } from "@google/genai";

// Robust helper to find the API key in various environments
const getAPIKey = (): string => {
    let key = '';

    // 1. Try standard Vite/Client naming
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        // @ts-ignore
        if (import.meta.env.VITE_API_KEY) key = import.meta.env.VITE_API_KEY;
        // @ts-ignore
        else if (import.meta.env.NEXT_PUBLIC_API_KEY) key = import.meta.env.NEXT_PUBLIC_API_KEY;
    }

    // 2. Try standard process.env (Create React App / Node)
    if (!key && typeof process !== 'undefined' && process.env) {
        if (process.env.REACT_APP_API_KEY) key = process.env.REACT_APP_API_KEY;
        else if (process.env.API_KEY) key = process.env.API_KEY;
    }

    return key;
};

const cleanJSON = (text: string): string => {
    // Remove markdown code blocks if present
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export interface PricingAnalysis {
    productName: string;
    category: string;
    reasoning: string;
    dominantColors: string[];
}

export const analyzeProductImage = async (base64Data: string, mimeType: string): Promise<PricingAnalysis> => {
    const apiKey = getAPIKey();
    
    // FALLBACK / DEMO MODE if Key is missing
    if (!apiKey) {
        console.warn("API Key missing. Using Demo Mode.");
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    productName: "Premium Sportswear Item (Demo)",
                    category: "Jerseys",
                    dominantColors: ["Red", "Black"],
                    reasoning: "API Key missing. Displaying demo result for visualization."
                });
            }, 1500);
        });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Strict Categories for the AI to choose from
    const VALID_CATEGORIES = [
        'Jerseys', 'T-Shirts', 'Hoodies', 'Jackets', 'Shoes', 
        'Footballs', 'Cricket Bat', 'Caps'
    ];

    const prompt = `
    You are an expert fashion authenticator and pricing algorithm.
    Analyze this product image and identify it strictly.
    
    RULES:
    1. Identify the CATEGORY strictly from this list: ${VALID_CATEGORIES.join(', ')}. If unsure, choose the closest visual match.
    2. Identify the PRODUCT NAME. 
       - READ TEXT on the product (OCR) if visible (e.g., 'Nike Air', 'Lakers 23', 'Adidas').
       - If text is found, use it: "Brand + Model Type" (e.g., "Nike Air Max 90", "Lakers LeBron Jersey").
       - If NO text is found, describe it visually: "Color + Type" (e.g., "Red High-Top Sneakers", "Yellow Cricket Bat").
       - Do NOT invent fake brand names.
    3. Identify the DOMINANT COLORS (max 3, e.g., "Red, Black").

    Return valid JSON only:
    {
        "productName": "string",
        "category": "string",
        "dominantColors": ["string", "string"],
        "reasoning": "string"
    }
    `;

    // RETRY LOGIC: Try 2.5 first, then 1.5
    try {
        // Attempt 1: Gemini 2.5 Flash
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: {
                    parts: [
                        { inlineData: { mimeType, data: base64Data } },
                        { text: prompt }
                    ]
                },
                config: {
                    responseMimeType: 'application/json'
                }
            });
            if (response.text) {
                return JSON.parse(cleanJSON(response.text));
            }
        } catch (e) {
            console.log("Gemini 2.5 failed, retrying with 1.5...", e);
        }

        // Attempt 2: Gemini 1.5 Flash (Stable Fallback)
        const responseStable = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType, data: base64Data } },
                    { text: prompt }
                ]
            }
        });

        if (responseStable.text) {
             // 1.5 doesn't always support responseMimeType perfectly, so we parse manually
             const text = cleanJSON(responseStable.text);
             // Find JSON object start/end
             const jsonStart = text.indexOf('{');
             const jsonEnd = text.lastIndexOf('}');
             if (jsonStart !== -1 && jsonEnd !== -1) {
                 return JSON.parse(text.substring(jsonStart, jsonEnd + 1));
             }
             return JSON.parse(text);
        }
        
        throw new Error("No response from AI models");

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        // SAFETY FALLBACK so the app NEVER crashes
        return {
            productName: "Unidentified Item (Custom)",
            category: "Custom",
            dominantColors: ["Multi-color"],
            reasoning: "AI analysis failed. Please verify details manually."
        };
    }
};

export const chatWithStylist = async (message: string, history: any[]) => {
    const apiKey = getAPIKey();
    if (!apiKey) return "I'm currently in demo mode. Please configure my API key to chat!";
    
    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = "You are a hip, knowledgeable sneaker and streetwear expert for Salman SKT. You help customers find shoes based on their style. Keep answers short, fun, and use emojis.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                ...history,
                { role: 'user', parts: [{ text: message }] }
            ],
            config: { systemInstruction }
        });
        return response.text || "I'm thinking... ask me again!";
    } catch (e) {
        return "I'm having trouble connecting right now. Try again later!";
    }
};

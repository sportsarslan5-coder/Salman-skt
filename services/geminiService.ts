
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
    complexityScore: number; // 0.0 to 1.0 (Basic to Premium/Custom)
    estimatedPriceUSD?: number; // AI estimated market price
}

export const analyzeProductImage = async (base64Data: string, mimeType: string, userProvidedName?: string): Promise<PricingAnalysis> => {
    const apiKey = getAPIKey();
    
    // FALLBACK / DEMO MODE if Key is missing
    if (!apiKey) {
        console.warn("API Key missing. Using Demo Mode.");
        return new Promise(resolve => {
            setTimeout(() => {
                // Return a generic "Shoe" result so the user sees how it works
                resolve({
                    productName: userProvidedName || "Premium High-Top Sneaker (Demo)",
                    category: "Shoes",
                    dominantColors: ["Red", "White"],
                    reasoning: "API Key missing. Displaying demo result.",
                    complexityScore: 0.8,
                    estimatedPriceUSD: 120
                });
            }, 1500);
        });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Strict Categories matching your business rules
    const VALID_CATEGORIES = [
        'T-Shirts', 'Hoodies', 'Jerseys', 'Jackets', 'Tote Bags', 'Caps', 'Shoes',
        'Footballs', 'Volleyball', 'Basketball', 'Cricket Bat', 'Gloves & Sports Gear'
    ];

    const prompt = `
    You are an expert fashion and sports equipment authenticator and pricing algorithm.
    User Context (Name/Title): "${userProvidedName || ''}"
    
    Analyze this product image.
    
    TASK 1: IDENTIFICATION
    - Identify the specific product. Use the User Context to help accuracy.
    - OUTPUT: "productName" (e.g. "Air Jordan 1 Retro High" or "Custom Embroidered Hoodie").

    TASK 2: CATEGORIZATION
    - Try to categorize into one of: [${VALID_CATEGORIES.join(', ')}].
    - IF the item does DOES NOT fit these categories (e.g. it's a "Yoga Mat", "Smart Watch", "Tent"), use a generic but accurate category name (e.g. "Fitness Equipment", "Accessories").
    
    TASK 3: COMPLEXITY & PRICING
    - Determine a Complexity Score from 0.0 (Basic) to 1.0 (Premium/Complex).
    - ESTIMATED PRICE (Critical): Estimate a fair custom manufacturing/retail price in USD for this item. 
      - If it is a known luxury item, estimate a high-quality replica or custom version price.
      - If it is a generic item, estimate standard market price.
    
    TASK 4: DOMINANT COLORS
    - List max 2 main colors.

    Return valid JSON only:
    {
        "productName": "string",
        "category": "string",
        "dominantColors": ["string", "string"],
        "complexityScore": number,
        "estimatedPriceUSD": number,
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
             const text = cleanJSON(responseStable.text);
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
        // SAFETY FALLBACK
        const fallbackType = Math.random() > 0.5 ? "Shoes" : "Jerseys";
        const fallbackName = userProvidedName || (fallbackType === "Shoes" ? "Premium Sport Sneaker" : "Custom Team Jersey");
        
        return {
            productName: fallbackName,
            category: fallbackType,
            dominantColors: ["Multi-color"],
            complexityScore: 0.5,
            estimatedPriceUSD: 50,
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

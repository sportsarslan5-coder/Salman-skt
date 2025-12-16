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
                resolve({
                    productName: userProvidedName || "Premium High-Top Sneaker (Demo)",
                    category: "Shoes",
                    dominantColors: ["Red", "White"],
                    reasoning: "API Key missing. Displaying demo result.",
                    complexityScore: 0.8,
                    estimatedPriceUSD: 125
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
    - If the User Context is specific (e.g. "Barcelona 2025 Kit"), respect it but refine it to be professional.

    TASK 2: CATEGORIZATION
    - Try to categorize into one of: [${VALID_CATEGORIES.join(', ')}].
    - IF the item does DOES NOT fit these categories (e.g. it's a "Yoga Mat", "Smart Watch", "Tent", "Electronic"), use a generic but accurate category name.
    
    TASK 3: COMPLEXITY & PRICING (THE "INTERNET PRICE" LOGIC)
    - Determine a Complexity Score from 0.0 (Basic) to 1.0 (Premium/Complex).
    - ESTIMATED PRICE (Critical): Estimate a fair custom manufacturing OR retail market price in USD for this item. 
      - If it is a known luxury/hyped item (like a specific sneaker), estimate the market value.
      - If it is a generic item, estimate standard market price.
      - Be realistic.
    
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
        throw new Error("No response text");

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        
        // Fallback Logic
        const fallbackType = "Shoes";
        const fallbackName = userProvidedName || "Custom Sneaker";
        
        return {
            productName: fallbackName,
            category: fallbackType,
            dominantColors: ["Multi-color"],
            complexityScore: 0.5,
            estimatedPriceUSD: 55,
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
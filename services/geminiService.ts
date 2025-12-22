import { GoogleGenAI } from "@google/genai";

const getApiKey = () => {
    // Safely access process.env in a browser environment
    try {
        return (globalThis as any).process?.env?.API_KEY || "";
    } catch (e) {
        return "";
    }
};

const cleanJSON = (text: string): string => {
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export interface PricingAnalysis {
    productName: string;
    category: string;
    reasoning: string;
    dominantColors: string[];
    complexityScore: number; 
    estimatedPriceUSD?: number; 
}

export const analyzeProductImage = async (base64Data: string, mimeType: string, userProvidedName?: string): Promise<PricingAnalysis> => {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.warn("Gemini API Key missing");
        return {
            productName: userProvidedName || "Custom Item",
            category: "T-Shirt",
            dominantColors: ["Multi-color"],
            complexityScore: 0.5,
            estimatedPriceUSD: 55,
            reasoning: "API Key not configured."
        };
    }

    const ai = new GoogleGenAI({ apiKey });

    const VALID_CATEGORIES = [
        "T-Shirt", "Hoodie", "Jersey", "Jacket", "Tracksuit", "Cap", "Beanie", "Jeans", "Shorts", "Sweatpants", 
        "Polo Shirt", "Dress Shirt", "Tank Top", "Sweater", "Cardigan", "Vest", "Coat", "Trench Coat", "Blazer", 
        "Leather Jacket", "Bomber Jacket", "Windbreaker", "Raincoat", "Pajama Set", "Nightwear", "Bathrobe", 
        "Jumpsuit", "Romper", "Skirt", "Leggings", "Jeggings", "Yoga Pants", "Sports Bra", "Workout Top", 
        "Compression Shirt", "Base Layer", "Thermal Wear", "Gloves", "Scarf", "Shawl", "Socks (Pack)", "Ankle Socks", 
        "Sneakers", "Running Shoes", "Leather Boots", "Loafers", "Sandals", "Slippers", "Flip Flops", "Formal Shoes", 
        "Sunglasses", "Belt", "Watch", "Backpack", "Crossbody Bag", "Duffle Bag", "Laptop Bag", "Wallet", "Tie", 
        "Bow Tie", "Cufflinks", "Handkerchief", "Rain Boots", "Ski Jacket", "Winter Coat", "Puffer Jacket", 
        "Down Jacket", "Graphic T-Shirt", "Ripped Jeans", "Cargo Pants", "Denim Jacket", "Faux Fur Coat", 
        "Camouflage Jacket", "Oversized Hoodie", "Zipper Hoodie", "Half Sleeve Shirt", "Long Sleeve T-Shirt", 
        "Linen Shirt", "Khaki Pants", "Joggers", "Lounge Wear", "Sleep Shorts", "Sport Shorts", "Baseball Cap", 
        "Visor Hat", "Fedora Hat", "Bucket Hat", "Custom Jersey", "Team Tracksuit", "Warm Gloves", "Touchscreen Gloves", 
        "Waterproof Jacket", "Cycling Shorts", "Hiking Boots", "Trail Shoes", "Dress Pants", "Office Shirt", 
        "Softshell Jacket", "Winter Leggings", "Fashion Hoodie"
    ];

    const prompt = `
    You are an expert fashion and sports equipment authenticator and pricing algorithm for Salman SKT (Sialkot).
    Analyze this product image and return JSON only.
    {
        "productName": "string",
        "category": "string",
        "dominantColors": ["string"],
        "complexityScore": number,
        "estimatedPriceUSD": number,
        "reasoning": "string"
    }
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
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
        throw new Error("No response");

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        return {
            productName: userProvidedName || "Custom Item",
            category: "T-Shirt",
            dominantColors: ["Multi-color"],
            complexityScore: 0.5,
            estimatedPriceUSD: 55,
            reasoning: "Analysis temporarily unavailable."
        };
    }
};

export const chatWithStylist = async (message: string, history: any[]) => {
    const apiKey = getApiKey();
    if (!apiKey) return "I need an API key to help you style!";

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = "You are a hip, knowledgeable sneaker and streetwear expert for Salman SKT. Keep answers short, fun, and use emojis.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
                ...history,
                { role: 'user', parts: [{ text: message }] }
            ],
            config: { systemInstruction }
        });
        return response.text || "I'm thinking...";
    } catch (e) {
        return "Chat system is busy. Please try again in a moment!";
    }
};
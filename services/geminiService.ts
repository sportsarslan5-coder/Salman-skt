
import { GoogleGenAI } from "@google/genai";

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
    // CRITICAL: Exclusively use process.env.API_KEY as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Strict Categories matching business rules
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
    You are an expert fashion and sports equipment authenticator and pricing algorithm.
    User Context (Name/Title): "${userProvidedName || ''}"
    
    Analyze this product image.
    
    TASK 1: IDENTIFICATION
    - Identify the specific product. Use the User Context to help accuracy.
    - OUTPUT: "productName" (e.g. "Air Jordan 1 Retro High" or "Custom Embroidered Hoodie").

    TASK 2: CATEGORIZATION
    - Try to categorize into one of the following specific categories:
    [${VALID_CATEGORIES.join(', ')}]
    
    TASK 3: COMPLEXITY & PRICING
    - Determine a Complexity Score from 0.0 (Basic) to 1.0 (Premium/Complex).
    - ESTIMATED PRICE: Estimate standard retail market price in USD for this item. 
    
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
        throw new Error("No response text");

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        return {
            productName: userProvidedName || "Custom Item",
            category: "T-Shirt",
            dominantColors: ["Multi-color"],
            complexityScore: 0.5,
            estimatedPriceUSD: 55,
            reasoning: "Analysis failed. Reverting to baseline estimates."
        };
    }
};

export const chatWithStylist = async (message: string, history: any[]) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = "You are a hip, knowledgeable sneaker and streetwear expert for Salman SKT. You help customers find shoes based on their style. Keep answers short, fun, and use emojis.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
                ...history,
                { role: 'user', parts: [{ text: message }] }
            ],
            config: { systemInstruction }
        });
        return response.text || "I'm thinking... ask me again!";
    } catch (e) {
        console.error("Chat Failed:", e);
        return "I'm having trouble connecting right now. Try again later!";
    }
};

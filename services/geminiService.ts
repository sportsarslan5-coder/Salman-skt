
import { GoogleGenAI, Type } from "@google/genai";

export interface PricingAnalysis {
    productName: string;
    category: string;
    reasoning: string;
    dominantColors: string[];
    complexityScore: number; 
    estimatedPriceUSD?: number; 
}

export const analyzeProductImage = async (base64Data: string, mimeType: string, userProvidedName?: string): Promise<PricingAnalysis> => {
    // Initialize right before use to ensure the latest key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
    You are an expert fashion auditor for 'Sialkot Shop', the world capital of sports manufacturing.
    Analyze this apparel image. Identify the type of garment, material quality (based on visual textures), 
    and provide a fair export-grade price estimation in USD.
    
    Current market rates for Sialkot Export:
    - T-shirts: $20-30
    - Hoodies: $40-55
    - Technical Jackets: $60-90
    - Sports Jerseys: $35-50
    - Leather Goods: $100+
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview', // Use Pro for detailed vision analysis
            contents: {
                parts: [
                    { inlineData: { mimeType, data: base64Data } },
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        productName: { type: Type.STRING },
                        category: { type: Type.STRING },
                        reasoning: { type: Type.STRING },
                        dominantColors: { 
                            type: Type.ARRAY, 
                            items: { type: Type.STRING } 
                        },
                        complexityScore: { type: Type.NUMBER, description: "0.1 to 1.0 based on design detail" },
                        estimatedPriceUSD: { type: Type.NUMBER }
                    },
                    required: ["productName", "category", "reasoning", "dominantColors", "complexityScore", "estimatedPriceUSD"]
                }
            }
        });
        
        if (response.text) {
            return JSON.parse(response.text.trim());
        }
        throw new Error("Empty response from AI");

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        return {
            productName: userProvidedName || "Custom Apparel",
            category: "Apparel",
            dominantColors: ["Unknown"],
            complexityScore: 0.5,
            estimatedPriceUSD: 45,
            reasoning: "Detailed vision analysis failed. Providing baseline Sialkot export estimation."
        };
    }
};

export const chatWithStylist = async (message: string, history: any[]) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
                ...history,
                { role: 'user', parts: [{ text: message }] }
            ],
            config: { 
                systemInstruction: "You are the 'Sialkot Shop' Style Expert. You help men find the best jerseys, technical jackets, and streetwear. You are confident, hip, and use Urdu words like 'Bhai', 'Zabardast', and 'Shandaar' occasionally. Keep responses under 3 sentences and very punchy. 🧥🔥"
            }
        });
        return response.text || "I'm having a bit of a style block. Ask me something else!";
    } catch (e) {
        console.error("Chat error:", e);
        return "System is a bit busy, Bhai. Try again in a second!";
    }
};

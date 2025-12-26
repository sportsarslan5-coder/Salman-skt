
import { GoogleGenAI, Type } from "@google/genai";

export interface PricingAnalysis {
    productName: string;
    category: string;
    reasoning: string;
    dominantColors: string[];
    complexityScore: number; 
    estimatedPriceUSD?: number; 
}

// Fix: Use process.env.API_KEY directly and implement latest Gemini SDK patterns
export const analyzeProductImage = async (base64Data: string, mimeType: string, userProvidedName?: string): Promise<PricingAnalysis> => {
    // Guideline: Initialize client right before use
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
    You are an expert fashion and sports equipment authenticator and pricing algorithm for Salman SKT (Sialkot).
    Analyze this product image and provide a detailed analysis.
    `;

    try {
        // Guideline: Use gemini-3-pro-preview for complex reasoning/vision tasks
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: {
                parts: [
                    { inlineData: { mimeType, data: base64Data } },
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: 'application/json',
                // Guideline: Always use responseSchema for expected JSON output
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
                        complexityScore: { type: Type.NUMBER },
                        estimatedPriceUSD: { type: Type.NUMBER }
                    },
                    required: ["productName", "category", "reasoning", "dominantColors", "complexityScore", "estimatedPriceUSD"]
                }
            }
        });
        
        // Guideline: Use .text property directly
        if (response.text) {
            return JSON.parse(response.text.trim());
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
    // Guideline: Use process.env.API_KEY directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const systemInstruction = "You are a hip, knowledgeable sneaker and streetwear expert for Salman SKT. Keep answers short, fun, and use emojis.";
    
    try {
        // Guideline: Use gemini-3-flash-preview for conversational tasks
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
                ...history,
                { role: 'user', parts: [{ text: message }] }
            ],
            config: { systemInstruction }
        });
        // Guideline: Use .text property directly
        return response.text || "I'm thinking...";
    } catch (e) {
        return "Chat system is busy. Please try again in a moment!";
    }
};

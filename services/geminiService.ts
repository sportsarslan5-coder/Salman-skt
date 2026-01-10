
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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
    You are an expert fashion auditor for 'Salman SKT', the legendary technical apparel studio in Sialkot.
    Analyze this apparel image. Identify the type of garment, material quality, and provide a fair export-grade price estimation in USD for the USA market.
    
    Salman SKT Standards:
    - Signature Soup Jackets: $150-250
    - Technical Stands: $80-120
    - Elite Hoodies: $60-85
    - Performance Jerseys: $40-60
    `;

    try {
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
        
        if (response.text) {
            return JSON.parse(response.text.trim());
        }
        throw new Error("Empty response from AI");

    } catch (error) {
        console.error("AI Analysis Failed:", error);
        return {
            productName: userProvidedName || "SKT Custom Draft",
            category: "Technical Apparel",
            dominantColors: ["Monochrome"],
            complexityScore: 0.8,
            estimatedPriceUSD: 145,
            reasoning: "Standard Salman SKT estimation for technical gear."
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
                systemInstruction: "You are the Stylist for 'Salman SKT'. You are a disciple of Salman's philosophy: 'I was a lesson.' You help men find technical soup jackets and professional studio gear. You are cool, slightly mysterious, and extremely knowledgeable about Sialkot's manufacturing secrets. Use terms like 'Technical', 'Alpha', and 'Lesson' frequently. Keep it under 3 sentences. 🧥🕶️"
            }
        });
        return response.text || "Listen, I'm analyzing the fabric. Ask me about the Soup Jacket.";
    } catch (e) {
        return "System sync issue. Even the best lessons take time, Bhai.";
    }
};

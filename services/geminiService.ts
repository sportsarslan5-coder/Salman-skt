
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from '../constants';

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    try {
        // Safe check for process.env
        const apiKey = typeof process !== 'undefined' && process.env && process.env.API_KEY ? process.env.API_KEY : '';
        
        if (apiKey) {
            ai = new GoogleGenAI({ apiKey: apiKey });
        } else {
             console.warn("Gemini API Key is missing. AI features will not work until API_KEY is set in environment variables.");
        }
    } catch (e) {
        console.error("Failed to initialize AI client", e);
    }
  }
  return ai;
};

export const chatWithStylist = async (userMessage: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  const productContext = PRODUCTS.map(p => `${p.name} (${p.category}) - $${p.priceUSD}`).join(', ');

  const systemInstruction = `You are a helpful, friendly fashion stylist for "Salman SKT", a trendy brand selling 3D printed t-shirts, gaming apparel, and graphic tees.
  
  Here is our product catalog:
  ${productContext}
  
  Rules:
  1. Recommend products from the catalog if they fit the user's request.
  2. Be enthusiastic about sneakers and street fashion.
  3. Keep answers concise (under 100 words).
  4. If the user asks about prices, convert roughly to PKR if asked (1 USD = ~280 PKR).
  5. If they want to order, tell them they can checkout and it will open WhatsApp to Sajda.
  `;

  try {
    const client = getAIClient();
    if (!client) return "I'm currently offline (API Key Missing). Please contact support.";
    
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I'm having trouble thinking of a style right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm momentarily offline. Please check back soon!";
  }
};

export interface PricingAnalysis {
  category: string;
  price: number;
  reasoning: string;
}

export const analyzeProductImage = async (base64Image: string, mimeType: string): Promise<PricingAnalysis> => {
  const client = getAIClient();
  
  // EXPLICIT ERROR FOR MISSING KEY
  if (!client) {
      throw new Error("CRITICAL: API Key is missing. Please add 'API_KEY' to your deployment Environment Variables.");
  }

  const prompt = `
    Analyze this product image and determine its category and a SINGLE estimated price.

    **Strict Pricing List (USD):**
    - T-Shirts: $20–$40
    - Hoodies: $40–$60
    - Jerseys (Baseball/Football Style): $40–$50
    - Jackets: $60–$100
    - Tote Bags: $15–$30
    - Caps: $10–$25
    - Shoes: $100–$150
    - Football (32-panel, 7+7, World Cup Style): $30–$60
    - Volleyball: $25–$45
    - Basketball: $30–$70
    - Cricket Bat: $50–$120
    - Gloves & Sports Gear: $15–$50

    **Rules:**
    1. If the item matches a category above, you MUST pick a single specific price within that range.
    2. **Flexible Pricing:** You can pick ANY price in between the minimum and maximum (e.g., $43, $47.50, $49) based on the item's visual quality, complexity, or design details. Do not feel limited to just round numbers or the range limits.
    3. **For Jerseys:** The price MUST be strictly between $40 and $50.
    4. **Unlisted Items (Projects/Others):** If the item does NOT fit any category above (e.g., a custom project, furniture, electronics, or unique artwork), identify its true category and estimate a fair **International Market Price** (in USD) based on its visual quality and standard global rates.
    5. Provide a short reasoning (max 1 sentence) explaining the specific price chosen.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: mimeType || 'image/jpeg', data: base64Image } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            price: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
          },
          required: ["category", "price", "reasoning"]
        }
      }
    });

    if (!response.text) {
        throw new Error("AI returned empty response.");
    }

    // Robust JSON parsing
    let jsonText = response.text.trim();
    // Remove code blocks if present
    if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '');
    }
    
    return JSON.parse(jsonText) as PricingAnalysis;

  } catch (error: any) {
    console.error("Image Analysis failed", error);
    
    // Detailed error messaging for the UI
    if (error.message?.includes('API_KEY') || error.message?.includes('400') || error.message?.includes('403')) {
        throw new Error("API Key Error: Please check your website settings and ensure API_KEY is added to Environment Variables.");
    }
    if (error.message?.includes('503') || error.message?.includes('500') || error.message?.includes('Overloaded')) {
        throw new Error("AI Service is busy. Please try again in 5 seconds.");
    }
    
    throw new Error(error.message || "Failed to analyze image.");
  }
};


import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from '../constants';

let ai: GoogleGenAI | null = null;

// Robust helper to find the API key in various environments
const getAPIKey = (): string => {
    // 1. Try standard Vite/Client naming (Most likely for Vercel + Vite)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        // @ts-ignore
        if (import.meta.env.VITE_API_KEY) return import.meta.env.VITE_API_KEY;
        // @ts-ignore
        if (import.meta.env.NEXT_PUBLIC_API_KEY) return import.meta.env.NEXT_PUBLIC_API_KEY;
    }

    // 2. Try standard process.env (Node/Compat)
    if (typeof process !== 'undefined' && process.env) {
        if (process.env.REACT_APP_API_KEY) return process.env.REACT_APP_API_KEY;
        if (process.env.NEXT_PUBLIC_API_KEY) return process.env.NEXT_PUBLIC_API_KEY;
        if (process.env.VITE_API_KEY) return process.env.VITE_API_KEY;
        if (process.env.API_KEY) return process.env.API_KEY;
    }

    return '';
};

const getAIClient = () => {
  if (!ai) {
    const apiKey = getAPIKey();
    if (apiKey) {
        try {
            ai = new GoogleGenAI({ apiKey: apiKey });
        } catch (e) {
            console.error("Failed to initialize Google GenAI", e);
        }
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
    if (!client) return "I'm currently in demo mode (API Key Missing). Please contact support to enable AI features.";
    
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
  isDemo?: boolean;
}

export const analyzeProductImage = async (base64Image: string, mimeType: string): Promise<PricingAnalysis> => {
  const client = getAIClient();
  
  // FAILSAFE: If API Key is missing, return Demo Data instead of crashing
  // This ensures the UI looks good even if Vercel config is missing.
  if (!client) {
      console.warn("API Key missing. Returning demo data.");
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve({
                  category: "Demo Product (Key Missing)",
                  price: 50.00,
                  reasoning: "API Key not found in environment. Showing demo mode results. Please add VITE_API_KEY to your hosting settings.",
                  isDemo: true
              });
          }, 1500); // Fake delay for realism
      });
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
    if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '');
    }
    
    return JSON.parse(jsonText) as PricingAnalysis;

  } catch (error: any) {
    console.error("Image Analysis failed", error);
    
    // Fallback to demo mode on API errors too, to keep site alive
    if (error.message?.includes('403') || error.message?.includes('key') || error.message?.includes('API_KEY')) {
        return {
            category: "Demo Product (Auth Error)",
            price: 50.00,
            reasoning: "API Key invalid or restricted. Showing demo results.",
            isDemo: true
        };
    }
    
    if (error.message?.includes('503') || error.message?.includes('Overloaded')) {
        throw new Error("SERVICE_BUSY");
    }
    
    throw new Error("Failed to analyze image. Please try again.");
  }
};

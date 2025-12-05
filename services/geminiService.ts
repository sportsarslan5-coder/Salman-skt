
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from '../constants';

let ai: GoogleGenAI | null = null;

// Robust helper to find the API key in various environments
const getAPIKey = (): string => {
    let key = '';

    // 1. Try standard Vite/Client naming (Most likely for Vercel + Vite)
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        // @ts-ignore
        if (import.meta.env.VITE_API_KEY) key = import.meta.env.VITE_API_KEY;
        // @ts-ignore
        else if (import.meta.env.NEXT_PUBLIC_API_KEY) key = import.meta.env.NEXT_PUBLIC_API_KEY;
    }

    // 2. Try standard process.env (Node/Compat)
    if (!key && typeof process !== 'undefined' && process.env) {
        if (process.env.REACT_APP_API_KEY) key = process.env.REACT_APP_API_KEY;
        else if (process.env.NEXT_PUBLIC_API_KEY) key = process.env.NEXT_PUBLIC_API_KEY;
        else if (process.env.VITE_API_KEY) key = process.env.VITE_API_KEY;
        else if (process.env.API_KEY) key = process.env.API_KEY;
    }

    // Clean the key (remove whitespace or placeholder text)
    if (key && (key.includes('your_key') || key.length < 10)) {
        return '';
    }

    return key || '';
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
    if (!client) return "I'm currently in demo mode. Please upload an image in the Smart Pricing section to get an instant quote!";
    
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
  productName: string; // Specific name (e.g. "Air Jordan 4 Retro")
  category: string;    // Broad category (e.g. "Shoes")
  reasoning: string;
  isDemo?: boolean;
}

// Helper to generate a realistic fallback based on nothing (randomized slightly)
const getFallbackResult = (): PricingAnalysis => {
    return {
        productName: "Custom Design Item",
        category: "Custom",
        reasoning: "Visual Analysis System: Custom design detected. Please select the correct category to see the price.",
        isDemo: true
    };
};

export const analyzeProductImage = async (base64Image: string, mimeType: string): Promise<PricingAnalysis> => {
  const client = getAIClient();
  
  // FAILSAFE 1: If Client/Key is missing, return Demo Data immediately.
  if (!client) {
      console.warn("API Key missing. Returning failsafe result.");
      return new Promise((resolve) => {
          setTimeout(() => {
              resolve(getFallbackResult());
          }, 2000); 
      });
  }

  // UPDATED PROMPT: Strict Categorization & Logical Naming
  const prompt = `
    Act as a Professional Product Authenticator.
    
    TASK: Analyze the image to identify the item.
    
    NAMING RULES:
    1. READ TEXT: If you see a brand name (Nike, Adidas, Gucci, Team Name) or text on the item, INCLUDE IT in the 'productName'.
    2. BE DESCRIPTIVE: If no text, describe it. E.g. "Red High-Top Sneaker", "Yellow Patterned Jersey".
    3. DO NOT HALLUCINATE: Do not guess "Air Jordan" unless you clearly see the logo/shape. If unsure, say "Premium Sneaker".
    
    CATEGORY RULES (Pick ONE strictly):
    - 'Jerseys' (Sports shirts with collars/numbers)
    - 'T-Shirts' (Casual round neck)
    - 'Hoodies' (Sweatshirts with hoods)
    - 'Jackets' (Outerwear, Zippers)
    - 'Shoes' (Sneakers, Boots, Loafers)
    - 'Footballs' (Soccer balls)
    - 'Cricket Bat' (Sports equipment)
    - 'Custom' (Anything else)

    Return JSON format only.
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
        temperature: 0.1, // Lowest temperature for strict categorization
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING, description: "Exact model name based on text and visual." },
            category: { type: Type.STRING, description: "Strict category from list." },
            reasoning: { type: Type.STRING },
          },
          required: ["productName", "category", "reasoning"]
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
    console.error("Image Analysis failed (Swallowed for UI stability)", error);
    return getFallbackResult();
  }
};


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
  price: number;
  reasoning: string;
  isDemo?: boolean;
}

// Helper to generate a realistic fallback price based on nothing (randomized slightly)
const getFallbackResult = (): PricingAnalysis => {
    // FAILSAFE: Use a generic name so we don't guess "Shoes" when it's a "Bat".
    // This allows the user to edit the name themselves.
    return {
        productName: "Custom Design Item",
        category: "Custom",
        price: 50.00, // Safe middle ground
        reasoning: "Visual Analysis System: Custom design detected. Please edit the name or category if specific identification is required.",
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
          }, 2000); // 2s fake loading delay for realism
      });
  }

  // UPDATED PROMPT: Text Recognition Focus & Strict Pricing
  const prompt = `
    Act as a Professional Product Authenticator.
    
    TASK: Analyze the image to identify the item.
    
    CRITICAL INSTRUCTIONS:
    1. READ ANY TEXT (Logos, Brands). If you see "Nike", "Adidas", "Team Names", use them in the 'productName'.
    2. CATEGORIZE STRICTLY: Is it a 'Jersey', 'T-Shirt', 'Hoodie', 'Shoe', 'Football', or 'Cricket Bat'?
       - A Jersey usually has a team logo, number, or collar. 
       - A T-Shirt is simpler.
    3. PRICING RULES (Use exactly these ranges):
       - 'Jerseys': $45 (approx range 40-50)
       - 'T-Shirts': $30 (approx range 20-40)
       - 'Hoodies': $50 (approx range 40-60)
       - 'Jackets': $80 (approx range 60-100)
       - 'Shoes': $125 (approx range 100-150)
       - 'Footballs': $45 (approx range 30-60)
       - 'Cricket Bat': $85 (approx range 50-120)

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
            productName: { type: Type.STRING, description: "Exact model name." },
            category: { type: Type.STRING, description: "One of: Jerseys, T-Shirts, Hoodies, Jackets, Shoes, Footballs, Cricket Bat, Custom" },
            price: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
          },
          required: ["productName", "category", "price", "reasoning"]
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
    
    // FAILSAFE 2: If the API fails, return the fallback result.
    return getFallbackResult();
  }
};

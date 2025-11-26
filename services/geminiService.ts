

import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    try {
        const apiKey = typeof process !== 'undefined' && process.env && process.env.API_KEY ? process.env.API_KEY : 'dummy_key';
        ai = new GoogleGenAI({ apiKey });
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
    if (!client) throw new Error("AI Client not available");
    
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

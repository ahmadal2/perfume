
import { GoogleGenAI } from "@google/genai";

// Standardize Gemini API usage following the provided guidelines.
// Directly access process.env.API_KEY within the function calls to ensure the latest key is used.

export const getFragranceConsultation = async (preferences: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class luxury fragrance consultant. A customer asks: "${preferences}". Based on their mood, preferences, or occasion, suggest what kind of fragrance notes (Top, Heart, Base) they should look for and a short poetic description of their ideal scent. Keep it sophisticated and brief.`,
    });
    // Use .text property directly as per SDK requirements
    return response.text || "I'm sorry, I couldn't process your request at the moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't process your request at the moment.";
  }
};

export const getSmartProductDescription = async (productName: string, notes: string[]) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Write a high-end, luxury marketing description for a perfume named "${productName}" with notes: ${notes.join(', ')}. Focus on the emotional journey and sophisticated atmosphere it creates.`,
        });
        // Extracting text output from GenerateContentResponse
        return response.text || null;
    } catch (error) {
        console.error("Gemini Error:", error);
        return null;
    }
}

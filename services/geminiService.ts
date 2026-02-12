
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
  }

  async sendMessage(message: string, onChunk: (text: string) => void) {
    try {
      const result = await this.chat.sendMessageStream({ message });
      let fullText = "";
      for await (const chunk of result) {
        const textChunk = (chunk as GenerateContentResponse).text;
        if (textChunk) {
          fullText += textChunk;
          onChunk(fullText);
        }
      }
      return fullText;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();

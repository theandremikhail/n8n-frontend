import { GoogleGenAI, Type } from "@google/genai";
import { NewsletterConfig, GeneratedContent } from '../types';

export const generateSampleNewsletter = async (config: NewsletterConfig): Promise<GeneratedContent> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert content strategist configuring an n8n automated newsletter pipeline.
    
    Generate a sample newsletter based on the following client configuration:
    - Company Name: ${config.companyName}
    - Target Audience: ${config.targetAudience}
    - Primary Topic/Niche: ${config.primaryTopic}
    - Brand Tone: ${config.tone}
    - Desired Length: ${config.length}
    - Key Brand Values: ${config.keyValues}
    - Specific Topic for this Sample: ${config.exampleTopic || 'A trending topic in their industry'}

    The output must be a structured JSON object.
    The 'body' should be formatted with simple HTML tags (<p>, <ul>, <li>, <strong>, <h3>, <br>) for styling within an email client view. Do not use markdown in the body, use HTML.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING, description: "Catchy email subject line" },
            preheader: { type: Type.STRING, description: "Preview text shown in email client" },
            body: { type: Type.STRING, description: "The full email body content with HTML formatting" }
          },
          required: ["subject", "preheader", "body"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
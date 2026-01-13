import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";
import { portfolioContext } from "../shared/portfolioContext"; 
// ⬆️ adjust path if needed

const MODEL = "gemini-2.5-flash";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing GOOGLE_API_KEY" });
    }

    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = [
      ...history.map((h: any) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const result = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: `You are ${portfolioContext.owner}'s portfolio assistant.`,
        temperature: 0.3,
        maxOutputTokens: 300,
      },
    });

    const reply =
      result?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("") ??
      "Sorry, I couldn’t respond.";

    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Chat failed" });
  }
}

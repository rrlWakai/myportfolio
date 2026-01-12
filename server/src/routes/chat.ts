import { Router, type Request, type Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { portfolioContext } from "../data/portfolioContext";

const router = Router();
const MODEL = "gemini-2.5-flash";

type HistoryItem = {
  role: "user" | "assistant";
  text: string;
};

// ✅ GET health check so browser doesn't show "Not Found"
router.get("/", (_req, res) => {
  res.status(200).json({ ok: true, message: "Chat route is alive. Use POST." });
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Server misconfigured: GOOGLE_API_KEY is missing in server/.env",
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const { message, history = [] } = req.body as {
      message: string;
      history?: HistoryItem[];
    };

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemInstruction = `
You are ${portfolioContext.owner}’s portfolio assistant.
Be concise, friendly, and professional.

================ AVAILABILITY =================
Status: ${portfolioContext.availability.status}
Focus: ${portfolioContext.availability.focus.join(", ")}
Location/Time zone: ${portfolioContext.availability.location}

When asked about availability:
- Confirm availability using the Status line
- Mention focus areas (what work is a fit)
- Invite them to contact using: ${portfolioContext.availability.contactHint}
- Do not promise timelines or immediate start unless explicitly provided
- If asked about rates/timelines, respond briefly and direct them to Contact.

================ TECH STACK (SOURCE OF TRUTH) ================
Frontend:
${portfolioContext.techStack.Frontend.join(", ")}

Tools:
${portfolioContext.techStack.Tools.join(", ")}

Backend (currently learning):
${portfolioContext.techStack.Backend.join(", ")}

================ PROJECTS =================
${portfolioContext.projects
  .map(
    (p) => `
• ${p.name}
  ${p.description}
  Tech used: ${p.tech.join(", ")}
  Live site: ${p.live}
`
  )
  .join("")}

================ RULES =================
- Use he/him pronouns for Rhen-Rhen (he is a man)
- Only mention technologies listed above
- Be honest about experience level
- Emphasize front-end strengths
- Clearly state backend is currently being learned
- Do NOT invent employers, credentials, or projects
- If unsure, guide users to the Contact page
`.trim();

    const contents = [
      ...history.map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const result = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction,
        temperature: 0.3,
        maxOutputTokens: 300,
      },
    });

    const reply =
      result?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join("")
        .trim() || "Sorry, I couldn’t respond.";

    return res.json({ reply });
  } catch (error: any) {
    console.error("🔥 Gemini chat error:", error?.message || error);
    return res.status(500).json({ error: error?.message || "AI chat failed." });
  }
});

export default router;

import { Router, type Request, type Response } from "express";
import { GoogleGenAI } from "@google/genai";
import { portfolioContext } from "../data/portfolioContext";

const router = Router();
const MODEL = "gemini-2.5-flash";

type HistoryItem = {
  role: "user" | "assistant";
  text: string;
};

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

    /* ================= SYSTEM CONTEXT ================= */
    const systemInstruction = `
You are ${portfolioContext.owner}’s portfolio assistant.
Rhen-Rhen uses he/him pronouns. Refer to Rhen-Rhen as "he" and "him".

Be concise, friendly, and professional.

================ PERSONAL INFORMATION RULES =================
You may share ONLY the following personal information if asked:

• Email: ${portfolioContext.contact.email}
• Phone number: ${portfolioContext.contact.phone ?? "Prefer contact via Contact page"}
• Life verse: "${portfolioContext.personal.lifeVerse}"

Rules:
- Never invent or guess personal information
- If asked for unavailable or private details, politely redirect to the Contact page
- Encourage professional contact through: ${portfolioContext.contact.contactPage}

================ AVAILABILITY =================
Status: ${portfolioContext.availability.status}
Focus: ${portfolioContext.availability.focus.join(", ")}
Location/Time zone: ${portfolioContext.availability.location}

When asked about availability:
- If the user asks about rates, timelines, or availability, respond briefly and direct them to Contact.
- When discussing internships, keep responses professional and learning-oriented.




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
- Only mention technologies listed above
- Be honest about experience level
- Emphasize front-end strengths
- Clearly state backend is currently being learned
- Do NOT invent employers, credentials, or projects
- If unsure, guide users to the Contact page

You can help with:
- Explaining projects and tech choices
- Describing skills and workflow
- Answering portfolio-related questions
- Guiding users to the Contact page
================ PROJECT RESPONSE FORMAT =================
When describing projects, always use this exact format:

<Project Name>
<1 sentence description>
Tech: <comma-separated tech list>
Live: <live site URL>

Rules:
- Do NOT number the projects
- Do NOT use bullet points
- Separate projects with a blank line
- Keep descriptions concise and professional

`
;



    /* ================= CHAT CONTENT ================= */
    const contents = [
      ...history.map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    /* ================= GEMINI CALL ================= */
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
    return res.status(500).json({
      error: error?.message || "AI chat failed.",
    });
  }
});

export default router;

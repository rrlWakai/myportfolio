import "dotenv/config";
import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";

import contactRouter from "./routes/contact";
import chatRouter from "./routes/chat";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: (origin, cb) => {
      const allowed = [
        process.env.FRONTEND_URL, // Vercel frontend
        "http://localhost:5173",  // local dev
      ].filter(Boolean);

      // allow non-browser tools (Postman, curl)
      if (!origin) return cb(null, true);

      if (allowed.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);


// Routes
app.use("/api/contact", contactRouter);
app.use("/api/chat", chatRouter);

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("Backend is running!");
});

// Debug env (GET in browser)
app.get("/api/debug-env", (_req: Request, res: Response) => {
  res.json({
    hasGoogleKey: Boolean(process.env.GOOGLE_API_KEY),
    frontendUrl: process.env.FRONTEND_URL || null,
    port: process.env.PORT || null,
  });
});

// Global error handler (must be after routes)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("🔥 Express error:", err);
  res.status(500).json({
    error: err?.message || String(err),
    stack: err?.stack || null,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

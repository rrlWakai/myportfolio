import "dotenv/config";
import express from "express";
import cors from "cors";

import contactRouter from "./routes/contact";
import chatRouter from "./routes/chat";

const app = express();

/* 1️⃣ Body parser */
app.use(express.json());

/* 2️⃣ CORS — PUT IT HERE */
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      const isLocal = origin === "http://localhost:10000";
      const isVercel = origin.endsWith(".vercel.app");
      const isProd =
        process.env.FRONTEND_URL &&
        origin === process.env.FRONTEND_URL;

      if (isLocal || isVercel || isProd) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* 3️⃣ Routes (AFTER CORS) */
app.use("/api/contact", contactRouter);
app.use("/api/chat", chatRouter);

/* 4️⃣ Health check */
app.get("/", (_req, res) => {
  res.send("Backend is running!");
});

/* 5️⃣ Debug */
app.get("/api/debug-env", (_req, res) => {
  res.json({
    frontendUrl: process.env.FRONTEND_URL,
    port: process.env.PORT,
  });
});

/* 6️⃣ Start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import notesRouter from "./routes/notes.routes.js";
import pdfRouter from "./routes/pdf.routes.js";
import creditsRouter from "./routes/credits.route.js";
import { stripeWebhook } from "./controller/credits.controller.js";
dotenv.config();

const app = express();

app.post(
  "/api/credits/webhook",
  express.raw({type:"application/json"}),
  stripeWebhook
)

app.use(
  cors({
    origin: "https://examnotesaiclient-2jcj.onrender.com",
    // origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes",notesRouter);
app.use("/api/pdf",pdfRouter);
app.use("/api/credits",creditsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  connectDB();
});

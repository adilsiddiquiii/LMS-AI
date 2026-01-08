import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
dotenv.config();

// midwares
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://lms-ai-1-64wc.onrender.com",
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use('/api/order', paymentRouter)

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`app running at : http://localhost:${PORT}`);
  connectDB();
});

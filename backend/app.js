import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import rouqter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", rouqter);

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  });
});

dbConnection();

app.use(errorMiddleware);
// const PORT = process.env.PORT || 4000;
export default app;

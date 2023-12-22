import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pool from "./db.js"; // Import the pool
import authMiddleware from "./middlewares/auth.middleware.js";
import authRouter from "./routers/auth.route.js";
import chatRouter from "./routers/chatRoute.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//--------------- connecting to the database-----------------
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
    return;
  }

  console.log("Connected to PostgreSQL database!");

  // Release the client to the pool
  release();
  // pool.end(); // Close the pool after the connection check
});

app.use("/auth", authRouter);

app.use("/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`Server started listening at port ${PORT}`);
});

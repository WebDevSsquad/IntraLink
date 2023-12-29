import cors from "cors";
//import dotenv from "dotenv";
import express from "express";
import pool from "./db.js"; // Import the pool
import authMiddleware from "./middlewares/auth.middleware.js";
import authRouter from "./routers/auth.route.js";
import postRouter from "./routers/post.route.js";
import projectRouter from "./routers/project.route.js";
import ProfileRouter from "./routers/profile.route.js";
import chatRouter from "./routers/chatRoute.js";
import userDutiesRouter from "./routers/userDutiesRoute.js";
import avaRouter from "./routers/available.route.js";
import partRouter from "./routers/part.route.js";
import taskRouter from "./routers/task.routter.js";
import marketRouter from "./routers/market.route.js";
import subRouter from "./routers/subscription.route.js";
import notifRouter from "./routers/notif.router.js";
//dotenv.config();

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
app.use("/post", authMiddleware, postRouter);
app.use("/dashboard", authMiddleware, projectRouter);

app.use("/market", marketRouter);

app.use("/profile", ProfileRouter);

app.use("/chat", chatRouter);

app.use("/userDuties", userDutiesRouter);

app.use("/availability", avaRouter);

app.use("/partsinfo", partRouter);

app.use("/tasksinfo", taskRouter);

app.use("/subscription", subRouter);
app.use("/notifications", notifRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// app.listen(PORT, (err) => {
//   if (err) return console.error(err);
//   console.log(`Server started listening at port ${PORT}`);
// });

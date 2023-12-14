import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import pkg from "pg";
const { Pool } = pkg;
//import authMiddleware from "./middlewares/auth.middleware.js";
//import authRouter from "./routers/auth.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
//--------------- connecting to the database-----------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
    return;
  }

  console.log("Connected to PostgreSQL database!");

  // Release the client to the pool
  release();
  pool.end(); // Close the pool after the connection check
});

 pool.query(`insert into public."User" (username,email,password,firstname,lastname)  values ('the fearmaker','midoamr20@gmail.com','jashdflkjhasdkfjhaskljdfh48456s4ad','muhammad','amr');`, (err, result) => {
  if (err) {
    console.error("Error executing query:", err.stack);
    return;
  }
  console.log("Result:", result.rows);
});


//app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (err) => {
  if (err) return console.error(err);
  console.log(`Server started listening at port ${PORT}`);
});

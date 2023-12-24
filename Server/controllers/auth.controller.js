import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";
import { logInSchema, signUpSchema } from "../models/user.js";
const authController = {
  signup: async (req, res) => {
    // Validate the request body against the sign up schema
    const { error } = signUpSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      return res.status(422).json(error.details);
    }
    try {
      const { email, password, username } = req.body;
      // Check if the user already exists
      let checkusername = await pool.query(`SELECT EXISTS (
                                          SELECT 1
                                          FROM public."User"
                                          WHERE username = '${username}'
                                        );`);

      if (checkusername.rows[0].exists) {
        console.log("Username is already taken");
        return res.status(400).json({ error: "Username is already taken" });
      }

      let checkEmail = await pool.query(`SELECT EXISTS (
                                                SELECT 1
                                                FROM public."User"
                                                WHERE email = '${email}'
                                            );`);

      if (checkEmail.rows[0].exists) {
        console.log("Email is already taken");
        return res.status(400).json({ error: "Email is already taken" });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      let user =
        await pool.query(`INSERT INTO public."User" (username,email,password,firstname,lastname,picture) 
                                  VALUES ('${req.body.username}',
                                  '${req.body.email}',
                                  '${hashedPassword}',
                                  '${req.body.firstname}'
                                  ,'${req.body.lastname}','${req.body.image}');`);

      let user_id = await pool.query(
        `SELECT user_id FROM public."User" WHERE username = '${username}'`
      );
      // Generate a JWT token containing the user's id
      const token = jwt.sign({ id: user_id.rows[0] }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res
        .status(201)
        .json({ message: "User created successfully", user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error:
          "An error occurred while creating your account.Please try again.",
      });
    }
  },
  login: async (req, res) => {
    // Validate the request body against the log in schema
    console.log(req.body);
    const { error } = logInSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).json(error.details);
    }

    try {
      const { username, password } = req.body;

      // Check if the user exists
      // Check if the user already exists
      let checkusername = await pool.query(`SELECT EXISTS (
                                              SELECT 1
                                              FROM public."User"
                                              WHERE username = '${username}'
                                          );`);

      if (!checkusername.rows[0].exists) {
        return res.status(400).json({
          error: "Invalid username",
        });
      }
      let userData = await pool.query(
        `SELECT * FROM public."User" WHERE username = '${username}'`
      );

      // Check if the password is correct
      const isValidPassword = await bcrypt.compare(
        password,
        userData.rows[0].password
      );

      if (!isValidPassword) {
        return res.status(400).json({
          error: "Invalid password",
        });
      }
      await pool.query(
        `update public."User" set isonline = true where user_id = '${userData.rows[0].user_id}'`
      );
      // Generate a JWT token containing the user's id
      const token = jwt.sign(
        { id: userData.rows[0].user_id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      console.log(userData.rows[0]);

      const user = userData.rows[0];

      res.status(200).json({ message: "Logged in successfully", token, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while logging you in. Please try again.",
      });
    }
  },
  updateImage: async (req, res) => {
    try {
      const { image, user_id } = req.body;

      const user = await pool.query(`SELECT EXISTS (
                                        SELECT 1
                                        FROM public."User"
                                        WHERE user_id = '${user_id}'
                                    );`);
      if (!user) {
        res.status(404).json({ message: "Couldn't find user" });
      }
      await pool.query(
        `UPDATE public."User" SET image = '${image}' WHERE user_id = '${user_id};`
      );
      res.status(200).json({ message: "Updated in successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while logging you in. Please try again.",
      });
    }
  },
  // This is a protected route that requires the user to be logged in
  // This controller is used to fetch the data of the logged in user
  me: (req, res) => {
    try {
      res.status(200).json({ user: req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while fetching your data.",
      });
    }
  },
};
export default authController;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, logInSchema, signUpSchema } from "../models/user.js";
const authController = {
  signup: async (req, res) => {
    // Validate the request body against the sign up schema
    const { error } = signUpSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      return res.status(422).json(error.details);
    }
    try {
      const { email, password } = req.body;
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        console.log("Email is already taken");
        return res.status(400).json({ error: "Email is already taken" });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ ...req.body, password: hashedPassword });

      await user.save();
      // Generate a JWT token containing the user's id
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
    const { error } = logInSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(422).json(error.details);
    }

    try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await User.findOne({ email }, "+password");
      if (!user) {
        return res.status(400).json({
          error: "Invalid email",
        });
      }
      // Check if the password is correct
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({
          error: "Invalid password",
        });
      }

      // Generate a JWT token containing the user's id
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      console.log(user);
      const image = user.image;
      res.status(200).json({ message: "Logged in successfully", token, image });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred while logging you in. Please try again.",
      });
    }
  },
  updateImage: async (req, res) => {
    try {
      const { image, id, imageName } = req.body;

      const user = await User.findByIdAndUpdate(id, {
        image: image,
        imageName: imageName,
      });
      if (!user) {
        res.status(404).json({ message: "Couldn't find user" });
      }
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

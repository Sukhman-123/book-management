const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");

const registrationValidation = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
];

// registeration of a new user
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, name, email, phone } = req.body;
  try {
    const existingUser = await userSchema.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = uuidv4();

    const newUser = new userSchema({
      user_id,
      username,
      password: hashedPassword,
      name,
      email,
      phone,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

//user login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userSchema.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        name: user.name,
      },
      process.env.JSON_WEB_TOKEN,
      { expiresIn: "168h" }
    );

    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const userController = {
  registrationValidation,
  register,
  login,
};

module.exports = userController;

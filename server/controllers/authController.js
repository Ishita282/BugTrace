const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// REGISTER
exports.registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const guestId = req.headers["x-guest-id"];

    if (guestId) {
      await Bug.updateMany(
        { guestId: guestId },
        {
          $set: {
            user: user._id,
            guestId: null,
          },
        }
      );
    }

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
};  
import { Router } from "express";
const router = Router();
import { register, login } from "../../services/user/user.js";

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ status: 400, message: "All fields are required." });
    }

    const user = await register({ username, email, password });

    res.status(201).json({
      status: 201,
      message: "Registration successful.",
      user: { id: user._id, username: user.username, email: user.email },
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ status: 409, message: "Email is already in use." });
    }
    res.status(500).json({ status: 500, message: "Something went wrong. Please try again." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 400, message: "Username/email and password are required." });
    }

    const { user, token } = await login(email, password);

    res.json({
      status: 200,
      message: "Login successful.",
      user: { id: user._id, username: user.username, email: user.email },
      token, // Send JWT token for authentication
    });

  } catch (error) {
    res.status(401).json({ status: 401, message: "Invalid credentials. Please try again." });
  }
});

export default router;

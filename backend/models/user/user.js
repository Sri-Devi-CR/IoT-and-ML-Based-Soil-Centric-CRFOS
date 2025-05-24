import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // Hide password in queries by default
  },
}, { timestamps: true });

// Generate JWT token
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "1h" }
  );
};

const User = mongoose.model("User", userSchema);
export default User;

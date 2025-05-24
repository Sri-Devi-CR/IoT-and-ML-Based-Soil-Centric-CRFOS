import User from "../../models/user/user.js";
import bcrypt from "bcryptjs";



export async function register({ username, email, password }) {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error("Username or email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  return newUser;
}

export async function login(email, password) {
  const user = await User.findOne({ email }).select("+password"); // Explicitly include password

  if (!user || !user.password) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = user.generateToken();
  return { user, token };
}
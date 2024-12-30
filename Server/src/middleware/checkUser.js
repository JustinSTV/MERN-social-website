import { connectDB } from "../config/dbConfig.js";

export const checkExistingUser = async (req, res, next) => {
  const client = await connectDB();
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: "Invalid Email format" })
    };

    const existingUser = await client
      .db("social-website")
      .collection("users")
      .findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    };

    next();

  } catch (error) {
    console.error("checkUser Middleware error:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await client.close();
  }
}
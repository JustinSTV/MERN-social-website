import { connectDB } from "../../config/dbConfig.js";
import { checkExistingUser } from "../../middleware/checkUser.js";

import { Router } from "express";
import bcrypt from "bcrypt";
import { v4 as generateID } from "uuid";

const router = Router();

router.post("/register", checkExistingUser, async (req, res) => {
  const client = await connectDB();
  try {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = {
      _id: generateID(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      // profileImage: '',
      // coverPicture: "",
      // bio: "",
      // friends: [],
      // createdAt: new Date(),
    };

    await client
      .db("social-website")
      .collection("users")
      .insertOne(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: "Registration successful",
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send(error);
  } finally {
    await client.close()
  }
});

export default router;
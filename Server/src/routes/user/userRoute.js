import { connectDB } from "../../config/dbConfig.js";

import { Router } from "express";
import bcrypt from "bcrypt";
import { v4 as generateID } from "uuid";

const router = Router();

router.post("/register", async (req, res) => {
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

    const result = await client
      .db("social-website")
      .collection("users")
      .insertOne(newUser);

    console.log("new user", newUser)
    console.log("result", result)
    console.log("data", data)

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send(error);
  } finally {
    await client.close()
  }
});

export default router;
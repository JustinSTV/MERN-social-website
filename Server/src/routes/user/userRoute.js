import { usersCollection, connectDB } from "../../config/dbConfig.js";
import { checkExistingUser } from "../../middleware/checkUser.js";

import { Router } from "express";
import bcrypt from "bcrypt";
import { v4 as generateID } from "uuid";

const router = Router();

router.post("/register", checkExistingUser, async (req, res) => {
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

    // await client
    //   .db("social-website")
    //   .collection("users")
    //   .insertOne(newUser);

    await usersCollection.insertOne(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: "Registration successful",
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    await connectDB();
    const { email, password } = req.body;

    // const user = await client
    //   .db("social-website")
    //   .collection("users")
    //   .findOne({ email });

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword
    })

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
})

export default router;
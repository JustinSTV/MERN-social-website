import { usersCollection, connectDB } from "../../config/dbConfig.js";
import { checkExistingUser } from "../../middleware/checkUser.js";
import { authenticateToken } from "../../middleware/authMiddleware.js"

import { Router } from "express";
import bcrypt from "bcrypt";
import { v4 as generateID } from "uuid";
import jwt from "jsonwebtoken"

const router = Router();

router.post("/register", checkExistingUser, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

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

    await usersCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: "Registration successful",
      token,
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
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword
    })

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

router.post("/forgot-password", async (req, res) => {
  //TODO: for later implementation
});

router.get('/verify', authenticateToken, async (req, res) => {
  try {
    const user = await usersCollection.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    };

    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Token verification failed" });
  }
})

export default router;
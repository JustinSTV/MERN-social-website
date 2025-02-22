import { Router } from 'express';
import { usersCollection, postsCollection, connectDB } from '../../config/dbConfig.js';
import { authenticateToken } from '../../middleware/authMiddleware.js';
import { v4 as generateID } from 'uuid';

const router = Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    await connectDB();

    const { content } = req.body;
    const userId = req.user.id;


    const user = await usersCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    };

    const newPost = {
      _id: generateID(),
      author: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage
      },
      content,
      likes: [],
      comments: [],
      createdAt: new Date()
    };

    await postsCollection.insertOne(newPost);


    res.status(201).json({
      message: "Post created successfully",
      post: newPost
    });

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to create post" })
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    await connectDB();
    const posts = await postsCollection
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json({ posts })
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ message: "Failed to fetch post" })
  }
})

router.post('/:postId/like', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await postsCollection.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const hasLiked = post.likes.includes(userId);
    const updateOperation = hasLiked
      ? { $pull: { likes: userId } }
      : { $push: { likes: userId } };

    await postsCollection.updateOne(
      { _id: postId },
      updateOperation
    );

    res.json({
      message: hasLiked ? "Post unliked" : "Post liked",
      userId
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to like post' });
  }
})

export default router;
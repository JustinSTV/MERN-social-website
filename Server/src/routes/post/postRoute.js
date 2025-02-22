import { Router } from 'express';
import { v4 as generateID } from 'uuid';
import multer from 'multer';

import { usersCollection, postsCollection, connectDB } from '../../config/dbConfig.js';
import { authenticateToken } from '../../middleware/authMiddleware.js';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
})


router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    await connectDB();

    const { content } = req.body;
    const userId = req.user.id;


    const user = await usersCollection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    };

    let media = null;
    if (req.file) {
      const imageBase64 = req.file.buffer.toString('base64');
      media = `data:${req.file.mimetype};base64,${imageBase64}`;
    }

    const newPost = {
      _id: generateID(),
      author: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage
      },
      content,
      media,
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
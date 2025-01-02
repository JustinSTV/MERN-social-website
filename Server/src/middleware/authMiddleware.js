import jwt from 'jsonwebtoken';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });

  } catch (error) {
    res.status(500).json({ message: "Authentication error" });
  }
}
import router from ".";
import { authMiddleware } from "../../utils/auth";

router.get('/verifyToken', authMiddleware, (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  res.json({ message: 'Token is valid' });
});

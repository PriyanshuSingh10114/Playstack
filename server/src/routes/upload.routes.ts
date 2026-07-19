import { Router, Request, Response } from 'express';
import { upload } from '../config/cloudinary';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/profile', authenticate, upload.single('image'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  
  res.status(200).json({
    success: true,
    data: {
      url: req.file.path
    }
  });
});

export default router;

import express from 'express';
import { test, updateUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';
import multer from 'multer';
import { storage } from '../cloudConfog.js';
const router = express.Router();
const upload = multer({ storage });
router.get('/test', test);

router.put('/update/:userId', verifyToken,upload.single('profilePic'), updateUser);

export default router;
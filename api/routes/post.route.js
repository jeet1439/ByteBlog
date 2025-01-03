import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getposts } from '../controllers/post.controller.js';

import multer from 'multer';
import { storage } from '../cloudConfog.js';
const upload = multer({ storage });

const router = express.Router();

router.post('/create', verifyToken,upload.single('coverPhoto'), create);

router.get('/getposts', getposts);

export default router;
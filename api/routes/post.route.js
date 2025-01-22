import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletePost, getposts, updatePost } from '../controllers/post.controller.js';

import multer from 'multer';
import { storage } from '../cloudConfog.js';


const upload = multer({ storage });

const router = express.Router();

router.post('/create', verifyToken,upload.single('coverPhoto'), create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);
router.put(
    '/updatepost/:postId/:userId',
    verifyToken,
    upload.single('coverPhoto'),
    updatePost
);
export default router;
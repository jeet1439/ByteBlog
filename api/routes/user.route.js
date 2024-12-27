import express from 'express';
import { deleteUser, test, updateUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/verifyUser.js';
import multer from 'multer';
import { storage } from '../cloudConfog.js';
const router = express.Router();
const upload = multer({ storage });
router.get('/test', test);

router.put('/update/:userId', verifyToken,upload.single('profilePic'), updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
export default router;
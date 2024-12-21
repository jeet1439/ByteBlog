import express from 'express';
const router = express.Router();
import { signin, signup } from '../controllers/auth.controller.js';
import wrapAsync from '../utils/wrapAsync.js';
import multer from 'multer';
import { storage } from '../cloudConfog.js'; 


const upload = multer({ storage });

router.route("/signup")
  .post(upload.single("profilePic"), wrapAsync(signup)); 
  
router.route('/signin')
   .post(wrapAsync(signin));
   
export default router;
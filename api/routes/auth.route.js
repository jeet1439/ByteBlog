import express from 'express';
const router = express.Router();
import { google, signin, signup } from '../controllers/auth.controller.js';
import wrapAsync from '../utils/wrapAsync.js';
import multer from 'multer';
import { storage } from '../cloudConfog.js'; 

const upload = multer({ storage });

router.route("/signup")
  .post(upload.single("profilePic"), wrapAsync(signup)); 
  
router.route('/signin')
   .post(wrapAsync(signin));

router.route('/google')
     .post(wrapAsync(google));   
   
export default router;
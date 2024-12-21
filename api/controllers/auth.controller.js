import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandeler } from "../utils/error.js";
import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();

// console.log(process.env.VITE_JWT_SECRET);

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(errorHandeler(400, "All fields are required"));
    }
 
    try {

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePic: {
                url: '',
                filename: ''
            }
        });
        // console.log(newUser);
        // console.log(req.file);
        if (req.file) {
            newUser.profilePic = {
                url: req.file.path,
                filename: req.file.filename,
            };
        }
        await newUser.save();

        res.json({ message: "Signup successful", user: newUser });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password || email ==='' || password === ''){
        next(errorHandeler(400, 'All fields are required'));
    }
    try{
    const  validUser = await User.findOne({email});
    if(!validUser){
       return next(errorHandeler(404, 'wrong credential'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if(!validPassword){
       return next(errorHandeler(404, 'wrong credential'));
    }
    const token = jwt.sign({ id: validUser._id}, process.env.VITE_JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;
    res.status(200).cookie('access_token', token, {
        httpOnly: true}).json(rest);
    }catch(error){
        next(error);
    }
}

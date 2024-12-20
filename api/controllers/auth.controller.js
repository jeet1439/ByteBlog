// import User from '../models/user.model.js';
// import bcryptjs from 'bcryptjs';
// import { errorHandeler } from '../utils/error.js';

// export const signup = async(req, res, next) =>{
//     const {username, email, password } = req.body;
//     if(!username || !email || !password || username === '' || email === '' || password === ''){
//         next(errorHandeler(400, 'all fields are reqired'));
//     }
//     const hashedPassword = bcryptjs.hashSync(password, 10);

//     const newUser = new User({
//         username : username, 
//         email: email,
//         password: hashedPassword});
//    try{
//     await newUser.save();
//     res.json("sussesful");
//    }catch(error){
//     next(error);
//    }
// }
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandeler } from "../utils/error.js";

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
        console.log(newUser);
        console.log(req.file);
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

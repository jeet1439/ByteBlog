import { errorHandeler } from "../utils/error.js"
import Post from '../models/post.model.js';

export const create = async (req, res, next) =>{
    if(!req.body.isAdmin){
        return next(errorHandeler(403, 'Not allowed to create a post'));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandeler(400, 'please provide all field'));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try{
       const SavedPost = await newPost.save();
       res.status(201).json(SavedPost);
    }catch(error){
        next(error);
    }
}
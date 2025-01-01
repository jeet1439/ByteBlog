import { errorHandeler } from "../utils/error.js"
import Post from '../models/post.model.js';

export const create = async (req, res, next) =>{
    let coverPhoto = 'https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png';
    if(!req.user.isAdmin){
        return next(errorHandeler(403, 'Not allowed to create a post'));
    }
    if (req.file) {
        coverPhoto = { url: req.file.path, filename: req.file.filename };
      }
    if(!req.body.title || !req.body.content){
        return next(errorHandeler(400, 'please provide all field'));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
        coverPhoto,
    });
    try{
       const SavedPost = await newPost.save();
       res.status(201).json(SavedPost);
    }catch(error){
        next(error);
    }
}
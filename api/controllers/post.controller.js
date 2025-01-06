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

export const getposts = async(req, res, next) =>{
    try{
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postId && { _id: req.query.postId }),
        ...(req.query.searchTerm && { 
            $or: [
                { title: { $regex : req.query.searchTerm, $options: 'i' } },
                { title: { $regex : req.query.searchTerm, $options: 'i' } },
            ],
         }),    
    }).sort({updatedAt : sortDirection}).skip(startIndex).limit(limit);
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
        createdAt : { $gte: oneMonthAgo }
    });
    res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts
    })
    }catch(error){
        next(error);
    }
}

export const deletePost = async(req, res, next) => {
  if(!req.user.isAdmin || req.user.id !== req.params.userId){
    return next(errorHandeler(403, 'Not allowed to delete this'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};
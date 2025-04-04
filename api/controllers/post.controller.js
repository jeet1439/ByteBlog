import { errorHandeler } from "../utils/error.js";
import Post from '../models/post.model.js';

// export const create = async (req, res, next) =>{
//     let coverPhoto = 'https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png';
//     if(!req.user){
//         return next(errorHandeler(403, 'Not allowed to create a post'));
//     }
//     if (req.file) {
//         coverPhoto = { url: req.file.path, filename: req.file.filename };
//       }
//     if(!req.body.title || !req.body.content){
//         return next(errorHandeler(400, 'please provide all field'));
//     }
//     const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
//     const newPost = new Post({
//         ...req.body,
//         slug,
//         userId: req.user.id,
//         coverPhoto,
//     });
//     try{
//        const SavedPost = await newPost.save();
//        res.status(201).json(SavedPost);
//     }catch(error){
//         next(error);
//     }
// }

export const create = async (req, res, next) => {
    let coverPhoto = 'https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png';

    if (!req.user) {
        return next(errorHandeler(403, 'Not allowed to create a post'));
    }

    if (req.file) {
        coverPhoto = { url: req.file.path, filename: req.file.filename };
    }

    if (!req.body.title || !req.body.content) {
        return next(errorHandeler(400, 'Please provide all fields'));
    }

    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '-');

    let tags = [];
    try {
        tags = JSON.parse(req.body.tags); 
        if (!Array.isArray(tags)) {
            return next(errorHandeler(400, 'Tags must be an array'));
        }
    } catch (error) {
        return next(errorHandeler(400, 'Invalid tags format'));
    }

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
        coverPhoto,
        tags,  
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};

export const getposts = async(req, res, next) =>{
    try{
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
        ...(req.query.userId && { userId: req.query.userId }),
        ...(req.query.category && { category: req.query.category }),
        // ...(req.query.slug && { slug: req.query.slug }),
        ...(req.query.postslug && { slug: req.query.postslug }),
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
  if(req.user.id !== req.params.userId){
    return next(errorHandeler(403, 'Not Authorized'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
    if (!req.user && req.user.id !== req.params.userId) {
        return next(new Error("You are not allowed to update the post"));
    }

    try {
        // Prepare the data to update
        let updatedData = {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
        };

        // If a new cover photo is uploaded, include it in the update
        if (req.file) {
            updatedData.coverPhoto = { 
                url: req.file.path, 
                filename: req.file.filename 
            };
        }

        // Update the post with new data
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            { $set: updatedData },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        next(error);
    }
};

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        coverPhoto: {
            url:{
                type: String,
                default: 'https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png',
            },
            filename: String
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        tags: {
            type: [String],
            default: [],
        },
    }, {timestamps: true}
);

const Post = mongoose.model('Post', postSchema);

export default Post;
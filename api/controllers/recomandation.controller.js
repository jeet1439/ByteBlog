import Post from "../models/post.model.js";

const computeSimilarity = (tags1, tags2, category1, category2) => {
    const set1 = new Set(tags1);
    const set2 = new Set(tags2);

    const intersection = new Set([...set1].filter(tag => set2.has(tag)));
    const union = new Set([...set1, ...set2]);

    const tagSimilarity = union.size === 0 ? 0 : intersection.size / union.size; 


    const categoryBoost = category1 === category2 ? 0.3 : 0; 

    return tagSimilarity + categoryBoost;
};


export const getRecommendations = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const allPosts = await Post.find({ _id: { $ne: post._id } });

        const scoredPosts = allPosts
            .map(p => ({
                post: p,
                score: computeSimilarity(post.tags, p.tags, post.category, p.category),
            }))
            .sort((a, b) => b.score - a.score);

        res.json(scoredPosts.slice(0, 4)); // Return top 4 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

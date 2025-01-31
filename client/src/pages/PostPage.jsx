import { Button, Spinner, Modal} from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard.jsx";

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState(null);
    const [recommendedPosts, setRecommendedPosts] = useState();
    const [summary, setSummary] = useState(""); 
    const [showSummary, setShowSummary] = useState(false); 
    const [model, setModel] = useState(null); 
    const [loadingSummary, setLoadingSummary] = useState(false); 

    // Load Universal Sentence Encoder Model
    useEffect(() => {
        async function loadModel() {
            const loadedModel = await use.load();
            setModel(loadedModel);
        }
        loadModel();
    }, []);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?postslug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                } else {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await fetch(`/api/post/getposts?limit=2`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts);
                }
            };
            fetchRecentPosts();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        if (post?._id) {
            fetch(`/api/recommendations/${post._id}`)
                .then((res) => res.json())
                .then((data) => setRecommendedPosts(data))
                .catch((err) => console.error(err));
        }
    }, [post]);

    // **Summarization using NLP with TensorFlow.js**
    const summarizeContent = async () => {
        if (!post || !post.content || !model) return;
        setLoadingSummary(true);

        const sentences = post.content.split(". ");
        if (sentences.length <= 3) {
            setSummary(post.content);
            setShowSummary(true);
            setLoadingSummary(false);
            return;
        }

        // Generate embeddings using Universal Sentence Encoder
        const embeddings = await model.embed(sentences);
        const sentenceVectors = embeddings.arraySync();

        // Calculate sentence importance using cosine similarity to the entire text
        const meanVector = sentenceVectors.reduce((sum, vec) => 
            sum.map((val, idx) => val + vec[idx])
        ).map(val => val / sentenceVectors.length);

        const sentenceScores = sentenceVectors.map(vec => 
            vec.reduce((sum, val, idx) => sum + val * meanVector[idx], 0)
        );

        // Select the top N important sentences
        const topSentences = sentences
            .map((sentence, idx) => ({ sentence, score: sentenceScores[idx] }))
            .sort((a, b) => b.score - a.score)
            .slice(0, Math.max(2, Math.floor(sentences.length / 3)))
            .map(s => s.sentence)
            .join(". ") + ".";

        setSummary(topSentences);
        setShowSummary(true);
        setLoadingSummary(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    return (
        <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
                {post && post.title}
            </h1>
            <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
                <Button color="gray" pill size="xs">
                    {post && post.category}
                </Button>
            </Link>
            <img src={post && post.coverPhoto.url} alt={post && post.title} className="mt-10 p-3 max-h-[600px] w-full object-cover" />
            <div className="flex justify-between items-center p-3 border-b border-slate-500 mx-auto w-full text-xs">
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <Button outline gradientDuoTone="purpleToPink" onClick={summarizeContent} disabled={!model || loadingSummary} >
                    {loadingSummary ? <Spinner size="sm" /> : "Summarize"}
                </Button>
                <span className="italic">{post && (post.content.length / 1000).toFixed(0)} mins read</span>
            </div>
            <div className="p-3 max-w-2xl w-full mx-auto post-content" dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
            <CommentSection postId={post._id} />

            {/* Summary Modal */}

            {showSummary && (
                <Modal show={showSummary} onClose={() => setShowSummary(false)}>
                    <Modal.Header>Summary</Modal.Header>
                    <Modal.Body>
                        <div dangerouslySetInnerHTML={{ __html: summary }}></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button gradientDuoTone="purpleToBlue" outline className="mx-auto" onClick={() => setShowSummary(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Recent Articles */}
            <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-xl mt-5">Recent Articles</h1>
                <div className="flex flex-col lg:flex-row gap-5">
                    {recentPosts && recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
                </div>
            </div>

            {/* Recommended Articles */}
            <div className="flex flex-col justify-center items-center mb-5">
                <h1 className="text-xl mt-5">Recommended for you</h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-5xl">
                    {recommendedPosts &&
                        recommendedPosts.map((post) => <PostCard key={post.post._id} post={post.post} />)}
                </div>
            </div>
        </main>
    );
}

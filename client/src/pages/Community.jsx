import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Button } from 'flowbite-react';
import ProfileCard from "../components/ProfileCard";
export default function Community() {
  const [posts, setPosts] = useState([]);
  const [morePosts, setMorePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/post/getposts?limit=2`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
      setShowMore(data.posts.length === 2);
    };

    fetchPosts();
  }, []);

  const handleShowMore = async () => {
    const numberOfPosts = posts.length + morePosts.length;
    const res = await fetch(`/api/post/getposts?startIndex=${numberOfPosts}&limit=2`);
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    setMorePosts([...morePosts, ...data.posts]);
    setShowMore(data.posts.length === 2);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 w-full space-y-4">
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {!loading && posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      <ProfileCard/>
      </div>
      {morePosts.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {morePosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      )}
      {showMore && (
        <button
          onClick={handleShowMore}
          className="text-teal-500 text-lg hover:underline p-7 w-full"
        >
          Show More
        </button>
      )}
    </div>
  );
}

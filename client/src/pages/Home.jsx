import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';
import { Spinner } from 'flowbite-react';


export default function Home() {

  const [showBlogs, setShowBlogs] = useState(false);
  const [ posts , setPosts ] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBlogs(true);
    }, 2000); 
    return () => clearTimeout(timer); 
  }, []);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
      const res = await fetch('/api/post/getposts?limit=4');
      const data = await res.json();
      setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPosts();
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-20 pb-5">
        <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
  Welcome to{" "}
  <span className="font-bold bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-transparent">
    {"<ByteBlog/>"}
  </span>
</h1>
          <p className="text-lg md:text-xl">
           The Pulse of Innovation, Technology, and Beyond
          </p>
          <Link to="/community">
          <button className="mt-6 px-6 py-3 bg-white text-teal-600 font-semibold rounded-md shadow-md hover:bg-teal-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
            Get Started
          </button>
          </Link>
        </div>
      </section>

      <section className="py-16">
  <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-teal-400">
        AI-Powered Blog Summarizer
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Provides concise summaries for quick understanding of content.
      </p>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-teal-400">
        Content Recommendations
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        AI-powered personalized content keeps you ahead of others.
      </p>
    </div>
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-teal-400">
        Data Security
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Your information is safeguarded, ensuring the highest level of protection and privacy.
      </p>
    </div>
  </div>
</section>

     { showBlogs === true ? (<div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/community'}
              className='text-lg text-gray-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div> ): (
        <div className='flex justify-center pb-4'>
          <Spinner className="w-12 h-12"/>
          </div>  
      )}
      

    </div>
  );
}

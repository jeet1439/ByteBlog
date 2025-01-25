import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaHeart } from "react-icons/fa";

export default function PostCard({ post }) {
const [username, setUsername] = useState("");
const [profilePic, setProfilePic] = useState("");
const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${post.userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUsername(data.username || "Anonymous");
        setProfilePic(data.profilePic.url);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user data");
      }
    };
    if (post.userId) fetchUser();
}, [post.userId]); 

  return (
    <div className="flex flex-col sm:flex-row bg-white dark:bg-slate-950 shadow-lg rounded-lg overflow-hidden max-w-sm sm:max-w-lg mx-auto my-5 gap-2 transition-transform duration-200 hover:scale-105">
  <Link to={`/post/${post.slug}`}>
    <div className="sm:w-[200px] w-full h-[150px] sm:h-full">
      <img
        src={post.coverPhoto?.url}
        alt="Card Image"
        className="h-full w-full object-cover sm:rounded-l-lg rounded-t-lg sm:rounded-t-none"
      />
    </div>
  </Link>

  <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
    <Link to={`/post/${post.slug}`}>
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-400 mb-2">
          {post.title.split(" ").slice(0, 4).join(" ") + (post.title.split(" ").length > 4 ? "..." : "")}
        </h3>
        <div
          className="text-sm text-gray-800 dark:text-gray-400 mb-2"
          dangerouslySetInnerHTML={{
            __html:
              post &&
              post.content.split(" ").slice(0, 10).join(" ") +
              (post.content.split(" ").length > 10 ? "..." : ""),
          }}
        ></div>
        <span className="font-medium text-gray-700">{post.category || 'anonymous'}</span>
      </div>
    </Link>
    {/* Profile Information */}
    <div className="flex items-center gap-2 mt-5 text-gray-500 text-sm">
      <img
        className="h-9 w-9 object-cover rounded-full"
        src={profilePic || "https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"}
        alt="Profile-pic"
      />
      <div className="flex flex-col text-xs">
        <span>{username || 'Anonymous'}</span>
        <span>{moment(post.createdAt).fromNow()}</span>
      </div>
      <div className=" ml-14 flex items-center gap-2 text-gray-600">
      <button className="flex items-center gap-2 text-gray-600">
        <FaHeart />
        <p>{(Math.random() * 100).toFixed()}</p>
      </button>
    </div>
    </div>
    {/* Heart Button */}
    
  </div>
</div>

  );
}

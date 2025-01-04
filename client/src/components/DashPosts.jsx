import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Table, TableCell} from 'flowbite-react';
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [ userPosts, setUserPosts ] = useState([]);
  // console.log(userPosts);
  // console.log(currentUser);
  
  useEffect( () =>{
      const fetchPosts = async () =>{
        try{
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
          const data = await res.json()
          if(res.ok){
            setUserPosts(data.posts);
          }
        } catch(error){
          console.log(error.message)
        }
      };
      if(currentUser.isAdmin) {
        fetchPosts();
      }
  },[currentUser._id])
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300">
     {currentUser.isAdmin && userPosts.length > 0 ? (
      <>
      <Table hoverable className="shadow-md">
        <Table.Head>
              <Table.HeadCell className="w-36">Last Updated</Table.HeadCell>
              <Table.HeadCell className="w-36">Cover</Table.HeadCell>
              <Table.HeadCell className="w-64">Title</Table.HeadCell>
              <Table.HeadCell className="w-36">Category</Table.HeadCell>
              <Table.HeadCell className="w-20">Delete</Table.HeadCell>
              <Table.HeadCell className="w-20">Edit</Table.HeadCell>
        </Table.Head>
        <Table.Body>
        {userPosts.map((post) => (
                <Table.Row key={post._id} className="bg-while dark:broder-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`post/${post.slug}`}>
                    <img src={post.coverPhoto?.url} alt="Post Cover" className="w-20 h-10 object-cover rounded-sm bg-gray-500" />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">{post.title}</Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span className="text-red-500 hover:underline">Delete</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`}>
                    <span className="text-blue-500 hover:underline">Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row> 
              ))}
        </Table.Body>
      </Table>
      </>
     ) : (
      <p>You have no Blogs yet</p>
     )}
    </div>
  )
}

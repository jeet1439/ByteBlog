import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";
import MyBlogs from "../components/MyBlogs";
import DashComponent from "../components/DashComponent";
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar/>
      </div>
      {tab === 'profile' && <DashProfile/>}
      {tab === 'posts' && <DashPosts/>}
      {tab === 'users' && <DashUsers/>}
      {tab === 'comments' && <DashComments/>}
      {tab === 'myblogs' && <MyBlogs/>}
      {tab === 'dash' && <DashComponent/>}
    </div>
  )
}

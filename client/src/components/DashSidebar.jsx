import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiUser, HiAnnotation, HiChartPie} from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export default function DashSidebar() {
  const location = useLocation();
  const {currentUser} = useSelector((state) => state.user);
  const [tab, setTab] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search])
 
  const handleSignout = async () => {
          try{
             const res = await fetch('/api/user/signout',{
              method: 'POST',
             });
             const data = await res.json();
             if(!res.ok){
              console.log(data.message);
             }else{
             dispatch(signoutSuccess());
             }
          }catch(error){
            console.log(error.message);
          }
        }

  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-1">
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab==='profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'user'} labelColor='dark' as='div'>
                    profile
                </Sidebar.Item>
                </Link>
                {currentUser.isAdmin ? (
                <Link to='/dashboard?tab=posts'>
                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>posts</Sidebar.Item>
                </Link>
                ) : <Link to='/dashboard?tab=myblogs'>
                <Sidebar.Item active={tab === 'myblogs'} icon={HiDocumentText} as='div'>My blogs</Sidebar.Item>
                </Link>}
                {currentUser.isAdmin && (
                  <>
                <Link to='/dashboard?tab=users'>
                <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>users</Sidebar.Item>
                </Link>
                <Link to='/dashboard?tab=dash'>
                <Sidebar.Item active={tab === 'dash'} icon={HiChartPie} as='div'>dashboard</Sidebar.Item>
                </Link>
                </>
                )}
                {currentUser.isAdmin && (
                <Link to='/dashboard?tab=comments'>
                <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as='div'>comments</Sidebar.Item>
                </Link>
                )}
                <Sidebar.Item onClick={handleSignout} icon={HiArrowSmRight} className='cursor-pointer'>
                    Sign out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Button, Modal, Table} from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from 'react-icons/fa';
export default function DashUsers() {

  const { currentUser } = useSelector((state) => state.user);

  const [ users, setUsers ] = useState([]);
  const [ showMore, setShowMore ] = useState(true);
  const [showModal , setShowModal] = useState(false);
  const [ userIdToDelete, setUserIdToDelete] = useState('');
  useEffect( () =>{
      const fetchUsers = async () =>{
        try{
          const res = await fetch(`/api/user/getusers`);
          const data = await res.json()
          if(res.ok){
            setUsers(data.users);
            if(data.users.length < 9){
             setShowMore(false);
            }
          }
        } catch(error){            
          console.log(error.message)
        }
      };
      if(currentUser.isAdmin) {
        fetchUsers(); 
      }
  },[currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try{
       const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
       const data = await res.json();
       if(res.ok){
        setUsers((prev) => [...prev, ...data.posts]);
        if(data.users.length < 9){
          setShowMore(false);
        }
       }
    }catch(error){
      console.log(error.message);
    }
  }
  const handleDeleteUser = async () => {

  }
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-300">
     {currentUser.isAdmin && users.length > 0 ? (
      <>
      <Table hoverable className="shadow-md">
        <Table.Head>
              <Table.HeadCell className="w-36">Created at</Table.HeadCell>
              <Table.HeadCell className="w-36">User image</Table.HeadCell>
              <Table.HeadCell className="w-64">Username</Table.HeadCell>
              <Table.HeadCell className="w-20">Email</Table.HeadCell>
              <Table.HeadCell className="w-20">Admin</Table.HeadCell>
              <Table.HeadCell className="w-20">Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body>
        {users.map((user) => (
                <Table.Row key={user._id} className="bg-while dark:broder-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <img src={user.profilePic?.url} alt="profile pic" className="w-20 h-10 object-cover rounded-sm bg-gray-500" />
                  </Table.Cell>
                  <Table.Cell className="font-medium text-gray-900 dark:text-white">{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.isAdmin? (<FaCheck className="text-green-500" />) : (<FaTimes className="text-red-500" />)}</Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setShowModal(true);
                      setUserIdToDelete(user._id);
                    }} className="text-red-500 hover:underline cursor-pointer">Delete</span>
                  </Table.Cell>
                </Table.Row> 
              ))}
        </Table.Body>
      </Table>
      {
        showMore && ( <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7 hover:underline">Show more</button>)
      }
      </>
     ) : (
      <p>You have no Users yet</p>
     )}
     <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
       <Modal.Header/>
       <Modal.Body>
         <div className="text-center">
           <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
           <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this User?</h3>
         </div>
         <div className="flex justify-center gap-4">
         <Button color="failure" onClick={handleDeleteUser}>Yes, Delete</Button>
         <Button color='gray' onClick={() => setShowModal(false)} >No, Cancel</Button>
         </div>
       </Modal.Body>
     </Modal>
    </div>
  );
}

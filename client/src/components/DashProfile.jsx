import { Alert, Button, Modal, Spinner, TextInput } from "flowbite-react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStart, updateSuccess, updateFailure ,deleteUserStart, deleteUserSuccess, deleteuserFailure, signoutSuccess} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [updatemsg, setUpdateMsg] = useState(null);
  const [errorMsg, setErrormsg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    profilePic: null,
  });

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { 
        setErrormsg("File size exceeds 2MB");
        return;
      }
      setFormData({ ...formData, profilePic: file });
      setImageFileUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.profilePic) {
      formDataToSend.append("profilePic", formData.profilePic);
    }

    try {
      dispatch(updateStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${currentUser.token}` },
        body: formDataToSend,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(updateSuccess(updatedUser));
        setUpdateMsg("Profile updated successfully");
        setTimeout(() => {
          setUpdateMsg(null);
          navigate("/");
        }, 2000); 
      } else {
        setErrormsg("Something went wrong");
        dispatch(updateFailure());
        setTimeout(() => {
          setErrormsg(null);
          navigate("/");
        }, 4000);
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch(updateFailure());
    }
  };
  const handleDeleteUser = async(req, res, next) => {
  setShowModal(false);
  try{
    dispatch(deleteUserStart());
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method: 'DELETE',
    });
   const data = await res.json();
   if(!res.ok){
    dispatch(deleteuserFailure(data.message));
   }else{
    dispatch(deleteUserSuccess(data));
   }
  }catch(error){
    dispatch(deleteuserFailure(error.message));
  }
  }
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
    <div className="max-w-lg mx-auto p-3 w-full">
      {updatemsg && <Alert color="success" className="mt-5">{updatemsg}</Alert>}
      {errorMsg && <Alert color="failure" className="mt-5">{errorMsg}</Alert>}
      {error && <Alert color="failure" className="mt-5">{error}</Alert>}
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleInputChange} ref={filePickerRef} hidden />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePic.url}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
            }}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleInputChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleInputChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password(at least 6 characters)"
          required
          onChange={handleInputChange}
        />
        
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          {loading ? (
                        <>
                          <Spinner size='sm' />
                          <span className='pl-3'>Loading...</span>
                        </>
                      ) : 'Update'}
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=> setShowModal(true)} className="cursor-pointer hover:underline">Delete Account</span>
        <span onClick={handleSignout} className="cursor-pointer hover:underline">Sign out</span>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
  <Modal.Header/>
  <Modal.Body>
    <div className="text-center">
      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto"/>
      <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete yout account ?</h3>
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

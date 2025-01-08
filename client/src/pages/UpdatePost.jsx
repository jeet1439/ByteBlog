import { Alert, Button, Select, Spinner, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [errorMsg, setErrormsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const filePickerRef = useRef();
  const { postId } = useParams();

  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    coverPhoto: null,
  });

  useEffect(()=>{
    try {
        const fetchPost = async () =>{
            const res = await fetch(`/api/post/getposts?postId=${postId}`);
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
                setErrormsg(data.message);
                return;
            }
            if(res.ok){
            setErrormsg(null);
               setFormData(data.posts[0]);
            }
        }
        fetchPost();
    } catch (error) {
        console.log(error);
    }
  },[postId])

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { 
        setErrormsg("File size exceeds 2MB");
        return;
      }
      setFormData({ ...formData, coverPhoto: file });
      setImageFileUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleEditorChange = (value) => {
    setFormData({ ...formData, content: value });
  };
//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("category", formData.category);
//     formDataToSend.append("content", formData.content);
//     if (formData.coverPhoto) {
//       formDataToSend.append("coverPhoto", formData.coverPhoto);
//     }
//     try {
//       setIsLoading(true);
//       const res = await fetch("/api/post/create", {
//         method: "POST",
//         body: formDataToSend,
//       });
//       const postData = await res.json();

//       if (!res.ok) {
//         setErrormsg(postData.message);
//         setIsLoading(false);
//         setTimeout(() => {
//           setErrormsg(null);
//         }, 4000);

//         return;
//       }
//       else{
//         setErrormsg(null);
//         setIsLoading(false);
//         navigate(`/post/${postData.slug}`);
//       }
//     } catch (error) {
//       setErrormsg(error);
//       setIsLoading(false);
//       console.error("Error:", error);
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("content", formData.content);

    if (formData.coverPhoto) {
        formDataToSend.append("coverPhoto", formData.coverPhoto);
    }

    try {
        setIsLoading(true);
        const res = await fetch(`/api/post/updatePost/${formData._id}/${currentUser._id}`, {
            method: "PUT",
            body: formDataToSend,
        });

        const postData = await res.json();

        if (!res.ok) {
            setErrormsg(postData.message);
            setIsLoading(false);
            setTimeout(() => setErrormsg(null), 4000);
            return;
        }

        setErrormsg(null);
        setIsLoading(false);
        navigate(`/post/${postId}`);
    } catch (error) {
        setErrormsg(error.message);
        setIsLoading(false);
    }
};
let showable = formData.content;
return (
  <div className='p-3 max-w-3xl mx-auto min-h-screen'>
    <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
    {errorMsg && <Alert color="failure" className="my-5">{errorMsg}</Alert> }
    <form className='flex flex-col gap-4 mb-20' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={handleInputChange} value={formData.title}/>
            <Select id="category" onChange={handleInputChange} value={formData.category}>
                <option value="uncatagorized">Select a catagory</option>
                <option value="javascript">JavaScript</option>
                <option value="reactjs">React.js</option>
                <option value="nextjs">nextjs</option>
                <option value="webdev">web development</option>
                <option value="tailwindcss">Tailwind</option>
            </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-2 border-teal-500 rounded p-3'
         onClick={()=>filePickerRef.current.click()}>
        <input type='file' accept='images/*' onChange={handleInputChange} ref={filePickerRef} hidden/>
        <img
        src={
           imageFileUrl || 
          formData.coverPhoto?.url || 
         'https://www.blogtyrant.com/wp-content/uploads/2017/02/how-to-write-a-good-blog-post.png'
  }
  alt="Cover Photo"
  className="w-full h-64 object-cover"
/>
        </div>
        <ReactQuill theme="snow" placeholder="What's on your mind..." className='h-72 mb-12' required value={showable} onChange={handleEditorChange} />
        <br/>
        <Button type='submit' gradientDuoTone="purpleToBlue" disabled={isLoading}>
          {isLoading ? ( <> <Spinner size='sm' /> <span className='pl-3'>Updating...</span>
                    </>
                  ) : 'Update'}
        </Button>
      </form>
    </div>
  )
}

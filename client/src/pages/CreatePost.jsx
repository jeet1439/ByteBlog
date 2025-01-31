import { Alert, Button, Select, Spinner, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [errorMsg, setErrormsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const filePickerRef = useRef();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    coverPhoto: null,
    tags: [], 
  });

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

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value
      .split(",")
      .map(tag => tag.trim())  // Trim whitespace
      .filter(tag => tag !== ""); // Remove empty strings
    setFormData({ ...formData, tags: tagsArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("content", formData.content);
    
    if (formData.coverPhoto) {
      formDataToSend.append("coverPhoto", formData.coverPhoto);
    }

    formDataToSend.append("tags", JSON.stringify(formData.tags)); // Append tags

    try {
      setIsLoading(true);
      const res = await fetch("/api/post/create", {
        method: "POST",
        body: formDataToSend,
      });
      const postData = await res.json();

      if (!res.ok) {
        setErrormsg(postData.message);
        setIsLoading(false);
        setTimeout(() => {
          setErrormsg(null);
        }, 4000);
        return;
      }

      setErrormsg(null);
      setIsLoading(false);
      navigate(`/post/${postData.slug}`);
      
    } catch (error) {
      setErrormsg(error.message);
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      {errorMsg && <Alert color="failure" className="my-5">{errorMsg}</Alert> }
      <form className='flex flex-col gap-4 mb-20' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1' onChange={handleInputChange} />
            <Select id="category" onChange={handleInputChange} >
                <option value="uncategorized">Select a category</option>
                <option value="javascript">JavaScript</option>
                <option value="frontend">Front End</option>
                <option value="backend">Back End</option>
                <option value="programming">Programming</option>
                <option value="ai">AI</option>
                <option value="nextjs">Next.js</option>
                <option value="technology">Technology</option>
                <option value="androiddev">Android Development</option>
                <option value="cybersecurity">Cyber Security</option>
                <option value="systemdesign">System design</option>
                <option value="webdev">Web Development</option>
                <option value="webdesign">Web Design</option>
            </Select>
        </div>

        {/* Tags Input */}
        <TextInput
          type="text"
          placeholder="Enter tags (comma-separated)"
          id="tags"
          onChange={handleTagsChange}
        />

        <div className='flex gap-4 items-center justify-between border-2 border-teal-500 rounded p-3'
         onClick={()=>filePickerRef.current.click()}>
        <input type='file' accept='images/*' onChange={handleInputChange} ref={filePickerRef} hidden/>
         { imageFileUrl? (<img
              src={imageFileUrl}
              alt="coverphoto"
              className="w-full h-64 rounded object-cover mx-auto"/> 
            ) : ( 
             <img src="https://www.freeiconspng.com/uploads/upload-icon-3.png" alt="uploadphoto"
             className=" h-32 rounded object-cover mx-auto"
            />
             )}
        </div>

        <ReactQuill theme="snow" placeholder="What's on your mind..." className='h-72 mb-12' required onChange={handleEditorChange}/>

        <Button type='submit' gradientDuoTone="purpleToBlue" disabled={isLoading}>
          {isLoading ? ( <> <Spinner size='sm' /> <span className='pl-3'>Publishing...</span></>
                    ) : 'Publish'}
        </Button>
      </form>
    </div>
  );
}

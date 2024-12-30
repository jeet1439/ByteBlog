import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4 mb-20'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
            <Select>
                <option value="uncatagorized">Select a catagory</option>
                <option value="javascript">JavaScript</option>
                <option value="reactjs">React.js</option>
                <option value="nextjs">nextjs</option>
                <option value="webdev">web development</option>
                <option value="tailwindcss">Tailwind</option>
            </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-2 border-teal-500 rounded p-3'>
         <FileInput type='file' accept='images/*'/>
         <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload</Button>
        </div>
        <ReactQuill theme="snow" placeholder="What's on your mind..." className='h-72 mb-12'/>
        <Button type='submit' gradientDuoTone="purpleToBlue" >Publish</Button>
      </form>
    </div>
  )
}

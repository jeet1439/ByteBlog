import React, { useState } from 'react'
import { FileInput } from 'flowbite-react';

export default function SignUp() {

  const inputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-400 focus:border-teal-400 text-gray-900  invalid:focus:ring-red-500 invalid:focus:border-red-500";
  
  const [formData, setFormData] = useState({});
  const handleChange = (e) =>{
    if (e.target.type === 'file') {
      setFormData({ ...formData, profilePic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch('/api/auth/signup', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json(); 
  //     console.log('Success:', data); 
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }
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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formDataToSend,
      });
  
      const data = await res.json();
      if (res.ok) {
        console.log('Signup Successful:', data);
      } else {
        console.error('Signup Failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to ByteBlog</h1>
          <form className="space-y-4" encType='multipart/form-data' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="username"
                className={inputClass}
                placeholder="Your Name"
                required
                autoComplete='name'
                onChange={handleChange}
                name='username'
              />

            </div>
  
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={inputClass}
                placeholder="you@example.com"
                required
                autoComplete='email'
                onChange={handleChange}
              />
            </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className={inputClass}
                placeholder="********"
                required
                autoComplete='new-password'
                onChange={handleChange}
              />
            </div>
            <div>
            <label htmlFor="profile-pic" className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <FileInput
              id="profilePic"
              name="profilePic"
              className="mt-1 block w-full"
              accept="image/*"
              helperText="A profile picture is optional but recommended."
              onChange={handleChange}
            />
          </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400"
            >
              Sign Up
            </button>
          </form>
  
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/sign-in" className="text-teal-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    );
}

import React, { useState } from 'react';
import { Spinner, Modal, Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const inputClass = "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-400 focus:border-teal-400 text-gray-900 invalid:focus:ring-red-500 invalid:focus:border-red-500";

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log('Sign In Successful:', data);
        setLoading(false);
        navigate('/');
      } else {
        console.error('Sign In Failed:', data.message);
        setErrorMessage(data.message || 'Invalid credentials. Please try again.');
        setShowModal(true);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
      setShowModal(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 mx-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back to ByteBlog</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              autoComplete="email"
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
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400">
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/sign-up" className="text-teal-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} >
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-96 p-6 mx-4 transform transition-all duration-300 ease-in-out">
            <Modal.Body className="text-center">
              <p className="text-gray-800 text-lg font-medium">{errorMessage}&#128533;</p>
            </Modal.Body>
            <div className='flex justify-center items-center'>
              <Button onClick={() => setShowModal(false)}
                className="bg-teal-500 text-white hover:bg-teal-400 rounded-lg  px-2 focus:outline-none focus:ring-1 flex align-center">
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
}

import React from 'react';

export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className=" bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to ByteBlog
          </h1>
          <p className="text-lg md:text-xl">
            Build something amazing with React and Tailwind CSS.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-teal-600 font-semibold rounded-md shadow-md hover:bg-teal-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-teal-400">
              Feature One
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              A brief description of the feature and how it can help users.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-teal-400">
              Feature Two
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Another brief description of a different feature.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4  text-gray-900 dark:text-teal-400">
              Feature Three
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Highlight the advantages of this feature here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

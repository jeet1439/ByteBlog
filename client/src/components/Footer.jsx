import React from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 px-6 w-full absolute bottom-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand Name */}
        <Link to="/" className='self-center whitespace-nowrap text-2xl sm:text-2xl font-semibold dark:text-white'>
  <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 rounded-md text-white'>Byte</span>
  Blog
</Link>


        {/* Footer Links */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          <a href="#about" className="hover:text-gray-400">About Us</a>
          <a href="#services" className="hover:text-gray-400">Services</a>
          <a href="#contact" className="hover:text-gray-400">Contact</a>
          <a href="#privacy" className="hover:text-gray-400">Privacy Policy</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-gray-400"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-gray-400"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-gray-400"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} BrandName. All rights reserved.</p><br />
        <p className="mt-1">
          Made by &nbsp;&nbsp;
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            Jeet
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

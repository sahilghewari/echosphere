import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-8 mt-8">
      <div className="container mx-auto text-gray-300">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">EchoSphere</h2>
            <p>Your one-stop destination for the latest news and updates.</p>
          </div>
          <div className="w-full md:w-1/3 text-center mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/categories" className="hover:underline">Categories</a></li>
              <li><a href="/chat" className="hover:underline">Chat</a></li>
              <li><a href="/profile-setup" className="hover:underline">Profile Setup</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h2 className="text-xl font-bold mb-2">Follow Us</h2>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2025 EchoSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
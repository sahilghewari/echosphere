import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">EchoSphere</Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/categories" className="text-gray-300 hover:text-white">Categories</Link>
          <Link to="/chat" className="text-gray-300 hover:text-white">Chat</Link>
          {currentUser ? (
            <>
              <Link to="/profile-setup" className="text-gray-300 hover:text-white">Profile Setup</Link>
              <button onClick={handleLogout} className="text-gray-300 hover:text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
            </>
          )}
        </div>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <input
            type="text"
            className="p-2 rounded-l border text-white border-gray-300"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
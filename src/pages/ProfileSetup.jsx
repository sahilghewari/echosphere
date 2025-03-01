import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database, auth } from '../firebaseConfig';
import { ref, set, onValue } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const ProfileSetup = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userRef = ref(database, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setUsername(data ? data.username : '');
        });
      } else {
        navigate('/login'); // Redirect to login page if not authenticated
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSave = () => {
    if (user && username.trim() !== '') {
      const userRef = ref(database, `users/${user.uid}`);
      set(userRef, { username });
      navigate('/chat'); // Redirect to chat page after saving
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Profile Setup</h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
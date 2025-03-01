import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database, auth } from '../firebaseConfig';
import { ref, onValue, push } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const userRef = ref(database, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setUsername(data ? data.username : 'Anonymous');
        });
      } else {
        navigate('/login'); // Redirect to login page if not authenticated
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const messagesRef = ref(database, 'messages');
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        const messagesList = data ? Object.values(data) : [];
        setMessages(messagesList);
      });
    }
  }, [user]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const messagesRef = ref(database, 'messages');
      push(messagesRef, {
        text: newMessage,
        timestamp: Date.now(),
        user: username,
      });
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Chat Forums</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <h2 className="text-2xl font-bold mb-4">General Discussion</h2>
        <div className="chat-messages mb-4">
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <span className="font-bold">{message.user}:</span> {message.text}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
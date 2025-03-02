import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FaGoogle } from 'react-icons/fa';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to home page
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to home page
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redirect to home page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-poppins" style={{ backgroundImage: 'url("https://i.postimg.cc/tT4pcQFQ/pexels-markusspiske-97050.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', filter: '' }}>
      <div className="relative  p-8 rounded-lg shadow-xl max-w-4xl w-full flex">
        <div className="w-1/2 p-8 bg-transparent  bg-opacity-90 border  border-amber-100 rounded-3xl  backdrop-blur-xl    flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-black mb-4">EchoSphere</h1>
          <p className="text-lg text-black">Your one-stop destination for the latest news and updates.</p>
        </div>
        <div className="w-1/2 bg-transparent bg-opacity-90  backdrop-blur-xs border  border-amber-100 rounded-3xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
          <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-6">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div>
              <label className="block text-gray-900 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4">{isLogin ? 'Login' : 'Sign Up'}</button>
            <button
              type="button"
              className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="mr-2" /> Sign in with Google
            </button>
          </form>
          <p className="text-center mt-4">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
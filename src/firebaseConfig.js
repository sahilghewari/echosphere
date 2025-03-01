import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJQ4lUZxXV8xKRbUyNNJ9EEDhThvmPQt8",
  authDomain: "echosphere-3e734.firebaseapp.com",
  databaseURL: "https://echosphere-3e734-default-rtdb.firebaseio.com",
  projectId: "echosphere-3e734",
  storageBucket: "echosphere-3e734.appspot.com",
  messagingSenderId: "504385145504",
  appId: "1:504385145504:web:525f3ddff27c3fcfe657c5",
  measurementId: "G-5GNJGKVRZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { auth, database, googleProvider };
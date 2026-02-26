import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "examnotes-ai-c7a57.firebaseapp.com",
  projectId: "examnotes-ai-c7a57",
  storageBucket: "examnotes-ai-c7a57.firebasestorage.app",
  messagingSenderId: "439844476433",
  appId: "1:439844476433:web:1a7a618fc4e5b19688c3b0",
  measurementId: "G-9E2Y6XFV86"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth , provider};

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYPHeWc3FxuBaJKqkWC21oEXyEMupirl8",
  authDomain: "fir-chat-5e44c.firebaseapp.com",
  projectId: "fir-chat-5e44c",
  storageBucket: "fir-chat-5e44c.appspot.com",
  messagingSenderId: "1002583162211",
  appId: "1:1002583162211:web:7fcac31a61a57d0391a756"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
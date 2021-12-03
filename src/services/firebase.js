import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwKGcIqgl4e7zl0gSTU5jCrY3NyUnhokA",
  authDomain: "tinder-80eff.firebaseapp.com",
  projectId: "tinder-80eff",
  storageBucket: "tinder-80eff.appspot.com",
  messagingSenderId: "744969732254",
  appId: "1:744969732254:web:b90e9f911dc6c19f0a7b8f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore()

export {auth, db}
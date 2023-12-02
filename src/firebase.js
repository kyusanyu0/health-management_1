import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyB2mBB6j9beBZUjIX7ZWsQ9ZUo0bLk6hTk",
//   authDomain: "login-483e4.firebaseapp.com",
//   projectId: "login-483e4",
//   storageBucket: "login-483e4.appspot.com",
//   messagingSenderId: "469664990501",
//   appId: "1:469664990501:web:658e15ac72958ab21806cc",
//   measurementId: "G-HKG5HZTKPD"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCQnuVlczF0ivE8aljWzK5rHE4HpRURaNw",
  authDomain: "health-mamagement.firebaseapp.com",
  projectId: "health-mamagement",
  storageBucket: "health-mamagement.appspot.com",
  messagingSenderId: "1091912409432",
  appId: "1:1091912409432:web:bfd07122b125a40766452d",
  measurementId: "G-N53CTVV95C"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { db };
export { firebase };

export { auth, provider};
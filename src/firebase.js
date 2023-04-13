import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

firebase.initializeApp({
  apiKey: "AIzaSyATI6DPeSoZaLB4ey1q-Z3nLnMT8gJ5OPc",
  authDomain: "vitomars-chat-prototype.firebaseapp.com",
  projectId: "vitomars-chat-prototype",
  storageBucket: "vitomars-chat-prototype.appspot.com",
  messagingSenderId: "261408069431",
  appId: "1:261408069431:web:a5a6d3db5d889311b22cb2",
  measurementId: "G-6CNYE1LRKP",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

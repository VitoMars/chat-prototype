import React, { useRef, useState } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import GoogleButton from "react-google-button";
import dayjs from "dayjs";
import "dayjs/locale/it";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

dayjs.locale("it");

firebase.initializeApp({
  apiKey: "AIzaSyATI6DPeSoZaLB4ey1q-Z3nLnMT8gJ5OPc",
  authDomain: "vitomars-chat-prototype.firebaseapp.com",
  projectId: "vitomars-chat-prototype",
  storageBucket: "vitomars-chat-prototype.appspot.com",
  messagingSenderId: "261408069431",
  appId: "1:261408069431:web:a5a6d3db5d889311b22cb2",
  measurementId: "G-6CNYE1LRKP",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="h-[10vh] rounded-b-3xl ">
        <h1>Prototipo Chat</h1>
        <SignOut />
      </header>

      <section
        // className={`bg-gradient-to-b from-[#131621] via-[#131621] to-red-600 ${
        className={` ${user ? "" : "flex items-center"}`}
      >
        {user ? <ChatRoom /> : <GoogleButton onClick={signInWithGoogle} />}
      </section>
    </div>
  );
}

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        className="text-lg px-6 py-2 rounded-2xl bg-gradient-to-r from-red-500 to-rose-500"
        onClick={() => auth.signOut()}
      >
        Disconnettiti
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, displayName, photoURL } = auth.currentUser;

    await messagesRef.add({
      name: displayName,
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      date: dayjs().format(),
      uid,
      photoURL,
    });

    setFormValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="h-[80vh]">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage} className="h-[10vh] p-2">
        <input
          className="text-base rounded-l-2xl w-9/12 px-3"
          value={formValue}
          placeholder="Invia un messaggio pazzo 🤪"
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button
          className="text-base rounded-r-2xl bg-sky-600 w-3/12 px-3"
          disabled={formValue ? false : true}
        >
          Invia 👉
        </button>
      </form>
    </>
  );
}

// Messaggio
function ChatMessage(props) {
  const { uid, name, text, photoURL, date } = props.message;

  const dayOfWeek = dayjs(date).format("dddd");
  const hour = dayjs(date).format("HH:mm");

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`text-white mt-1 ${messageClass}`}>{name}</div>
      <div className={`message mt-2  ${messageClass}`}>
        <img src={photoURL} alt="profilePhoto" />
        <p
          // bg-[#1F222C]
          className={` rounded-2xl
            ${
              messageClass === "sent"
                ? "rounded-br-none bg-gradient-to-r from-blue-600 to-sky-500"
                : "rounded-bl-none bg-gradient-to-r from-red-500 to-rose-500"
            }
              `}
        >
          <span className="text-lg">{text}</span>
        </p>
      </div>
      <p
        className={`text-xs text-gray-400 p-0 mt-1 capitalize ${messageClass}`}
      >
        {dayOfWeek} - {hour}
      </p>
    </>
  );
}

export default App;

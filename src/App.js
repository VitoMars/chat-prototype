import React, { useRef, useState } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import GoogleButton from "react-google-button";
import dayjs from "dayjs";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

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
      <header>
        <h1>Prototipo Chat</h1>
        <SignOut />
      </header>

      <section className={user ? "" : "flex items-center"}>
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
      <button className="text-lg px-3 py-2" onClick={() => auth.signOut()}>
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
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage} className="h-[8vh]">
        <input
          className="text-lg"
          value={formValue}
          placeholder="Invia un messaggio pazzo 🤪"
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button
          disabled={formValue ? false : true}
          className="text-lg bg-[#1da1f2] "
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

  const Data = dayjs(date).format("DD/MM/YYYY");
  const Ora = dayjs(date).format("HH:mm");

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`text-white mt-1 ${messageClass}`}>{name}</div>
      <div className={`message mt-2  ${messageClass}`}>
        <img src={photoURL} />
        <p>
          <span className="text-lg">{text}</span>
        </p>
      </div>
      <p className={`text-xs p-0 mt-1 ${messageClass}`}>
        Messaggio inviato il {Data} alle {Ora}
      </p>
    </>
  );
}

export default App;

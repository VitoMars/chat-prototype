// React
import React from "react";
import "./App.css";
// Firebase
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// DayJs
import dayjs from "dayjs";
import "dayjs/locale/it";
// Google Button
import GoogleButton from "react-google-button";

// SignIn
import AnonymousButton from "./components/Sign/AnonymousButton";
import SignInWithGoogle from "./components/Sign/SignInWithGoogle";

// SignOut
import SignOut from "./components/Sign/SignOut";

import ChatRoom from "./components/ChatRoom/ChatRoom";

function App() {
  dayjs.locale("it");
  const [user] = useAuthState(auth);

  return (
    <div className="App text-white ">
      <header className="h-[10vh] rounded-b-3xl">
        <h1>Prototipo Chat</h1>
        <SignOut />
      </header>

      <section className={`h-[90vh] ${user ? "" : "flex items-center"}`}>
        {user ? (
          <ChatRoom />
        ) : (
          <>
            <AnonymousButton className="mt-3" />
            <GoogleButton className="mt-3" onClick={SignInWithGoogle} />
          </>
        )}
      </section>
    </div>
  );
}

export default App;

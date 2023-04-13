import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { auth, firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { EmojiPicker } from "react-emoji-search";
import dayjs from "dayjs";
import "dayjs/locale/it";
import ChatMessage from "./ChatMessage/ChatMessage";

function ChatRoom() {
  dayjs.locale("it");
  const dummy = useRef();

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const [toggleEmoji, setToggleEmoji] = useState();

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
  };

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, toggleEmoji]);

  return (
    <>
      <main className="h-[80%]">
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        <div ref={dummy}></div>
      </main>
      {toggleEmoji && (
        <div className="h-[45%]">
          <EmojiPicker
            set="native"
            emojiSize={24}
            emojiSpacing={8}
            onEmojiClick={(emoji) => setFormValue(formValue + emoji)}
            styles={{
              backgroundColor: "#262626",
              indicatorColor: "#b04c2d",
              searchBackgroundColor: "#3A3A3A",
              searchFontColor: "lightgrey",
            }}
          />
        </div>
      )}
      <form onSubmit={sendMessage} className="h-[10%] p-2">
        <span
          className="flex items-center mr-3 cursor-pointer"
          onClick={() => setToggleEmoji(!toggleEmoji)}
        >
          🙂
        </span>

        <input
          className="text-base rounded-l-2xl w-9/12 px-3"
          value={formValue}
          placeholder="Invia un bellissimo messaggio 😃"
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

export default ChatRoom;

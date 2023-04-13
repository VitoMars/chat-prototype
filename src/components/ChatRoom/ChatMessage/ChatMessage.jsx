import React from "react";
import dayjs from "dayjs";
import { auth } from "../../../firebase";
import DefaultImage from "../../../img/DefaultImage.jpg";

function ChatMessage(props) {
  const { uid, text, photoURL, date } = props.message;

  const dayOfWeek = dayjs(date).format("dddd");
  const hour = dayjs(date).format("HH:mm");

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      {/* <div className={`text-white mt-1 ${messageClass}`}>{name}</div> */}
      <div className={`message mt-2  ${messageClass}`}>
        <img src={photoURL || DefaultImage} alt="profilePhoto" />
        <p
          className={` rounded-2xl max-w-lg
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

export default ChatMessage;

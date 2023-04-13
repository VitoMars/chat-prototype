import React from "react";
import firebase from "firebase/compat/app";
import DefaultImage from "../../img/DefaultImage.jpg";

function signInAnonymously() {
  firebase.auth().signInAnonymously();
}

function AnonymousButton() {
  return (
    <button
      className="h-[50px] w-[240px] flex items-center bg-gray-700 text-white"
      onClick={signInAnonymously}
    >
      <img src={DefaultImage} alt="anonimo" />
      <span className="px-2">Autenticazione Anonima</span>
    </button>
  );
}

export default AnonymousButton;

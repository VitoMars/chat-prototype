// SignOut

import React from "react";
import { auth } from "../../firebase";

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

export default SignOut;

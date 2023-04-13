import firebase from "firebase/compat/app";
import { auth } from "../../firebase";

function SignInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

export default SignInWithGoogle;

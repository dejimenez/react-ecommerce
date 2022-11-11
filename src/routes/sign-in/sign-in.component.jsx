import { useEffect } from "react";
import SignUp from "../../components/sign-up/sign-up.component";
import {
  //   auth,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  checkRedirectResult,
} from "../../utils/firebase/firebase.utils";
// import { getRedirectResult } from "firebase/auth";

export default function SignIn() {
  useEffect(() => {
    console.log("Check auth")
    checkRedirectResult();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    // console.log(user);
    createUserDocumentFromAuth(user);
  };

  const logGoogleRedirectUser = async () => {
    await signInWithGoogleRedirect();
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
      <button onClick={logGoogleRedirectUser}>
        Sign In with Google Redirect
      </button>
      <SignUp />
    </div>
  );
}

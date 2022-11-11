import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANXbEJyBpxiSvBjX2JNx2id_4_TjTCinw",
  authDomain: "react-ecommerce-5e58b.firebaseapp.com",
  projectId: "react-ecommerce-5e58b",
  storageBucket: "react-ecommerce-5e58b.appspot.com",
  messagingSenderId: "28979055833",
  appId: "1:28979055833:web:8efb31d52bc6e1fd7c02c8",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: Date.now(),
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userDocRef;
};

export const checkRedirectResult = async () => {
  const response = await getRedirectResult(auth);
  console.log("checkRedirectResult", auth, response);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return createUserWithEmailAndPassword(auth, email, password);
};

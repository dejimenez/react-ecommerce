import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";

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
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

const db = getFirestore();

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
  await getRedirectResult(auth);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  callback && onAuthStateChanged(auth, callback);

export const getCategoriesAndDocuments = async (objectsToAdd) => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    return {
      ...acc,
      [title.toLowerCase()]: items,
    };
  }, {});

  return categoryMap;
  // const batch = writeBatch(db);

  // objectsToAdd.forEach((object) => {
  //   const docRef = doc(collectionRef, object.title.toLowerCase());
  //   batch.set(docRef, object);
  // });

  // await batch.commit();
  // console.log("done");
};

// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//   objectsToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });

//   await batch.commit();
//   console.log("done");
// };

// useEffect(() => {
//   addCollectionAndDocuments("categories", SHOP_DATA);
// }, []);

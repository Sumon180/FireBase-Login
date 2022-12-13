// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfINbTwSIPXD-eOUlBylZAc3FFo5913tM",
  authDomain: "crud-img-47ed4.firebaseapp.com",
  projectId: "crud-img-47ed4",
  storageBucket: "crud-img-47ed4.appspot.com",
  messagingSenderId: "662688924590",
  appId: "1:662688924590:web:7fbbb476138c92ad31be3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

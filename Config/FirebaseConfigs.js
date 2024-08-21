// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getStorage }  from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClHoUaCriQYQpMQm545JKl1P6vFIUhdUU",
  authDomain: "reatnative-8aff6.firebaseapp.com",
  projectId: "reatnative-8aff6",
  storageBucket: "reatnative-8aff6.appspot.com",
  messagingSenderId: "802805777798",
  appId: "1:802805777798:web:461c6fac68c0bba7a25807",
  measurementId: "G-34FYBVF5YD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage=getStorage(app);
// const analytics = getAnalytics(app);
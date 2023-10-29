// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYeBQlCCSbVn4hb5ISrwfrX5yJ6UpEhxI",
  authDomain: "food-82113.firebaseapp.com",
  projectId: "food-82113",
  storageBucket: "food-82113.appspot.com",
  messagingSenderId: "193724455161",
  appId: "1:193724455161:web:46039a3b8c39e28719ea28",
  measurementId: "G-E6KLGQXWKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
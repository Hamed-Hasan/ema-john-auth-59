// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAobs_QoguZFiHVWRoni7Wego20QZ0gN40",
  authDomain: "ema-john-with-authentica-4e09c.firebaseapp.com",
  projectId: "ema-john-with-authentica-4e09c",
  storageBucket: "ema-john-with-authentica-4e09c.appspot.com",
  messagingSenderId: "157864701073",
  appId: "1:157864701073:web:effe5ddb1fc85b737ea330"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB34xmoJjuoRxxpP-UTEiIttFBwIYi5Zsc",
  authDomain: "busybuy-8b517.firebaseapp.com",
  projectId: "busybuy-8b517",
  storageBucket: "busybuy-8b517.appspot.com",
  messagingSenderId: "345785411524",
  appId: "1:345785411524:web:88e20a01c6a56ea7c3e691"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth"; // Import Auth
import { getFirestore } from "firebase/firestore"; // Import Firestore
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6chqlBDRqm5qpUFXlUi3owsJjuMKmEkY",
    authDomain: "todo-list-app-4a284.firebaseapp.com",
      projectId: "todo-list-app-4a284",
        storageBucket: "todo-list-app-4a284.firebasestorage.app",
          messagingSenderId: "468717982986",
            appId: "1:468717982986:web:05231c83396273637756f3",
              measurementId: "G-LL5H05L4L9"
              };

              // Initialize Firebase
              const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const db = getFirestore(app); // Get the Firestore instance

// Get a reference to the Auth service
const auth = getAuth(app); // Get the Auth instance

// Conditionally initialize Analytics on the client-side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { db, auth, analytics }; // Export db, auth, and analytics
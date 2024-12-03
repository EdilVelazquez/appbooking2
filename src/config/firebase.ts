import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG6jaJLKnI1kEgTA",
  authDomain: "booking-c4352.firebaseapp.com",
  projectId: "booking-c4352",
  storageBucket: "booking-c4352.firebasestorage.app",
  messagingSenderId: "468325967871",
  appId: "1:468325967871:web:90732ce0981cbafd3fe9ca",
  measurementId: "G-9FY46JFR0Z"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time.
    console.log('Persistence failed: Multiple tabs open');
  } else if (err.code === 'unimplemented') {
    // The current browser doesn't support persistence
    console.log('Persistence not supported by browser');
  }
});
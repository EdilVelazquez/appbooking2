import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG6jaJLKnI1evfYRBXKt63S9AXI1kEgTA",
  authDomain: "booking-c4352.firebaseapp.com",
  projectId: "booking-c4352",
  storageBucket: "booking-c4352.firebasestorage.app",
  messagingSenderId: "468325967871",
  appId: "1:468325967871:web:90732ce0981cbafd3fe9ca",
  measurementId: "G-9FY46JFR0Z"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
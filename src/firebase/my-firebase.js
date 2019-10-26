import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBq-8Mm1GwweDYlQhJCd8P4dOHxQPgcPmA",
  authDomain: "myworkboard.firebaseapp.com",
  databaseURL: "https://myworkboard.firebaseio.com",
  projectId: "myworkboard",
  storageBucket: "myworkboard.appspot.com",
  messagingSenderId: "744384942439",
  appId: "1:744384942439:web:e71298b5fae3a0575b9fc2",
  measurementId: "G-6X0YC9XE0W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


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
export const auth = firebase.auth();


export default firebase;


export const createUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    try {
      await userRef.set({
        email,
        ...additionalData
      });
    } catch (error) {
      console.error("Error Creating User:", error.message);
    }
  }
  return userRef;
};

export const convertCollectionSnapshotToMap = collectionSnapshot => {
  const convertedCollections = collectionSnapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id };
  });
  return convertedCollections;
};

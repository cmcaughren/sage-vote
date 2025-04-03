// firebase/firebaseConfig.js
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// Initialize Firebase if needed
if (!firebase.apps.length) {
  firebase.initializeApp({});
  console.log('Firebase initialized');
} else {
  console.log('Firebase already initialized');
}

// Get Firestore instance
const db = firestore();

export { db };
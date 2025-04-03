// firebase/firebaseConfig.js
import Constants from 'expo-constants';

// Determine if we're running in Expo Go or a native build
const isExpoGo = Constants.executionEnvironment === 'expo';
console.log(`Running in ${isExpoGo ? 'Expo Go' : 'Native'} environment`);

let db = null;
let webFirebase = null;
let nativeFirebase = null;

// Async initialization to handle dynamic imports
const initializeFirebase = async () => {
  try {
    if (isExpoGo) {
      // Web Firebase SDK for Expo Go
      console.log("Initializing Web Firebase SDK for Expo Go");
      import { initializeApp } from "firebase/app";
      import { getFirestore } from "firebase/firestore";

      const firebaseConfig = {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      };
      webFirebase = initializeApp(firebaseConfig);
      db = getFirestore(app);
      console.log("Web Firebase initialized successfully");
    } else {
      // React Native Firebase for production builds
      console.log("Initializing React Native Firebase for production build");
      nativeFirebase = await import('@react-native-firebase/app');
      const firestore = await import('@react-native-firebase/firestore');

      // Native Firebase initializes automatically from GoogleService-Info.plist
      db = firestore.default();
      console.log("React Native Firebase initialized successfully");
    }
    return true;
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    return false;
  }
};

// Initialize right away
initializeFirebase().catch(err => {
  console.error("Failed to initialize Firebase:", err);
});

// Export both the db and initialization function
export { db, initializeFirebase, isExpoGo };

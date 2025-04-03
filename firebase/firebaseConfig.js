import Constants from 'expo-constants';

// Determine if we're running in Expo Go or a native build
const isExpoGo = Constants.appOwnership === 'expo';
console.log(`Running in ${isExpoGo ? 'Expo Go' : 'Native'} environment`);

// Import both SDK types at the top level
// For web SDK (Expo Go)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For native SDK (production)
import firebaseNative from '@react-native-firebase/app';
import firestoreNative from '@react-native-firebase/firestore';

let db = null;

// Initializes the appropriate Firebase SDK
const initializeFirebase = async () => {
  try {
    if (isExpoGo) {
      // Web Firebase SDK for Expo Go
      console.log("Initializing Web Firebase SDK for Expo Go");

      const firebaseConfig = {
        apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      };

      const webApp = initializeApp(firebaseConfig);
      db = getFirestore(webApp);
      console.log("Web Firebase initialized successfully");
    } else {
      // React Native Firebase for production builds
      console.log("Initializing React Native Firebase for production build");

      // Native Firebase initializes automatically from GoogleService-Info.plist
      db = firestoreNative.default();
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


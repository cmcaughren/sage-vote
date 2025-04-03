// firebase/firebaseService.js - SIMPLIFIED VERSION
import { db, isExpoGo, initializeFirebase } from './firebaseConfig';

/**
 * Fetches cards of a specific transport type from Firestore
 * @param {string} transportType - The transport type to fetch ('any', 'bus', 'carpool', 'bicycle')
 * @returns {Array} Array of card objects
 */
export async function getCards(transportType) {
  try {
    console.log(`Fetching cards for transport type: ${transportType}`);

    // Ensure Firebase is initialized
    if (!db) {
      await initializeFirebase();
    }

    // Use the appropriate SDK based on environment
    if (isExpoGo) {
      // Web Firebase SDK (for Expo Go)
      const { collection, query, where, getDocs } = await import('firebase/firestore');

      const cardsCollection = collection(db, 'cards');
      const q = query(cardsCollection, where('transport_type', '==', transportType));
      const querySnapshot = await getDocs(q);

      const result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data()
        });
      });

      return result;
    } else {
      // React Native Firebase SDK (for production)
      const querySnapshot = await db.collection('cards')
        .where('transport_type', '==', transportType)
        .get();

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }
  } catch (error) {
    console.error(`Error fetching cards: ${error.message}`);
    return []; // Return empty array on error
  }
}

/**
 * Adds a new card to Firestore
 * @param {Object} cardData - The card data to add
 * @returns {string} The ID of the newly created card
 */
export async function addCard(cardData) {
  try {
    // Ensure Firebase is initialized
    if (!db) {
      await initializeFirebase();
    }

    if (isExpoGo) {
      // Web Firebase SDK (for Expo Go)
      const { collection, addDoc } = await import('firebase/firestore');
      const docRef = await addDoc(collection(db, 'cards'), cardData);
      return docRef.id;
    } else {
      // React Native Firebase SDK (for production)
      const docRef = await db.collection('cards').add(cardData);
      return docRef.id;
    }
  } catch (error) {
    console.error('Error adding card:', error);
    throw error;
  }
}
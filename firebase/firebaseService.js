// firebase/firebaseService.js
import { db } from './firebaseConfig';

/**
 * Fetches cards of a specific transport type from Firestore
 */
export async function getCards(transportType) {
  try {
    console.log(`Fetching cards for type: ${transportType}`);

    const snapshot = await db
      .collection('cards')
      .where('transport_type', '==', transportType)
      .get();

    console.log(`Found ${snapshot.docs.length} cards`);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching cards:`, error);
    console.error(error);
    return [];
  }
}

/**
 * Simple function to test if Firebase connection works
 */
export async function testFirebaseConnection() {
  try {
    console.log('Testing Firebase connection...');
    const snapshot = await db.collection('cards').limit(1).get();
    console.log(`Connection test succeeded. Found ${snapshot.docs.length} documents`);
    return {
      success: true,
      count: snapshot.docs.length
    };
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Adds a new card to Firestore
 */
export async function addCard(cardData) {
  try {
    const docRef = await db.collection('cards').add(cardData);
    console.log(`Card added with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error('Error adding card:', error);
    throw error;
  }
}
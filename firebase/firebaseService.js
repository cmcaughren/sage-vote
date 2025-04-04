// firebase/firebaseService.js
import { db } from './firebaseConfig';

/**
 * Fetches cards of a specific transport type from Firestore
 * @param {string} transportType - The transport type to fetch ('any', 'bus', 'carpool', 'bicycle')
 * @returns {Array} Array of card objects
 */
export async function getCards(transportType) {
  try {
    const snapshot = await db
      .collection('cards')
      .where('transport_type', '==', transportType)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(`Error fetching cards:`, error);
    return [];
  }
}

/**
 * Adds a new card to Firestore
 * @param {Object} cardData - The card data to add
 * @returns {string} The ID of the newly created card
 */
export async function addCard(cardData) {
  try {
    const docRef = await db.collection('cards').add(cardData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding card:', error);
    throw error;
  }
}
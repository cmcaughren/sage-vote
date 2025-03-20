import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Function to add a sample card to Firestore
export async function addCard(card) {
  try {
    const docRef = await addDoc(collection(db, "cards"), card);
    console.log("Card added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding card:", error);
  }
}

// Function to get all cards or filtered by transport type
export async function getCards(transportType = null) {
  try {
    let cardsQuery;
    
    if (transportType) {
      // Get cards specific to this transport type or "any"
      cardsQuery = query(
        collection(db, "cards"), 
        where("transport_type", "in", [transportType, "any"])
      );
    } else {
      // Get all cards
      cardsQuery = collection(db, "cards");
    }
    
    const querySnapshot = await getDocs(cardsQuery);
    const cards = [];
    
    querySnapshot.forEach((doc) => {
      cards.push({ id: doc.id, ...doc.data() });
    });
    
    return cards;
  } catch (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
}


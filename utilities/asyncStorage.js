import AsyncStorage from "@react-native-async-storage/async-storage";

// Save game progress
export async function saveGameProgress(data) {
  try {
    await AsyncStorage.setItem("gameProgress", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving game progress:", error);
  }
}

// Load game progress
export async function loadGameProgress() {
  try {
    const data = await AsyncStorage.getItem("gameProgress");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading game progress:", error);
    return null;
  }
}

// Save a notebook entry
export async function saveNotebookEntry(entry) {
  try {
    // First get existing notebook entries
    const notebookData = await AsyncStorage.getItem("notebook");
    const notebook = notebookData ? JSON.parse(notebookData) : [];
    
    // Check if the URL already exists to avoid duplicates
    const exists = notebook.some(item => item.url === entry.url);
    
    if (!exists) {
      // Add new entry with timestamp
      notebook.push({
        ...entry,
        timestamp: new Date().toISOString()
      });
      
      // Save updated notebook
      await AsyncStorage.setItem("notebook", JSON.stringify(notebook));
      return true; // Successfully added
    }
    
    return false; // Already exists
  } catch (error) {
    console.error("Error saving notebook entry:", error);
    return false;
  }
}

// Get all notebook entries
export async function getNotebookEntries() {
  try {
    const notebookData = await AsyncStorage.getItem("notebook");
    return notebookData ? JSON.parse(notebookData) : [];
  } catch (error) {
    console.error("Error getting notebook entries:", error);
    return [];
  }
}

// Clear all notebook entries
export async function clearNotebook() {
  try {
    await AsyncStorage.removeItem("notebook");
    return true;
  } catch (error) {
    console.error("Error clearing notebook:", error);
    return false;
  }
}
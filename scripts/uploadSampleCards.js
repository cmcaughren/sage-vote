// Create a new file: scripts/uploadSampleCards.js
import { addCard } from '../firebase/firebaseService';

const sampleCards = [
  {
    id: 1,
    transport_type: "any",
    election_type: "federal",
    url: "https://www.elections.ca/content.aspx?section=vot&dir=faq&document=faqvot&lang=e",
    description: "An exchange student from Germany tells you about the PR electoral system in his country, and asks about the Canadian system.",
    opt_actions: {
      "1,2,3": ["2", "You start by explaining the federal election process and the SMP system that is not representative of the votes of the citizens. Move forward 2 spaces."],
      "4,5,6": ["-2", "You have no clue, so you tell him that the Prime Minister has the best hair in town! Move back 2 spaces."]
    }
  },
  {
    id: 2,
    transport_type: "bus",
    election_type: "federal",
    url: "https://www.elections.ca/content.aspx?section=pol&dir=can&document=index&lang=e",
    description: "The person next to you on the bus asks whether you've ever considered running for office yourself.",
    opt_actions: {
      "1": ["1", "You explain that there are specific requirements and processes to become a candidate. Move forward 1 space."]
    }
  },
  {
    id: 3,
    transport_type: "bicycle",
    election_type: "federal",
    url: "https://www.ourcommons.ca/en/open-data",
    description: "You see a campaign sign for a local candidate that says 'Vote for Lower Carbon Emissions'.",
    opt_actions: {
      "1,2,3,4": ["crossroads", "You get distracted thinking about climate policy and take a wrong turn. Return to the crossroads."],
      "5,6": ["3", "You take a shortcut through the park while thinking about environmental policies. Move forward 3 spaces."]
    }
  }
];

// Function to upload all sample cards
const uploadSampleCards = async () => {
  console.log("Uploading sample cards...");
  
  for (const card of sampleCards) {
    await addCard(card);
    console.log(`Card ${card.id} uploaded`);
  }
  
  console.log("All cards uploaded successfully!");
};

// Run the function
uploadSampleCards();
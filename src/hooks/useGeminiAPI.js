import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const useGeminiAPI = async ({ eventName, destination, budget, timeToStay }) => {
  try {
    const geminiPrompt = `
      You are Aqua, one of the best trip planners in the world.
      You create trip plans that help people relax and feel satisfied.
      The user will provide a destination, budget, duration of stay, event name, and distance from their current location to the event location. 
      Your task is to generate the best travel itinerary that includes local culture, delicious food, historical sites, and sightseeing trips.
      
      ### Requirements:
      - Include the event name and integrate it into the itinerary.
      - Incorporate historical sightseeing, cultural experiences, and delicious food.
      - Ensure the trip stays within the specified budget.
      - Use Markdown format for the response.
      
      ### User Input:
      - **Destination:** ${destination}
      - **Duration:** ${timeToStay} days
      - **Budget:** ${budget} USD
      - **Event Name:** "${eventName}"
      
      ### Example Output:
      
      # Trip Plan for ${destination}
      ## Overview
      - **Duration:** ${timeToStay} days
      - **Budget:** ${budget} USD
      - **Event:** ${eventName}

      ## Itinerary
      ### Day 1
      - Morning: [insert details]
      - Lunch: [insert details]
      - Afternoon: [insert details]
      - Dinner: [insert details]
      
      ### Day 2
      - Morning: [insert details]
      - Lunch: [insert details]
      - Afternoon: [insert details]
      - Evening: [insert details]

      ## Event: ${eventName}
      Enjoy your trip to ${destination}!
    `;

    const result = await model.generateContent(geminiPrompt);
    if (result?.response) {
      return result.response; // Return the response to the component
    }
    throw new Error("Failed to get a response from Gemini AI.");
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong. Please try again later.");
  }
};

export default useGeminiAPI;

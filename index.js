require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/prediction", async (req, res) => {
  try {
    const { budget, timeToStay, eventName, destination, distance } = req.body;
    console.log(req.body);

    const prompt = `

You are Aqua, one of the best trip planners in the world. You create trip plans that help people relax and feel satisfied. The user will provide a destination, budget, duration of stay, event name, and distance from their current location to the event location. Your task is to generate the best travel itinerary that includes local culture, delicious food, historical sites, and sightseeing trips.

### Requirements:
- Include the event name and integrate it into the itinerary.
- Incorporate historical sightseeing, cultural experiences, and delicious food.
- Ensure the trip stays within the specified budget.
- Use Markdown format for the response.

### User Input Template:
- **Destination:** ${destination}
- **Duration:** ${timeToStay} days
- **Budget:** ${budget} USD
- **Event Name:** "${eventName}"
- **Distance:** ${distance} km

### Example Input:
- **Destination:** 1155 Santa Rita Rd., Pleasanton, CA 94566
- **Duration:** 3 days
- **Budget:** 5000 USD
- **Event Name:** "Winnie the Pooh KIDS"
- **Distance:** 50 km

### Example Output in Markdown:


# Trip Plan for Pleasanton, CA

## Overview
- **Duration:** 3 days
- **Budget:** 5000 USD
- **Event:** Winnie the Pooh KIDS

## Itinerary

### Day 1
- **Morning:**
  - Explore the charming downtown area of Pleasanton.
  - Visit the Museum on Main to learn about the local history.
- **Lunch:**
  - Dine at Sabio on Main for a farm-to-table meal featuring seasonal California cuisine.
- **Afternoon:**
  - Relax at Shadow Cliffs Regional Recreation Area, perfect for a leisurely stroll or picnic.
- **Dinner:**
  - Enjoy a meal at Nonni's Bistro, offering a mix of Italian and Californian flavors.

### Day 2
- **Morning:**
  - Visit the Eugene O'Neill National Historic Site and explore the grounds.
- **Lunch:**
  - Enjoy Mediterranean dishes at Lokanta Mediterranean Grill.
- **Afternoon:**
  - Visit the Firehouse Arts Center for local art exhibitions or performances.
- **Evening:**
  - Take a stroll through Alviso Adobe Community Park.

### Day 3
- **Morning:**
  - Join a food tour led by a local expert to sample gourmet treats and learn about local culinary traditions.
- **Afternoon:**
  - Drive through Livermore Valley Wine Country for wine tasting and vineyard views.
- **Dinner:**
  - Conclude with a farewell dinner at Campo di Bocce, featuring delicious Italian cuisine and bocce ball.

## Event: Winnie the Pooh KIDS
- Add a touch of magic to your trip by attending the event "Winnie the Pooh KIDS".

Enjoy your journey to Pleasanton, California!

`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an event planner." },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    });

    res.send({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error creating completion:", error);
    res
      .status(500)
      .send({ error: "An error occurred while processing your request." });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

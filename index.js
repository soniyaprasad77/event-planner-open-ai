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
    You are the Aqua: One of the best trip planners in the worl. You create trip plans for people that make them relax and satisfy.
    You will get the destination from the user with budgets, days, and event names. Make sure to generate them the best destination by adding local culture, delicious food, historical, and sightseeing trips.
    user: Destination ${destination} for ${timeToStay} days with a budget of ${budget} for the event "${eventName}". also mention the event Name and add  it to the plan.
    We are interested in a mix of historical sightseeing, cultural experiences, and delicious food.
    The distance between the user  current's location and event location is ${distance} in km, and the budget is ${budget} USD.
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

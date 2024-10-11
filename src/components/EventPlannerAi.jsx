import React, { useState } from "react";
import EventCoverCard from "./EventCoverCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import ReactMarkdown from "react-markdown";
import useGeminiAPI from "../hooks/useGeminiAPI";
import { useParams } from "react-router-dom";

const EventPlannerAi = ({ props }) => {
  const { eventId } = useParams();
  const [budget, setBudget] = useState("5000");
  const [timeToStay, setTimeToStay] = useState("2");
  const [generatedAnswer, setGeneratedAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const eventDetails = props[eventId - 1]; // Get event details based on eventId
  const { name: eventName, address: destination, website, description, host } = eventDetails;
  console.log(name);
  console.log(destination);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneratedAnswer(""); // Reset previous answer
    setLoading(true); // Start loading state
    setError(""); // Reset error state

    try {
      // Call useGeminiAPI with the required parameters
      const response = await useGeminiAPI({ eventName, destination, budget, timeToStay });

      // Extract the generated content from the API response
      const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

      setGeneratedAnswer(generatedText); // Set the generated response
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };


  return (
    <>
      <EventCoverCard events={props} eventId={eventId} />
      <div className="w-full p-2 sm:my-6 sm:px-16">
        <div className="flex flex-col gap-2 border-sp p-2">
          <h1 className="text-xl">ABOUT THE EVENT</h1>
          <div className="flex justify-between">
            <div className="text-xs text-gray-900">{eventName}</div>
            <div className="text-xs text-gray-600">{destination}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-xs text-gray-600 flex flex-between">{host}</div>
            <a href="#map" className="text-xs text-gray-900">
              View on Map <LocationOnIcon />
            </a>
          </div>
          <div className="flex justify-between">
            <a href={website} target="_blank" className="text-xs text-gray-900 hover:text-gray-600">
              <LinkIcon /> {website}
            </a>
          </div>
          <div className="text-[0.65rem] text-gray-900">{description}</div>
        </div>

        <div id="generate-plan">
          <div className="block sm:flex justify-between mt-2 p-2 gap-2">
            <div className="flex flex-col border border-gray-300 shadow-md rounded-lg p-2 mb-2">
              <h2 className="text-xl mt-0 mb-1">GENERATE PLAN</h2>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <label className="whitespace-nowrap text-gray-600">Budget[$]:</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter your budget"
                    className="flex-grow border p-1 rounded-lg"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="whitespace-nowrap text-gray-600">Stay Time:</label>
                  <input
                    type="text"
                    value={timeToStay}
                    onChange={(e) => setTimeToStay(e.target.value)}
                    placeholder="Enter time to stay in days"
                    className="flex-grow border p-1 rounded-md"
                  />
                </div>
                <button type="submit" className="secondary-button h-10 mx-auto sm:mx-0">
                  Generate Plan
                </button>
              </form>
            </div>

            <div className="border border-gray-300 w-full shadow-md rounded-lg p-4">
              {!loading && !generatedAnswer && (
                <h2 className="text-2xl flex justify-center items-center">
                  Your personalized plan will appear here
                </h2>
              )}
              {loading && <p className="text-center mt-4">Loading...</p>}
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
              {generatedAnswer && (
                <div className="bg-gray-50 rounded-md p-4 shadow-md mt-4 text-sm">
                  <ReactMarkdown>
                    {generatedAnswer}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPlannerAi;

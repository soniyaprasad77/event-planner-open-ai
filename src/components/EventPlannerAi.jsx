import axios from "axios";
import EventCoverCard from "./EventCoverCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import ReactMarkdown from "react-markdown";
import React, { useState } from "react";
import { Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";

const EventPlannerAi = ({ props }) => {
  const { eventId } = useParams();
  const [budget, setBudget] = useState("5000");
  const [timeToStay, setTimeToStay] = useState("2");
  const [generatedAnswer, setGeneratedAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const eventName = props[eventId - 1].name;
  const destination = props[eventId - 1].address;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneratedAnswer("");
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/prediction", {
        budget,
        timeToStay,
        eventName,
        destination,
      });
      setGeneratedAnswer(response.data.response);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <EventCoverCard events={props} eventId={eventId} />
      <div>
        <div className="w-full p-2 sm:my-6 sm:px-16">
          <div className=" flex flex-col gap-2 border-sp  p-2">
            <h1 className="text-xl">ABOUT THE EVENT</h1>
            <div className="flex justify-between">
              <div className="text-xs text-gray-900">
                {props[eventId - 1].name}
              </div>
              <div className="text-xs text-gray-600">
                {props[eventId - 1].address}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xs text-gray-600 flex flex-between">
                {props[eventId - 1].host}
              </div>
              <a href="#map" className="text-xs text-gray-900">
                View on Map <LocationOnIcon />
              </a>
            </div>
            <div className="flex justify-between">
              <a
                href={props[eventId - 1].website}
                target="_blank"
                className="text-xs text-gray-900 hover:text-gray-600 text-extrabold"
              >
                <LinkIcon /> {props[eventId - 1].website}
              </a>
            </div>
            <div className="text-[0.65rem] text-gray-900">
              {props[eventId - 1].description}
            </div>
          </div>
          <div id="generate-plan">
            <div className=" block sm:flex justify-between  mt-2 p-2 gap-2 ">
              <div className="flex flex-col border border-gray-300 shadow-md rounded-lg p-2 mb-2">
                <h2 className="text-xl mt-0 mb-1">GENERATE PLAN</h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="whitespace-nowrap text-gray-600">
                      Budget[$]:
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="Enter your budget"
                      className="flex-grow border p-1 rounded-lg "
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="whitespace-nowrap text-gray-600">
                      Stay Time :
                    </label>
                    <input
                      type="text"
                      value={timeToStay}
                      onChange={(e) => setTimeToStay(e.target.value)}
                      placeholder="Enter time to stay in days"
                      className="flex-grow border p-1 rounded-md"
                    />
                  </div>
                  <button
                    type="submit"
                    className="secondary-button h-10 mx-auto sm:mx-0"
                  >
                    Generate Plan
                  </button>
                  {generatedAnswer && (
                    <div className=" flex justify-center">
                      <div className="text-container text-center ">
                        <h2 className="animated-text ">Enjoy </h2>
                        <h2 className="animated-text">Your</h2>
                        <h2 className="animated-text">Event</h2>
                        <h2 className="animated-text">🎉</h2>
                        <h2 className="animated-text"> best wishes✨</h2>
                      </div>
                    </div>
                  )}
                </form>
              </div>
              <div className="border border-gray-300 w-full shadow-md rounded-lg">
                {!loading && !generatedAnswer && (
                  <>
                    <h2 className=" text-2xl flex justify-center items-center">
                      Your personalized plan will appear here
                    </h2>
                  </>
                )}
                {loading && <p className="text-center mt-4 ">Loading...</p>}
                {error && (
                  <p className="text-red-500 text-center mt-4">{error}</p>
                )}
                {/* Render the generated answer with proper formatting */}
                {generatedAnswer && (
                  <div className="bg-gray-50 rounded-md p-4 shadow-md mt-4 text-sm">
                    <ReactMarkdown>{generatedAnswer}</ReactMarkdown>
                  </div>
                )}
                <div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPlannerAi;

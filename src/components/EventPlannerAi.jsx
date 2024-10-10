import { useParams } from "react-router-dom";
import axios from "axios";
import EventCoverCard from "./EventCoverCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import ReactMarkdown from "react-markdown";
import React, { useState, useCallback, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Skeleton } from "@mui/material";

const EventPlannerAi = ({ props }) => {
  const { eventId } = useParams();
  const [budget, setBudget] = useState("5000");
  const [timeToStay, setTimeToStay] = useState("2");
  const [generatedAnswer, setGeneratedAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const eventName = props[eventId - 1].name;
  const destination = props[eventId - 1].address;
  const [eventLocation, setEventLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [zoom, setZoom] = useState(15);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const geocodeAddress = useCallback(async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setEventLocation(location);
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          data.status
        );
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  }, []);

  useEffect(() => {
    if (props[eventId - 1] && props[eventId - 1].address) {
      geocodeAddress(props[eventId - 1].address);
    }
  }, [props, eventId, geocodeAddress]);

  const gotLocation = useCallback((position) => {
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }, []);

  const errorLocation = useCallback((error) => {
    console.log("Error getting location:", error);
  }, []);

  const handleGetLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(gotLocation, errorLocation, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [gotLocation, errorLocation]);

  useEffect(() => {
    handleGetLocation();
  }, [handleGetLocation]);

  useEffect(() => {
    if (userLocation && eventLocation && window.google && window.google.maps) {
      // Calculate distance between two points using Haversine formula
      const R = 6371; // Radius of the Earth in kilometers
      const lat1 = userLocation.lat;
      const lon1 = userLocation.lng;
      const lat2 = eventLocation.lat;
      const lon2 = eventLocation.lng;

      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      // Set distance state
      setDistance(distance);

      // Calculate bounds to fit both markers
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(userLocation.lat, userLocation.lng)
      );
      bounds.extend(
        new window.google.maps.LatLng(eventLocation.lat, eventLocation.lng)
      );

      // Set zoom level
      const mapWidth = 100;
      const mapHeight = 200;
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      const zoomLevel = getZoomLevel(
        ne.lat(),
        sw.lat(),
        ne.lng(),
        sw.lng(),
        mapWidth,
        mapHeight
      );
      setZoom(zoomLevel);
    }
  }, [userLocation, eventLocation]);

  const getZoomLevel = (lat1, lat2, lng1, lng2, mapWidth, mapHeight) => {
    const GLOBE_WIDTH = 256; // a constant in Google's map projection
    const angle = lng2 - lng1;
    const zoomX = Math.floor(Math.log2((GLOBE_WIDTH * 360) / angle / mapWidth));
    const zoomY = Math.floor(
      Math.log2((GLOBE_WIDTH * 180) / (lat1 - lat2) / mapHeight)
    );
    return Math.min(zoomX, zoomY);
  };

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
        distance,
      });
      setGeneratedAnswer(response.data.response);
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !eventLocation) {
    return (
      <div className="py-2 px">
        <div className="w-full relative p-2 sm:my-6 sm:px-16">
          <Skeleton variant="rectangular" width="100%" height={600} />
        </div>
      </div>
    );
  }

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
            <div className="flex justify-between ">
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
          <div className="p-2 mt-2">
            <h1 className="text-lg">Event Details</h1>
            <div className="grid grid-cols-3 mt-2 gap-8">
              <div className="col-1">
                <div className="">
                  <h3 className="text-sm flex py-4">Event Type</h3>
                  {props[eventId - 1].event_type.map((type) => (
                    <div
                      key={type}
                      className="flex flex-cols mb-4  "
                    >
                      <div className="text-[0.5rem] backdrop-blur-md bg-slate-300 rounded-md p-1">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-1">
                <div className="">
                  <h3 className="text-sm py-4">Audience</h3>
                  {props[eventId - 1].audience.map((type) => (
                    <div
                      key={type}
                      className="flex flex-cols mb-4  "
                    >
                      <div className="text-[0.5rem] backdrop-blur-md bg-slate-300 rounded-md p-1">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-1">
                <div className="">
                  <h3 className="text-sm py-4">Topic</h3>
                  {props[eventId - 1].topic.map((type) => (
                    <div
                      key={type}
                      className="flex flex-cols mb-4"
                    >
                      <div className="text-[0.5rem] backdrop-blur-md bg-slate-300 rounded-md p-1">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                    <h2 className=" text-2xl flex justify-center items-center">Your personalized plan will appear here</h2>


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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 px">
        <div className="w-full relative p-2 sm:my-6 sm:px-16">
          <h1 className="text-xl">LOCATION</h1>
          <div className="block sm:flex justify-between">
            {/* <button
            className="secondary-button h-10 mx-auto sm:mx-0 my-4 bg-slate-300 text-gray-900 hover:bg-gray-500"
        
          >
            Get your Location
          </button> */}
            <div>
              {distance && (
                <p className="h-10 mx-auto sm:mx-0 my-4  text-gray-900 hover:bg-gray-500">
                  Distance between you and the event: {distance.toFixed(2)} km
                </p>
              )}
            </div>
          </div>

          <div id="map" className="h-300 sm:h-600">
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: 600,
              }}
              center={eventLocation}
              zoom={zoom}
              options={{
                zoomControl: false,
                fullscreenControl: false,
              }}
            >
              {userLocation && (
                <Marker
                  key="user-location"
                  position={userLocation}
                  onClick={() => setInfoWindowOpen(true)}
                >
                  {infoWindowOpen && (
                    <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
                      <div>Your Location</div>
                    </InfoWindow>
                  )}
                </Marker>
              )}
              {eventLocation && (
                <Marker
                  key="event-location"
                  position={eventLocation}
                  onMouseOver={() => setInfoWindowOpen(true)}
                >
                  {infoWindowOpen && (
                    <InfoWindow onMouseOver={() => setInfoWindowOpen(false)}>
                      <div>Event Location</div>
                    </InfoWindow>
                  )}
                </Marker>
              )}
            </GoogleMap>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPlannerAi;

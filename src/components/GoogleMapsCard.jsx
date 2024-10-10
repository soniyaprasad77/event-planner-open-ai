// import React, { useState, useEffect } from "react";
// import { Skeleton } from "@mui/material";
// import {
//   useJsApiLoader,
//   GoogleMap,
//   Marker,
//   InfoWindow,
//   Polyline,
// } from "@react-google-maps/api";

// const GoogleMapsCard = ({ events, eventId }) => {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   });

//   const [eventLocation, setEventLocation] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [flightRoute, setFlightRoute] = useState([]);
//   const [zoom, setZoom] = useState(15);
//   const [infoWindowOpen, setInfoWindowOpen] = useState(false);

//   useEffect(() => {
//     if (events[eventId - 1] && events[eventId - 1].address) {
//       geocodeAddress(events[eventId - 1].address);
//     }
//   }, [events, eventId]);

//   useEffect(() => {
//     if (userLocation && eventLocation) {
//       // Generate flight route based on user and event locations
//       const route = generateFlightRoute(userLocation, eventLocation);
//       setFlightRoute(route);

//       // Calculate bounds to fit both markers and flight route
//       const bounds = new window.google.maps.LatLngBounds();
//       bounds.extend(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));
//       bounds.extend(new window.google.maps.LatLng(eventLocation.lat, eventLocation.lng));
//       route.forEach((point) =>
//         bounds.extend(new window.google.maps.LatLng(point.lat, point.lng))
//       );

//       // Set zoom level
//       const mapWidth = 100;
//       const mapHeight = 200;
//       const ne = bounds.getNorthEast();
//       const sw = bounds.getSouthWest();
//       const zoomLevel = getZoomLevel(ne.lat(), sw.lat(), ne.lng(), sw.lng(), mapWidth, mapHeight);
//       setZoom(zoomLevel);
//     }
//   }, [userLocation, eventLocation]);

//   const generateFlightRoute = (start, end) => {
//     // Calculate intermediary points between start and end coordinates
//     // Here, you can use any algorithm or library to generate waypoints
//     // This is a simple example for demonstration purposes
//     const numWaypoints = 10;
//     const route = [];
//     for (let i = 0; i <= numWaypoints; i++) {
//       const lat = start.lat + (end.lat - start.lat) * (i / numWaypoints);
//       const lng = start.lng + (end.lng - start.lng) * (i / numWaypoints);
//       route.push({ lat, lng });
//     }
//     return route;
//   };

//   const geocodeAddress = async (address) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
//           address
//         )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
//       );
//       const data = await response.json();
//       if (data.status === "OK") {
//         const location = data.results[0].geometry.location;
//         setEventLocation(location);
//       } else {
//         console.error(
//           "Geocode was not successful for the following reason:",
//           data.status
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching geocode:", error);
//     }
//   };

//   const getZoomLevel = (lat1, lat2, lng1, lng2, mapWidth, mapHeight) => {
//     const GLOBE_WIDTH = 256; // a constant in Google's map projection
//     const angle = lng2 - lng1;
//     const zoomX = Math.floor(Math.log2((GLOBE_WIDTH * 360) / angle / mapWidth));
//     const zoomY = Math.floor(Math.log2((GLOBE_WIDTH * 180) / (lat1 - lat2) / mapHeight));
//     return Math.min(zoomX, zoomY);
//   };

//   if (!isLoaded || !eventLocation || !userLocation || flightRoute.length === 0) {
//     return (
//       <div className="py-2 px">
//         <div className="w-full relative p-2 sm:my-6 sm:px-16">
//           <Skeleton variant="rectangular" width="100%" height={600} />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-2 px">
//       <div className="w-full relative p-2 sm:my-6 sm:px-16">
//         <div id="map" className="h-300 sm:h-600">
//           <GoogleMap
//             mapContainerStyle={{
//               width: "100%",
//               height: 600,
//             }}
//             center={eventLocation}
//             zoom={zoom}
//             options={{
//               zoomControl: false,
//               fullscreenControl: false,
//             }}
//           >
//             <Marker
//               position={userLocation}
//               onClick={() => setInfoWindowOpen(true)}
//             >
//               {infoWindowOpen && (
//                 <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
//                   <div>Your Location</div>
//                 </InfoWindow>
//               )}
//             </Marker>
//             <Marker
//               position={eventLocation}
//               onMouseOver={() => setInfoWindowOpen(true)}
//             >
//               {infoWindowOpen && (
//                 <InfoWindow onMouseOver={() => setInfoWindowOpen(false)}>
//                   <div>Event Location</div>
//                 </InfoWindow>
//               )}
//             </Marker>
//             <Polyline
//               path={flightRoute}
//               options={{
//                 strokeColor: "#FF0000",
//                 strokeOpacity: 1,
//                 strokeWeight: 3,
//               }}
//             />
//           </GoogleMap>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoogleMapsCard;

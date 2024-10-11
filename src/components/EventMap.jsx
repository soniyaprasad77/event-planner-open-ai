// import React, { useEffect, useState, useCallback } from "react";
// import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

// const EventMap = ({ eventLocation, userLocation }) => {
//   const [infoWindowOpen, setInfoWindowOpen] = useState(false);
//   const [zoom, setZoom] = useState(15);
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//   });

//   useEffect(() => {
//     if (userLocation && eventLocation && window.google && window.google.maps) {
//       // Calculate bounds to fit both markers
//       const bounds = new window.google.maps.LatLngBounds();
//       bounds.extend(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));
//       bounds.extend(new window.google.maps.LatLng(eventLocation.lat, eventLocation.lng));
//       setZoom(15); // Set a suitable zoom level based on the locations
//     }
//   }, [userLocation, eventLocation]);

//   if (!isLoaded || !eventLocation) {
//     return <div>Loading Map...</div>;
//   }

//   return (
//     <GoogleMap
//       mapContainerStyle={{
//         width: "100%",
//         height: 600,
//       }}
//       center={eventLocation}
//       zoom={zoom}
//       options={{
//         zoomControl: false,
//         fullscreenControl: false,
//       }}
//     >
//       {userLocation && (
//         <Marker key="user-location" position={userLocation} onClick={() => setInfoWindowOpen(true)}>
//           {infoWindowOpen && (
//             <InfoWindow onCloseClick={() => setInfoWindowOpen(false)}>
//               <div>Your Location</div>
//             </InfoWindow>
//           )}
//         </Marker>
//       )}
//       {eventLocation && (
//         <Marker
//           key="event-location"
//           position={eventLocation}
//           onMouseOver={() => setInfoWindowOpen(true)}
//         >
//           {infoWindowOpen && (
//             <InfoWindow onMouseOver={() => setInfoWindowOpen(false)}>
//               <div>Event Location</div>
//             </InfoWindow>
//           )}
//         </Marker>
//       )}
//     </GoogleMap>
//   );
// };

// export default EventMap;

import React, { useEffect, useRef } from 'react';
import './MapSection.css';
import data from '../data';  // Import the data from your file
import logo from '../../assets/coro.png'

const MapSection = () => {
  const mapRef = useRef(null);  // Reference to the DOM element for the map
  const mapInstance = useRef(null);  // To store the map instance and prevent multiple initializations

  useEffect(() => {
    // Ensure the data is available
    if (typeof data !== 'undefined' && data) {
      const initializeMap = () => {
        if (!mapRef.current || mapInstance.current) return;  // Prevent multiple initializations

        try {
          // Initialize the platform object
          const platform = new window.H.service.Platform({
            apikey: process.env.REACT_APP_API_KEY,  // Your API key from the .env file
          });

          const maptypes = platform.createDefaultLayers();
          
          // Create a map centered at a default location
          const map = new window.H.Map(
            mapRef.current,
            maptypes.vector.normal.map,
            {
              zoom: 2,
              center: { lat: 20, lng: 0 },  // Set initial zoom level and center
            }
          );

          // Add interaction (Zoom, Pan) and map events
          const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

          // Create a custom UI for the map
          const ui = new window.H.ui.UI.createDefault(map, maptypes);

          // Customization to remove the "Choose View" button
          ui.getControl('mapsettings').setVisibility(false);

          // Add markers for the data
          data.forEach(location => {
            const { latitude, longitude, name, country, infected, dead, recovered, sick, lastUpdated } = location;

            // Info content for each marker
            const contentString = `
              <div style="width: max-content; max-width:300px;">
                <h3>${name}, ${country}</h3>
                <ul style="list-style-type: none; padding: 0;">
                  <li><strong>Infected:</strong> ${infected}</li>
                  <li><strong>Deaths:</strong> ${dead}</li>
                  <li><strong>Recovered:</strong> ${recovered}</li>
                  <li><strong>Sick:</strong> ${sick}</li>
                  <li><em>Last Updated:</em> ${new Date(lastUpdated).toLocaleString()}</li>
                </ul>
              </div>
            `;

            // Create a custom icon (replace with your image URL)
            const customIcon = new window.H.map.Icon(logo, { size: { w: 40, h: 40 } });

            // Create a marker for each location with the custom icon
            const markerPosition = { lat: latitude, lng: longitude };
            const marker = new window.H.map.Marker(markerPosition, { icon: customIcon });

            // Set data on the marker to store the contentString and position
            marker.setData({ position: markerPosition, content: contentString });

            // Add the marker to the map
            map.addObject(marker);

            // Show the custom content when the marker is clicked
            marker.addEventListener('tap', function (event) {
              const targetMarker = event.target;
              if (targetMarker instanceof window.H.map.Marker) {
                const data = targetMarker.getData();
                const position = data.position;

                if (position) {
                  // Create and display an InfoBubble at the marker's position with custom content
                  const bubble = new window.H.ui.InfoBubble(position, {
                    content: data.content
                  });
                  ui.addBubble(bubble);  // Add the bubble to the UI
                } else {
                  console.error('Position data is missing.');
                }
              } else {
                console.error('Event target is not a valid marker.');
              }
            });
          });

          // Store the map instance to prevent reinitialization
          mapInstance.current = { map, behavior, ui };

          // Handle resizing the map when the window is resized
          window.addEventListener('resize', () => map.getViewPort().resize());
        } catch (error) {
          console.error('Error initializing the map:', error);
        }
      };

      initializeMap();

      // Cleanup on component unmount
      return () => {
        if (mapInstance.current && mapInstance.current.map) {
          mapInstance.current.map.dispose();
          mapInstance.current = null;
        }
      };
    } else {
      console.error('Data not found!');
    }
  }, []);  // Empty dependency array ensures this runs only once

  return (
    <section id="map-container">
      <h2>Explore COVID-19 Impact Across the World</h2>
      <div
        id="map"
        ref={mapRef}
        style={{
          width: '100%',
          height: '500px',
          backgroundColor: '#f0f0f0',  // Fallback color while map loads
        }}
      ></div>
    </section>
  );
};

export default MapSection;

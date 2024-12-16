import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';  // Import the base URL

export const BackgroundContext = createContext();

export function BackgroundProvider({ children }) {
  const [backgrounds, setBackgrounds] = useState({});
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const TIMEOUT_DURATION = 5000; // Timeout duration in milliseconds (5 seconds)

  useEffect(() => {
    const fetchSavedImages = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      const timeoutId = setTimeout(() => {
        controller.abort();
      }, TIMEOUT_DURATION);

      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/backgroundimage/getSavedImages`, { signal });

        if (response.data && response.data.length > 0) {
          const updatedBackgrounds = { ...backgrounds };
          response.data.forEach(image => {
            if (image.backgroundType && image.imagePath) {
              updatedBackgrounds[image.backgroundType] = `${BASE_URL}${image.imagePath}`;
            }
          });

          setBackgrounds(updatedBackgrounds);
        } else {
          setDefaultBackgrounds();
        }
      } catch (error) {
        if (signal.aborted) {
          console.error('Request aborted due to timeout.');
        } else {
          console.error('Error fetching saved images:', error);
          setDefaultBackgrounds();
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    const fetchPrices = async () => {
      const controller = new AbortController();
      const signal = controller.signal;

      const timeoutId = setTimeout(() => {
        controller.abort();
      }, TIMEOUT_DURATION);

      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/prices`, { signal });
        setPrices(response.data);
      } catch (error) {
        if (signal.aborted) {
          console.error('Request aborted due to timeout.');
        } else {
          console.error('Error fetching prices:', error);
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    const setDefaultBackgrounds = () => { 
      setBackgrounds({ 
          background1: '/Images/bgd-main.png', 
          background2: '/Images/bgd-office.jpg', 
          background3: '/Images/bgd-meeting.jpg', 
          background4: '/Images/bgd-meeting-2.jpg', 
          background5: '/Images/bgd-butik.jpg' 
      }); 
    };

    fetchSavedImages();
    fetchPrices();
  }, [backgrounds]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BackgroundContext.Provider value={{ backgrounds, setBackgrounds, prices, setPrices }}>
      {children}
    </BackgroundContext.Provider>
  );
};

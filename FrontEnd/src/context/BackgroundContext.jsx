import React, { createContext, useState, useEffect } from 'react';
import bgdMain from '../Images/bgd-main.png'; 
import bgdOffice from '../Images/bgd-office.jpg'; 
import bgdMeeting from '../Images/bgd-meeting.jpg'; 
import bgdMeeting2 from '../Images/bgd-meeting-2.jpg'; 
import bgdButik from '../Images/bgd-butik.jpg';

import axios from 'axios';
import { BASE_URL } from '../config';  // Import the base URL

export const BackgroundContext = createContext();

export function BackgroundProvider({ children }) {
  const [backgrounds, setBackgrounds] = useState({});
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/backgroundimage/getSavedImages`);
  
        if (response.data && response.data.length > 0) {
          const updatedBackgrounds = { ...backgrounds };
          response.data.forEach(image => {
            if (image.backgroundType && image.imagePath) {
                updatedBackgrounds[image.backgroundType] = `${BASE_URL}${image.imagePath}?t=${new Date().getTime()}`;
              }
          });
  
          setBackgrounds(updatedBackgrounds);
        } else {
          setDefaultBackgrounds();
        }
      } catch (error) {
        console.error('Error fetching saved images:', error);
        setDefaultBackgrounds();
      } finally {
        setLoading(false);
      }
    };

    const fetchPrices = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/prices`);
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      } finally {
        setLoading(false);
      }
    };

    const setDefaultBackgrounds = () => { 
      setBackgrounds({ 
          background1: bgdMain, 
          background2: bgdOffice, 
          background3: bgdMeeting, 
          background4: bgdMeeting2, 
          background5: bgdButik 
      }); 
    };

    fetchSavedImages();
    fetchPrices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BackgroundContext.Provider value={{ backgrounds, setBackgrounds, prices, setPrices }}>
      {children}
    </BackgroundContext.Provider>
  );
};

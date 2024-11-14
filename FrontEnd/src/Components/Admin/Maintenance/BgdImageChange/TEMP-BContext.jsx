import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [backgrounds, setBackgrounds] = useState({});

//   console.log("BackgroundProvider before uE: ",backgrounds.background1);

    const baseURL = 'https://localhost:7177';

  useEffect(() => {
    const fetchSavedImages = async () => {
      // console.log('fetchSavedImages called');
      try {
        const response = await axios.get('/api/backgroundimage/getSavedImages');
        // console.log('Full API response:', response.data);
  
        if (response.data && response.data.length > 0) {
          // console.log('Fetched images:', response.data);
          
          const updatedBackgrounds = { ...backgrounds };
          // console.log('Updated background:', updatedBackgrounds);
          response.data.forEach(image => {
            // console.log(`Setting ${image.backgroundType} to ${image.imagePath}`);
            if (image.backgroundType && image.imagePath) {
                updatedBackgrounds[image.backgroundType] = `${baseURL}${image.imagePath}`;
              }
          });
  
          setBackgrounds(updatedBackgrounds);
          // console.log("BackgroundProvider inside uE 1: ", updatedBackgrounds.background1);
          // console.log("BackgroundProvider inside uE 2: ", backgrounds.background1);
        } else {
          // console.log('No saved images found. Loading default images.');

          setBackgrounds((prevBackgrounds) => ({
            ...prevBackgrounds,
              background1: '/Images/bgd-main.png',
              background2: '/Images/bgd-office.jpg',
              background3: '/Images/bgd-meeting.jpg',
              background4: '/Images/bgd-meeting-2.jpg',
              background5: '/Images/bgd-butik.jpg'
            
          }));
  
        }
      } catch (error) {
        console.error('Error fetching saved images:', error);
        
        setBackgrounds((prevBackgrounds) => ({
          ...prevBackgrounds,
            background1: '/Images/bgd-main.png',
            background2: '/Images/bgd-office.jpg',
            background3: '/Images/bgd-meeting.jpg',
            background4: '/Images/bgd-meeting-2.jpg',
            background5: '/Images/bgd-butik.jpg'
        }));
      }
    };
    fetchSavedImages();
  }, []);
        
//   console.log("BackgroundProvider after uE: ",backgrounds.background1);

  return (
    <BackgroundContext.Provider value={{ backgrounds, setBackgrounds }}>
      {children}
    </BackgroundContext.Provider>
  );
};

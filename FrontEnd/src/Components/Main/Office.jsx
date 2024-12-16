import "./Office.css";
import UserSlider from './UserSlider';

import React, { useContext } from 'react'; 
import { BackgroundContext } from '../../context/BackgroundContext';

function Office() {
  const { backgrounds, prices } = useContext(BackgroundContext);

  // Helper function to get the price by ID
  const formatNumber = (number) => {
    return number.toLocaleString('sv-SE'); // Format numbers according to Swedish conventions
};

const getPriceById = (id) => {
    const price = prices.find(price => price.id === id);
    return price ? formatNumber(price.amount) : "ing...";
};

  return (
    <>
      <div className="wrapper">

        {/* Background image */}
        <div className="section-1 section" id="office">
          {backgrounds.background2 && (
            <>
              <div className="wc-bgd-img" 
                style={{ backgroundImage: `url(${backgrounds.background2})` }} />
            </>
          )}
        </div>

        {/* Office sub text */}
        <div className="office-sub sub">
          <div className="office-text text">
            <h1>Kontoret</h1>
            <br />
            <p>En insprierande miljö att jobba i.</p>
            <br />
            <p>
              Totalt finns sex fasta arbetsplatser i en öppen kontorsmiljö,
            </p>
            <p>
              Vi har också en arbetsplats där flera personer delar plats, vid olika
              dagar i veckan.
            </p>
            <p>Välkommen till jobbet!</p>
            <br />
            <br />
            <p>Fast kontorsplats {getPriceById(1)} kr/mån</p>
            <p>”Flex” 1 gång/vecka (fast dag) {getPriceById(2)} kr</p>
            <br />
            <div className="text-wide">
              <p>Detta ingår</p>
              <p>
                • Höj- och sänkbart skrivbord och arbetsstol från Kinnarps
              </p>
              <p>
                • Låsbart skåp/förvaring,• Fri tillgång till mötesrummen •
                Kök/lunchrum
              </p>
              <p>
                • Snabbt Wi-Fi • 24/7 access • Kaffe/te, frukt •
                Städning • Medlemsrabatt i butiken
              </p>
            </div>
          </div>
        </div>

        {/* Office photo gallery */}
        <div className="gry-cont">
          <div className="gry-title text">
            <h1>Dina Kollegor</h1>
          </div>
          <div className='photo-album'>
            <UserSlider />
          </div>
        </div>
      </div>
    </>
  );
}

export default Office;

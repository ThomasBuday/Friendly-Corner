import plhr_man from "../../Images/Team/placeholder-man.jpg";
import plhr_woman from "../../Images/Team/placeholder-woman.jpg";
import Asa from "../../Images/Team/Asa Andreasson.jpg";
import Tinna from "../../Images/Team/Tinna Ahlander.jpg";
import Member from './Member'
import "./Office.css";

import React, { useContext } from 'react'; 
import { BackgroundContext } from '../../context/BackgroundContext';

function Office() {

  const { backgrounds } = useContext(BackgroundContext);

  return (
    <>
      <div className="wrapper">

        {/* Background image */}
        <div className="section-1 section" id="office">
          {backgrounds.background2 && (
            <>
              <div  className="wc-bgd-img" 
                style={{ backgroundImage: `url(${backgrounds.background2}?${new Date().getTime()})` }} />
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
              Totalt finns sex fasta arbetsplatser i en öppen kontorsmiljö,</p>
              <p> Vi
              har också en arbetsplats där flera personer delar plats, vid olika
              dagar i veckan.
            </p>
            <p>Välkommen till jobbet!</p>
            <br />
            <br />
            <p>Fast kontorsplats 4 050 kr/mån</p>
            <p>”Flex” 1 gång/vecka (fast dag) 1 800 kr</p>
            <br />
            <div className="text-wide">
            <p>Detta ingår</p>
              <p>
                • Höj- och sänkbart skrivbord och arbetsstol från Kinnarps</p>
                <p> • Låsbart skåp/förvaring,• Fri tillgång till mötesrummen •
                Kök/lunchrum</p>
                <p> • Snabbt Wi-Fi • 24/7 access • Kaffe/te, frukt •
                Städning • Medlemsrabatt i butiken
              </p>
            </div>
          </div>
        </div>

        {/* Office photo galery */}
        <div className="gry-cont">
            <div className="gry-title text">
                <h1>Dina Kollegor</h1>
            </div>
            <div className='photo-album'>
                
                <Member image={plhr_man} alt="Bill" name="Bill Friman" url="https://www.gulddeal.se/" address="Gulddeal.se" />
                <Member image={plhr_woman} alt="Anna" name="Anna Vestman" url="https://hundrasvart.se/" address="Hundrasvart.se" />
                <Member image={plhr_man} alt="Javier" name="Javier Carriazo" url="#" address="" />
                <Member image={plhr_woman} alt="Lovisa" name="Lovisa" url="#" address="" />
                <Member image={plhr_man} alt="Klas" name="Klas Åkerskog" url="https://swcg.com/" address="SWCG.com" />
                <Member image={plhr_man} alt="Dylan" name="Dylan" url="#" address="" />
                <Member image={plhr_woman} alt="Elin" name="Elin" url="#" address="" />
                <Member image={plhr_man} alt="Madde" name="Madde" url="#" address="" />
                <Member image={Asa} alt="Åsa" name="Åsa Andreasson" url="https://www.kreativakvadrat.com/" address="Kreativakvadrat.com" />
                <Member image={Tinna} alt="Tinna" name="Tinna Ahlander" url="https://tinnadesign.se/" address="Tinnadesign.se" />


            </div>

        </div>




      </div>
    </>
  );
}

export default Office;
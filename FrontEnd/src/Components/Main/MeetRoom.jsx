import './MeetRoom.css';

import React, { useContext } from 'react'; 
import { BackgroundContext } from '../../context/BackgroundContext';


function MeetingRoom() {

    const { backgrounds } = useContext(BackgroundContext);

    return(
        <>
        <div className="wrapper">

            {/* Background image */}
            <div className='section-2' id='meetingRoom'>
                {backgrounds.background3 && (
                    <>
                        <div className="meetingRoom-bgd-img" style={{ backgroundImage: `url(${backgrounds.background3}?${new Date().getTime()})`, }} />
                    </>
                )}
            </div>

            <div className="meetingRoom-sub sub">
                <div className='meetingRoom-text text'>
                    <h1>Mötesrum Slottet</h1><br />

                    <p>Mötesrum utöver det vanliga</p><br />

                    <p>Byt miljö och boka mötesrum hos oss!</p>

                    <p>Ett mötesrum utöver det vanliga, måste upplevas.</p>
                    <p>Du hittar oss i mysiga Tändsticksområdet, i en lugn och unik miljö.</p>
                    <p>Trevliga restauranger runt hörnet och nära till tåg och buss.</p><br /><br />

                    <p>Heldag 3 000 kr</p>
                    <p>Halvdag 1 800 kr</p>
                    <p>Helgdag 4 000 kr</p><br />

                    <p>Det finns Wifi, bildskärm, whiteboard. Fika eller lunch kan ni boka via oss</p><br />

                    <p>(priser exklusive moms)</p>
                </div>
            </div>
            <div className="section-2-2">
                {backgrounds.background4 && (
                    <>
                        <div className="meetRoom-post-img" style={{ backgroundImage: `url(${backgrounds.background4}?${new Date().getTime()})`, }} />
                    </>
                )}

                {/* <div className='meetRoom-post-img'></div> */}
            </div>
        </div>
        </>
    );

}

export default MeetingRoom;
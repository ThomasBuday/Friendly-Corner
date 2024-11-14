import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";

import Header from './Components/Header';
import Home from './Components/Home';
import Office from './Components/Office';
import MeetingRoom from './Components/MeetRoom';
import Butik from './Components/Butik';
import ContactUs from './Components/ContactUs';
import AdminPage from './Components/AdminPage';
import UserPage from './Components/UserPage';
import CalendarPage from "./Components/CalendarPage"; 
import Footer from './Components/Footer';
import LoginModal from './Components/LoginModal';



function App() {
  
  const loginModalRef = useRef(null);

  function openLoginModal() {
    if (loginModalRef.current) {
      loginModalRef.current.openModal();
    }
  }

  return (
    <Router>
      <div className="App" id='App'>
        <Header onLoginClick={openLoginModal}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/office" element={<Office />} />
            <Route path="/meetingroom" element={<MeetingRoom />} /> 
            <Route path="/butik" element={<Butik />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/boka" element={<CalendarPage />} />
          </Routes>

          <LoginModal ref={loginModalRef} />
        <Footer />

      </div>
    </Router>
  );
}

export default App;
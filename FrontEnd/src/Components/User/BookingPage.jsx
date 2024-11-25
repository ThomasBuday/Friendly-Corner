// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";

const BookingPage = () => {
  const [rooms, setRooms] = useState(["Room A", "Room B", "Room C"]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5250/api/calendar/rooms");
        setRooms(response.data); // Dynamically update rooms state
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);
 

  const handleBooking = async () => {
    if (!selectedRoom || !date || !time) {
      setMessage("Please select a room, date, and time.");
      return;
    }

    const startTime = new Date(`${date}T${time}`);
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // Add 30 minutes

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5250/api/calendar/book",
        {
          roomName: selectedRoom,
          startTime,
          endTime
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessage("Room booked successfully!");
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage("The room is already booked for this time slot.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h1>Book a Meeting Room</h1>
      <div>
        <label>
          Select Room:
          <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
            <option value="">--Select Room--</option>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Select Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Select Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
      </div>
      <button onClick={handleBooking}>Book Room</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingPage;
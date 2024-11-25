// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5250/api/calendar/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            {booking.RoomName} - {new Date(booking.StartTime).toLocaleString()} to{" "}
            {new Date(booking.EndTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
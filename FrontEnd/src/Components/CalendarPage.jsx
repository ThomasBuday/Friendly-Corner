import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import default styles

function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState(null); // State to manage selected date

    const handleBooking = () => {
        if (selectedDate) {
            // For demonstration, we'll just log the date. Replace this with your booking logic.
            console.log('Selected booking date and time:', selectedDate);
            alert(`Meeting room booked for: ${selectedDate}`);
        } else {
            alert('Please select a date and time for booking.');
        }
    };

    return (
        <div>
            <h1>Welcome to the Booking Page!</h1>
            <h2>Book a Meeting Room</h2>
            <p>Select a date and time for booking:</p>
            
            {/* Date and time picker */}
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTimeSelect
                dateFormat="Pp" // Format to include both date and time
                placeholderText="Click to select a date and time"
            />
            
            <button onClick={handleBooking} disabled={!selectedDate}>
                Book Meeting Room
            </button>
        </div>
    );
}

export default CalendarPage;
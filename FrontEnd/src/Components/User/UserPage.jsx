
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear tokens from both localStorage and sessionStorage
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div>
            <h1>User Page</h1>
            <p>Welcome, User! You have access to this page.</p>

            {/* Button to navigate to calendar */}
            <button onClick={() => navigate('/boka')}>Go to Booking Page</button>

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default UserPage;
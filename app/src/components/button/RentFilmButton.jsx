import React, { useState } from 'react';
import axios from "axios";

const RentFilmButton = ({ filmID }) => {
    const [filmId, setFilmId] = useState(filmID);
    const [customerID, setCustomerID] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    // Function to check film availability and handle the rental
    const checkFilmAvailability = async () => {
        if (!filmId) {
            alert('Please enter a valid Film ID');
            return;
        }

        // Send a request to check film availability
        const response = await axios.post('http://127.0.0.1:8080/checkFilmAvailability', {
            film_id: filmId,
        });

        const data = await response.json();

        if (data.success) {
            // If the film is available, proceed with the rental
            rentFilm();
        } else {
            // If the film is not available, show an error message
            setMessage('Sorry, the film is currently out of stock.');
            setMessageType('error');
        }
    };

    // Function to handle the film rental process
    const rentFilm = async () => {
        const response = await axios.post('http://127.0.0.1:8080/rentFilm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ film_id: filmId }),
        });

        const data = await response.json();

        if (data.success) {
            setMessage('The film has been rented successfully!');
            setMessageType('success');
        } else {
            setMessage('Error occurred while renting the film.');
            setMessageType('error');
        }
    };

    return (
        <div>
             <label htmlFor="customerID">Customer ID:</label>
            <input
                type="text"
                placeholder="Enter Customer ID"
                value={customerID}
                onChange={(e) => setCustomerID(e.target.value)}
            />
            <button type="button" className="btn btn-primary" onClick={(e) => { e.stopPropagation(); checkFilmAvailability;}} style={{ cursor: "pointer" }}>
                Rent Film
            </button>

            {message && (
                <div
                    className={`message ${messageType === 'success' ? 'success' : 'error'}`}
                >
                    {message}
                </div>
            )}
        </div>
    );
}

export default RentFilmButton;

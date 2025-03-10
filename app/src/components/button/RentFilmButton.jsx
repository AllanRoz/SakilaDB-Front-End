import React, { useState } from 'react';
import axios from "axios";

const RentFilmButton = ({ filmID }) => {
    const [filmId, setFilmId] = useState(filmID);
    const [customerID, setCustomerID] = useState('');
    const [message, setMessage] = useState('');
    // console.log(filmID);

    const checkFilmAvailability = async () => {
        if (!filmId) {
            alert('Please enter a valid Film ID');
            return;
        }

        const response = await axios.post('http://127.0.0.1:8080/checkFilmAvailability', {
            film_id: filmId,
        });

        console.log(response.data);

        if (response.data.success) {
            rentFilm();
            console.log("Film available");
        } else {
            setMessage('Film is out of stock');
        }
        setTimeout(() => setMessage(''), 2000);
    };

    const rentFilm = async () => {
        const response = await axios.post('http://127.0.0.1:8080/rentFilm', {customer_id: customerID, film_id: filmID});

        console.log(response.data);
        if (response.data.message === "Film rented") {
            setMessage('Film rented');
        } else {
            setMessage('Error occurred while renting the film.');
        }
        setTimeout(() => setMessage(''), 2000);
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
            <button type="button" className="btn btn-primary" onClick={(e) => { e.stopPropagation(); checkFilmAvailability();}} style={{ cursor: "pointer" }}>
                Rent Film
            </button>

            {message && (
                <div>
                    {message}
                </div>
            )}
        </div>
    );
}

export default RentFilmButton;

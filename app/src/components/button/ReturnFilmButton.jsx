import React, { useState } from "react";
import axios from "axios";

const ReturnFilmButton = ({ customerData }) => {
    const [filmId, setFilmId] = useState(""); // Track the film_id
    const [messageVisible, setMessageVisible] = useState(false);
    const [errorMessageVisible, setErrorMessageVisible] = useState(false); // State for error message

    // Function to handle film return
    const returnFilm = async (customerId, filmId) => {
        console.log(customerId);
        console.log(filmId);
        try {
            const response = await axios.post("http://127.0.0.1:8080/returnFilm", {
                customer_id: customerId,
                film_id: filmId,
            });

            console.log(response.data);
            // Check if the response indicates success
            if (response.data.message === "Film returned") {
                setMessageVisible(true);
                setErrorMessageVisible(false); // Hide error message
                setTimeout(() => {
                    setMessageVisible(false); // Hide success message after 3 seconds
                }, 2000);
            } else {
                setErrorMessageVisible(true); // Show error message if film wasn't returned
                setMessageVisible(false); // Hide success message if it failed
                setTimeout(() => {
                    setErrorMessageVisible(false); // Hide success message after 3 seconds
                }, 2000);
            }
        } catch (error) {
            // console.error("Error during return:", error);
            setErrorMessageVisible(true); // Show error message in case of exception
            setMessageVisible(false); // Hide success message if it failed
        }
    };

    return (
        <div>
            <label htmlFor="returnFilm">Enter Film ID:</label>
            <input
                type="text"
                id="returnFilm"
                value={filmId}
                onChange={(e) => setFilmId(e.target.value)} // Update state with input value
            />

            <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                    e.stopPropagation();
                    returnFilm(customerData.customer_id, filmId); // Pass customer_id and film_id
                }}
                style={{ cursor: "pointer" }}
            >
                Return Film
            </button>
            {messageVisible && (
                <div style={{ color: "green", fontWeight: "bold" }}>
                    Film has been returned successfully!
                </div>
            )}

            {errorMessageVisible && (
                <div style={{ color: "red", fontWeight: "bold" }}>
                    Error: Film could not be returned. Please try again.
                </div>
            )}
        </div>
    );
};

export default ReturnFilmButton;

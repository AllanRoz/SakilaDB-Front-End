import React, { useState } from "react";
import axios from "axios";

const ReturnFilmButton = ({ customerData }) => {
  const [filmId, setFilmId] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const returnFilm = async (customerId, filmId) => {
    console.log(customerId);
    console.log(filmId);
    try {
      const response = await axios.post("http://127.0.0.1:8080/returnFilm", {
        customer_id: customerId,
        film_id: filmId,
      });

      console.log(response.data);
      if (response.data.message === "Film returned") {
        setMessageVisible(true);
        setErrorMessageVisible(false);
        setTimeout(() => {
          setMessageVisible(false);
        }, 2000);
      } else {
        setErrorMessageVisible(true);
        setMessageVisible(false);
        setTimeout(() => {
          setErrorMessageVisible(false);
        }, 2000);
      }
    } catch (error) {
      setErrorMessageVisible(true);
      setMessageVisible(false);
    }
  };

  return (
    <div>
      <label htmlFor="returnFilm">Enter Film ID:</label>
      <input
        type="text"
        id="returnFilm"
        placeholder="Enter Film ID"
        value={filmId}
        onChange={(e) => setFilmId(e.target.value)}
      />

      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          e.stopPropagation();
          returnFilm(customerData.customer_id, filmId);
        }}
        style={{ cursor: "pointer" }}
      >
        Return Film
      </button>
      {messageVisible && (
        <div style={{ color: "green", fontWeight: "bold" }}>
          Film has been returned
        </div>
      )}

      {errorMessageVisible && (
        <div style={{ color: "red", fontWeight: "bold" }}>
          Error: Film could not be returned. Please try again
        </div>
      )}
    </div>
  );
};

export default ReturnFilmButton;

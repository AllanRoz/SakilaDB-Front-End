import Modal from '../components/modal/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

const OTHER_CONTENT_STYLES = {
  position: 'relative',
  zIndex: 2,
  backgroundColor: 'red',
  padding: '10px'
}

const Top5Films = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [films, setFilms] = useState([]) // Top 5 films
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    ;(async () => {
      const response = await axios.get("http://127.0.0.1:8080/top/rented_films")
      setFilms(response.data)
    })()
  }, [])
  // console.log(films)
  const handleRowClick = async (film_id) => {
    //console.log('Fetching details for Film ID:', film_id);
    try {
      const response = await axios.post(`http://127.0.0.1:8080/details/top5films`, {film_id});
      setSelectedFilm(response.data[0]); // Store the film details
    } catch (error) {
      console.error('Error fetching film details:', error);
    }
    setIsOpen(true);
  };
  // console.log(selectedFilm)

  return (
    <div>
      <h2>Top 5 Films</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Rented</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
          <tr key={film.film_id} onClick={() => handleRowClick(film.film_id)} style={{ cursor: 'default' }}>
            <td>{film.film_id}</td>
            <td>{film.title}</td>
            <td>{film.rented}</td>
          </tr>
          ))}
        </tbody>
      </table>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {selectedFilm ? (
          <div>
            <h2>{selectedFilm.title}</h2>
            <p>Film ID: {selectedFilm.film_id}</p>
            <p>Description: {selectedFilm.description}</p>
            <p>Special Features: {selectedFilm.special_features}</p>
            <p>Release Year: {selectedFilm.release_year}</p>
            <p>Rating: {selectedFilm.rating}</p>
            <p>Movie Length: {selectedFilm.length} minutes</p>
            <p>Rental Duration: {selectedFilm.rental_duration}</p>
            <p>Rental Rate: ${selectedFilm.rental_rate}</p>
            <p>Replacement Cost: ${selectedFilm.replacement_cost}</p>
            <p>Last Update: {selectedFilm.last_update}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  )
}

export default Top5Films
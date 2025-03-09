import React, { useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from '../components/modal/Modal';
import RentFilmButton from '../components/button/RentFilmButton';
import './Dropdown.css'


function FilmsData({ items, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(items.length / itemsPerPage);
  const [search, setSearch] = useState('');
  const [filterChoice, setFilterChoice] = useState('');
  const [isOpen, setIsOpen] = useState(false)
  const [filmData, setFilmData] = useState(null);
//   console.log(filmData);
  
  // console.log(search)
  // console.log(filterChoice)

  const searchChoice = (item) => {
    if (filterChoice === 'title') {
      return search.toLowerCase() === '' || item.film_title.toLowerCase().includes(search.toLowerCase());
    } else if (filterChoice === 'actor') {
      return search.toLowerCase() === '' || item.actors.toLowerCase().includes(search.toLowerCase());
    } else if (filterChoice === 'genre') {
      return search.toLowerCase() === '' || item.genres.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  };
  
  const handleRowClick = async (film_id) => {
    //console.log('Fetching details for Film ID:', film_id);
    try {
      const response = await axios.post(`http://127.0.0.1:8080/details/filmdata`, {film_id});
      setFilmData(response.data[0]); // Store the film details
    } catch (error) {
      console.error('Error fetching film details:', error);
    }
    setIsOpen(true);
  };

  const currentItems = items
    .filter(searchChoice) // Apply filtering before pagination
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Search Filter: {filterChoice || "None"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilterChoice("title")}>
              Title
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterChoice("actor")}>
              Actor
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterChoice("genre")}>
              Genre
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterChoice("none")}>
              None
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <input type={"text"} id={"customerInput"} onChange={(e) => setSearch(e.target.value)} placeholder={"Search for names.."}></input>
        <table className="table">
        <thead>
          <tr>
            <th>Film ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Actor</th>
          </tr>
        </thead>
        <tbody>
            {currentItems.map((item) => (
          <tr key={item.film_id} onClick={() => handleRowClick(item.film_id)} style={{ cursor: 'default' }}>
          <td>{item.film_id}</td>
          <td>{item.film_title}</td>
          <td>{item.genres}</td>
          <td>{item.actors}</td>
        </tr>
        ))}
        </tbody>
      </table>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {maxPage}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === maxPage}
      >
        Next
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {filmData ? (
          <div>
            <h2>{filmData.title}</h2>
            <p>Film ID: {filmData.film_id}</p>
            <p>Description: {filmData.description}</p>
            <p>Actors: {filmData.actors}</p>
            <p>Special Features: {filmData.special_features}</p>
            <p>Release Year: {filmData.release_year}</p>
            <p>Rating: {filmData.rating}</p>
            <p>Movie Length: {filmData.length} minutes</p>
            <p>Rental Duration: {filmData.rental_duration}</p>
            <p>Rental Rate: ${filmData.rental_rate}</p>
            <p>Replacement Cost: ${filmData.replacement_cost}</p>
            <p>Last Update: {filmData.last_update}</p>
            <RentFilmButton filmID={filmData.film_id}/>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
}

export default FilmsData;
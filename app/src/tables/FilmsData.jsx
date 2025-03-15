import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, Modal } from "antd";
import RentFilmButton from "../components/button/RentFilmButton";
import "../styles/table.css";

function FilmsData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterChoice, setFilterChoice] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filmData, setFilmData] = useState(null);
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  // console.log(filmData);
  // console.log(search)
  // console.log(filterChoice)

  useEffect(() => {
    fetchRecords(currentPage);
  }, [search, filterChoice, currentPage]);

  const fetchRecords = async (page) => {
    setLoading(true);
    const response = await axios.get(`http://127.0.0.1:8080/films`);
    setFilms(response.data);
    setLoading(false);
  };

  const columns = [
    {
      title: "Film ID",
      dataIndex: "film_id",
    },
    {
      title: "Film Title",
      dataIndex: "title",
    },
    {
      title: "Genres",
      dataIndex: "genres",
    },
    {
      title: "Actors",
      dataIndex: "actors",
    },
  ];

  const searchChoice = (item) => {
    if (filterChoice === "Title") {
      return (
        search.toLowerCase() === "" ||
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    } else if (filterChoice === "Actor") {
      return (
        search.toLowerCase() === "" ||
        item.actors.toLowerCase().includes(search.toLowerCase())
      );
    } else if (filterChoice === "Genre") {
      return (
        search.toLowerCase() === "" ||
        item.genres.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  };

  const filteredFilms = films.filter(searchChoice);

  const handleRowClick = async (film_id) => {
    //console.log('Fetching details for Film ID:', film_id);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8080/details/filmdata`,
        { film_id }
      );
      setFilmData(response.data[0]);
      // console.log(filmData);
    } catch (error) {
      console.error("Error fetching film details:", error);
    }
    setIsOpen(true);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter: {filterChoice || "None"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setFilterChoice("Title")}>
            Title
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterChoice("Actor")}>
            Actor
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterChoice("Genre")}>
            Genre
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterChoice("None")}>
            None
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <input
        type={"text"}
        id={"customerInput"}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={"Search"}
      ></input>
      <Table
        className=""
        loading={loading}
        columns={columns}
        dataSource={filteredFilms}
        rowKey="film_id"
        onRow={(film) => ({
          onClick: () => handleRowClick(film.film_id),
          style: { cursor: "pointer" },
        })}
        pagination={{
          current: currentPage,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            fetchRecords(page);
          },
        }}
      />
      <Modal open={isOpen} onOk={handleOk} onCancel={handleCancel}>
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
            <RentFilmButton filmID={filmData.film_id} isOpen={isOpen} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
}

export default FilmsData;

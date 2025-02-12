import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Top5Films = () => {
  
  const [films, setFilms] = useState([])


  useEffect(() => {
    ;(async () => {
      const response = await axios.get("http://127.0.0.1:8080/top/rented_films")
      setFilms(response.data)
      console.log(response.data)
    })()
  }, [])

  return (
    <div>
      <h2>Top 5 Films</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Rented</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
          <tr key={film.film_id}>
            <td>{film.film_id}</td>
            <td>{film.title}</td>
            <td>{film.rented}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Top5Films
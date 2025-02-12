import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Top5Actors = () => {
  
  const [actors, setActors] = useState([])


  useEffect(() => {
    ;(async () => {
      const response = await axios.get("http://127.0.0.1:8080/top/actors")
      setActors(response.data)
      console.log(response.data)
    })()
  }, [])

  return (
    <div>
      <h2>Top 5 Actor</h2>
      <table>
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Movies</th>
            </tr>
        </thead>
        <tbody>
          {actors.map((actor) => (
          <tr key={actor.actor_id}>
            <td>{actor.actor_id}</td>
            <td>{actor.first_name} {actor.last_name}</td>
            <td>{actor.movies}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Top5Actors
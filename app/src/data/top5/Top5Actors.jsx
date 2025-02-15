import Modal from '../../components/modal/Modal';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Top5Actors = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [actors, setActors] = useState([])
  const [selectedActor, setSelectedActor] = useState(null);

  useEffect(() => {
    ;(async () => {
      const response = await axios.get("http://127.0.0.1:8080/top/actors")
      setActors(response.data)
      // console.log(response.data)
    })()
  }, [])

  const handleRowClick = async (actor_id) => {
    // console.log('Fetching details for Actor ID:', actor_id);
    try {
      const response = await axios.post(`http://127.0.0.1:8080/details/actor`, {actor_id});
      setSelectedActor(response.data); // Store the actor details
      // console.log(response.data)

    } catch (error) {
      console.error('Error fetching film details:', error);
    }
    setIsOpen(true);

  };

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
          <tr key={actor.actor_id} onClick={() => handleRowClick(actor.actor_id)} style={{ cursor: 'pointer' }}>
            <td>{actor.actor_id}</td>
            <td>{actor.first_name} {actor.last_name}</td>
            <td>{actor.movies}</td>
          </tr>
          ))}
        </tbody>
      </table>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {selectedActor ? (
          <div>
            <h2>{selectedActor[0].first_name} {selectedActor[0].last_name}'s Top 5 Films</h2>
            {/* <p>Actor ID: {selectedActor[0].actor_id}</p>
            <p>Last Update: {selectedActor[0].last_update}</p> */}
            <p>1. {selectedActor[0].title}: {selectedActor[0].rental_count} rented</p>
            <p>2. {selectedActor[1].title} {selectedActor[1].rental_count} rented</p>
            <p>3. {selectedActor[2].title} {selectedActor[2].rental_count} rented</p>
            <p>4. {selectedActor[3].title} {selectedActor[3].rental_count} rented</p>
            <p>5. {selectedActor[4].title} {selectedActor[4].rental_count} rented</p>
            <h3></h3>
          </div>
        ) 
        : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  )
}

export default Top5Actors
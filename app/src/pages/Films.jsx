import React, { useState, useEffect } from "react";
import FilmsData from '../tables/FilmsData';
import axios from 'axios';

const Films = () => {
  const [films, setFilms] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await axios.get("http://127.0.0.1:8080/films")
      setFilms(response.data)
    })()
  }, [])
  // console.log(films)
  return (
    <div>
      <FilmsData items={films} itemsPerPage={10}/>
    </div>
  )
}


export default Films
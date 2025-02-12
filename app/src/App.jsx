import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Films from './pages/Films'
import Customers from './pages/Customers'
import Top5Films from './data/top5/Top5Films';
import Top5Actors from './data/top5/Top5Actors';

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <div className="container">
        <Routes>
          <Route path="/app" elements={<App/>}></Route>
          <Route path="/films" elements={<Films/>}></Route>
          <Route path="/customers" elements={<Customers/>}></Route>
        </Routes>
      </div> */}
      
      <Top5Films/>
      <Top5Actors/>
{/*       
      {films.map((film) => (
        <div key={film.film_id}>
          <h3>{film.title}</h3>
        </div>
      ))} */}


    </div>
  )
}

export default App

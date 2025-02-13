import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import { Home } from './pages/Home';
import Films from './pages/Films'
import Customers from './pages/Customers'
import Top5Films from './data/top5/Top5Films';
import Top5Actors from './data/top5/Top5Actors';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/films" element={<Films/>}></Route>
          <Route path="/customers" element={<Customers/>}></Route>
        </Routes>
      </div>

      {/* <Grid container spacing={2}>
        <Grid item sm={6}>
          <BasicTable/>
        </Grid>
        <Grid item sm={6}>
          <BasicTable/>
        </Grid>
      </Grid> */}

      {/* <Top5Films/>
      <Top5Actors/> */}



    </div>
  )
}

export default App

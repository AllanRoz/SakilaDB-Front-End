import React from 'react'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    // <header className="header">
    //     <a href="/" className="logo">Allan's Pirated Films</a>

    //     <nav className="navbar">
    //         <a href="">Home</a>
    //         <a href="/pages/Films">Films</a>
    //         <a href="">Customers</a>
    //     </nav>
    // </header>
    <header className="header">
        <Link to="/" className="logo">Allan's Pirated Films</Link>

        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/films">Films</Link>
            <Link to="/customers">Customers</Link>
        </nav>
    </header>
  )
}

export default Navbar
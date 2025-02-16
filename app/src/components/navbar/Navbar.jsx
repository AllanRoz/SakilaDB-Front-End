import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
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
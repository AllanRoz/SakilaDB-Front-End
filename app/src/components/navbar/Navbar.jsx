import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="header">
        <a href="/" className="logo">Allan's Pirated Films</a>

        <nav className="navbar">
            <a href="">Home</a>
            <a href="">Films</a>
            <a href="">Customers</a>
        </nav>
    </header>
  )
}

export default Navbar
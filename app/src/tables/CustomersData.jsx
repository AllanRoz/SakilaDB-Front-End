import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from '../components/modal/Modal';
import ReturnFilmButton from '../components/button/ReturnFilmButton';
import axios from 'axios';

import './Dropdown.css'


function CustomersData({ items, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(items.length / itemsPerPage);
  const [search, setSearch] = useState('');
  const [filterChoice, setFilterChoice] = useState('');
  const [isOpen, setIsOpen] = useState(false)
  const [isCustomerOpen, setIsCustomerOpen] = useState(false) // Customer Details
  const [isCustomerEditOpen, setIsCustomerEditOpen] = useState(false) // Customer Edit 
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false) // Adding Customer
  const [customerData, setCustomerData] = useState(null); 
  const [filmId, setFilmId] = useState('');

  // Customer form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddCustomer = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/customer/add', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        address: address,
        address2: address2,
        district: district,
        city: city,
        postal_code: postalCode,
        country: country,
        phone: phone,
      });
      // console.log('Customer added successfully:', response.data);
      console.log(response.data);
      setIsAddCustomerOpen(false); // Close modal after submission
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  // console.log(search)
  // console.log(filterChoice)

  const searchChoice = (item) => {
    if (filterChoice === 'customerID') {
      return search === '' || item.customer_id.toString().includes(search.toString());
    } else if (filterChoice === 'firstName') {
      return search.toLowerCase() === '' || item.first_name.toLowerCase().includes(search.toLowerCase());
    } else if (filterChoice === 'lastName') {
      return search.toLowerCase() === '' || item.last_name.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  };
  

  const currentItems = items
    .filter(searchChoice) // Apply filtering before pagination
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRowClick = async (customer_id, open) => {
    //console.log('Fetching details for Film ID:', film_id);
    try {
      console.log(customer_id)
      if(open === "CustomerDetails"){
        console.log("Customer Details");
        const response = await axios.post(`http://127.0.0.1:8080/details/customerdata`, {customer_id});
        setCustomerData(response.data[0]); // Store the film details
        setIsCustomerOpen(true);
      }
      else if(open === "CustomerEdit"){
        console.log("Customer Edit");
      }
      else if(open === "CustomerDelete"){
        console.log("Customer Delete");
      }
    } catch (error) {
      console.error('Error fetching film details:', error);
    }
  };

  const returnFilm = async (customerId, filmId) => {
    //console.log('Fetching details for Film ID:', film_id);
    try {
      console.log(customerId)
      console.log("Return Film");
      const post = await axios.post(`http://127.0.0.1:8080/returnFilm`, {
        customer_id: customerId,
        film_id: filmId
      });
      console.log(post.data);
      
    } catch (error) {
      console.error('Error fetching film details:', error);
    }
  };
  
  return (
    <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Search Filter: {filterChoice || "None"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilterChoice("customerID")}>
              Customer ID
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterChoice("firstName")}>
              First Name
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setFilterChoice("lastName")}>
              Last Name
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <input type={"text"} id={"customerInput"} onChange={(e) => setSearch(e.target.value)} placeholder={"Search for names.."}></input>
        <table className="table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Store ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            {currentItems.map((item) => (
          <tr key={item.customer_id} onClick={() => handleRowClick(item.customer_id, "CustomerDetails")} style={{ cursor: 'pointer' }}>
          <td>{item.customer_id}</td>
          <td>{item.store_id}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.email}</td>
          <td>{item.active}</td>
          <td><button type="button" className="btn btn-secondary" onClick={(e) => {e.stopPropagation(); handleRowClick(item.customer_id, "CustomerEdit")}} style={{ cursor: 'pointer' }}>Edit</button></td>
          <td><button type="button" className="btn btn-danger" onClick={(e) => {e.stopPropagation(); handleRowClick(item.customer_id, "CustomerDelete")}} style={{ cursor: 'pointer' }}>Delete</button></td>
        </tr>
        ))}
        </tbody>
      </table>
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {maxPage}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === maxPage}
      >
        Next
      </button>
      <br></br>
      <Modal open={isCustomerOpen} onClose={() => {setIsCustomerOpen(false), setFilmId('')}}>
        {customerData ? (
          <div>
            <h2>{customerData.first_name} {customerData.last_name}'s Information</h2>
            <p>Customer ID: {customerData.customer_id}</p>
            <p>Email: {customerData.email}</p>
            <p>Address:</p>
            <p>{customerData.address}</p>
            <p>{customerData.city}, {customerData.district}, {customerData.postal_code}, {customerData.country}</p>
            <p>Phone Number: {customerData.phone}</p>
            <p>Previously Rented: {customerData.rented}</p>
            <p>Currently Renting: {customerData.renting}</p>
            <p>Created: {customerData.create_date}</p>
            <p>Last Updated: {customerData.last_update}</p>
            <ReturnFilmButton customerData={customerData} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
      <Modal open={isAddCustomerOpen} onClose={() => setIsAddCustomerOpen(false)}>
        <h2>Create new Customer</h2>
        <Form>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control 
              type="text" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="John" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control 
              type="text" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} 
              placeholder="Doe" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@example.com" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)} 
              placeholder="123 Park Lane" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address2">
            <Form.Label>Address Line 2</Form.Label>
            <Form.Control 
              type="text" 
              value={address2}
              onChange={(e) => setAddress2(e.target.value)} 
              placeholder="Optional" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)} 
              placeholder="Jersey City" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="district">
            <Form.Label>District</Form.Label>
            <Form.Control 
              type="text" 
              value={district}
              onChange={(e) => setDistrict(e.target.value)} 
              placeholder="New Jersey" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control 
              type="text" 
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)} 
              placeholder="07306" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control 
              type="text" 
              value={country}
              onChange={(e) => setCountry(e.target.value)} 
              placeholder="USA" 
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
              type="text" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="1234567890" 
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddCustomer}>
            Submit
          </Button>
        </Form>
      </Modal>
      <Button variant="primary" id="addCustomer" onClick={() => setIsAddCustomerOpen(true)}>
        Add new customer
      </Button>

    </div>
  );
}

export default CustomersData;
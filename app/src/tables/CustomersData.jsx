import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from '../components/modal/Modal';
import ReturnFilmButton from '../components/button/ReturnFilmButton';
import AddCustomerButton from '../components/button/AddCustomerButton';
import EditButton from '../components/button/EditButton';
import DeleteButton from '../components/button/DeleteButton';
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
    .filter(searchChoice)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRowClick = async (customer_id, open) => {
    //console.log('Fetching details for Film ID:', film_id);
    try {
      console.log(customer_id)
      if(open === "CustomerDetails"){
        console.log("Customer Details");
        const response = await axios.post(`http://127.0.0.1:8080/details/customerdata`, {customer_id});
        setCustomerData(response.data[0]);
        setIsCustomerOpen(true);
      }
      else if(open === "CustomerEdit"){
        console.log("Customer Edit");
        // <EditButton customer_id={customer_id}/>
      }
      else if(open === "CustomerDelete"){
        console.log("Customer Delete");
      }
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
          <tr key={item.customer_id} onClick={(e) => handleRowClick(item.customer_id, "CustomerDetails")} style={{ cursor: 'pointer' }}>
          <td>{item.customer_id}</td>
          <td>{item.store_id}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.email}</td>
          <td>{item.active}</td>
          <td onClick={(e) => e.stopPropagation()}><EditButton customer_id={item.customer_id}/></td>
          <td><DeleteButton customer_id={item.customer_id}/></td>
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
      <AddCustomerButton />

    </div>
  );
}

export default CustomersData;
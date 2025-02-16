import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from '../components/modal/Modal';
import './CustomersData.css'


function Customers({ items, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(items.length / itemsPerPage);
  const [search, setSearch] = useState('');
  const [filterChoice, setFilterChoice] = useState('');
  const [isOpen, setIsOpen] = useState(false)
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
    return true; // Default case: return all items if no filter is selected
  };
  

  const currentItems = items
    .filter(searchChoice) // Apply filtering before pagination
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Search Filter: {filterChoice || "Select"}
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
            <th>Create Date</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
            {currentItems.map((item) => (
          <tr key={item.customer_id}>
          <td>{item.customer_id}</td>
          <td>{item.store_id}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.email}</td>
          <td>{item.active}</td>
          <td>{item.create_date}</td>
          <td>{item.last_update}</td>
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
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Create new Customer</h2>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="email" placeholder="John" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="email" placeholder="Doe" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
        </Form>
      </Modal>
      <Button variant="primary" id="addCustomer" onClick={() => setIsOpen(true)}>
        Add new customer
      </Button>

    </div>
  );
}

export default Customers;
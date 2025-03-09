import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from '../modal/Modal';
import axios from 'axios';

function EditButton({ customer_id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
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

  useEffect(() => {
    if (isOpen) {
      fetchCustomerData();
    }
  }, [isOpen]);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8080/details/customerdata`, {customer_id});
      const customer = response.data[0];
    //   console.log(customer);
      setFirstName(customer.first_name);
      setLastName(customer.last_name);
      setEmail(customer.email);
      setAddress(customer.address);
      setAddress2(customer.address2);
      setCity(customer.city);
      setDistrict(customer.district);
      setPostalCode(customer.postal_code);
      setCountry(customer.country);
      setPhone(customer.phone);
    } catch (error) {
      setMessage('Error fetching customer details.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8080/customer/update`, {
        customer_id: customer_id,
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

      console.log(response.data.message);
      if (response.data.message === "Customer updated") {
        setMessage('Customer updated successfully.');
      } else if (response.data.message === "Field empty") {
        setMessage('Fields cannot be empty.');
      } else {
        setMessage('Error updating customer.');
      }
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('Error updating customer. Please try again.');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}>
        Edit
      </Button>
      <Modal open={isOpen} onClose={(e) => { e.stopPropagation(); setIsOpen(false)}}>
        <h2>Edit Customer Details</h2>
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="address2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="district">
            <Form.Label>District</Form.Label>
            <Form.Control type="text" value={district} onChange={(e) => setDistrict(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>
          {message && <p>{message}</p>}
        </Form>
      </Modal>
    </>
  );
}

export default EditButton;

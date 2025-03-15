import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Table } from "antd";
import Modal from "../components/modal/Modal";
import ReturnFilmButton from "../components/button/ReturnFilmButton";
import AddCustomerButton from "../components/button/AddCustomerButton";
import axios from "axios";
import EditButton from "../components/button/EditButton";
import DeleteButton from "../components/button/DeleteButton";

function CustomersData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterChoice, setFilterChoice] = useState("");
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecords(currentPage);
  }, [search, filterChoice, currentPage]);

  const fetchRecords = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8080/customers`);
      setCustomerData(response.data || []);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "customer_id",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Active",
      dataIndex: "active",
    },
    {
      title: "Edit",
      render: (_, record) => (
        <EditButton customer_id={record.customer_id}></EditButton>
      ),
    },
    {
      title: "Delete",
      render: (_, record) => <DeleteButton customer_id={record.customer_id} />,
    },
  ];

  const searchChoice = (item) => {
    if (filterChoice === "Customer ID") {
      return (
        search === "" || item.customer_id.toString().includes(search.toString())
      );
    } else if (filterChoice === "First Name") {
      return (
        search.toLowerCase() === "" ||
        item.first_name.toLowerCase().includes(search.toLowerCase())
      );
    } else if (filterChoice === "Last Name") {
      return (
        search.toLowerCase() === "" ||
        item.last_name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  };

  const filteredCustomerData = customerData.filter(searchChoice);

  const handleRowClick = (customer_id) => {
    console.log("Fetching details for Customer ID:", customer_id);
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Filter: {filterChoice || "None"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setFilterChoice("Customer ID")}>
            Customer ID
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterChoice("First Name")}>
            First Name
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterChoice("Last Name")}>
            Last Name
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setFilterChoice("None")}>
            None
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <input
        type={"text"}
        id={"customerInput"}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={"Search"}
      ></input>
      <Table
        loading={loading}
        columns={columns}
        dataSource={filteredCustomerData}
        rowKey="customer_id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record.customer_id),
          style: { cursor: "pointer" },
        })}
        pagination={{
          current: currentPage,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            fetchRecords(page);
          },
        }}
      />
      <Modal open={isCustomerOpen} onClose={() => setIsCustomerOpen(false)}>
        {customerData ? (
          <div>
            <h2>
              {customerData.first_name} {customerData.last_name}'s Information
            </h2>
            <p>Customer ID: {customerData.customer_id}</p>
            <p>Email: {customerData.email}</p>
            <p>Address:</p>
            <p>{customerData.address}</p>
            <p>
              {customerData.city}, {customerData.district},{" "}
              {customerData.postal_code}, {customerData.country}
            </p>
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

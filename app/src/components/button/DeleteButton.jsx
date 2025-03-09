import React from "react";
import axios from "axios";

function DeleteButton({ customer_id }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await axios.post(`http://127.0.0.1:8080/deleteCustomer`, {customer_id});
        alert("Customer deleted successfully!");
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer.");
      }
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete();
      }}
    >
      Delete
    </button>
  );
}

export default DeleteButton;

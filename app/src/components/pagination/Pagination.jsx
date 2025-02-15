import React, { useState } from 'react';

function Pagination({ items, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
        <table>
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
    </div>
  );
}

export default Pagination;
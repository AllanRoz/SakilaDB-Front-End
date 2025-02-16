import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Films = () => {
  const [filterChoice, setFilterChoice] = useState("");

  return (
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
  );
}


export default Films
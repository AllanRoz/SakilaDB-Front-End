import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomersData from '../tables/CustomersData';

const Customers = () => {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await axios.get("http://127.0.0.1:8080/customers")
      setCustomers(response.data)
    })()
  }, [])
  // console.log(customers)
  return (
    <div>
      <CustomersData items={customers} itemsPerPage={10}/>
    </div>
  )
}

export default Customers
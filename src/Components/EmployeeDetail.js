import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EmployeeDetail({ employees }) {
  const { id } = useParams(); // Get the Employee ID from the URL
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const selectedEmployee = employees.find(emp => emp.id === parseInt(id));
    setEmployee(selectedEmployee);
  }, [id, employees]);

  if (!employee) {
    return <div>Employee not found.</div>;
  }

  return (
    <div className="employee-detail">
      <h1>{employee.name}</h1>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Title:</strong> {employee.title}</p>
      <p><strong>Department:</strong> {employee.department}</p>
    </div>
  );
}

export default EmployeeDetail;

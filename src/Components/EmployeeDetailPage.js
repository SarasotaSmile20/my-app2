import React from 'react';
import { useParams } from 'react-router-dom';

function EmployeeDetailPage({ employees }) {
  const { id } = useParams(); // Get the employee ID from the URL
  const employee = employees.find(emp => emp.id === parseInt(id)); // Find the employee

  if (!employee) {
    return <div>Employee not found.</div>;
  }

  return (
    <div className="employee-detail">
      <h2>{employee.name}</h2>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Title:</strong> {employee.title}</p>
      <p><strong>Department:</strong> {employee.department}</p>
    </div>
  );
}

export default EmployeeDetailPage;

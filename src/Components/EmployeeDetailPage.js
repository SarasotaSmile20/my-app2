// src/Components/EmployeeDetailPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';

function EmployeeDetailPage({ employees }) {
  const { id } = useParams();
  const employee = employees.find((emp) => emp.id === parseInt(id));

  if (!employee) {
    return (
      <div>
        <h2>Employee not found</h2>
        <Link to="/">Back to Employee List</Link>
      </div>
    );
  }

  return (
    <div className="employee-detail">
      <h2>Employee Details</h2>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Title:</strong> {employee.title}</p>
      <p><strong>Department:</strong> {employee.department}</p>
      <Link to="/">← Back to Employee List</Link>
    </div>
  );
}

export default EmployeeDetailPage;

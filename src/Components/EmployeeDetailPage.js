import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './EmployeeDetailPage.css';

function EmployeeDetailPage({ employees }) {
  const { id } = useParams(); // Retrieve the id from URL params
  const employee = employees.find((emp) => emp.id === Number(id)); // Convert id to number

  if (!employee) {
    return <div>Employee not found!</div>;
  }

  return (
    <div className="employee-detail-page">
      <div className="employee-detail-header">
        <h2>Employee Details</h2>
      </div>
      <div className="employee-detail-container">
        <div className="employee-photo">
          {employee.picture ? (
            <img src={employee.picture} alt={employee.name} className="detail-photo" />
          ) : (
            <div className="default-photo">{employee.name.charAt(0)}</div>
          )}
        </div>
        <h4>Name: {employee.name}</h4>
        <p>Email: {employee.email}</p>
        <p>Title: {employee.title}</p>
        <p>Department: {employee.department}</p>
        <Link to="/" className="back-btn">
          Back to List
        </Link>
      </div>
    </div>
  );
}

export default EmployeeDetailPage;

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './EmployeeList.css';

function EmployeeList({ employees, removeEmployee }) {
  const { id } = useParams(); // Get ID from URL if present

  // If we're on a detail route like /employee/:id
  if (id) {
    const employee = employees.find(emp => emp.id === parseInt(id));

    if (!employee) {
      return <div>Employee not found.</div>;
    }

    return (
      <div className="employee-detail">
        <h1>{employee.name}</h1>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Title:</strong> {employee.title}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <Link to="/" className="back-btn">← Back to Form</Link>
      </div>
    );
  }

  // Default: show the employee list
  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <div className="employee-name">
              <Link to={`/employee/${employee.id}`}>
                {employee.name}
              </Link>
            </div>
            <div className="employee-actions">
              <button
                onClick={() => removeEmployee(employee.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;

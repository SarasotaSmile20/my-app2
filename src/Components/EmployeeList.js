// src/Components/EmployeeList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

function EmployeeList({ employees, editEmployee, removeEmployee }) {
  return (
    <div className="employee-list">
      <h3>Employee List</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <div className="employee-details">
              {/* Employee image */}
              {employee.picture ? (
                <img
                  src={employee.picture}
                  alt={employee.name}
                  className="employee-image"
                />
              ) : (
                <span className="default-image">No Image</span>
              )}
              {/* Employee name with Link to the details page */}
              <Link to={`/employee/${employee.id}`} className="employee-name">
                {employee.name}
              </Link>
            </div>
            <div className="employee-actions">
              <button className="edit-btn" onClick={() => editEmployee(employee)}>
                Edit
              </button>
              <button className="remove-btn" onClick={() => removeEmployee(employee.id)}>
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

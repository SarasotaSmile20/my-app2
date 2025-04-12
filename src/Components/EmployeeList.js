import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

function EmployeeList({ employees, removeEmployee }) {
  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <div className="employee-name">
              {/* Link matches the path in App.js */}
              <Link to={`/employee/${employee.id}`}>
                {employee.name}
              </Link>
            </div>
            <div className="employee-actions">
              {/* If you want to support edit by ID later */}
              {/* <Link to={`/edit/${employee.id}`} className="edit-btn">Edit</Link> */}
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

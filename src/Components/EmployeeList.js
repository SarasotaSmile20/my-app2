// Components/EmployeeList.js
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

import React from 'react';
import { Link } from 'react-router-dom'; // Add this import statement
import './EmployeeList.css'; // Make sure to import the styles

function EmployeeList(props) {
  return (
    <div className="employee-list">
      <h1>Employee List</h1>
      <ul>
        {props.employees.map((employee) => (
          <li key={employee.EmployeeId}>
            <div className="employee-name">
              {/* Create a link to the employee detail page */}
              <Link to={`/employees/${employee.EmployeeId}`}>
                {employee.name}
              </Link>
            </div>
            <div className="employee-actions">
              {/* Implement Edit and Remove actions here */}
              <Link to={`/edit/${employee.EmployeeId}`} className="edit-btn">
                Edit
              </Link>
              <button
                onClick={() => props.removeEmployee(employee.EmployeeId)}
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

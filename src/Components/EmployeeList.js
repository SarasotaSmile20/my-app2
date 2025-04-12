import React from 'react';
import './EmployeeList.css'; // Make sure to import the styles

function EmployeeList(props) {
  return (
    <div className="employee-list">
      <h1>Employee List</h1>
      <ul>
        {props.employees.map((employee, index) => (
          <li key={index}>
            <div className="employee-name">
              {/* Display employee name without a link */}
              <span className="clickable-name">{employee.name}</span>
            </div>
            <div className="employee-actions">
              {/* Use index for Edit and Remove actions */}
              <button
                onClick={() => props.editEmployee(index, employee)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => props.removeEmployee(index)}
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

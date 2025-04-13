import React from 'react';
import './EmployeeList.css';
import { Link } from 'react-router-dom';

function EmployeeList({ employees, onEdit, removeEmployee }) {
  return (
    <div className="employee-list">
      <h3>Employee List</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <Link to={`/employee/${employee.id}`} className="employee-name">
              {employee.name}
            </Link>
            <div className="employee-actions">
              <button className="edit-btn" onClick={() => onEdit(employee)}>Edit</button>
              <button className="remove-btn" onClick={() => removeEmployee(employee.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;

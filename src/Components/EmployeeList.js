import React from 'react';
import './EmployeeList.css';

function EmployeeList({ employees, editEmployee, removeEmployee }) {
  return (
    <div className="employee-list">
      <h3>Employee List</h3>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            <div className="employee-details">
              {employee.name} - {employee.email} - {employee.title} - {employee.department}
            </div>
            <div className="employee-actions">
              <button onClick={() => editEmployee(index)}>Edit</button>
              <button onClick={() => removeEmployee(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;

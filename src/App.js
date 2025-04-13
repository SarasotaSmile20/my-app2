// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/EmployeeList';
import EmployeeDetailPage from './Components/EmployeeDetailPage';

import useLocalStorage from './useLocalStorage';

function App() {
  const [employees, setEmployees] = useLocalStorage('employees', []);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');
  const [employeeToEdit, setEmployeeToEdit] = React.useState(null);

  // Add or update employee
  const handleSubmitEmployee = (employeeData) => {
    if (employeeToEdit) {
      // Editing existing employee
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeToEdit.id ? { ...employeeData, id: emp.id } : emp
        )
      );
      setFeedbackMessage('Employee updated successfully!');
      setEmployeeToEdit(null); // Clear editing state
    } else {
      // Adding new employee
      const newId = Date.now();
      const employeeWithId = { ...employeeData, id: newId };
      setEmployees((prev) => [...prev, employeeWithId]);
      setFeedbackMessage('Employee added successfully!');
    }
  };

  // Remove employee by ID
  const removeEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    setFeedbackMessage('Employee removed successfully!');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <EmployeeForm
                  key={employeeToEdit?.id || 'new'} // Forces form reset on edit switch
                  employee={employeeToEdit}
                  onSubmit={handleSubmitEmployee}
                  feedbackMessage={feedbackMessage}
                  clearMessage={() => setFeedbackMessage('')}
                />
                <EmployeeList
                  employees={employees}
                  removeEmployee={removeEmployee}
                  onEdit={(employee) => setEmployeeToEdit(employee)}
                />
              </>
            }
          />
          <Route
            path="/employee/:id"
            element={<EmployeeDetailPage employees={employees} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

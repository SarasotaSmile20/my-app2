// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/EmployeeList';
import useLocalStorage from './useLocalStorage';

function App() {
  const [employees, setEmployees] = useLocalStorage('employees', []);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  const addEmployee = (newEmployee) => {
    const newId = Date.now(); // Unique ID using timestamp
    const employeeWithId = { ...newEmployee, id: newId };
    setEmployees((prevEmployees) => [...prevEmployees, employeeWithId]);
    setFeedbackMessage('Employee added successfully!');
  };

  const editEmployee = (index, updatedEmployee) => {
    setEmployees((prevEmployees) => {
      const updatedList = [...prevEmployees];
      updatedList[index] = updatedEmployee;
      return updatedList;
    });
    setFeedbackMessage('Employee updated successfully!');
  };

  const removeEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
    setFeedbackMessage('Employee removed successfully!');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home page: form and employee list */}
          <Route
            path="/"
            element={
              <>
                <EmployeeForm
                  employees={employees}
                  addEmployee={addEmployee}
                  editEmployee={editEmployee}
                  removeEmployee={removeEmployee}
                  feedbackMessage={feedbackMessage}
                  clearMessage={() => setFeedbackMessage('')}
                />
                <EmployeeList employees={employees} removeEmployee={removeEmployee} />
              </>
            }
          />

          {/* Route for detail view handled within EmployeeList */}
          <Route
            path="/employee/:id"
            element={<EmployeeList employees={employees} removeEmployee={removeEmployee} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

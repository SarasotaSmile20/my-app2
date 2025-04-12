// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/EmployeeList';
import EmployeeDetail from './Components/EmployeeDetail';
import useLocalStorage from './useLocalStorage';

function App() {
  const [employees, setEmployees] = useLocalStorage('employees', []);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  const addEmployee = (newEmployee) => {
    const newId = Date.now(); // Assign a unique ID
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

  const removeEmployee = (index) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((_, i) => i !== index)
    );
    setFeedbackMessage('Employee removed successfully!');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main page with form and list */}
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
                <EmployeeList employees={employees} />
              </>
            }
          />

          {/* Employee detail page */}
          <Route
            path="/employee/:id"
            element={<EmployeeDetail employees={employees} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

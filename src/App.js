// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/EmployeeList'; // Import the EmployeeList component
import useLocalStorage from './useLocalStorage';

function App() {
  const [employees, setEmployees] = useLocalStorage('employees', []);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => {
      const updatedEmployees = [...prevEmployees, newEmployee];
      console.log('Employee added:', newEmployee); // Log added employee
      return updatedEmployees;
    });
    setFeedbackMessage('Employee added successfully!');
  };

  const editEmployee = (index, updatedEmployee) => {
    setEmployees((prevEmployees) => {
      const updatedList = [...prevEmployees];
      updatedList[index] = updatedEmployee;
      console.log('Employee updated at index', index, ':', updatedEmployee); // Log updated employee
      return updatedList;
    });
    setFeedbackMessage('Employee updated successfully!');
  };

  const removeEmployee = (index) => {
    setEmployees((prevEmployees) => {
      const updatedList = prevEmployees.filter((_, i) => i !== index);
      console.log('Employee removed at index', index); // Log removed employee
      return updatedList;
    });
    setFeedbackMessage('Employee removed successfully!');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route to the employee form */}
          <Route
            path="/"
            element={
              <EmployeeForm
                employees={employees}
                addEmployee={addEmployee}
                editEmployee={editEmployee}
                removeEmployee={removeEmployee}
                feedbackMessage={feedbackMessage}
                clearMessage={() => setFeedbackMessage('')}
              />
            }
          />
          
          {/* Route to display employee list */}
          <Route
            path="/employees"
            element={
              <EmployeeList employees={employees} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

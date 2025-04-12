// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeForm from './Components/EmployeeForm';
import useLocalStorage from './useLocalStorage';

function App() {
  const [employees, setEmployees] = useLocalStorage('employees', []);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  const addEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
    setFeedbackMessage('Employee added successfully!');
  };

  const editEmployee = (index, updatedEmployee) => {
    const updatedList = [...employees];
    updatedList[index] = updatedEmployee;
    setEmployees(updatedList);
    setFeedbackMessage('Employee updated successfully!');
  };

  const removeEmployee = (index) => {
    const updatedList = employees.filter((_, i) => i !== index);
    setEmployees(updatedList);
    setFeedbackMessage('Employee removed successfully!');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

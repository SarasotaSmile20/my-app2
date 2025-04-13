// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/EmployeeList';
import EmployeeDetailPage from './Components/EmployeeDetailPage'; // This is the renamed version

import useLocalStorage from './useLocalStorage';

function App() {
  const [employees, setEmployees] = useLocalStorage('employees', []);
  const [feedbackMessage, setFeedbackMessage] = React.useState('');

  const addEmployee = (newEmployee) => {
    const newId = Date.now(); // unique id
    const employeeWithId = { ...newEmployee, id: newId };
    setEmployees((prev) => [...prev, employeeWithId]);
    setFeedbackMessage('Employee added successfully!');
  };

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
                  employees={employees}
                  addEmployee={addEmployee}
                  feedbackMessage={feedbackMessage}
                  clearMessage={() => setFeedbackMessage('')}
                />
                <EmployeeList
                  employees={employees}
                  removeEmployee={removeEmployee}
                />
              </>
            }
          />
          <Route
            path="/employee/:id"
            element={
              <EmployeeDetailPage employees={employees} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

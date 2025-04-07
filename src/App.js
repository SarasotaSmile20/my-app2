// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import './App.css';
import EmployeeForm from './Components/EmployeeForm';
import useLocalStorage from './useLocalStorage';

function App() {
  const [employees, setEmployees] = useLocalStorage('employees', []);

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<EmployeeForm addEmployee={addEmployee} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

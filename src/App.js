import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import './App.css';
import EmployeeForm from './Components/EmployeeForm'; // Adjust this path if needed

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<EmployeeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

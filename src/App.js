import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

// Import the EmployeeForm component
import EmployeeForm from './Components/EmployeeForm'; 

// Placeholder components for the routes
function Dashboard() {
  return <h2>Dashboard View</h2>;
}

function Settings() {
  return <h2>Settings View</h2>;
}

function App() {
  return (
    <Router> 
      <div className="App">
        {/* Basic navigation links */}
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li> {/* Link to the Dashboard */}
            <li><Link to="/settings">Settings</Link></li> {/* Link to the Settings */}
            <li><Link to="/employee-form">Employee Form</Link></li> {/* Link to the Employee Form */}
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          {/* Route for the Dashboard */}
          <Route path="/" element={<Dashboard />} />
          {/* Route for the Settings */}
          <Route path="/settings" element={<Settings />} />
          {/* Route for the Employee Form */}
          <Route path="/employee-form" element={<EmployeeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/EmployeeList';
import EmployeeDetailPage from './Components/EmployeeDetailPage';
import CalendarPage from './Components/CalendarPage'; // ✅ Import Calendar Page
import useLocalStorage from './useLocalStorage';

function App() {
  const [employees, setEmployees] = useLocalStorage('employees', []);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSubmitEmployee = (employeeData) => {
    if (employeeToEdit) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeToEdit.id ? { ...employeeData, id: emp.id } : emp
        )
      );
      setFeedbackMessage('Employee updated successfully!');
      setEmployeeToEdit(null);
    } else {
      const newId = Date.now();
      const employeeWithId = { ...employeeData, id: newId };
      setEmployees((prev) => [...prev, employeeWithId]);
      setFeedbackMessage('Employee added successfully!');
    }
  };

  const removeEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    setFeedbackMessage('Employee removed successfully!');
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <div className="theme-toggle-wrapper">
          <label htmlFor="darkModeToggle" className="theme-label">Dark Mode</label>
          <label className="switch">
            <input
              id="darkModeToggle"
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <EmployeeForm
                  key={employeeToEdit?.id || 'new'}
                  employee={employeeToEdit}
                  onSubmit={handleSubmitEmployee}
                  feedbackMessage={feedbackMessage}
                  clearMessage={() => setFeedbackMessage('')}
                />
                <EmployeeList
                  employees={employees}
                  removeEmployee={removeEmployee}
                  editEmployee={(employee) => setEmployeeToEdit(employee)}
                />
              </>
            }
          />
          <Route
            path="/employee/:id"
            element={<EmployeeDetailPage employees={employees} />}
          />
          <Route
            path="/schedule"
            element={<CalendarPage employees={employees} />} // ✅ Calendar route
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

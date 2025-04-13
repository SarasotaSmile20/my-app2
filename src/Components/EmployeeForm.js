import React, { useEffect, useState } from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ employee, onSubmit, feedbackMessage, clearMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    department: '',
  });

  useEffect(() => {
    // If there's an employee being edited, pre-fill the form
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        title: employee.title,
        department: employee.department,
      });
    }
  }, [employee]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, title, department } = formData;

    if (!name || !email || !title || !department) {
      alert('All fields are required.');
      return;
    }

    onSubmit(formData);
    setFormData({
      name: '',
      email: '',
      title: '',
      department: '',
    });
  };

  useEffect(() => {
    if (feedbackMessage) {
      setTimeout(() => clearMessage(), 3000);
    }
  }, [feedbackMessage, clearMessage]);

  return (
    <div className="employee-form">
      <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
        />
        <button type="submit">
          {employee ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      {feedbackMessage && <p className="success-message">{feedbackMessage}</p>}
    </div>
  );
};

export default EmployeeForm;

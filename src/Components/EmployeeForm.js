import React, { useState, useEffect } from 'react';
import './EmployeeForm.css';

function EmployeeForm({ employee, onSubmit }) {
  const [name, setName] = useState(employee?.name || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [title, setTitle] = useState(employee?.title || '');
  const [department, setDepartment] = useState(employee?.department || '');
  const [picture, setPicture] = useState(employee?.picture || '');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = {
      name,
      email,
      title,
      department,
      picture,
    };
    onSubmit(employeeData);
    setConfirmationMessage(employee ? 'Employee updated!' : 'Employee added!');
    setName('');
    setEmail('');
    setTitle('');
    setDepartment('');
    setPicture('');
  };

  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmationMessage]);

  return (
    <div className="employee-form-container">
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Upload Picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      {confirmationMessage && (
        <div className="feedback-message">{confirmationMessage}</div>
      )}
    </div>
  );
}

export default EmployeeForm;

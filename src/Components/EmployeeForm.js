import React, { useState } from 'react';
import './EmployeeForm.css'; // Optional if you have styles here

function EmployeeForm({ employee, onSubmit }) {
  const [name, setName] = useState(employee?.name || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [title, setTitle] = useState(employee?.title || '');
  const [department, setDepartment] = useState(employee?.department || '');
  const [picture, setPicture] = useState(employee?.picture || '');

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result); // Store image data in base64
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
  };

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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeForm;

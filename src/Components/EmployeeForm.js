import React from 'react';
import './EmployeeForm.css';  // CSS is correctly imported

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      title: '',
      department: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted with:', this.state);
    this.setState({ name: '', email: '', title: '', department: '' });
  }

  render() {
    return (
      <div className="employee-form"> {/* Apply CSS class to container */}
        <h2>Add New Employee</h2>
        <form onSubmit={this.handleFormSubmit}>  {/* Matches CSS selector .employee-form form */}
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={this.state.department}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default EmployeeForm;

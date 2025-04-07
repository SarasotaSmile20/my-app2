import React from 'react';
import './EmployeeForm.css'; // Ensure this path is correct

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state with employees from local storage or an empty array
    const storedEmployees = localStorage.getItem('employees');
    this.state = {
      name: '',
      email: '',
      title: '',
      department: '',
      employees: storedEmployees ? JSON.parse(storedEmployees) : []
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, title, department, employees } = this.state;
    const newEmployee = { name, email, title, department };

    // Update state with the new employee
    const updatedEmployees = [...employees, newEmployee];
    this.setState({
      employees: updatedEmployees,
      name: '',
      email: '',
      title: '',
      department: ''
    });

    // Persist the updated employees array to local storage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  }

  render() {
    return (
      <div className="employee-form">
        <h2>Add New Employee</h2>
        <form onSubmit={this.handleFormSubmit}>
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
        <h3>Employee List</h3>
        <ul>
          {this.state.employees.map((employee, index) => (
            <li key={index}>
              {employee.name} - {employee.email} - {employee.title} - {employee.department}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EmployeeForm;

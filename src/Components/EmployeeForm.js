import React from 'react';
import './EmployeeForm.css';

class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      title: '',
      department: '',
      editingIndex: null,
    };
  }

  componentDidUpdate(prevProps) {
    // Clear feedback message after 3 seconds when changed
    if (
      prevProps.feedbackMessage !== this.props.feedbackMessage &&
      this.props.feedbackMessage
    ) {
      setTimeout(() => {
        this.props.clearMessage();
      }, 3000);
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { name, email, title, department, editingIndex } = this.state;

    // Validation: prevent submitting empty fields
    if (!name || !email || !title || !department) {
      alert('All fields are required.');
      return;
    }

    const newEmployee = { name, email, title, department };

    if (editingIndex !== null) {
      this.props.editEmployee(editingIndex, newEmployee);
    } else {
      this.props.addEmployee(newEmployee);
    }

    // Reset form
    this.setState({
      name: '',
      email: '',
      title: '',
      department: '',
      editingIndex: null,
    });
  };

  handleEdit = (index) => {
    const employee = this.props.employees[index];
    this.setState({ ...employee, editingIndex: index });
  };

  render() {
    return (
      <div className="employee-form">
        <h2>{this.state.editingIndex !== null ? 'Edit Employee' : 'Add Employee'}</h2>
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
          <button type="submit">
            {this.state.editingIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>

        {/* Confirmation message */}
        {this.props.feedbackMessage && (
          <p className="success-message">{this.props.feedbackMessage}</p>
        )}

        <h3>Employee List</h3>
        <ul>
          {this.props.employees.map((employee, index) => (
            <li key={index}>
              <div className="employee-details">
                {employee.name} - {employee.email} - {employee.title} - {employee.department}
              </div>
              <div className="employee-actions">
                <button onClick={() => this.handleEdit(index)}>Edit</button>
                <button onClick={() => this.props.removeEmployee(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default EmployeeForm;

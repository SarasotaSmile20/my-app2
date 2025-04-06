import './EmployeeForm.css';  // Import the CSS file

import React from 'react';

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

  // Method to handle input changes
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value // dynamically set state based on the input field's name
    });
  }

  // Method to handle form submission
  handleFormSubmit = (event) => {
    event.preventDefault();  // Prevent page refresh

    // Log the current state to the console
    console.log('Form Submitted with:', this.state);

    // Reset the state to clear the input fields
    this.setState({
      name: '',
      email: '',
      title: '',
      department: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>  {/* Attach onSubmit handler */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}  // Call this function when input changes
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}  // Call this function when input changes
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}  // Call this function when input changes
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={this.state.department}
            onChange={this.handleInputChange}  // Call this function when input changes
          />
        </div>
        <button type="submit">Submit</button>  {/* Submit button */}
      </form>
    );
  }
}

// Exporting the component for use in other parts of the app
export default EmployeeForm;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './EmployeeDetailPage.css';

function EmployeeDetailPage({ employees }) {
  const { id } = useParams();
  const employee = employees.find((emp) => emp.id === Number(id));
  const [activeTab, setActiveTab] = useState('bio');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const storedNotes = localStorage.getItem(`notes-${id}`);
    if (storedNotes) setNotes(storedNotes);
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`notes-${id}`, notes);
  }, [id, notes]);

  if (!employee) {
    return <div className="employee-detail-page">Employee not found!</div>;
  }

  return (
    <div className="employee-detail-page">
      <div className="employee-detail-header">
        <h2>Employee Details</h2>
      </div>

      <div className="employee-detail-container">
        <div className="employee-photo">
          {employee.picture ? (
            <img src={employee.picture} alt={employee.name} className="detail-photo" />
          ) : (
            <div className="default-photo">{employee.name.charAt(0)}</div>
          )}
        </div>

        <div className="tabs">
          <button
            className={activeTab === 'bio' ? 'active' : ''}
            onClick={() => setActiveTab('bio')}
          >
            Bio
          </button>
          <button
            className={activeTab === 'contact' ? 'active' : ''}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
          <button
            className={activeTab === 'notes' ? 'active' : ''}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
        </div>

        <div className={`tab-content fade-in`}>
          {activeTab === 'bio' && (
            <>
              <h4>Name: {employee.name}</h4>
              <p>Title: {employee.title}</p>
              <p>Department: {employee.department}</p>
            </>
          )}

          {activeTab === 'contact' && (
            <>
              <p>Email: {employee.email}</p>
              <a
                className="email-btn"
                href={`mailto:${employee.email}?subject=Hello ${employee.name}`}
              >
                ✉️ Send Email
              </a>
            </>
          )}

          {activeTab === 'notes' && (
            <>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write notes about this employee..."
                className="notes-textarea"
              />
            </>
          )}
        </div>

        <Link to="/" className="back-btn">
          Back to List
        </Link>
      </div>
    </div>
  );
}

export default EmployeeDetailPage;

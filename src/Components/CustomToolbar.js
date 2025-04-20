// Components/CustomToolbar.js
import React from 'react';

function CustomToolbar({ label, onNavigate, onView, views, view }) {
  return (
    <div className="rbc-toolbar">
      {/* Navigation Buttons */}
      <span className="rbc-btn-group">
        <button onClick={() => onNavigate('PREV')}>Back</button>
        <button onClick={() => onNavigate('NEXT')}>Next</button>
      </span>

      {/* Centered Date Label */}
      <span className="rbc-toolbar-label">{label}</span>

      {/* View Switcher */}
      <span className="rbc-btn-group">
        {views.map(v => (
          <button
            key={v}
            className={view === v ? 'rbc-active' : ''}
            onClick={() => onView(v)}
          >
            {v === 'work_week' ? 'Work Week' : v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </span>
    </div>
  );
}

export default CustomToolbar;

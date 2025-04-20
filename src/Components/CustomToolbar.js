import React from 'react';
import { Views } from 'react-big-calendar';

function CustomToolbar({ label, onNavigate, onView }) {
  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={() => onNavigate('PREV')}>Back</button>
        <button onClick={() => onNavigate('NEXT')}>Next</button>
      </span>
      <span className="rbc-toolbar-label">{label}</span>
      <span className="rbc-btn-group">
        <button onClick={() => onView(Views.WORK_WEEK)}>Week</button>
        <button onClick={() => onView(Views.DAY)}>Day</button>
      </span>
    </div>
  );
}

export default CustomToolbar;
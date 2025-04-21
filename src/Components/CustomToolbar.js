// src/Components/CustomToolbar.js

import React from 'react';
import { Views } from 'react-big-calendar';

export default function CustomToolbar({ label, onNavigate, onView, view }) {
  return (
    <div className="rbc-toolbar">
      <button onClick={() => onNavigate('PREV')}>←</button>
      <span className="rbc-toolbar-label">{label}</span>
      <button onClick={() => onNavigate('NEXT')}>→</button>
      <button
        className={view === Views.MONTH ? 'rbc-active' : ''}
        onClick={() => onView(Views.MONTH)}
      >
        Month
      </button>
      <button
        className={view === Views.DAY ? 'rbc-active' : ''}
        onClick={() => onView(Views.DAY)}
      >
        Day
      </button>
    </div>
  );
}

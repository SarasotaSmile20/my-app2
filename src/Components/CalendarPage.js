
// Components/CalendarPage.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css';
import { generateSchedule } from '../utils/generateSchedule';

const localizer = momentLocalizer(moment);

function CalendarPage({ employees }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const schedule = generateSchedule(employees);
    setEvents(schedule);
  }, [employees]);

  return (
    <div className="calendar-page-wrapper">
      <div className="calendar-left">
        <h3>Weekly Employee Schedule</h3>
        <p>This calendar auto-generates a weekly shift schedule.</p>
        <ul>
          <li>Each employee works ~40 hours/week</li>
          <li>At least 2 people are scheduled each day</li>
          <li>Shifts are 9 AM – 5 PM</li>
        </ul>
      </div>

      <div className="calendar-right">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="work_week"
          views={['work_week']}
          style={{ height: 600 }}
        />
      </div>
    </div>
  );
}

export default CalendarPage;

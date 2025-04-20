
// Components/CalendarPage.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css';
import { generateSchedule } from '../utils/generateSchedule';

const localizer = momentLocalizer(moment);

function CalendarPage({ employees }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());

  useEffect(() => {
    const schedule = generateSchedule(employees);
    setEvents(schedule);
  }, [employees]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const handleNavigate = (action) => {
    const newDate = new Date(viewDate);
    if (action === 'TODAY') newDate.setDate(new Date().getDate());
    if (action === 'NEXT') newDate.setDate(newDate.getDate() + 7);
    if (action === 'PREV') newDate.setDate(newDate.getDate() - 7);
    setViewDate(newDate);
  };

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
        <div className="nav-buttons">
          <button onClick={() => handleNavigate('TODAY')}>Today</button>
          <button onClick={() => handleNavigate('PREV')}>Back</button>
          <button onClick={() => handleNavigate('NEXT')}>Next</button>
        </div>
      </div>

      <div className="calendar-right">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={[Views.WORK_WEEK]}
          defaultView={Views.WORK_WEEK}
          date={viewDate}
          onNavigate={setViewDate}
          step={60}
          min={new Date(1970, 1, 1, 9, 0)}
          max={new Date(1970, 1, 1, 17, 0)}
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.resource?.color || '#3174ad',
              color: 'white',
              borderRadius: '6px',
              padding: '2px 6px',
              border: 'none'
            }
          })}
        />
      </div>

      {selectedEvent && (
        <div className="inline-modal">
          <div className="modal-content">
            <h4>Edit Shift</h4>
            <p><strong>{selectedEvent.title}</strong></p>
            <p>{moment(selectedEvent.start).format('dddd, MMM Do YYYY')}</p>
            <p>Time: 9 AM – 5 PM</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;

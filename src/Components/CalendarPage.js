// Components/CalendarPage.js
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css';
import { generateSchedule } from '../utils/generateSchedule';
import CustomToolbar from './CustomToolbar'; // Custom toolbar removes "Today" button

const localizer = momentLocalizer(moment);

function CalendarPage({ employees }) {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewDate, setViewDate] = useState(new Date());
  const [view, setView] = useState(Views.WORK_WEEK);

  useEffect(() => {
    const schedule = generateSchedule(employees);
    setEvents(schedule);
  }, [employees]);

  const handleAutoGenerate = () => {
    const newSchedule = generateSchedule(employees);
    setEvents(newSchedule); // Overwrite old schedule
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setSelectedEvent(null);
  };

  const handleEventEdit = (start, end) => {
    if (!selectedEvent) return;
    const updatedEvents = events.map((evt) =>
      evt.id === selectedEvent.id ? { ...evt, start, end } : evt
    );
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  const handleAddShift = (start, end) => {
    const newShift = {
      id: Date.now(),
      title: 'New Shift',
      start,
      end,
      resource: { color: '#3174ad' }
    };
    setEvents([...events, newShift]);
    setSelectedSlot(null);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter(evt => evt.id !== selectedEvent.id));
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-page-wrapper">
      <div className="calendar-header-bar">
        <h3>Weekly Employee Schedule</h3>
        <button onClick={handleAutoGenerate} className="auto-generate-btn">
          Auto Generate
        </button>
      </div>

      <div className="calendar-right">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={[Views.WORK_WEEK, Views.DAY]}
          view={view}
          onView={setView}
          date={viewDate}
          onNavigate={setViewDate}
          selectable
          step={60}
          min={new Date(1970, 1, 1, 9, 0)}
          max={new Date(1970, 1, 1, 17, 0)}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          components={{ toolbar: CustomToolbar }} 
          style={{ height: 600 }}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: event.resource?.color || '#3174ad',
              color: 'white',
              borderRadius: '6px',
              padding: '2px 6px',
              border: 'none',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              textAlign: 'center'
            }
          })}
        />
      </div>

      {(selectedEvent || selectedSlot) && (
        <div className="inline-modal">
          <div className="modal-content">
            {selectedEvent ? (
              <>
                <h4>Edit Shift</h4>
                <p><strong>{selectedEvent.title}</strong></p>
                <label>Start Time:</label>
                <input type="datetime-local" onChange={(e) => {
                  const start = new Date(e.target.value);
                  handleEventEdit(start, selectedEvent.end);
                }} />
                <label>End Time:</label>
                <input type="datetime-local" onChange={(e) => {
                  const end = new Date(e.target.value);
                  handleEventEdit(selectedEvent.start, end);
                }} />
                <button onClick={handleDeleteEvent}>Delete</button>
              </>
            ) : (
              <>
                <h4>Add New Shift</h4>
                <p>{moment(selectedSlot.start).format('dddd, MMM Do YYYY')}</p>
                <button onClick={() => handleAddShift(selectedSlot.start, selectedSlot.end)}>Add</button>
              </>
            )}
            <button onClick={() => {
              setSelectedEvent(null);
              setSelectedSlot(null);
            }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css';
import { generateSchedule } from '../utils/generateSchedule';
import CustomToolbar from './CustomToolbar';

const localizer = momentLocalizer(moment);

function getEmployeeColor(name) {
  const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 85%)`;
}

function CalendarPage({ employees }) {
  const [events, setEvents] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [viewDate, setViewDate] = useState(new Date());
  const [view, setView] = useState(Views.WORK_WEEK);

  useEffect(() => {
    const schedule = generateSchedule(employees);
    setEvents(schedule);
  }, [employees]);

  const handleAutoGenerate = () => {
    const currentWeekStart = moment().startOf('week');
    const viewedWeekStart = moment(viewDate).startOf('week');
    const weekOffset = viewedWeekStart.diff(currentWeekStart, 'weeks');

    const newSchedule = generateSchedule(employees, weekOffset);
    setEvents(newSchedule);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEditStartTime(moment(event.start).format('YYYY-MM-DDTHH:mm'));
    setEditEndTime(moment(event.end).format('YYYY-MM-DDTHH:mm'));
    setSelectedSlot(null);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setSelectedEvent(null);
    const start = moment(slotInfo.start).hour(9).minute(0).format('YYYY-MM-DDTHH:mm');
    const end = moment(slotInfo.start).hour(17).minute(0).format('YYYY-MM-DDTHH:mm');
    setStartTime(start);
    setEndTime(end);
  };

  const handleEventEdit = () => {
    if (!selectedEvent) return;
    const start = new Date(editStartTime);
    const end = new Date(editEndTime);
    const updatedEvents = events.map((evt) =>
      evt.id === selectedEvent.id ? { ...evt, start, end } : evt
    );
    setEvents(updatedEvents);
    setSelectedEvent(null);
  };

  const handleAddShift = () => {
    if (!selectedEmployee || !startTime || !endTime) return;
    const start = new Date(startTime);
    const end = new Date(endTime);
    const color = getEmployeeColor(selectedEmployee);
    const newShift = {
      id: Date.now(),
      title: selectedEmployee,
      start,
      end,
      resource: { color }
    };
    setEvents([...events, newShift]);
    setSelectedSlot(null);
    setSelectedEmployee('');
    setStartTime('');
    setEndTime('');
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;
    setEvents(events.filter(evt => evt.id !== selectedEvent.id));
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-page-wrapper">
      <div className="calendar-header-bar">
        <div className="calendar-title-group">
          <h3>Weekly Employee Schedule</h3>
          <button onClick={handleAutoGenerate} className="auto-generate-btn">
            Auto Generate
          </button>
        </div>
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
              backgroundColor: event.resource?.color || '#ccc',
              color: '#000',
              borderRadius: '6px',
              padding: '2px 6px',
              border: '1px solid #999',
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
                <input
                  type="datetime-local"
                  value={editStartTime}
                  onChange={(e) => setEditStartTime(e.target.value)}
                />
                <label>End Time:</label>
                <input
                  type="datetime-local"
                  value={editEndTime}
                  onChange={(e) => setEditEndTime(e.target.value)}
                />
                <button onClick={handleEventEdit}>Save</button>
                <button onClick={handleDeleteEvent}>Delete</button>
              </>
            ) : (
              <>
                <h4>Add New Shift</h4>
                <label>Employee:</label>
                <select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                  <option value="">Select an employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.name}>{emp.name}</option>
                  ))}
                </select>
                <label>Start Time:</label>
                <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <label>End Time:</label>
                <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                <button onClick={handleAddShift}>Add</button>
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
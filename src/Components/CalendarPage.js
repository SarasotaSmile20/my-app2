
// src/Components/CalendarPage.js

import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css';

import CustomToolbar from './CustomToolbar';
import generateSchedule from '../utils/generateSchedule';

const localizer = momentLocalizer(moment);

export default function CalendarPage({ employees }) {
  const [events, setEvents] = useState([]);
  const [viewDate, setViewDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);

  const [selEvt, setSelEvt] = useState(null);
  const [selSlot, setSelSlot] = useState(null);
  const [selEmp, setSelEmp] = useState('');
  const [startT, setStartT] = useState('');
  const [endT, setEndT] = useState('');
  const [editSt, setEditSt] = useState('');
  const [editEn, setEditEn] = useState('');

  const refreshMonth = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    setEvents(generateSchedule(employees, year, month));
  };

  const deleteAll = () => {
    if (window.confirm('Are you sure you want to delete *all* shifts?')) {
      setEvents([]);
      setSelEvt(null);
      setSelSlot(null);
    }
  };

  const onSelectEvent = ev => {
    setSelEvt(ev);
    setEditSt(moment(ev.start).format('YYYY-MM-DDTHH:mm'));
    setEditEn(moment(ev.end).format('YYYY-MM-DDTHH:mm'));
    setSelSlot(null);
  };

  const onSelectSlot = slot => {
    setSelSlot(slot);
    setSelEvt(null);
    setStartT(moment(slot.start).hour(9).minute(0).format('YYYY-MM-DDTHH:mm'));
    setEndT(moment(slot.start).hour(17).minute(0).format('YYYY-MM-DDTHH:mm'));
  };

  const saveEdit = () => {
    if (!selEvt) return;
    const s = moment(editSt).toDate();
    const e = moment(editEn).toDate();
    setEvents(evts => evts.map(x => x.id === selEvt.id ? { ...x, start: s, end: e } : x));
    setSelEvt(null);
  };

  const addShift = () => {
    if (!selEmp || !startT || !endT) return;
    setEvents(evts => [
      ...evts,
      {
        id: Date.now(),
        title: selEmp,
        start: new Date(startT),
        end: new Date(endT),
        resource: {}
      }
    ]);
    setSelSlot(null);
    setSelEmp('');
  };

  const deleteShift = () => {
    if (!selEvt) return;
    setEvents(evts => evts.filter(x => x.id !== selEvt.id));
    setSelEvt(null);
  };

  function CustomEvent({ event }) {
    return <div className="rbc-event-content">{event.title}</div>;
  }

  return (
    <div className="calendar-page-wrapper">
      <div className="calendar-header-bar">
        <div className="calendar-title-group">
          <h3>Employee Schedule</h3>
          <button onClick={refreshMonth} className="auto-generate-btn">Auto Generate</button>
          <button onClick={deleteAll} className="delete-all-btn">Delete All</button>
        </div>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        allDayAccessor="allDay"
        defaultView={Views.MONTH}
        views={[Views.MONTH, Views.DAY]}
        view={view}
        onView={setView}
        date={viewDate}
        onNavigate={setViewDate}
        selectable
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        components={{ toolbar: CustomToolbar, event: CustomEvent }}
        style={{ height: 700 }}
        min={new Date(1970, 1, 1, 8, 0)}
        max={new Date(1970, 1, 1, 22, 0)}
        step={60}
        timeslots={1}
      />

      {(selEvt || selSlot) && (
        <div className="inline-modal">
          <div className="modal-content">
            {selEvt ? (
              <>
                <h4>Edit Shift</h4>
                <label>Start:</label>
                <input type="datetime-local" value={editSt} onChange={e => setEditSt(e.target.value)} />
                <label>End:</label>
                <input type="datetime-local" value={editEn} onChange={e => setEditEn(e.target.value)} />
                <button onClick={saveEdit}>Save</button>
                <button onClick={deleteShift}>Delete Shift</button>
              </>
            ) : (
              <>
                <h4>Add Shift</h4>
                <label>Employee:</label>
                <select value={selEmp} onChange={e => setSelEmp(e.target.value)}>
                  <option value="">Select an employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.name}>{emp.name}</option>
                  ))}
                </select>
                <label>Start:</label>
                <input type="datetime-local" value={startT} onChange={e => setStartT(e.target.value)} />
                <label>End:</label>
                <input type="datetime-local" value={endT} onChange={e => setEndT(e.target.value)} />
                <button onClick={addShift}>Add</button>
              </>
            )}
            <button onClick={() => { setSelEvt(null); setSelSlot(null); }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

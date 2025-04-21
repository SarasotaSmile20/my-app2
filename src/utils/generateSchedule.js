// src/utils/generateSchedule.js

import moment from 'moment';

/**
 * Generate a 4‑shift schedule for each employee, every day of the month,
 * but with two **back‑to‑back** random days off per employee each week.
 *
 * Shifts (in order) are:
 *   • 08:00–16:00
 *   • 10:00–18:00
 *   • 12:00–20:00
 *   • 14:00–22:00
 *
 * @param {Array}  employees  Array of { id?, name }
 * @param {number} year       Full year (e.g. 2025)
 * @param {number} month      Zero‑based month (0=Jan…11=Dec)
 * @returns {Array}           Array of events for react‑big‑calendar
 */
export default function generateSchedule(employees, year, month) {
  const schedule = [];

  // fixed shift windows
  const SHIFT_WINDOWS = [
    [8, 16],
    [10, 18],
    [12, 20],
    [14, 22]
  ];

  // color palette
  const palette = [
    'rgba(0,128,128,0.6)',
    'rgba(255,99,132,0.6)',
    'rgba(75,192,192,0.6)',
    'rgba(255,206,86,0.6)'
  ];
  const colorMap = {};
  employees.forEach((emp, i) => {
    colorMap[emp.name] = palette[i % palette.length];
  });

  // compute days in month
  const firstOf = moment({ year, month, day: 1 });
  const totalDays = firstOf.daysInMonth();

  // For each ISO week in month, pick one random startDow in 0..5,
  // so offs are [startDow, startDow+1].
  const offsByWeek = {}; // { weekNum: { empName: Set<dow> } }

  for (let d = 1; d <= totalDays; d++) {
    const date = firstOf.clone().date(d);
    const week = date.isoWeek();

    if (!offsByWeek[week]) {
      offsByWeek[week] = {};
      employees.forEach(emp => {
        const startDow = Math.floor(Math.random() * 6); // 0..5
        offsByWeek[week][emp.name] = new Set([startDow, startDow + 1]);
      });
    }
  }

  // build schedule
  for (let d = 1; d <= totalDays; d++) {
    const date = firstOf.clone().date(d);
    const week = date.isoWeek();
    const dow  = date.day(); // 0=Sun..6=Sat

    employees.forEach((emp, idx) => {
      // skip if this is one of their two back‑to‑back days off
      if (offsByWeek[week][emp.name].has(dow)) return;

      // assign shift
      const [sh, eh] = SHIFT_WINDOWS[idx % SHIFT_WINDOWS.length];
      const start = date.clone().hour(sh).minute(0).toDate();
      const end   = date.clone().hour(eh).minute(0).toDate();

      schedule.push({
        id:      `${emp.id||emp.name}-${date.format('YYYYMMDD')}-${sh}`,
        title:   emp.name,
        start,
        end,
        allDay:  false,
        resource:{ color: colorMap[emp.name] }
      });
    });
  }

  return schedule;
}


// src/utils/generateSchedule.js

import moment from 'moment';

const SHIFTS = [
  { start: 8, end: 16 },
  { start: 10, end: 18 },
  { start: 12, end: 20 },
  { start: 14, end: 22 },
];

export default function generateSchedule(employees, year, month) {
  const schedule = [];
  const daysInMonth = moment({ year, month }).daysInMonth();

  // Assign consistent colors per employee
  const colors = [
    'rgba(0, 128, 128, 0.6)',
    'rgba(255, 99, 132, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)'
  ];
  const colorMap = {};
  employees.forEach((emp, i) => {
    colorMap[emp.name] = colors[i % colors.length];
  });

  // Determine two consecutive days off per employee (same every week)
  const daysOfWeek = [0, 1, 2, 3, 4, 5, 6];
  const daysOffMap = {};
  employees.forEach((emp, i) => {
    const firstOff = i % 6;  // rotate start days off
    const secondOff = (firstOff + 1) % 7;
    daysOffMap[emp.name] = [firstOff, secondOff];
  });

  // Loop through each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = moment({ year, month, day });
    const dow = date.day();

    let shiftIdx = 0;
    const shuffledEmployees = [...employees].sort(() => Math.random() - 0.5);

    for (const emp of shuffledEmployees) {
      if (daysOffMap[emp.name].includes(dow)) continue;  // skip day off

      if (shiftIdx >= SHIFTS.length) break;  // all shifts covered

      const { start, end } = SHIFTS[shiftIdx];
      const shiftStart = date.clone().hour(start).minute(0).toDate();
      const shiftEnd = date.clone().hour(end).minute(0).toDate();

      schedule.push({
        id: `${emp.name}-${date.format('YYYYMMDD')}`,
        title: emp.name,
        start: shiftStart,
        end: shiftEnd,
        resource: { color: colorMap[emp.name] }
      });

      shiftIdx++;
    }
  }

  return schedule;
}

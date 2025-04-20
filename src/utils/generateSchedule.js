import moment from 'moment';

const employeeColors = {
  'Sarah Wilson': 'rgba(0, 128, 128, 0.2)',    // Teal
  'Alice': 'rgba(255, 0, 0, 0.2)',             // Red
  'Bob': 'rgba(0, 128, 0, 0.2)'                // Green
};

export function generateSchedule(employees, weekOffset = 0) {
  const schedule = [];
  const days = [1, 2, 3, 4, 5]; // Monday to Friday
  const startHour = 9;
  const endHour = 17;
  const hoursPerDay = endHour - startHour;

  const employeeMap = new Map();
  employees.forEach(emp => {
    const color = employeeColors[emp.name] || 'rgba(100, 100, 255, 0.2)';
    employeeMap.set(emp.name, {
      ...emp,
      color,
      hours: 0
    });
  });

  const baseMonday = moment().startOf('week').add(1 + weekOffset * 7, 'days');

  for (let i = 0; i < days.length; i++) {
    const day = baseMonday.clone().add(i, 'days');
    const available = Array.from(employeeMap.values())
      .filter(e => e.hours < 40)
      .sort(() => 0.5 - Math.random());

    const assignedNames = new Set();
    let assignedCount = 0;

    for (let j = 0; j < available.length && assignedCount < 2; j++) {
      const emp = available[j];
      if (assignedNames.has(emp.name)) continue;

      const start = day.clone().hour(startHour).toDate();
      const end = day.clone().hour(endHour).toDate();

      schedule.push({
        id: Date.now() + Math.random(),
        title: emp.name,
        start,
        end,
        resource: { color: emp.color }
      });

      emp.hours += hoursPerDay;
      assignedNames.add(emp.name);
      assignedCount++;
    }
  }

  return schedule;
}
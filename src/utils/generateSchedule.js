
// utils/generateSchedule.js

const employeeColors = [
    '#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D', '#C084FC', '#00B8A9', '#FF8C42'
  ];
  
  export function generateSchedule(employees) {
    const schedule = [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const startHour = 9;
    const endHour = 17;
    const hoursPerDay = endHour - startHour;
  
    const employeeMap = new Map();
    employees.forEach((emp, index) => {
      employeeMap.set(emp.name, {
        ...emp,
        color: employeeColors[index % employeeColors.length],
        hours: 0,
      });
    });
  
    const dateRef = new Date();
    const baseMonday = new Date(dateRef.setDate(dateRef.getDate() - dateRef.getDay() + 1));
    baseMonday.setHours(0, 0, 0, 0);
  
    for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
      const shiftDate = new Date(baseMonday);
      shiftDate.setDate(baseMonday.getDate() + dayOffset);
      shiftDate.setHours(startHour, 0, 0, 0);
  
      const shiftEnd = new Date(shiftDate);
      shiftEnd.setHours(endHour);
  
      const availableEmployees = Array.from(employeeMap.values())
        .filter(emp => emp.hours <= 40)
        .sort(() => 0.5 - Math.random());
  
      const assigned = availableEmployees.slice(0, 2);
      assigned.forEach(emp => {
        schedule.push({
          id: Date.now() + Math.random(),
          title: emp.name,
          start: new Date(shiftDate),
          end: new Date(shiftEnd),
          resource: { color: emp.color }
        });
        emp.hours += hoursPerDay;
      });
    }
  
    return schedule;
  }
  

// utils/generateSchedule.js
export function generateSchedule(employees) {
    const shifts = [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const startHour = 9;
    const endHour = 17;
    const hoursPerShift = endHour - startHour;
  
    // Create slots: 5 days, 1 shift per day, 2 people each
    const totalSlots = days.length;
  
    // Ensure each employee works close to 40 hours
    const shiftsPerEmployee = Math.floor((40 / hoursPerShift));
  
    let employeeIndex = 0;
  
    for (let i = 0; i < totalSlots; i++) {
      const date = new Date();
      const shiftDay = (date.getDay() + i + 1) % 7; // skip current day
      const shiftDate = new Date();
      shiftDate.setDate(date.getDate() + ((shiftDay + 7 - date.getDay()) % 7));
      shiftDate.setHours(startHour, 0, 0, 0);
      const shiftEnd = new Date(shiftDate);
      shiftEnd.setHours(endHour);
  
      // Assign 2 employees to each shift
      for (let j = 0; j < 2; j++) {
        const employee = employees[employeeIndex % employees.length];
        shifts.push({
          title: employee.name,
          start: new Date(shiftDate),
          end: new Date(shiftEnd),
        });
        employeeIndex++;
      }
    }
  
    return shifts;
  }
  
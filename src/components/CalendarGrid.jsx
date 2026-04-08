import React from "react";

function CalendarGrid({
  currentMonth,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  function getDaysInMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay(); // 0-6
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = [];

    // empty slots
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // actual dates
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }

  const days = getDaysInMonth(currentMonth);

  function handleDateClick(date) {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (date > startDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  }

  return (
    <div>
      {/* Week names */}
      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid">
        {days.map((date, index) => {
          const isStart =
            startDate &&
            date &&
            date.toDateString() === startDate.toDateString();

          const isEnd =
            endDate && date && date.toDateString() === endDate.toDateString();

          const isInRange =
            startDate && endDate && date && date > startDate && date < endDate;

          const today = new Date();

          const isToday = date && date.toDateString() === today.toDateString();
          const dayIndex = index % 7;
          const isWeekend = dayIndex === 0 || dayIndex === 6;

          return (
            <div
              key={index}
              className={`cell 
  ${isStart ? "start" : ""} 
  ${isEnd ? "end" : ""} 
  ${isInRange ? "inRange" : ""}
  ${isToday ? "today" : ""}
  ${isWeekend ? "weekend" : ""}
`}
              onClick={() => date && handleDateClick(date)}
            >
              {date ? date.getDate() : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarGrid;

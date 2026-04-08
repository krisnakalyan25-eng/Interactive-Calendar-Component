import { useEffect, useState } from "react";

import "./calendar.css";
import CalendarGrid from "./CalendarGrid";

function CalendarContainer() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [theme, setTheme] = useState("light");

  function getKey() {
    if (startDate && endDate) {
      return `${startDate.toDateString()}_${endDate.toDateString()}`;
    }
    return "general";
  }

  function formatMonth(date) {
    return date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  }

  function goToPrevMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  }

  function goToNextMonth() {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  }

  useEffect(() => {
    const saved = localStorage.getItem("notesMap");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notesMap", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const key = getKey();
    setCurrentNote(notes[key] || "");
  }, [startDate, endDate, notes]);
  return (
    <div className={`calendar-container ${theme}`}>
      {/* Hero Section */}
      <div className="hero">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          alt="hero"
        />
        <div className="overlay">
          <button onClick={goToPrevMonth}>⬅</button>

          <h1>{formatMonth(currentMonth)}</h1>

          <button onClick={goToNextMonth}>➡</button>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom">
        {/* Calendar Grid */}
        <div className="calendar-grid">
          <CalendarGrid
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          {startDate && !endDate && (
            <p style={{ marginTop: "10px" }}>Select end date</p>
          )}

          {startDate && endDate && (
            <p style={{ marginTop: "10px" }}>
              Selected: {startDate.toDateString()} → {endDate.toDateString()}
            </p>
          )}
        </div>

        {/* Notes Section */}
        <div className="notes">
          <h3>Notes</h3>
          <p>
            {startDate && endDate
              ? `Notes for: ${startDate.toDateString()} → ${endDate.toDateString()}`
              : "General Notes"}
          </p>
          <textarea
            placeholder="Write your notes..."
            value={currentNote}
            onChange={(e) => {
              const value = e.target.value;
              setCurrentNote(value);

              const key = getKey();

              setNotes((prev) => ({
                ...prev,
                [key]: value,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarContainer;

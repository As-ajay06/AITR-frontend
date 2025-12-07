import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Monday = 0

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const isToday = (day) => {
    return day === today.getDate() &&
           currentDate.getMonth() === today.getMonth() &&
           currentDate.getFullYear() === today.getFullYear();
  };

  // Highlight some dates (you can make this dynamic)
  const highlightedDates = [9, 17, 18, 23];

  return (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 p-3 hover:shadow-lg transition-shadow group">
      {/* Header with Gradient Background */}
      <div className="flex items-center justify-between mb-2 p-1.5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-md border border-slate-200">
        <button
          onClick={goToPreviousMonth}
          className="p-1 hover:bg-white rounded transition-all hover:scale-110"
        >
          <ChevronLeft className="w-3 h-3 text-slate-600" />
        </button>
        <h3 className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded shadow-sm">
          {monthNames[currentDate.getMonth()].substring(0, 3)} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-1 hover:bg-white rounded transition-all hover:scale-110"
        >
          <ChevronRight className="w-3 h-3 text-slate-600" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-0.5 mb-1.5">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-bold text-slate-600 py-0.5 bg-slate-50 rounded">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={index} className="aspect-square min-h-[18px]" />;
          }
          
          const highlighted = highlightedDates.includes(day);
          const todayClass = isToday(day) 
            ? "bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold shadow-sm scale-105" 
            : "";
          const highlightClass = highlighted && !isToday(day) 
            ? "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 font-bold border border-purple-200" 
            : "";
          
          return (
            <div
              key={index}
              className={`aspect-square min-h-[18px] flex items-center justify-center text-xs font-bold rounded transition-all duration-200 ${
                todayClass || highlightClass || "hover:bg-blue-50 hover:scale-105 text-slate-700"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarWidget;


import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-lg shadow-md p-3 text-white overflow-hidden group">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)]" />
      </div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm shadow-md transform group-hover:scale-110 transition-transform">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold">Live Clock</h3>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold mb-1 font-mono tracking-wide drop-shadow-lg">
            {formatTime(time)}
          </div>
          <div className="text-[10px] text-blue-100 font-medium bg-white/10 rounded px-2 py-1 inline-block">
            {formatDate(time)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockWidget;


import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

function Card({ children, title, bgColor = 'bg-yellow-500', link = '/', className = '' }) {
  return (
    <Link to={link} className={`block ${className}`}> 
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
        <div className="p-8 flex flex-col items-center justify-center min-h-[280px]">
          <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
            {children}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h2>
            <div className="flex items-center justify-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-sm font-medium">Explore</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;

import React from 'react';
import { Link } from 'react-router-dom';

function Card({ children, title, bgColor = 'bg-yellow-500', link = '/' }) {
  return (
    <Link to={link} className="w-1/5"> 
      <div className="border-2 border-black rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        <div
          className={`h-60 rounded cursor-pointer shadow-custom flex flex-col justify-center items-center transition-all duration-300 ease-in-out hover:shadow-2xl ${bgColor}`}
        >
          <h1 className="text-center pb-3 text-2xl font-semibold uppercase text-black">
            {title}
          </h1>
          <span className="flex items-center justify-center text-9xl">
            {children}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Card;

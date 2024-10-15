import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <header className="bg-rose-200 p-4 dark:bg-gray-800 dark:text-white transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">MealDB App</h1>
        <nav className="flex items-center">
          <Link to="/" className="hover:text-rose-400 mx-4 ">Home</Link>
          <Link to="/favorites" className="hover:text-rose-400">Favorites</Link>
          <button onClick={toggleTheme} className="text-2xl ml-4">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <header className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-rose-200'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>MealDB App</h1>
        <nav>
          <Link to="/" className={`mx-4 ${isDarkMode ? 'text-white hover:text-rose-400' : 'text-gray-800 hover:text-rose-400'}`}>Home</Link>
          <Link to="/favorites" className={`mx-4 ${isDarkMode ? 'text-white hover:text-rose-400' : 'text-gray-800 hover:text-rose-400'}`}>Favorites</Link>
        </nav>
        <button 
          onClick={toggleTheme} 
          className={`p-2 rounded ${isDarkMode ? 'bg-rose-500 text-white' : 'bg-gray-800 text-white'}`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;

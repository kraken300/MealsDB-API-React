import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MealDetail from './pages/MealDetail';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <Router>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}>
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/favorites" element={<Favorites isDarkMode={isDarkMode} />} />
          <Route path="/meal/:id" element={<MealDetail isDarkMode={isDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

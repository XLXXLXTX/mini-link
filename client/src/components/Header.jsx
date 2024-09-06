import { useState, useEffect } from 'react';

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="flex justify-between items-center p-4 bg-background-light dark:bg-background-dark 
    transition-colors duration-500">
      
      <button
        onClick={toggleDarkMode}
        className="bg-secondary-light dark:bg-secondary-dark p-2 rounded"
      >
        {darkMode ? '🌞' : '🌚'}
      </button>
    </header>
  );
};

export default Header;




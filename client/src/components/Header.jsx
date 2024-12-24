import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ linkName, linkRoute }) => {
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
    <header
      className='flex justify-between items-center p-4 bg-background-light dark:bg-background-dark
      transition-colors duration-500'
    >
      <button
        onClick={toggleDarkMode}
        className='bg-secondary-light dark:bg-secondary-dark p-2 rounded'
      >
        {darkMode ? '🌞' : '🌚'}
      </button>
      {linkName && linkRoute && (
        <Link to={linkRoute} className='text-xl font-semibold'>
          <button className='bg-secondary-light dark:bg-secondary-dark p-2 rounded'>
            {linkName}
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;

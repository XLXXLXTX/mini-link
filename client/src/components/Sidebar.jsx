import React from 'react';

const Sidebar = ({
  isOpen,
  setCurrentPage,
  setCollapsed,
  pages,
  logOutObj,
}) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-all duration-300 ease-in-out z-50 flex flex-col ${
        isOpen ? 'w-48' : 'w-16'
      }`}
    >
      <div
        className='flex items-center p-4 cursor-pointer hover:bg-blue-900'
        onClick={() => setCollapsed(!isOpen)}
      >
        {isOpen ? '◀' : '▶'}
        {isOpen && (
          <span className='ml-2 transition-opacity duration-300'>Collapse</span>
        )}
      </div>

      <ul className='list-none p-0 m-0'>
        {pages.map((page, index) => (
          <li
            key={index}
            className='flex items-center p-4 cursor-pointer hover:bg-blue-900 hover:text-yellow-400'
            onClick={() => setCurrentPage(page.page.toLowerCase())}
          >
            {page.icon}
            {isOpen && (
              <span className='ml-2 transition-opacity duration-300'>
                {page.page}
              </span>
            )}
          </li>
        ))}

        <li
          className='flex items-center p-4 cursor-pointer hover:bg-blue-900 hover:text-yellow-400'
          onClick={logOutObj.onClickFunction}
        >
          {logOutObj.icon}
          {isOpen && (
            <span className='ml-2 transition-opacity duration-300'>
              {logOutObj.page}
            </span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

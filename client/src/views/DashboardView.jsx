import { useState } from 'react';

import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

import KeysView from './KeysView';

const DashboardView = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('keys');

  const handleLogout = () => {
    console.log('Logging out...');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'keys':
        return <KeysView setCurrentPage={setCurrentPage} />;
      default:
        return null;
    }
  };

  const pages = [{ icon: '🔑', page: 'Keys' }];

  return (
    <div className='flex min-h-screen'>
      <Sidebar
        isOpen={isSidebarOpen}
        setCurrentPage={setCurrentPage}
        setCollapsed={toggleSidebar}
        pages={pages}
        logOutObj={{
          icon: '🔚',
          page: 'Logout',
          onClickFunction: handleLogout,
        }}
      />
      <Content isOpen={isSidebarOpen}>{renderPageContent()}</Content>
    </div>
  );
};

export default DashboardView;

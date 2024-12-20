import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

import KeysView from './KeysView';
import LinksView from './LinksView';

const DashboardView = () => {
  const backendURL =
    import.meta.env.VITE_BACKEND_URL === undefined
      ? 'http://localhost:3001'
      : `${import.meta.env.VITE_BACKEND_URL}`;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('keys');

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // check if the token is stored in the local storage
      const response = await axios.get(`${backendURL}/auth/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      // if response is not ok (200), then redirect to login page
      if (response.status !== 200) {
        navigate('/login');
      }

    } catch (error) {
      navigate('/login');
      console.error('ERROR: Unauthorized to access dashboard', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'keys':
        return <KeysView endpoint={`${backendURL}`} path={`auth/keys`} />;
      case 'links':
        return <LinksView endpoint={`${backendURL}`} path={'auth/links'} />;
      default:
        return null;
    }
  };

  const pages = [{ icon: '🔑', page: 'Keys' }, { icon: '🔗', page: 'Links' }];

  useEffect(() => {
    fetchUser();
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

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

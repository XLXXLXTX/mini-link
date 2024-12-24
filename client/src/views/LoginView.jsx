import React from 'react';

import Login from '../components/Login';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginView = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header className='h-16' linkName='Shortener' linkRoute='/' />

      {/* content that will grow to take up the remaining space */}
      <main
        className='flex-grow flex items-center justify-center
        bg-gradient-to-tl from-blue-700 to-indigo-400
        dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-800'
      >
        <Login />
      </main>

      {/* Footer */}
      <Footer className='h-16' />
    </div>
  );
};

export default LoginView;

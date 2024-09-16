import React from 'react';

import URLShortener from './components/URLShortener';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Header */}
      <Header className='h-16' />

      {/* content that will grow to take up the remaining space */}
      <main
        className='flex-grow flex items-center justify-center
        bg-gradient-to-tl from-blue-700 to-indigo-400
        dark:bg-gradient-to-tl dark:from-slate-950 dark:to-slate-800'
      >
        <URLShortener />
      </main>

      {/* Footer */}
      <Footer className='h-16' />
    </div>
  );
};

export default App;

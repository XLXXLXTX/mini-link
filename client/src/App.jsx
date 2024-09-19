import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import URLShortenerView from './views/URLShortenerView';
import LoginView from './views/LoginView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<URLShortenerView />} />
        <Route path='/login' element={<LoginView />} />
      </Routes>
    </Router>
  );
}

export default App;

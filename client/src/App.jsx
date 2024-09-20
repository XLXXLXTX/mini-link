import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import URLShortenerView from './views/URLShortenerView';
import LoginView from './views/LoginView';
import Error404 from './views/Error404View';
import DashboardView from './views/DashboardView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<URLShortenerView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/admin' element={<DashboardView />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;

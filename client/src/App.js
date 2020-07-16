import React from 'react';
import './styles/styles.css';

import Nav from './components/nav/Nav';
import Dashboard from './components/dashboard/Dashboard';
function App() {
  document.title = "Fix Finder Beta";
  return (
    <body>
      <Nav />
      <Dashboard />
    </body>
  );
}

export default App;

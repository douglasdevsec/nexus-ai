import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import { Settings } from './pages/Settings';
import { Dashboard } from './pages/Dashboard';
import { Scanners } from './pages/Scanners';

const Reports = () => <div><h2>Reportes en construcción...</h2></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="scanners" element={<Scanners />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import { Settings } from './pages/Settings';

const Dashboard = () => <div><h2>Dashboard en construcción...</h2></div>;
const Scanners = () => <div><h2>Escáneres en construcción...</h2></div>;
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

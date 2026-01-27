import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import OverviewDashboard from './features/Overview';
import WizardPage from './features/Wizard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OverviewDashboard />} />
        <Route path="/create" element={<WizardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

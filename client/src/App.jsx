import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import OverviewDashboard from './features/Overview';
import PropertyWizard from './features/PropertyWizard';
import PropertyDetails from './features/PropertyDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OverviewDashboard />} />
        <Route path="/create" element={<PropertyWizard />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

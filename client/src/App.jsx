import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// We will import feature entry points here later
// We import feature entry points here
import DashboardPage from './features/dashboard/ui/DashboardPage';
import WizardPage from './features/wizard/ui/WizardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/create" element={<WizardPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

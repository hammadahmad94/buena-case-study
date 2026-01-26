import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// We will import feature entry points here later
// import { DashboardPage } from './features/dashboard';
// import { WizardPage } from './features/wizard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div style={{padding: 20}}>Dashboard Placeholder</div>} />
        <Route path="/create" element={<div style={{padding: 20}}>Wizard Placeholder</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

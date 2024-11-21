import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GeneratorPage from './pages/GeneratorPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
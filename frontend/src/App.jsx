import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import AuthPage from './pages/AuthPage';
import CareerTest from './pages/CareerTest';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<CareerTest/>} />
        <Route path="/results" element={<ResultPage/>} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;

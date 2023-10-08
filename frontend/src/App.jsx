import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for user registration */}
        
        <Route path="/register" element={<Register />} />

        {/* Route for user login */}
        <Route path="/login" element={<Login />} />

        {/* Route for the user dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirect to login page if no route matches */}
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
    
  );
}

export default App;

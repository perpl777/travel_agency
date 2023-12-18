import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeadPage from '../headPage/headPage';
import LoginPage from "../login/login";
import RegisterPage from "../register/register";
import { AuthProvider } from '../tour/AuthContext';

function App() {

  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route exact path="/" element={<HeadPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
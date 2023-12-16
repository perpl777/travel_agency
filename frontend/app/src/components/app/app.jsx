import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeadPage from '../headPage/headPage';
import LoginPage from "../login/login";
import RegisterPage from "../register/register";
import DocRegister from '../documentsRegister/documentsRegister/docRegister';

function App() {

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<HeadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/docRegister" element={<DocRegister />} />  
        </Routes>
    </Router>
  );
}

export default App;
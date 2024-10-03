import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBarComponent from './components/Navbar';
import Home from './pages/Home';
import UserPage from './pages/UserPage.jsx';

const App = () => {
  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
};

export default App;
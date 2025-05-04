import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home.jsx';
import Navbar from './components/Navbar.jsx';
import CreateProfile from './components/CreateProfile.jsx';
import ViewProfiles from './components/ViewProfile.jsx';
import StudentProfile from './components/StudentProfile';

function App() {
  return (
    <div className='relative'>
      <div className='sticky top-0 z-5'>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProfile />} />
        <Route path="/viewprofile" element={<ViewProfiles/>} />
        <Route path="/viewprofile/:category" element={<ViewProfiles />} />
        <Route path="/student/:id" element={<StudentProfile />} />
      </Routes>
    </div>
    
  );
}

export default App;

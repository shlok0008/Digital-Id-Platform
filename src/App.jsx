import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home.jsx';
import Navbar from './components/Navbar.jsx';
import CreateProfile from './components/CreateProfile.jsx';
import ViewProfiles from './components/ViewProfile.jsx';
import StudentProfile from './components/StudentProfile';
import BioDataProfile from './components/BioDataProfile.jsx';
import BuyerCardProfile from './components/BuyerCardProfile.jsx';
import SellerProfile from './components/SellerProfile.jsx';
import ProfessionalProfile from './components/ProfessionalProfile.jsx';

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
        <Route path="/biodata/:id" element={<BioDataProfile />} />
        <Route path="/buyercard/:id" element={<BuyerCardProfile />} />
        <Route path="/seller/:id" element={<SellerProfile />} />
        <Route path="/professional/:id" element={<ProfessionalProfile />} />
      </Routes>
    </div>
    
  );
}

export default App;

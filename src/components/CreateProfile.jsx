import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfessionalIDForm from './ProfessionalIdForm.jsx'; // 🟢 import the form
import StudentIDForm from './StudentIDForm.jsx';
import BuyerCardForm from './BuyerCardForm.jsx';
import SellerCardForm from './SellerCardForm.jsx';
import BioDataForm from './BioDataForm.jsx';

const options = ['Student ID', 'Professional Portfolio', 'Buyer', 'Seller', 'Bio Data'];

const CreateProfile = () => {
  const [active, setActive] = useState('');
  const [arrowPosition, setArrowPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const handleClick = (label, index) => {
    setActive(label);
    setArrowPosition(index);
  };

  const renderContent = () => {
    switch (active) {
      case 'Professional Portfolio':
        return <ProfessionalIDForm />;
      case 'Student ID':
        return <StudentIDForm />;
      case 'Buyer':
        return <BuyerCardForm />;
      case 'Seller':
        return <SellerCardForm />;
      case 'Bio Data':
        return <BioDataForm />;
      default:
        return <div className="mt-20 text-gray-700 text-lg">This is the {active} Form.</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="flex h-[92.4vh]">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col relative shadow-md">
        <div className="flex flex-col items-start p-4 space-y-4">
          {options.map((label, index) => (
            <div
              key={label}
              className={`cursor-pointer px-4 py-2 w-full rounded-lg transition-all duration-300 ${
                active === label ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleClick(label, index)}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Arrow animation */}
        {active && (
          <motion.div
            className="absolute left-0 top-[25px] w-0 h-0 border-l-[15px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent"
            animate={{
              top: `${arrowPosition * 56 + 25}px`,
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white p-6 relative overflow-y-auto">
        {active ? (
          <>
            {/* <motion.h1
              className="text-3xl font-bold text-gray-800 absolute top-4 left-1/2 -translate-x-1/2"
              key={active}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {active}
            </motion.h1> */}
            <div className="mt-2">{renderContent()}</div>
          </>
        ) : (
          <div className="text-center text-gray-500 text-xl mt-40">
            Please select an option from the left.
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProfile;

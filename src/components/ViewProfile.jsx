import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const options = ['Student ID', 'Professional Portfolio', 'Buyer', 'Seller', 'Bio Data'];

const ViewProfiles = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [arrowPosition, setArrowPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');

  const handleClick = (label, index) => {
    setArrowPosition(index);
    navigate(`/viewprofile/${label.toLowerCase().replace(/\s/g, '-')}`);
  };

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    setError('');
    setProfiles([]);

    const fetchProfiles = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/profiles/${category}`);
        setProfiles(res.data);
      } catch (err) {
        setError('Failed to fetch profiles.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [category]);

  const renderCards = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <motion.div
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    if (profiles.length === 0) {
      return (
        <div className="text-gray-600 text-center mt-10">
          No profiles found for {category.replace(/-/g, ' ')}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {profiles.map((profile, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h3 className="text-xl font-semibold mb-2">{profile.name || 'Unnamed'}</h3>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            {/* Add more fields conditionally if needed */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex h-[92.4vh]">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col relative shadow-md">
        <div className="flex flex-col items-start p-4 space-y-4">
          {options.map((label, index) => {
            const slug = label.toLowerCase().replace(/\s/g, '-');
            return (
              <div
                key={label}
                className={`cursor-pointer px-4 py-2 w-full rounded-lg transition-all duration-300 ${
                  category === slug ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => handleClick(label, index)}
              >
                {label}
              </div>
            );
          })}
        </div>

        {/* Arrow animation */}
        {category && (
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
      <div className="flex-1 bg-white p-6 overflow-y-auto">
        {category ? (
          <>
            <motion.h2
              className="text-2xl font-bold text-gray-800 mb-4"
              key={category}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {category.replace(/-/g, ' ')} Profiles
            </motion.h2>
            {renderCards()}
          </>
        ) : (
          <div className="text-center text-gray-500 text-xl mt-40">
            Please select a category from the left.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProfiles;

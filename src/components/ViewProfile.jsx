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
    sessionStorage.setItem('selectedCategory', label); // Store the selected category in sessionStorage
  };

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    setError('');
    setProfiles([]);

    const fetchProfiles = async () => {
      try {
        let url = '';
        switch (category) {
          case 'student-id':
            url = 'http://localhost:5000/api/students';
            break;
          case 'professional-portfolio':
            url = 'http://localhost:5000/api/professionals';
            break;
          case 'buyer':
            url = 'http://localhost:5000/api/buyercards';
            break;
          case 'seller':
            url = 'http://localhost:5000/api/sellers';
            break;
          case 'bio-data':
            url = 'http://localhost:5000/api/biodata';
            break;
          default:
            throw new Error('Unknown category');
        }

        const res = await axios.get(url);
        setProfiles(res.data);
      } catch (err) {
        setError('Failed to fetch profiles.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [category]);

  // Effect to get the saved category and set arrowPosition when component loads
  useEffect(() => {
    const savedCategory = sessionStorage.getItem('selectedCategory');
    if (savedCategory) {
      const index = options.indexOf(savedCategory);
      setArrowPosition(index !== -1 ? index : 0); // Set the position based on saved category
    }
  }, []);

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

    const renderProfileCard = (profile) => {
      switch (category) {
        case 'student-id':
          return (
            <div
              key={profile._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer"
              onClick={() => navigate(`/student/${profile._id}`)}
            >
              <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
              <p><strong>ID:</strong> {profile.id_number}</p>
            </div>
          );

        case 'bio-data':
          return (
            <div
              key={profile._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer"
              onClick={() => navigate(`/biodata/${profile._id}`)}
            >
              {profile.photo && (
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                />
              )}
              <h3 className="text-xl font-semibold text-center mb-2">{profile.fullName}</h3>
              <p className="text-center text-gray-600 mb-1"><strong>Location:</strong> {profile.location}</p>
              <p className="text-center text-gray-600 mb-1"><strong>Email:</strong> {profile.email}</p>
              <p className="text-center text-gray-600 mb-1"><strong>Phone:</strong> {profile.phone}</p>
            </div>
          );

        case 'buyer':
          return (
            <div
              key={profile._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 cursor-pointer border-t-4"
              style={{ borderColor: profile.brandColor }}
              onClick={() => navigate(`/buyercard/${profile._id}`)} // Navigate on card click
            >
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-sm text-gray-600">{profile.email}</p>
              <p className="text-sm text-gray-600">{profile.phone}</p>
            </div>
          );

          case 'seller':
            return (
              <div
                key={profile._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6 cursor-pointer border-t-4"
                style={{ borderColor: profile.brandColor }}
                onClick={() => navigate(`/seller/${profile._id}`)} // Adjust the navigate path accordingly
              >
                <h2 className="text-xl font-semibold">{profile.businessName}</h2>
                <p className="text-sm text-gray-600">{profile.owner}</p>
                <p className="text-sm text-gray-600">{profile.phone}</p>
              </div>
            );

            case 'professional-portfolio':
              return (
                <div
                  key={profile._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer relative group"
                  onClick={() => navigate(`/professional/${profile._id}`)}
                >
                  <div className="flex items-start gap-4">
                    {profile.photo && (
                      <img
                        src={profile.photo}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-blue-200"
                      />
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-blue-900">{profile.fullName}</h2>
                      <p className="text-blue-600 font-medium">{profile.company}</p>
                      <p className="text-sm text-gray-600 mt-2">{profile.services}</p>
                    </div>
                    {profile.logo && (
                      <img
                        src={profile.logo}
                        alt="Company Logo"
                        className="w-16 h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-blue-50">
                    <div className="flex flex-wrap gap-2 text-sm">
                      {profile.location && (
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                          📍 {profile.location}
                        </span>
                      )}
                      {profile.email && (
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                          ✉️ {profile.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );

        default:
          return (
            <div
              key={profile._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              {profile.photo && (
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                />
              )}
              <h3 className="text-xl font-semibold text-center mb-2">{profile.fullName}</h3>
              <p className="text-center text-gray-600 mb-1"><strong>Location:</strong> {profile.location}</p>
              <p className="text-center text-gray-600 mb-1"><strong>Email:</strong> {profile.email}</p>
              <p className="text-center text-gray-600 mb-1"><strong>Phone:</strong> {profile.phone}</p>
            </div>
          );
      }
    };

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {profiles.map((profile) => renderProfileCard(profile))}
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
                className={`cursor-pointer px-4 py-2 w-full rounded-lg transition-all duration-300 ${category === slug ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
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

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMail, FiPhone, FiGlobe, FiLinkedin, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi';

const ProfessionalProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/professionals/${id}`);
        setProfile(res.data);
      } catch (err) {
        setError('Profile not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center">
        <div className="text-red-500 text-xl mb-4">{error || 'Profile not found'}</div>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft className="mr-2" /> Back to Professionals
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-full md:w-1/3">
              {profile.photo && (
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-blue-100 mx-auto"
                />
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-900">{profile.fullName}</h1>
              <p className="text-xl text-blue-600 mt-2">{profile.company}</p>
              <p className="text-gray-600 mt-2">{profile.services}</p>
              
              <div className="mt-4 flex flex-wrap gap-4">
                {profile.mobile && (
                  <a href={`tel:${profile.mobile}`} className="flex items-center text-blue-600">
                    <FiPhone className="mr-2" /> {profile.mobile}
                  </a>
                )}
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="flex items-center text-blue-600">
                    <FiMail className="mr-2" /> {profile.email}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Company Section */}
          {profile.logo && (
            <div className="mt-8 pt-8 border-t border-blue-100">
              <div className="flex items-center gap-4">
                <img
                  src={profile.logo}
                  alt="Company Logo"
                  className="w-24 h-24 object-contain"
                />
                <div>
                  <h2 className="text-xl font-semibold text-blue-900">{profile.company}</h2>
                  {profile.address && (
                    <p className="text-gray-600 mt-2">{profile.address}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {(profile.website || profile.linkedin || profile.twitter) && (
            <div className="mt-8 pt-8 border-t border-blue-100">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Connect</h3>
              <div className="flex gap-4">
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <FiGlobe className="text-2xl text-blue-600" />
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <FiLinkedin className="text-2xl text-blue-600" />
                  </a>
                )}
                {profile.twitter && (
                  <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <FiTwitter className="text-2xl text-blue-600" />
                  </a>
                )}
                {profile.instagram && (
                  <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <FiInstagram className="text-2xl text-blue-600" />
                  </a>
                )}
                {profile.facebook && (
                  <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <FiFacebook className="text-2xl text-blue-600" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.location && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Location</h4>
                <p className="text-gray-600">{profile.location}</p>
              </div>
            )}
            
            {profile.services && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Services</h4>
                <p className="text-gray-600">{profile.services}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;
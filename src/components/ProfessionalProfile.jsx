import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGlobe,FiLinkedin,FiTwitter,FiInstagram, FiFacebook, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp, FaStar } from 'react-icons/fa';
import {QRCodeCanvas} from 'qrcode.react';

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
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const profileLink = `${window.location.origin}/professional/${id}`;

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
        <div className="text-red-500 text-xl mb-4">{error}</div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 text-white">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden text-center relative">
        {/* Premium Badge */}
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          PREMIUM MEMBER
        </div>

        {/* Profile Image */}
        <div className="mt-6">
          <img
            src={profile.photo}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-red-500 mx-auto object-cover"
          />
        </div>

        {/* Green Box - Company Info */}
        <div className="bg-green-600 text-white py-3 mt-4">
          <h1 className="text-xl font-bold uppercase">{profile.company || 'Company'}</h1>
          <p className="text-sm mt-1">{profile.fullName}</p>
          <p className="text-sm">{profile.services}</p>
        </div>

        {/* Communication Buttons */}
        <div className="flex justify-center gap-6 mt-4">
          <a href={`tel:${profile.mobile}`} className="bg-blue-100 text-blue-700 rounded-full p-3 hover:scale-110 transition">
            <FiPhone size={20} />
          </a>
          <a href={`https://wa.me/${profile.mobile}`} target="_blank" rel="noopener noreferrer" className="bg-green-100 text-green-700 rounded-full p-3 hover:scale-110 transition">
            <FaWhatsapp size={20} />
          </a>
          <a href={`mailto:${profile.email}`} className="bg-orange-100 text-orange-700 rounded-full p-3 hover:scale-110 transition">
            <FiMail size={20} />
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-4 space-y-2 px-4">
          {profile.mobile && (
            <div className="bg-black text-white px-4 py-2 rounded-full flex items-center justify-center gap-2">
              <FiPhone /> {profile.mobile}
            </div>
          )}
          {profile.email && (
            <div className="bg-black text-white px-4 py-2 rounded-full flex items-center justify-center gap-2">
              <FiMail /> {profile.email}
            </div>
          )}
        </div>

        {(profile.website || profile.linkedin || profile.twitter || profile.instagram || profile.facebook || profile.telegram || profile.youtube) && (
          <div className="mt-8">
            <div className="flex justify-center gap-4 flex-wrap">
              {profile.facebook && (
                <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-110 transition">
                  <FiFacebook className="text-2xl" />
                </a>
              )}
              {profile.instagram && (
                <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:scale-110 transition">
                  <FiInstagram className="text-2xl" />
                </a>
              )}
              {profile.twitter && (
                <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:scale-110 transition">
                  <FiTwitter className="text-2xl" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:scale-110 transition">
                  <FiLinkedin className="text-2xl" />
                </a>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:scale-110 transition">
                  <FiGlobe className="text-2xl" />
                </a>
              )}
              {profile.telegram && (
                <a href={profile.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:scale-110 transition">
                  <i className="fab fa-telegram text-2xl" />
                </a>
              )}
              {profile.youtube && (
                <a href={profile.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:scale-110 transition">
                  <i className="fab fa-youtube text-2xl" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* QR Code */}
        <div className="mt-6 px-4 pb-6">
          <div className="flex justify-center">
            <QRCodeCanvas value={profileLink} size={120} />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Scan QR Code to go to Visiting Card</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;

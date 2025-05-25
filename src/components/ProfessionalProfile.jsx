import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaLink } from 'react-icons/fa6';

const ProfessionalProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [showPaymentOverlay, setShowPaymentOverlay] = useState(false);
  const profileLink = `${window.location.origin}/professional/${id}`;

  // Color Theme Constants
  const BACKGROUND_COLOR = '#f5f0eb';     // Page background
  const CARD_COLOR = '#fdf6f0';           // Card background (skin tone)
  const HEADER_COLOR = '#8B5E3C';         // Header (solid brown)

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

  useEffect(() => {
  // Generate QR code for the profile link
  const generateQR = async () => {
    try {
      const QRCode = await import('qrcode');
      QRCode.toDataURL(profileLink, { width: 200 }, (err, url) => {
        if (!err) setQrCode(url);
      });
    } catch (err) {
      console.error('Failed to generate QR code:', err);
    }
  };

    generateQR();
  }, [profileLink]);

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

  const socialLinks = [
    { key: 'facebook', label: 'Facebook', icon: <FaFacebookF className="text-[#3b5998]" /> },
    { key: 'twitter', label: 'Twitter', icon: <FaXTwitter className="text-black" /> },
    { key: 'linkedin', label: 'LinkedIn', icon: <FaLinkedinIn className="text-[#0077b5]" /> },
    { key: 'instagram', label: 'Instagram', icon: <FaInstagram className="text-[#C13584]" /> },
    { key: 'email', label: 'Email', icon: <FaEnvelope className="text-[#c71610]" /> },
    { key: 'website', label: 'Website', icon: <FaLink className="text-[#4a4a4a]" /> },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: BACKGROUND_COLOR }}>
      <div className="max-w-3xl mx-auto rounded-2xl shadow-xl overflow-hidden" style={{ backgroundColor: CARD_COLOR }}>
        {/* Header Section */}
        <div className="p-6 flex justify-between items-center" style={{ backgroundColor: HEADER_COLOR }}>
          <div>
            <h1 className="text-2xl font-bold text-white">{profile.company}</h1>
            <p className="text-white font-semibold">Address : <span className='font-medium text-blue-100'>{profile.address}</span></p>
          </div>
          <img
            src={profile.logo}
            alt="Company Logo"
            className="w-16 h-16 object-contain bg-white rounded-lg p-1"
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-center my-6">
          <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
          <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between px-6 pb-6">
          {/* Circular Photo */}
          <div className="w-40 h-40 rounded-full ml-5 overflow-hidden border-4 border-gray-300 shadow-md">
            <img
              src={profile.photo}
              alt={profile.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Full Name, Designation, Description */}
          <div className="flex flex-col items-center overflow-hidden max-w-lg">
            <h3 className="text-2xl font-bold text-gray-800">{profile.fullName}</h3>
            <p className="text-md font-semibold text-gray-600 mt-1">{profile.designation}</p>
            <p className="text-gray-700 mt-4 whitespace-pre-line text-center">{profile.description}</p>
          </div>
        </div>

        {/* Social Links Section */}
        {(profile.facebook || profile.twitter || profile.linkedin || profile.instagram || profile.website || profile.email) && (
          <div className="px-6 py-8">
            {/* Section Heading with lines */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
              <h2 className="text-2xl font-semibold text-gray-800 text-center">Social Links</h2>
              <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
            </div>

            {/* Link Cards */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {socialLinks.map(({ key, label, icon }) =>
                profile[key] ? (
                  <a
                    key={key}
                    href={key === 'email' ? `mailto:${profile[key]}` : profile[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-center gap-1 p-4 bg-[#fdf6f0] rounded-xl border hover:shadow-md transition duration-200"
                  >
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                      {icon}
                      {label}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{profile[key]}</p>
                  </a>
                ) : null
              )}
            </div>
          </div>
        )}

          {/* Middle Panel */}
          <div className="md:col-span-2 space-y-4">

            {/* Products / Services */}
              <div className="px-6 py-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
                  <h2 className="text-2xl font-semibold text-gray-800 text-center">Products / Services</h2>
                  <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
                </div>

                {profile.productsAndServices && profile.productsAndServices.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {profile.productsAndServices.map((item, index) => {
                      const whatsappNumber = profile.whatsapp?.replace(/\D/g, ''); // clean number
                      const whatsappURL = whatsappNumber
                        ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                            `Hi, I’m interested in "${item.title}". Please share more details.`
                          )}`
                        : null;

                      return (
                        <div
                          key={index}
                          className="border rounded-lg p-4 shadow bg-white flex flex-col"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-40 object-cover rounded mb-3"
                            />
                          )}
                          <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1 flex-1">{item.description}</p>
                          <p className="text-sm font-semibold mt-3 text-gray-700">
                            Price: {item.currency} {item.price}
                          </p>

                          {whatsappURL && (
                            <a
                              href={whatsappURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ backgroundColor: HEADER_COLOR }}
                              className="mt-4 text-white text-sm font-medium py-2 px-4 rounded hover:bg-amber-950 transition duration-200 text-center"
                            >
                              Enquiry Now
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-sm italic">
                    No products or services added yet.
                  </div>
                )}
              </div>



            {/* YouTube Videos Section */}
            <div className="px-6 py-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
                <h2 className="text-2xl font-semibold text-gray-800 text-center">YouTube Videos</h2>
                <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
              </div>

              {profile.youtubeLinks && profile.youtubeLinks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {profile.youtubeLinks.map((link, index) => (
                    <div
                      key={index}
                      className="bg-black rounded-xl overflow-hidden shadow-lg"
                    >
                      <div className="text-white text-sm font-semibold p-2">YouTube</div>
                      <div className="aspect-video">
                        <iframe
                          className="w-full h-full"
                          src={link.replace('watch?v=', 'embed/')}
                          title={`YouTube Video ${index + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm italic">
                  No YouTube videos added.
                </div>
              )}
            </div>
          </div>

          {/* Location Section */}
          <div className="px-6 py-8">
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
              <h2 className="text-2xl font-semibold text-gray-800 text-center">Location</h2>
              <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
            </div>

            {profile.location ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Service Area</h3>
                <p className="text-gray-600 whitespace-pre-line">{profile.location}</p>
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm italic">
                No location information provided
              </div>
            )}

            {/* Payment Options Section */}
              <div className="px-6 py-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
                  <h2 className="text-2xl font-semibold text-gray-800 text-center">Payment Options</h2>
                  <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
                </div>

                {profile.qrCode ? (
                  <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                    <button 
                      onClick={() => setShowPaymentOverlay(true)}
                      className="flex flex-col items-center gap-2 hover:bg-gray-50 p-4 rounded-lg transition"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-700">QR</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-sm italic">
                    No payment options available
                  </div>
                )}
              </div>

              {/* Payment Overlay */}
              {showPaymentOverlay && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-800">Payment Details</h3>
                      <button 
                        onClick={() => setShowPaymentOverlay(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {profile.paymentName && (
                        <div>
                          <p className="text-sm text-gray-500">Payee Name</p>
                          <p className="font-medium">{profile.paymentName}</p>
                        </div>
                      )}

                      {profile.paymentContact && (
                        <div>
                          <p className="text-sm text-gray-500">Contact Number</p>
                          <p className="font-medium">{profile.paymentContact}</p>
                        </div>
                      )}

                      {profile.qrCode && (
                        <div className="flex flex-col items-center pt-4">
                          <p className="text-sm text-gray-500 mb-2">Scan QR Code</p>
                          <img 
                            src={profile.qrCode} 
                            alt="Payment QR Code" 
                            className="w-48 h-48 object-contain border border-gray-200 rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Share Profile Section */}
              <div className="px-6 py-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
                  <h2 className="text-2xl font-semibold text-gray-800 text-center">Share Profile</h2>
                  <div className="flex-1 h-[2px] bg-amber-800 mx-4" />
                </div>

                <div className="bg-white rounded-lg shadow p-6 space-y-6">
                  {/* Option 1: Link with Copy Button */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Copy Profile Link</h3>
                    <div className="flex">
                      <input
                        type="text"
                        readOnly
                        value={profileLink}
                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
                        onClick={(e) => e.target.select()}
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(profileLink);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-r-lg transition"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Option 2: QR Code */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Share via QR Code</h3>
                    <div className="flex justify-center">
                      <div className="border border-gray-200 p-3 rounded-lg">
                        {qrCode ? (
                          <img src={qrCode} alt="Profile QR Code" className="w-40 h-40" />
                        ) : (
                          <div className="w-40 h-40 flex items-center justify-center bg-gray-100">
                            <span className="text-gray-500">Generating QR...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;

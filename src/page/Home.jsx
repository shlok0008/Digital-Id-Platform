import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/Background.webp'; // Make sure the image is inside `src/assets`

const Home = () => {
  return (
    <div
      className="h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-black h-screen w-screen absolute opacity-50"></div>

      {/* Animated Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-end pr-30">
        <motion.div
          className="text-center text-white px-4"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Digital Identity Platform
          </motion.h1>

          <motion.p
            className="mb-6 text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Create your First Digital ID with our platform!
          </motion.p>

          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link to="/create">
              <button className="bg-white text-black px-5 py-2 rounded hover:bg-gray-400 transition">
                Create Profile
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition">
                View Profiles
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

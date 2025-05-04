import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Checks if the current path starts with "/viewprofile"
  const isOnViewProfile = location.pathname.startsWith('/viewprofile');

  return (
    <nav className="flex justify-between bg-white items-center px-6 py-4 font-black shadow-xl">
      <Link to={'/'}>
        <h1 className="text-xl font-semibold">Digital Identity Platform</h1>
      </Link>
      <div>
        {isOnViewProfile ? (
          <Link to="/create">
            <button className="bg-green-500 hover:bg-green-600 text-white mx-2 px-4 py-2 rounded">
              Create Profile
            </button>
          </Link>
        ) : (
          <Link to="/viewprofile">
            <button className="bg-blue-500 hover:bg-blue-600 text-white mx-2 px-4 py-2 rounded">
              View Profile
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


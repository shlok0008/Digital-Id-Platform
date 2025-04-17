import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-white items-center px-6 py-4 font-black shadow-xl">
        <Link to={'/'}>
            <h1 className="text-xl font-semibold">Digital Identity Platform</h1>
        </Link>
      <div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white mx-2 px-4 py-2 rounded">
            View Profile
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

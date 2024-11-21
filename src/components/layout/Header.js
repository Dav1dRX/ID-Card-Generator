import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-gray-800 py-4">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">ID Master</Link>
      <nav>
        <Link to="/generator" className="text-white hover:text-gray-300">Generate ID</Link>
      </nav>
    </div>
  </header>
);

export default Header;
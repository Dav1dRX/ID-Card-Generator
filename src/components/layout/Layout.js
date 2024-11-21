import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MovingDotsBackground from '../common/MovingDotsBackground';

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-900 text-white">
    <MovingDotsBackground />
    <Header />
    <main className="flex-grow container mx-auto px-4 py-8">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
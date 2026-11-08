import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-ground">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;


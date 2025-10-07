
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-muted text-sm">&copy; {new Date().getFullYear()} Learnify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

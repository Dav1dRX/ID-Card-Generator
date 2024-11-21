import React from 'react';

const Button = ({ children, ...props }) => (
  <button
    className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
    {...props}
  >
    {children}
  </button>
);

export default Button;
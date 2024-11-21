import React from 'react';

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-purple-500"
      {...props}
    />
  </div>
);

export default Input;
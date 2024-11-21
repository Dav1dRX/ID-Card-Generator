import React from 'react';

const DecorativeElements = ({ colors, opacity = 0.1 }) => (
  <>
    {/* Geometric patterns */}
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill={colors[0]} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
    
    {/* Decorative lines */}
    <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r" 
      style={{ 
        backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        opacity: 0.3 
      }} 
    />
  </>
);

export default DecorativeElements;
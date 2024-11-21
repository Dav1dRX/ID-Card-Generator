import React, { useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const IDCardPreview = ({ cardData, gradientColors, shapePoints, updateShapePoints, showQR, gradientAngle }) => {
  const svgRef = useRef(null);

  // Separate useEffect for SVG event listeners
  useEffect(() => {
    const svg = svgRef.current;
    
    if (!svg) return; // Guard clause for null ref

    const handleMouseMove = (event) => {
      if (event.buttons !== 1) return;
      
      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      
      const svgPoint = point.matrixTransform(svg.getScreenCTM()?.inverse());
      if (!svgPoint) return;

      const closestPointIndex = shapePoints.reduce((closest, point, index) => {
        const distance = Math.hypot(point.x - svgPoint.x, point.y - svgPoint.y);
        return distance < closest.distance ? { index, distance } : closest;
      }, { index: -1, distance: Infinity }).index;

      if (closestPointIndex !== -1) {
        const newPoints = [...shapePoints];
        newPoints[closestPointIndex] = { x: svgPoint.x, y: svgPoint.y };
        updateShapePoints(newPoints);
      }
    };

    svg.addEventListener('mousemove', handleMouseMove);
    return () => svg?.removeEventListener('mousemove', handleMouseMove);
  }, [svgRef, shapePoints, updateShapePoints]);

  // Calculate gradient coordinates based on the angle
  const calculateGradientCoords = (angle) => {
    const radians = (angle - 90) * (Math.PI / 180);
    return {
      x1: 50 - 50 * Math.cos(radians),
      y1: 50 - 50 * Math.sin(radians),
      x2: 50 + 50 * Math.cos(radians),
      y2: 50 + 50 * Math.sin(radians),
    };
  };

  const gradientCoords = calculateGradientCoords(gradientAngle);

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg relative hover:shadow-xl transition-shadow duration-300 flex flex-col" 
         style={{ width: '320px', height: '480px' }} 
         id="id-card-preview">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="subtle-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill={gradientColors[0]} />
          </pattern>
          <rect width="100%" height="100%" fill="url(#subtle-pattern)" />
        </svg>
      </div>

      {/* Header Section with Gradient */}
      <div className="relative h-32 -mx-6 -mt-6 p-6 mb-4 rounded-t-lg"
           style={{
             background: `linear-gradient(${gradientAngle}deg, ${gradientColors[0]}, ${gradientColors[1]})`
           }}>
        <div className="flex items-center gap-4">
          {cardData.profileImage && (
            <img 
              src={cardData.profileImage} 
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          )}
          <div className="text-white">
            <h1 className="text-2xl font-bold">{cardData.name || 'Name'}</h1>
            <p className="text-lg opacity-90">{cardData.title || 'Title'}</p>
          </div>
        </div>
      </div>

      {/* Reorganized Body Content */}
      <div className="flex-1 space-y-4">
        {/* Professional Info Section */}
        <div className="border-b border-gray-200 pb-3 space-y-2">
          <h2 className="font-medium text-gray-600">{cardData.cargo || 'Cargo'}</h2>
          <div className="flex justify-between text-sm text-gray-500">
            <div>
              <span className="font-medium">Mode: </span>
              {cardData.workMode === 'office' ? 'Office-based' : 
               cardData.workMode === 'remote' ? 'Remote Work' : 'Hybrid'}
            </div>
            {cardData.department && (
              <div>
                <span className="font-medium">Dept: </span>
                {cardData.department}
              </div>
            )}
          </div>
        </div>

        {/* Company and ID Number */}
        <div className="space-y-2">
          {cardData.company && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span>{cardData.company}</span>
            </div>
          )}
          {cardData.idNumber && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span>ID: {cardData.idNumber}</span>
            </div>
          )}
        </div>

        {/* Contact Details with ID Number */}
        <div className="space-y-2">
          {cardData.email && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{cardData.email}</span>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{cardData.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer with QR - Simplified */}
      {showQR && (
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <QRCodeSVG 
              value={cardData.qrLink || `https://idmaster.com/user/${encodeURIComponent(cardData.name)}`}
              size={64}
              level="H"
            />
            <div className="text-xs text-gray-500 text-right space-y-1">
              <div className="font-medium">Fecha de emisión: {cardData.issueDate || '-'}</div>
              <div className="font-medium">Válido hasta: {cardData.validUntil || '-'}</div>
            </div>
          </div>
        </div>
      )}
      <svg ref={svgRef} width="100%" height="100%" className="absolute inset-0">
        {/* SVG content */}
      </svg>
    </div>
  );
};

export default IDCardPreview;
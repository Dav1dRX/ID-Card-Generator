import React, { useState } from 'react';
import IDCardForm from './IDCardForm';
import IDCardPreview from './IDCardPreview';
import useIDCardState from '../../hooks/useIDCardState';
import Button from '../common/Button';
import html2canvas from 'html2canvas';

const IDCardGenerator = () => {
  const { cardData, updateCardData, gradientColors, updateGradientColor, shapePoints, updateShapePoints } = useIDCardState();
  const [showQR, setShowQR] = useState(true);
  const [gradientAngle, setGradientAngle] = useState(0); // Add gradientAngle state

  // Function to export as PNG
  const exportToPNG = async () => {
    const element = document.getElementById('id-card-preview');
    
    // Increase scale for higher resolution
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Create a link to download the PNG
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'id-card.png';  // File name
    link.click();  // Simulate a click to download
  };

  return (
    <div className="flex flex-col md:flex-row -mx-2">
      <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
        <IDCardForm 
          cardData={cardData}
          updateCardData={updateCardData}
          gradientColors={gradientColors}
          updateGradientColor={updateGradientColor}
          showQR={showQR}
          setShowQR={setShowQR}
          gradientAngle={gradientAngle}
          setGradientAngle={setGradientAngle}
        />
      </div>
      <div className="w-full md:w-1/2 px-2">
        <IDCardPreview 
          cardData={cardData}
          gradientColors={gradientColors}
          shapePoints={shapePoints}
          updateShapePoints={updateShapePoints}
          showQR={showQR}
          gradientAngle={gradientAngle}
        />
        <div className="mt-4">
          <Button onClick={exportToPNG}>Export to PNG</Button>
        </div>
      </div>
    </div>
  );
};

export default IDCardGenerator;
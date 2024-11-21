import { useState } from 'react';

const useIDCardState = () => {
  const [cardData, setCardData] = useState({
    name: '',
    title: '',
    cargo: '',
    email: '',
    phone: '',
    qrLink: '',
    idNumber: '',
    company: '', // New field
    workMode: 'office',
    department: '',
    issueDate: '',
    validUntil: '',
  });

  const [gradientColors, setGradientColors] = useState(['#8E2DE2', '#4A00E0']);

  const [shapePoints, setShapePoints] = useState([
    { x: 0, y: 0 },
    { x: 320, y: 0 },
    { x: 320, y: 160 },
    { x: 0, y: 160 },
  ]);

  const updateCardData = (field, value) => {
    setCardData(prevData => ({ ...prevData, [field]: value }));
  };

  const updateGradientColor = (index, color) => {
    setGradientColors(prevColors => {
      const newColors = [...prevColors];
      newColors[index] = color;
      return newColors;
    });
  };

  const updateShapePoints = (newPoints) => {
    setShapePoints(newPoints);
  };

  return {
    cardData,
    updateCardData,
    gradientColors,
    updateGradientColor,
    shapePoints,
    updateShapePoints,
  };
};

export default useIDCardState;

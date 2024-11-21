import React from 'react';
import Input from '../common/Input';

const IDCardForm = ({ cardData, updateCardData, gradientColors, updateGradientColor, showQR, setShowQR, gradientAngle, setGradientAngle }) => (
  <div className="space-y-4">
    <Input
      label="Name"
      value={cardData.name}
      onChange={(e) => updateCardData('name', e.target.value)}
    />
    
    {/* New ID Number field */}
    <Input
      label="ID Number"
      value={cardData.idNumber}
      onChange={(e) => updateCardData('idNumber', e.target.value)}
    />

<div className="flex space-x-2">
  <Input
    label="specialization"
    value={cardData.title} 
    onChange={(e) => updateCardData('title', e.target.value)}
  />
  <Input
    label="Cargo"
    value={cardData.cargo}
    onChange={(e) => updateCardData('cargo', e.target.value)}
  />
</div>

{/* Company field */}
<Input
  label="Company"
  value={cardData.company}
  onChange={(e) => updateCardData('company', e.target.value)}
/>

    {/* Work Mode Select */}
    <div>
      <label className="block text-sm font-medium mb-1">Work Mode</label>
      <select
        value={cardData.workMode}
        onChange={(e) => updateCardData('workMode', e.target.value)}
        className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-purple-500"
      >
        <option value="office">Office</option>
        <option value="remote">Home Office</option>
        <option value="hybrid">Hybrid</option>
      </select>
    </div>

    {/* Department field */}
    <Input
      label="Department (Optional)"
      value={cardData.department}
      onChange={(e) => updateCardData('department', e.target.value)}
    />

    {/* Date fields */}
    <div className="flex space-x-2">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Issue Date</label>
        <input
          type="date"
          value={cardData.issueDate}
          onChange={(e) => updateCardData('issueDate', e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">Valid Until</label>
        <input
          type="date"
          value={cardData.validUntil}
          onChange={(e) => updateCardData('validUntil', e.target.value)}
          className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-purple-500"
        />
      </div>
    </div>

    <Input
      label="Email"
      type="email"
      value={cardData.email}
      onChange={(e) => updateCardData('email', e.target.value)}
    />
    <Input
      label="Phone"
      type="tel"
      value={cardData.phone}
      onChange={(e) => updateCardData('phone', e.target.value)}
    />
    <div className="flex items-center">
      <input
        type="checkbox"
        id="showQR"
        checked={showQR}
        onChange={(e) => setShowQR(e.target.checked)}
        className="mr-2"
      />
      <label htmlFor="showQR">Show QR Code</label>
    </div>
    {showQR && (
      <Input
        label="QR Link"
        type="url"
        value={cardData.qrLink}
        onChange={(e) => updateCardData('qrLink', e.target.value)}
      />
    )}
    <div>
      <label className="block text-sm font-medium mb-1">Profile Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => updateCardData('profileImage', e.target.result);
            reader.readAsDataURL(file);
          }
        }}
        className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-purple-500"
      />
    </div>
    <div>
      <p className="mb-2">Gradient Colors:</p>
      {gradientColors.map((color, index) => (
        <input
          key={index}
          type="color"
          value={color}
          onChange={(e) => updateGradientColor(index, e.target.value)}
          className="mr-2"
        />
      ))}
    </div>

    {/* Slider para cambiar el ángulo del gradiente */}
    <div>
      <label className="block text-sm font-medium mb-1">Gradient Angle: {gradientAngle}°</label>
      <input
        type="range"
        min="0"
        max="360"
        value={gradientAngle}
        onChange={(e) => setGradientAngle(parseInt(e.target.value, 10))}
        className="w-full"
      />
    </div>
  </div>
);

export default IDCardForm;

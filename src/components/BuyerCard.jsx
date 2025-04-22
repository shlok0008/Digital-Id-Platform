// src/components/BuyerCard.jsx
import React from 'react';
import QRCode from 'react-qr-code'; // [3] (Implicitly needed for QR display)

// Wrap component with React.forwardRef to accept the download ref [4]
const BuyerCard = React.forwardRef(({ buyerData, qrCodeValue }, ref) => {
  // Don't render if data is missing
  if (!buyerData) {
    return null;
  }

  // Use brandColor from data, provide a fallback
  const brandColor = buyerData.brandColor || '#3B82F6';

  // --- Styling Constants (Tailwind CSS) ---
  const cardStyle = "max-w-lg w-full bg-white shadow-xl rounded-lg overflow-hidden mx-auto my-4 border border-gray-200 text-left"; // Ensure text-left
  const textStyle = "text-gray-700 text-sm mb-1";
  const labelStyle = "font-semibold text-gray-800";
  const headerStyle = {
    backgroundColor: brandColor,
    color: 'white', // Assuming white text on brand color
    padding: '1rem',
  };
  const sectionStyle = "p-4";
  const qrWrapperStyle = { background: 'white', padding: '8px', border: '1px solid #eee', display: 'inline-block' }; // White background for QR [2]

  return (
    // Attach the forwarded ref to the root element for download capture [4]
    <div ref={ref} className={cardStyle}>
      {/* Card Header with Dynamic Brand Color */}
      <div style={headerStyle}>
        <h3 className="text-xl font-bold">{buyerData.name || 'Buyer Name'}</h3>
        <p className="text-sm opacity-90">Buyer Profile</p>
      </div>

      {/* Card Body - Flex Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Left Side: Contact & Address */}
        <div className={`${sectionStyle} flex-1 border-b md:border-b-0 md:border-r border-gray-200`}>
          <h4 className="text-md font-semibold text-gray-800 mb-3">Contact Information</h4>
          <p className={textStyle}><span className={labelStyle}>Email:</span> {buyerData.email}</p>
          <p className={textStyle}><span className={labelStyle}>Phone:</span> {buyerData.phone}</p>
          <div className="mt-4">
            <p className={labelStyle}>Address:</p>
            {/* Use whitespace-pre-line to respect newlines in the address */}
            <p className={`${textStyle} whitespace-pre-line`}>{buyerData.address}</p>
          </div>
        </div>

        {/* Right Side: Product Codes & QR */}
        <div className={`${sectionStyle} flex-1`}>
          <h4 className="text-md font-semibold text-gray-800 mb-3">Registered Product Codes</h4>
          {/* Check if product codes exist and are not just an empty string */}
          {buyerData.productCodes && buyerData.productCodes.length > 0 ? (
            <ul className="list-disc list-inside mb-4 space-y-1">
              {buyerData.productCodes.map((code, index) => (
                 // Ensure code is truthy before rendering
                 code && <li key={index} className={textStyle}>{code}</li>
              ))}
            </ul>
          ) : (
            <p className={textStyle}>No product codes provided.</p>
          )}

          {/* QR Code Section */}
          <div className="flex flex-col items-center mt-4 pt-4 border-t border-gray-100">
             <p className="text-xs text-gray-500 mb-1">Scan for Contact</p>
             <div style={qrWrapperStyle}>
                <QRCode value={qrCodeValue || 'no-contact-info'} size={90} fgColor="#000000" bgColor="#FFFFFF" level="L" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}); // Close React.forwardRef

export default BuyerCard;

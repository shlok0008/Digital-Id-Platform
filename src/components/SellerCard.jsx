// src/components/SellerCard.jsx
import React from 'react';
import QRCode from 'react-qr-code';

const SellerCard = React.forwardRef(({ sellerData, qrCodeValue }, ref) => {
  if (!sellerData) {
    return null; // Don't render without data
  }

  // Use brandColor from data, provide a fallback
  const brandColor = sellerData.brandColor || '#3B82F6';

  // --- Styling (Tailwind CSS) ---
  const cardStyle = "max-w-lg w-full bg-white shadow-xl rounded-lg overflow-hidden mx-auto my-4 border border-gray-200 text-left";
  const headerStyle = { backgroundColor: brandColor, color: 'white', padding: '1rem' };
  const bodyStyle = "p-4";
  const sectionStyle = "mb-3";
  const textStyle = "text-gray-700 text-sm";
  const labelStyle = "font-semibold text-gray-600 text-xs uppercase tracking-wider";
  const valueStyle = "text-gray-800 text-base font-medium";
  const logoStyle = "h-16 max-w-[120px] object-contain ml-auto"; // Logo style
  const permitListStyle = "list-disc list-inside space-y-1 text-sm text-gray-600";
  const qrSectionStyle = "p-3 bg-gray-50 border-t border-gray-200 flex flex-col items-center";
  const qrWrapperStyle = { background: 'white', padding: '6px', border: '1px solid #eee', display: 'inline-block' };

  return (
    // Attach ref to the root element
    <div ref={ref} className={cardStyle}>
      {/* Header */}
      <div className={`${headerStyle} flex justify-between items-center`}>
        <div>
          <h3 className="text-xl font-bold">{sellerData.business || 'Business Name'}</h3>
          <p className="text-sm opacity-90">Owner: {sellerData.owner || 'N/A'}</p>
        </div>
        {sellerData.logoPreview && (
          <img src={sellerData.logoPreview} alt="Business Logo" className={logoStyle} />
        )}
      </div>

      {/* Body */}
      <div className={bodyStyle}>
        <div className={sectionStyle}>
          <p className={labelStyle}>Contact</p>
          <p className={textStyle}>Mobile: {sellerData.mobile || 'N/A'}</p>
        </div>
        <div className={sectionStyle}>
          <p className={labelStyle}>Address</p>
          <p className={`${textStyle} whitespace-pre-line`}>{sellerData.address || 'N/A'}</p>
        </div>
        <div className={sectionStyle}>
          <p className={labelStyle}>Permits</p>
          {sellerData.permits && sellerData.permits.length > 0 ? (
            <ul className={permitListStyle}>
              {sellerData.permits.map((permit, index) => (
                permit && <li key={index}>{permit}</li>
              ))}
            </ul>
          ) : (
            <p className={textStyle}>No permits listed.</p>
          )}
        </div>
      </div>

      {/* QR Code Section */}
      <div className={qrSectionStyle}>
         <p className="text-xs text-gray-500 mb-1">Scan for Business Info</p>
         <div style={qrWrapperStyle}>
            <QRCode value={qrCodeValue || 'invalid-data'} size={85} fgColor="#000000" bgColor="#FFFFFF" level="L" />
         </div>
      </div>
    </div>
  );
});

export default SellerCard;

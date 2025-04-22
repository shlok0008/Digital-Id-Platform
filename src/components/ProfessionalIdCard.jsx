// src/components/ProfessionalIdCard.jsx
import React from 'react';
import QRCode from 'react-qr-code';

const ProfessionalIdCard = React.forwardRef(({ profData, qrCodeValue }, ref) => {
  if (!profData) {
    return null; // Don't render without data
  }

  // --- Styling (Tailwind CSS) ---
  const cardStyle = "max-w-md w-full bg-white shadow-xl rounded-lg overflow-hidden mx-auto my-4 border border-gray-200 text-left";
  const headerStyle = "bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center gap-4";
  const bodyStyle = "p-4";
  const sectionStyle = "mb-3";
  const textStyle = "text-gray-700 text-sm";
  const labelStyle = "font-semibold text-gray-600 text-xs uppercase tracking-wider";
  const valueStyle = "text-gray-800 text-base font-medium";
  const photoStyle = "w-20 h-20 rounded-full object-cover border-2 border-white shadow-md";
  const logoStyle = "h-10 max-w-[100px] object-contain ml-auto"; // Logo on right
  const qrSectionStyle = "p-3 bg-gray-50 border-t border-gray-200 flex flex-col items-center";
  const qrWrapperStyle = { background: 'white', padding: '6px', border: '1px solid #eee', display: 'inline-block' };

  return (
    // Attach ref to the root element
    <div ref={ref} className={cardStyle}>
      {/* Header */}
      <div className={headerStyle}>
        {profData.previewImage ? (
          <img src={profData.previewImage} alt="Profile" className={photoStyle} />
        ) : (
          <div className={`${photoStyle} bg-gray-300 flex items-center justify-center text-gray-500`}>Photo</div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold">{profData.fullName || 'Name'}</h3>
          <p className="text-sm opacity-90">{profData.services || 'Services'}</p>
        </div>
        {profData.logoPreview && (
          <img src={profData.logoPreview} alt="Company Logo" className={logoStyle} />
        )}
      </div>

      {/* Body */}
      <div className={bodyStyle}>
        <div className={sectionStyle}>
          <p className={labelStyle}>Company</p>
          <p className={valueStyle}>{profData.company || 'N/A'}</p>
        </div>
        <div className={sectionStyle}>
          <p className={labelStyle}>Contact</p>
          <p className={textStyle}>Email: {profData.email || 'N/A'}</p>
          <p className={textStyle}>Mobile: {profData.mobile || 'N/A'}</p>
        </div>
        <div className={sectionStyle}>
          <p className={labelStyle}>Office Address</p>
          <p className={`${textStyle} whitespace-pre-line`}>{profData.address || 'N/A'}</p>
        </div>

        {/* Optional: Conditionally display social links if needed on card */}
        {/*
        <div className={sectionStyle}>
          <p className={labelStyle}>Social</p>
          {profData.social_whatsapp && <p className={textStyle}>WhatsApp: {profData.social_whatsapp}</p>}
          {profData.social_linkedin && <p className={textStyle}>LinkedIn: <a href={profData.social_linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Profile</a></p>}
          ... etc
        </div>
        */}
      </div>

      {/* QR Code Section */}
      <div className={qrSectionStyle}>
         <p className="text-xs text-gray-500 mb-1">Scan for Details</p>
         <div style={qrWrapperStyle}>
            <QRCode value={qrCodeValue || 'invalid-data'} size={85} fgColor="#000000" bgColor="#FFFFFF" level="L" />
         </div>
      </div>
    </div>
  );
});

export default ProfessionalIdCard;

// src/components/StudentIDCard.jsx
import React from 'react';
import QRCode from 'react-qr-code';

const StudentIDCard = React.forwardRef(({ formData, qrCodeValue }, ref) => {
  if (!formData) return null;

  const cardStyle = "max-w-sm w-full lg:max-w-full lg:flex bg-white shadow-xl rounded-lg overflow-hidden mx-auto my-4 border border-gray-200 text-left";
  const textStyle = "text-gray-700 text-sm mb-1";
  const labelStyle = "font-semibold text-gray-900";
  const imageStyle = "w-24 h-24 rounded-full object-cover mr-4 border-2 border-blue-200";
  const logoStyle = "w-16 h-16 object-contain mr-4 border rounded";
  const qrSectionStyle = "flex flex-col items-center justify-center p-3 border-l border-gray-200";
  const qrWrapperStyle = { background: 'white', padding: '6px', border: '1px solid #eee', display: 'inline-block' };

  return (
    <div ref={ref} className={cardStyle}>
      {/* Card Content */}
      <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex items-center mb-4">
          {formData.logoPreview ? <img className={logoStyle} src={formData.logoPreview} alt="School Logo" /> : <div className={`${logoStyle} bg-gray-100 flex items-center justify-center text-xs text-gray-400`}>Logo</div>}
          <h3 className="text-lg font-bold text-blue-600 line-clamp-1">{formData.school || 'School Name'}</h3>
        </div>
        {/* Student Info */}
        <div className="flex items-center">
          {formData.photoPreview ? <img className={imageStyle} src={formData.photoPreview} alt="Student" /> : <div className={`${imageStyle} bg-gray-100 flex items-center justify-center text-xs text-gray-400`}>Photo</div>}
          <div className="flex-1 min-w-0">
             <p className={textStyle}><span className={labelStyle}>Name:</span> {formData.name || 'N/A'}</p>
             <p className={textStyle}><span className={labelStyle}>ID:</span> {formData.id_number || 'N/A'}</p>
             <p className={textStyle}><span className={labelStyle}>Age:</span> {formData.age || 'N/A'}</p>
             <p className={textStyle}><span className={labelStyle}>Contact:</span> {formData.student_contact || 'N/A'}</p>
             <p className={`${textStyle} truncate`}><span className={labelStyle}>Email:</span> {formData.student_email || 'N/A'}</p>
          </div>
        </div>
      </div>
      {/* QR Code */}
      <div className={qrSectionStyle}>
         <p className="text-xs text-gray-600 mb-1">Scan ID</p>
         <div style={qrWrapperStyle}>
            <QRCode value={qrCodeValue || 'invalid-data'} size={80} fgColor="#000000" bgColor="#FFFFFF" level="L" />
         </div>
      </div>
    </div>
  );
});

export default StudentIDCard;

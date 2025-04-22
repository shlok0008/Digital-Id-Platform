import React from 'react';
import QRCode from 'react-qr-code';

// Wrap component with React.forwardRef to accept the download ref
const BioDataCard = React.forwardRef(({ bioData, qrCodeValue }, ref) => {
  // Don't render if bioData is missing
  if (!bioData) {
    return null;
  }

  // --- Styling Constants (Tailwind CSS) ---
  const cardStyle = "max-w-2xl w-full bg-white shadow-xl rounded-lg overflow-hidden mx-auto my-4 p-6 border border-gray-200 text-left";
  const sectionStyle = "mb-4 pb-3 border-b border-gray-200";
  const textStyle = "text-gray-700 text-sm mb-1";
  const labelStyle = "font-semibold text-gray-800";
  const photoStyle = "w-32 h-32 rounded-full object-cover border-2 border-blue-200 mb-4";
  const qrWrapperStyle = { background: 'white', padding: '8px', border: '1px solid #eee', display: 'inline-block' }; // White background for QR

  return (
    // Attach the forwarded ref to the root DOM element of the card
    <div ref={ref} className={cardStyle}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Photo and Core Info */}
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          {/* Display Photo */}
          {bioData.photoPreview ? (
            <img className={photoStyle} src={bioData.photoPreview} alt="Profile" />
          ) : (
            <div className={`${photoStyle} bg-gray-200 flex items-center justify-center text-gray-500`}>No Photo</div>
          )}
          {/* Core Details */}
          <h3 className="text-xl font-bold text-blue-700 mb-2">{bioData.fullName || 'N/A'}</h3>
          <p className={textStyle}><span className={labelStyle}>DOB:</span> {bioData.dob || 'N/A'}</p>
          <p className={textStyle}><span className={labelStyle}>Location:</span> {bioData.location || 'N/A'}</p>
          <p className={textStyle}><span className={labelStyle}>Contact:</span> {bioData.phone || 'N/A'}</p>
          <p className={textStyle}><span className={labelStyle}>Email:</span> {bioData.email || 'N/A'}</p>
          <p className={textStyle}><span className={labelStyle}>Nationality:</span> {bioData.nationality || 'N/A'}</p>
        </div>

        {/* Right Side: Education, Address, QR Code */}
        <div className="flex-1">
          {/* Education Section */}
          <div className={sectionStyle}>
            <h4 className="text-md font-semibold text-blue-800 mb-2">Education</h4>
            {bioData.education && bioData.education.length > 0 ? (
              bioData.education.map((edu, index) => (
                <div key={index} className="mb-2 text-sm">
                  <p className="font-medium">
                    {edu.degree || 'N/A'} - {edu.institution || 'N/A'} ({edu.year || 'N/A'})
                  </p>
                  {edu.specialization && <p className="text-gray-600">Spec: {edu.specialization}</p>}
                </div>
              ))
            ) : (
              <p className={textStyle}>No education details provided.</p>
            )}
          </div>

          {/* Address Section */}
           <div className={sectionStyle}>
                <p className={labelStyle}>Address:</p>
                <p className={`${textStyle} whitespace-pre-line`}>{bioData.address || 'N/A'}</p>
           </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center mt-4">
            <p className="text-xs text-gray-500 mb-1">Scan for Basic Info</p>
            <div style={qrWrapperStyle}>
                <QRCode value={qrCodeValue || 'no-biodata'} size={100} fgColor="#000000" bgColor="#FFFFFF" level="L" />
            </div>
          </div>
        </div>
      </div>

       {/* Optional: Other sections like Family, Hobbies can be added similarly */}
       <div className="mt-4 pt-4 border-t border-gray-100 text-sm">
            <p><span className={labelStyle}>Hobbies:</span> {bioData.hobbies || 'N/A'}</p>
            {/* Add other fields like personality, preferences etc. */}
       </div>

    </div>
  );
}); // Close React.forwardRef

export default BioDataCard;

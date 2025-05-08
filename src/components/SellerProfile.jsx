import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { QRCodeCanvas } from 'qrcode.react';
import domtoimage from 'dom-to-image-more';
import { saveAs } from 'file-saver';

const SellerProfile = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const sellerRef = useRef(null); // Reference for the download section

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/sellers/${id}`)
      .then((res) => setSeller(res.data))
      .catch((err) => console.error('Error fetching seller profile:', err));
  }, [id]);

  if (!seller) return <div className="p-8">Loading profile...</div>;

  // Handle profile download
  const handleDownload = () => {
    if (!sellerRef.current) return;

    domtoimage
      .toBlob(sellerRef.current)
      .then((blob) => {
        saveAs(blob, `${seller.businessName}_profile.png`);
      })
      .catch((err) => {
        toast.error('Failed to download image');
        console.error(err);
      });
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <div
        id="profile-container"
        ref={sellerRef}
        className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden border"
      >
        {/* Profile Header */}
        <div className="p-6" style={{ backgroundColor: seller.brandColor }}>
          <h1 className="text-3xl font-bold text-white">{seller.businessName}</h1>
          <p className="text-white">{seller.owner}</p>
          <p className="text-white">{seller.phone}</p>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Address</h2>
            <p className="text-gray-700">{seller.address}</p>
          </div>

          {/* Permits Section */}
          <div>
            <h2 className="text-lg font-semibold">Permits</h2>
            {seller.permits.length > 0 ? (
              <ul className="list-disc list-inside text-gray-800">
                {seller.permits.map((permit, idx) => (
                  <li key={idx}>{permit}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No permits provided.</p>
            )}
          </div>

          {/* Logo Section */}
          {seller.logo && (
            <div>
              <h2 className="text-lg font-semibold">Logo</h2>
              <img src={seller.logo} alt="Logo" className="w-24 h-24 mt-4" />
            </div>
          )}

          {/* QR Code Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">QR Code for Profile</h2>
            <div className="flex flex-col items-center mt-4">
              <QRCodeCanvas
                value={`http://localhost:5000/sellers/${id}`} // QR code points to this seller's profile
                size={150}
                fgColor="#000000"
                bgColor="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      {/* <div className="flex justify-center mt-6">
        <button
          onClick={handleDownload}
          className="py-2 px-4 bg-blue-600 text-white rounded-md"
        >
          Download Full Profile
        </button>
      </div> */}
    </div>
  );
};

export default SellerProfile;

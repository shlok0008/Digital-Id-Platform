import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { QRCodeCanvas } from 'qrcode.react';
import domtoimage from 'dom-to-image-more';
import { saveAs } from 'file-saver';

const BuyerCardProfile = () => {
  const { id } = useParams();
  const [buyerCard, setBuyerCard] = useState(null);
  const buyerRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/buyercards/${id}`)
      .then(res => setBuyerCard(res.data))
      .catch(err => console.error('Error fetching profile:', err));
  }, [id]);

  if (!buyerCard) return <div className="p-8">Loading profile...</div>;

  const handleDownload = () => {
    if (!buyerRef.current) return;

    domtoimage.toBlob(buyerRef.current)
      .then((blob) => {
        saveAs(blob, `${buyerCard.fullName}_biodata.png`);
      })
      .catch((err) => {
        toast.error('Failed to download image');
        console.error(err);
      });
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <div id="profile-container" ref={buyerRef} className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden border">
        {/* Profile Header */}
        <div className="p-6" style={{ backgroundColor: buyerCard.brandColor }}>
          <h1 className="text-3xl font-bold text-white">{buyerCard.name}</h1>
          <p className="text-white">{buyerCard.email}</p>
          <p className="text-white">{buyerCard.phone}</p>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Address</h2>
            <p className="text-gray-700">{buyerCard.address}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Product Codes</h2>
            {buyerCard.productCodes.length > 0 ? (
              <ul className="list-disc list-inside text-gray-800">
                {buyerCard.productCodes.map((code, idx) => (
                  <li key={idx}>{code}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No product codes provided.</p>
            )}
          </div>

          {/* QR Code Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold">QR Code for Profile</h2>
            <div className="flex flex-col items-center mt-4">
              <QRCodeCanvas
                value={`http://localhost:5000/buyercard/${id}`} // QR code points to this profile
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

export default BuyerCardProfile;

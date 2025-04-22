// src/components/SellerCardForm.jsx
import React, { useState, useRef } from 'react';
// Import html2canvas-pro
import html2canvas from 'html2canvas-pro';
import SellerCard from './SellerCard'; // Import the display component
// Import QRCode only if needed directly in form
// import QRCode from 'react-qr-code';

// --- InputField Component (Keep as is) ---
const InputField = ({ label, name, type = 'text', required = false }) => (
  <div className="space-y-1"> {/* Adjusted spacing */}
    <label className="block text-sm font-medium text-gray-700">{label}{required && ' *'}</label>
    <input
      type={type}
      name={name} // Essential for data collection
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm border p-2 text-sm"
    />
  </div>
);

// --- Main Seller Card Form Component ---
const SellerCardForm = () => {
  // --- State ---
  const [brandColor, setBrandColor] = useState('#3B82F6'); // Form input state
  const [logoPreview, setLogoPreview] = useState(null); // Form input state
  const [permits, setPermits] = useState(['']); // Array for dynamic permits

  const [showSellerCard, setShowSellerCard] = useState(false); // Control view
  const [sellerData, setSellerData] = useState(null); // Store data for the card
  const [qrCodeValue, setQrCodeValue] = useState(''); // Store QR string

  // --- Refs ---
  const formRef = useRef(); // To access form elements
  const cardRef = useRef(); // To reference SellerCard for download

  // --- Handlers ---
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) { const reader = new FileReader(); reader.onloadend = () => setLogoPreview(reader.result); reader.readAsDataURL(file); }
    else { setLogoPreview(null); if (file) alert("Invalid logo file."); }
  };

  const handleAddPermit = () => { setPermits([...permits, '']); };

  const handlePermitChange = (index, value) => {
    const newPermits = [...permits]; newPermits[index] = value; setPermits(newPermits);
  };

  const handleRemovePermit = (index) => {
    if (permits.length > 1) { setPermits(permits.filter((_, i) => i !== index)); }
    else { setPermits(['']); } // Clear last one if removing
  };

  const handleReset = () => {
    if (formRef.current) formRef.current.reset();
    setBrandColor('#3B82F6'); setLogoPreview(null); setPermits(['']);
    // Reset card state
    setShowSellerCard(false); setSellerData(null); setQrCodeValue('');
    console.log("Seller form reset.");
  };

  // --- Generate Card Handler ---
  const handleGenerateCard = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formElements = formRef.current.elements;

    try {
      // 1. Collect Form Data
      const validPermits = permits.filter(p => p && p.trim() !== ''); // Filter empty permits

      const submittedData = {
        brandColor: brandColor, logoPreview: logoPreview, // From state
        owner: formElements.owner?.value || '',
        business: formElements.business?.value || '',
        mobile: formElements.mobile?.value || '',
        address: formElements.address?.value || '',
        permits: validPermits, // Use filtered permits
      };
      // Basic Validation
      if (!submittedData.owner || !submittedData.business || !submittedData.mobile || !logoPreview) {
        alert("Please fill all required fields (*), including the logo.");
        return;
      }
      setSellerData(submittedData); // Store data

      // 2. Prepare QR Code Data
      const qrData = {
        Business: submittedData.business, Owner: submittedData.owner,
        Mobile: submittedData.mobile, Address: submittedData.address,
        // You could add the first permit or a count if desired, but keep it concise
        // PermitCount: submittedData.permits.length
      };
      const qrString = JSON.stringify(qrData);
      setQrCodeValue(qrString || 'error'); // Set QR state

      // 3. Show Card
      setShowSellerCard(true);
      console.log("Seller Card Data Ready, QR Data:", qrData);

    } catch (error) {
      console.error("Error processing seller form:", error);
      alert("Failed to generate seller card.");
      setShowSellerCard(false); setSellerData(null); setQrCodeValue('');
    }
  };

  // --- Download Handler using html2canvas-pro ---
  const handleDownload = () => {
    console.log("Download using html2canvas-pro...");
    const elementToCapture = cardRef.current;
    if (elementToCapture) {
      html2canvas(elementToCapture, { useCORS: true, logging: false })
        .then((canvas) => {
          const imageDataURL = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          const safeName = sellerData?.business?.replace(/[^a-zA-Z0-9]/g, '-') || 'seller';
          downloadLink.download = `seller-card-${safeName}.png`;
          downloadLink.href = imageDataURL;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
          console.log("Download initiated.");
        }).catch((error) => {
          console.error("html2canvas-pro error:", error);
          alert("Failed to generate image for download.");
        });
    } else {
      alert("Cannot download: Card reference not found.");
    }
  };

  // --- JSX Rendering ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-8">
      {!showSellerCard ? (
        // --- Form View ---
        <form ref={formRef} onSubmit={handleGenerateCard} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Header (Dynamic Color) */}
           <div className="p-4 rounded-t-lg -m-6 mb-6 text-white" style={{ backgroundColor: brandColor }}>
            <h2 className="text-2xl font-bold text-center">Seller Card Registration</h2>
           </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
              <InputField label="Owner Name" name="owner" required />
              <InputField label="Business Name" name="business" required />
              <InputField label="Mobile Number" name="mobile" type="tel" required />
              <div className="space-y-1">{/* Brand Color */}
                <label className="block text-sm font-medium text-gray-700">Brand Color</label>
                <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="w-full h-10 rounded cursor-pointer border border-gray-300" />
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-1">{/* Address */}
                <label className="block text-sm font-medium text-gray-700">Business Address *</label>
                <textarea name="address" rows="4" className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm border p-2 text-sm resize-none" required />
              </div>
              <div className="space-y-2">{/* Logo Upload */}
                <label className="block text-sm font-medium text-gray-700">Business Logo *</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer" required />
                {logoPreview && <img src={logoPreview} alt="Logo Preview" className="mt-2 w-24 h-24 object-contain border border-gray-300 rounded" />}
              </div>
              <div className="space-y-2">{/* Dynamic Permits */}
                <label className="block text-sm font-medium text-gray-700">Product Code Permits (Optional)</label>
                {permits.map((permit, index) => (
                  <div key={index} className="flex gap-2 mb-2 items-center">
                    <input type="text" value={permit} onChange={(e) => handlePermitChange(index, e.target.value)} className="flex-1 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm border p-2 text-sm" placeholder={`Permit / Code #${index + 1}`} />
                    {permits.length > 1 && (<button type="button" onClick={() => handleRemovePermit(index)} className="p-1 h-8 w-8 flex items-center justify-center rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors text-xl font-bold leading-none" aria-label="Remove Permit">&times;</button>)}
                  </div>
                ))}
                <button type="button" onClick={handleAddPermit} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Add Permit</button>
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-200">
            <button type="submit" style={{ backgroundColor: brandColor }} className="flex-1 w-full sm:w-auto text-white py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity font-semibold text-sm">Generate Seller Card</button>
            <button type="button" onClick={handleReset} className="flex-1 w-full sm:w-auto bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold text-sm">Reset Form</button>
          </div>
        </form>
      ) : (
        // --- Card View ---
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Generated Seller Card</h2>
          {/* Render the card, passing the ref */}
          <SellerCard ref={cardRef} sellerData={sellerData} qrCodeValue={qrCodeValue} />
          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
             <button onClick={handleReset} className="w-full sm:w-auto bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition font-semibold text-sm">Create Another Card</button>
             <button onClick={handleDownload} className="w-full sm:w-auto bg-indigo-600 text-white py-2 px-5 rounded-lg hover:bg-indigo-700 transition font-semibold text-sm">Download Card (PNG)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCardForm;

// src/components/ProfessionalIdForm.jsx
import React, { useState, useRef } from 'react';
// Import html2canvas-pro for reliable downloads
import html2canvas from 'html2canvas-pro';
import ProfessionalIdCard from './ProfessionalIdCard'; // Import the display component
// Import QRCode only if you need to display it directly in the form (not typical)
// import QRCode from 'react-qr-code';

// --- InputField Component (as in paste-3.txt) ---
const InputField = ({ label, name, type = 'text', required = false }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-blue-900">{label}{required && ' *'}</label>
    <input
      type={type}
      name={name} // Crucial for data collection
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm border p-2 text-sm"
    />
  </div>
);

// --- SocialInput Component (Modified to accept and use 'name' prop, icons from paste-3) ---
const SocialInput = ({ icon, label, name }) => { // Added 'name' prop
  // Keep icon definitions from paste-3.txt
  const icons = {
    whatsapp: 'M13 8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2V8zm-3 0H8a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2V8zM5 8H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2V8z', // Example path
    instagram: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
    facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
    twitter: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
    globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-8a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4zm-3.99-4.66L8 12l1.41 1.41 1.06-1.06-.7-.7 1.06-1.06.7.7 1.06-1.06-1.06-1.06.7-.7-1.06-1.06-.7.7-1.06-1.06L8 6.59l1.06 1.06.7-.7z',
    'map-marker': 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z'
  };
  return (
    <div className="flex items-center space-x-2">
      {icons[icon] && (
        <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[icon]} />
        </svg>
      )}
      <input
        type={icon === 'whatsapp' || name === 'mobile' ? 'tel' : 'url'} // Adjust type
        name={name} // Use the name prop here
        placeholder={label}
        className="flex-1 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm border p-2 text-sm min-w-0"
      />
    </div>
  );
};
// --- End of SocialInput ---

// --- Main Form Component ---
const ProfessionalIdForm = () => {
  // --- State ---
  const [previewImage, setPreviewImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [showProfCard, setShowProfCard] = useState(false);
  const [profData, setProfData] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState('');

  // --- Refs ---
  const formRef = useRef();
  const cardRef = useRef(); // Ref for downloading the card

  // --- Handlers ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) { const reader = new FileReader(); reader.onloadend = () => setPreviewImage(reader.result); reader.readAsDataURL(file); }
    else { setPreviewImage(null); if (file) alert("Invalid photo file."); }
  };
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) { const reader = new FileReader(); reader.onloadend = () => setLogoPreview(reader.result); reader.readAsDataURL(file); }
    else { setLogoPreview(null); if (file) alert("Invalid logo file."); }
  };
  const handleReset = () => {
    if (formRef.current) formRef.current.reset();
    setPreviewImage(null); setLogoPreview(null); setShowProfCard(false);
    setProfData(null); setQrCodeValue(''); console.log("Professional form reset.");
  };

  // --- Generate ID Handler (with conditional QR data) ---
  const handleGenerateCard = (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formElements = formRef.current.elements;

    try {
      // 1. Collect Form Data (including all social links via their names)
      const submittedData = {
        previewImage, logoPreview,
        fullName: formElements.fullName?.value || '', mobile: formElements.mobile?.value || '',
        email: formElements.email?.value || '', company: formElements.company?.value || '',
        address: formElements.address?.value || '', services: formElements.services?.value || '',
        // Get social links using their assigned 'name' attributes
        social_whatsapp: formElements.social_whatsapp?.value || '',
        social_instagram: formElements.social_instagram?.value || '',
        social_facebook: formElements.social_facebook?.value || '',
        social_linkedin: formElements.social_linkedin?.value || '',
        social_twitter: formElements.social_twitter?.value || '',
        social_website: formElements.social_website?.value || '',
        social_location: formElements.social_location?.value || '',
      };
      // Basic Validation
      if (!submittedData.fullName || !submittedData.company || !submittedData.mobile || !previewImage || !logoPreview) {
        alert("Please fill all required fields (*), including photo and logo.");
        return;
      }
      setProfData(submittedData); // Store collected data

      // 2. Prepare QR Code Data (Conditionally add social links)
      const qrData = {
        Name: submittedData.fullName, Company: submittedData.company,
        Mobile: submittedData.mobile, Email: submittedData.email,
        Services: submittedData.services,
        // Address: submittedData.address, // Optional: Add address if needed
      };
      // Add social links if present and not just whitespace
      if (submittedData.social_whatsapp?.trim()) { qrData.WhatsApp = submittedData.social_whatsapp.trim(); }
      if (submittedData.social_instagram?.trim()) { qrData.Instagram = submittedData.social_instagram.trim(); }
      if (submittedData.social_facebook?.trim()) { qrData.Facebook = submittedData.social_facebook.trim(); }
      if (submittedData.social_linkedin?.trim()) { qrData.LinkedIn = submittedData.social_linkedin.trim(); }
      if (submittedData.social_twitter?.trim()) { qrData.Twitter = submittedData.social_twitter.trim(); }
      if (submittedData.social_website?.trim()) { qrData.Website = submittedData.social_website.trim(); }
      if (submittedData.social_location?.trim()) { qrData.Location = submittedData.social_location.trim(); }

      const qrString = JSON.stringify(qrData); // Encode final QR data
      setQrCodeValue(qrString || 'error'); // Set QR state

      // 3. Show Card
      setShowProfCard(true);
      console.log("Professional ID Card Data Ready, QR Data:", qrData);

    } catch (error) {
      console.error("Error processing professional form:", error);
      alert("Failed to generate ID card.");
      setShowProfCard(false); setProfData(null); setQrCodeValue('');
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
          const safeName = profData?.fullName?.replace(/[^a-zA-Z0-9]/g, '-') || 'professional';
          downloadLink.download = `professional-id-${safeName}.png`;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6 md:p-8">
      {!showProfCard ? (
        // --- Form View ---
        <form ref={formRef} onSubmit={handleGenerateCard} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg -m-6 mb-6">
            <h2 className="text-2xl font-bold text-center">Professional ID Card Details</h2>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">{/* Photo Upload */}
                <label className="block text-sm font-medium text-blue-900">Individual Photo *</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" required />
                {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-24 h-24 rounded-full object-cover border-2 border-blue-200" />}
              </div>
              <InputField label="Full Name" name="fullName" required />
              <InputField label="Mobile Number" name="mobile" type="tel" required />
              <InputField label="Email" name="email" type="email" required />
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <InputField label="Company Name" name="company" required />
              <div className="space-y-1">{/* Address */}
                <label className="block text-sm font-medium text-blue-900">Office Address *</label>
                <textarea name="address" rows="3" className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm border p-2 text-sm resize-none" required />
              </div>
              <InputField label="Services/Designation" name="services" required />
              <div className="space-y-2">{/* Logo Upload */}
                <label className="block text-sm font-medium text-blue-900">Company Logo *</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" required />
                {logoPreview && <img src={logoPreview} alt="Logo Preview" className="mt-2 w-24 h-24 object-contain border border-gray-300 rounded" />}
              </div>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-base font-semibold text-blue-900 mb-3">Contact & Social Links (Optional)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {/* *** Add 'name' attribute matching handleGenerateCard *** */}
              <SocialInput icon="whatsapp" label="WhatsApp Number" name="social_whatsapp" />
              <SocialInput icon="instagram" label="Instagram Link" name="social_instagram" />
              <SocialInput icon="facebook" label="Facebook Link" name="social_facebook" />
              <SocialInput icon="linkedin" label="LinkedIn Link" name="social_linkedin" />
              <SocialInput icon="twitter" label="Twitter (X) Link" name="social_twitter" />
              <SocialInput icon="globe" label="Website Link" name="social_website" />
              <SocialInput icon="map-marker" label="Location (Map Link)" name="social_location" />
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-200">
            <button type="submit" className="flex-1 w-full sm:w-auto bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">Generate ID Card</button>
            <button type="button" onClick={handleReset} className="flex-1 w-full sm:w-auto bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold text-sm">Reset Form</button>
          </div>
        </form>
      ) : (
        // --- Card View ---
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Generated Professional ID Card</h2>
          {/* Render the card, passing the ref */}
          <ProfessionalIdCard ref={cardRef} profData={profData} qrCodeValue={qrCodeValue} />
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

export default ProfessionalIdForm;

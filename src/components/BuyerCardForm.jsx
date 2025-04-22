// src/components/BuyerCardForm.jsx
import React, { useState, useRef } from 'react';
// Import html2canvas directly [4]
import html2canvas from 'html2canvas-pro';
import BuyerCard from './BuyerCard'; // Ensure this component uses React.forwardRef

// Reusable Input Field Component (Keep as before)
const InputField = ({ label, name, type = 'text', required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2"
    />
  </div>
);

// Main Buyer Card Form Component
const BuyerCardForm = () => {
  // --- State Variables (Keep as before) ---
  const [brandColor, setBrandColor] = useState('#3B82F6');
  const [productCodes, setProductCodes] = useState(['']);
  const [showBuyerCard, setShowBuyerCard] = useState(false);
  const [buyerData, setBuyerData] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState('');

  // --- Refs (Keep as before) ---
  const formRef = useRef();
  // Ref for the BuyerCard's root DOM node [4]
  const cardRef = useRef();

  // --- Other Handlers (Keep as before) ---
  const handleAddProductCode = () => setProductCodes([...productCodes, '']);
  const handleProductCodeChange = (index, value) => {
    const newCodes = [...productCodes]; newCodes[index] = value; setProductCodes(newCodes);
  };
  const handleRemoveProductCode = (index) => {
    if (productCodes.length > 1) setProductCodes(productCodes.filter((_, i) => i !== index));
    else setProductCodes(['']);
  };
  const handleReset = () => {
    if (formRef.current) formRef.current.reset();
    setBrandColor('#3B82F6'); setProductCodes(['']); setShowBuyerCard(false);
    setBuyerData(null); setQrCodeValue(''); console.log("Buyer form reset.");
  };
  const handleCreateBuyerCard = (e) => {
    e.preventDefault(); if (!formRef.current) return;
    const formElements = formRef.current.elements;
    try {
      const validProductCodes = productCodes.filter(code => code && code.trim() !== '');
      const submittedData = {
        name: formElements.name?.value || '', email: formElements.email?.value || '',
        phone: formElements.phone?.value || '', address: formElements.address?.value || '',
        brandColor: brandColor, productCodes: validProductCodes,
      };
      setBuyerData(submittedData);
      const qrData = { Name: submittedData.name, Email: submittedData.email, Phone: submittedData.phone };
      setQrCodeValue(JSON.stringify(qrData)); setShowBuyerCard(true);
    } catch (error) {
      console.error("Error processing buyer form:", error); alert("Failed to create buyer card.");
      setShowBuyerCard(false); setBuyerData(null); setQrCodeValue('');
    }
  };

  // *** REVISED Download Handler using html2canvas directly *** [4]
  const handleDownload = () => {
    console.log("Download button clicked - using direct html2canvas.");

    // 1. Get the DOM node from the ref
    const elementToCapture = cardRef.current;

    if (elementToCapture) {
      console.log("DOM element found:", elementToCapture);
      console.log("Calling html2canvas...");

      // 2. Call html2canvas on the DOM node
      html2canvas(elementToCapture, {
        useCORS: true, // Attempt to capture images loaded cross-origin if needed
        // scale: 2, // Optional: Increase resolution (can increase file size)
        // backgroundColor: '#ffffff', // Ensure background is white if needed
      }).then((canvas) => {
        // 3. Convert canvas to image data URL (PNG)
        const imageDataURL = canvas.toDataURL('image/png');

        // 4. Create a temporary link to trigger download
        const downloadLink = document.createElement('a');
        downloadLink.href = imageDataURL;
        const fileName = `buyer-card-${buyerData?.name?.replace(/\s+/g, '-') || 'profile'}.png`;
        downloadLink.download = fileName;

        // 5. Simulate click and cleanup
        document.body.appendChild(downloadLink); // Append temporarily
        downloadLink.click();
        document.body.removeChild(downloadLink); // Remove after click

        console.log(`Download initiated for ${fileName}.`);

      }).catch((error) => {
        // 6. Handle errors during canvas generation
        console.error("Error generating canvas with html2canvas:", error);
        alert("Failed to generate card image for download. See console for details.");
      });
    } else {
      // 7. Error if the DOM node isn't available
      console.error("Buyer card DOM node (cardRef.current) is not available. Cannot download.");
      alert("Cannot download card. The card component might not be rendered yet or the ref is not attached.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* --- Conditional Rendering (Keep as before) --- */}
      {!showBuyerCard ? (
        // The Form View
        <form ref={formRef} onSubmit={handleCreateBuyerCard} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* ... (Form content remains the same - ensure InputFields have 'name' attributes) ... */}
           {/* Form Header */}
           <div className="p-4 rounded-lg text-white" style={{ backgroundColor: brandColor }}>
            <h2 className="text-2xl font-bold">Buyer Card Registration</h2>
            <p className="text-opacity-90">Customize your buyer profile</p>
           </div>
           {/* Form Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <InputField label="Full Name" name="name" required />
              <InputField type="email" label="Email Address" name="email" required />
              <InputField type="tel" label="Phone Number" name="phone" required />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Brand Color</label>
                <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="w-full h-10 rounded cursor-pointer border border-gray-300" />
              </div>
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea name="address" className="mt-1 block w-full rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-32 resize-none" required />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Codes (Optional)</label>
                {productCodes.map((code, index) => ( <div key={index} className="flex gap-2 mb-2 items-center"> <input type="text" value={code} onChange={(e) => handleProductCodeChange(index, e.target.value)} className="flex-1 rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2" placeholder={`Product Code #${index + 1}`} /> {productCodes.length > 1 && ( <button type="button" onClick={() => handleRemoveProductCode(index)} className="p-1 h-8 w-8 flex items-center justify-center rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors text-xl font-bold leading-none" aria-label="Remove Product Code"> &times; </button> )} </div> ))}
                <button type="button" onClick={handleAddProductCode} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"> <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> Add Product Code </button>
              </div>
            </div>
           </div>
           {/* Form Action Buttons */}
           <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button type="submit" style={{ backgroundColor: brandColor }} className="flex-1 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity font-semibold"> Create Buyer Card </button>
            <button type="button" onClick={handleReset} className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"> Reset Form </button>
           </div>
        </form>
      ) : (
        // --- The Card View ---
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Generated Buyer Card</h2>

          {/* Render the BuyerCard, passing the ref [4] */}
          {/* Ensure BuyerCard component itself uses React.forwardRef */}
          <BuyerCard ref={cardRef} buyerData={buyerData} qrCodeValue={qrCodeValue} />

          {/* Action Buttons for Generated Card */}
          <div className="mt-6 flex justify-center items-center gap-4">
             <button onClick={handleReset} className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"> Create Another Card </button>
             {/* Download button triggers the revised handleDownload */}
             <button onClick={handleDownload} className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"> Download Card (PNG) </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerCardForm;


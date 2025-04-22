// src/components/BioDataForm.jsx
import React, { useState, useRef } from 'react';
// Import html2canvas-pro for reliable downloads
import html2canvas from 'html2canvas-pro';
import BioDataCard from './BioDataCard'; // Import the display component

// Reusable Input Field Component
const InputField = ({ label, name, type = 'text', required = false, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-blue-900">{label}</label>
      <input
        type={type}
        name={name} // Crucial for data collection
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2"
      />
    </div>
);

// Main BioData Form Component
const BioDataForm = () => {
  // --- State Variables ---
  const [photoPreview, setPhotoPreview] = useState(null);
  const [educationEntries, setEducationEntries] = useState([{ id: Date.now() }]); // For dynamic education fields
  const [showBioDataCard, setShowBioDataCard] = useState(false); // Controls view (form/card)
  const [bioData, setBioData] = useState(null); // Holds submitted data for the card
  const [qrCodeValue, setQrCodeValue] = useState(''); // Holds string for QR code

  // --- Refs ---
  const formRef = useRef(); // To access form elements
  const cardRef = useRef(); // To reference the BioDataCard DOM node for download

  // --- Handlers ---
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const addEducationEntry = () => {
    setEducationEntries([...educationEntries, { id: Date.now() }]);
  };

  const removeEducationEntry = (id) => {
    if (educationEntries.length > 1) {
      setEducationEntries(educationEntries.filter(entry => entry.id !== id));
    } else {
        // Optionally clear the fields of the last entry instead of removing
        // Or just leave it as is - prevents removing the only entry
    }
  };

  const handleReset = () => {
    if (formRef.current) formRef.current.reset();
    // Reset all state
    setPhotoPreview(null);
    setEducationEntries([{ id: Date.now() }]);
    setShowBioDataCard(false); // Switch back to form view
    setBioData(null);
    setQrCodeValue('');
    console.log("BioData form reset.");
  };

  const handleSaveBioData = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Saving BioData...");
    if (!formRef.current) return;
    const formElements = formRef.current.elements;

    try {
      // 1. Collect Education Data (Dynamic Fields)
      const educationData = educationEntries.map((entry, index) => {
        const degree = formElements[`degree-${index}`]?.value || '';
        const institution = formElements[`institution-${index}`]?.value || '';
        const year = formElements[`year-${index}`]?.value || '';
        const specialization = formElements[`specialization-${index}`]?.value || '';
        return { degree, institution, year, specialization };
      }).filter(edu => edu.degree || edu.institution); // Filter out completely empty entries

      // 2. Collect All Other Form Data (Static Fields)
      const submittedData = {
        photoPreview: photoPreview,
        fullName: formElements.fullName?.value || '',
        dob: formElements.dob?.value || '',
        height: formElements.height?.value || '',
        weight: formElements.weight?.value || '',
        religion: formElements.religion?.value || '',
        motherTongue: formElements.motherTongue?.value || '',
        nationality: formElements.nationality?.value || '',
        location: formElements.location?.value || '',
        phone: formElements.phone?.value || '',
        email: formElements.email?.value || '',
        address: formElements.address?.value || '',
        education: educationData,
        parents: formElements.parents?.value || '',
        siblings: formElements.siblings?.value || '',
        personality: formElements.personality?.value || '',
        hobbies: formElements.hobbies?.value || '',
        preferences: formElements.preferences?.value || '',
      };
      setBioData(submittedData); // Store collected data

      // 3. Prepare QR Code Data (Key Info)
      const qrData = {
        Name: submittedData.fullName,
        Phone: submittedData.phone,
        Email: submittedData.email,
        Location: submittedData.location,
      };
      setQrCodeValue(JSON.stringify(qrData)); // Store QR string

      // 4. Switch View
      setShowBioDataCard(true);
      console.log("BioData ready for display:", submittedData);

    } catch (error) {
      console.error("Error processing BioData form:", error);
      alert("Failed to save BioData. Check console for errors.");
      setShowBioDataCard(false); setBioData(null); setQrCodeValue('');
    }
  };

  // --- Download Handler using html2canvas-pro ---
  const handleDownload = () => {
    console.log("Download button clicked - using direct html2canvas-pro.");
    const elementToCapture = cardRef.current; // Get the DOM node

    if (elementToCapture) {
      console.log("DOM element found:", elementToCapture);
      console.log("Calling html2canvas (pro)...");
      html2canvas(elementToCapture, {
        useCORS: true, // Important for images from data URLs or other origins
        // scale: window.devicePixelRatio || 1 // Optional: Higher resolution
      }).then((canvas) => {
        const imageDataURL = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        const fileName = `biodata-${bioData?.fullName?.replace(/\s+/g, '-') || 'profile'}.png`;
        downloadLink.href = imageDataURL;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        console.log(`Download initiated for ${fileName}.`);
      }).catch((error) => {
        console.error("Error generating canvas with html2canvas-pro:", error);
        alert("Failed to generate card image for download. Check console.");
      });
    } else {
      console.error("BioData card DOM node (cardRef.current) not available.");
      alert("Cannot download card. Ref not attached or component not rendered.");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      {/* Conditional Rendering: Form or Card View */}
      {!showBioDataCard ? (
        // --- The Form View ---
        <form ref={formRef} onSubmit={handleSaveBioData} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Form Header */}
          <div className="bg-blue-600 text-white p-4 rounded-lg">
            <h2 className="text-2xl font-bold">BioData Form</h2>
            <p className="text-blue-100">Complete your personal profile</p>
          </div>

          {/* Personal Information Section */}
          <div className="space-y-6 border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-blue-900">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InputField label="Full Name" name="fullName" required />
                <InputField label="Date of Birth" name="dob" type="date" required />
                <InputField label="Height (cm)" name="height" type="number" placeholder="e.g., 175" />
                <InputField label="Weight (kg)" name="weight" type="number" placeholder="e.g., 70"/>
              </div>
              <div className="space-y-4">
                 <div className="space-y-2">
                   <label className="block text-sm font-medium text-blue-900">Photo</label>
                   <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                   {photoPreview && <img src={photoPreview} alt="Preview" className="w-32 h-32 rounded-full object-cover border-2 border-blue-200 mt-2" />}
                 </div>
                <InputField label="Religion/Caste" name="religion" />
                <InputField label="Mother Tongue" name="motherTongue" required />
                <InputField label="Nationality" name="nationality" required />
                <InputField label="Current Location" name="location" required />
              </div>
            </div>
          </div>

          {/* Contact & Education Section */}
           <div className="space-y-6 border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-blue-900">Contact & Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Contact */}
                <div className="space-y-4 md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField label="Phone Number" name="phone" type="tel" required />
                        <InputField label="Email Address" name="email" type="email" required />
                    </div>
                     <div className="space-y-2">
                        <label className="block text-sm font-medium text-blue-900">Address</label>
                        <textarea name="address" required className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-24 resize-none" />
                     </div>
                </div>
                {/* Education (Dynamic) */}
                <div className="space-y-4 md:col-span-2">
                    <label className="block text-sm font-medium text-blue-900 mb-1">Education Details</label>
                    {educationEntries.map((entry, index) => (
                        <div key={entry.id} className="p-3 border border-blue-100 rounded-md space-y-3 relative bg-blue-50/30">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField label={`Degree #${index + 1}`} name={`degree-${index}`} placeholder="e.g., B.Tech, M.Sc" />
                                <InputField label="Institution" name={`institution-${index}`} />
                                <InputField label="Year" name={`year-${index}`} type="number" placeholder="YYYY"/>
                                <InputField label="Specialization" name={`specialization-${index}`} />
                            </div>
                            {/* Remove Button */}
                            {educationEntries.length > 1 && (
                                 <button type="button" onClick={() => removeEducationEntry(entry.id)} className="absolute top-1 right-1 p-1 text-red-500 hover:text-red-700 text-xl font-bold leading-none" aria-label="Remove education entry">&times;</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addEducationEntry} className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>Add Education</button>
                </div>
            </div>
          </div>

          {/* Family & Attributes Section */}
           <div className="space-y-6">
              <h3 className="text-lg font-semibold text-blue-900">Family & Attributes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                      <div className="space-y-2"><label className="block text-sm font-medium text-blue-900">Parents Details</label><textarea name="parents" className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-24 resize-none" placeholder="Father: Name, Occupation&#10;Mother: Name, Occupation" /></div>
                      <div className="space-y-2"><label className="block text-sm font-medium text-blue-900">Siblings Info</label><textarea name="siblings" className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-24 resize-none" placeholder="e.g., 1 elder brother (married), 1 younger sister" /></div>
                  </div>
                  <div className="space-y-4">
                      <InputField label="Personality Traits" name="personality" placeholder="e.g., Honest, caring, ambitious" />
                      <InputField label="Hobbies & Interests" name="hobbies" placeholder="e.g., Reading, traveling, coding" />
                      <div className="space-y-2"><label className="block text-sm font-medium text-blue-900">Partner Preferences (Optional)</label><textarea name="preferences" className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-24 resize-none" placeholder="Briefly describe expectations" /></div>
                  </div>
              </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">Generate BioData Card</button>
            <button type="button" onClick={handleReset} className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold">Reset Form</button>
          </div>
        </form>
      ) : (
        // --- The Card View ---
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Generated BioData Card</h2>
          {/* Render the BioDataCard, passing the ref */}
          <BioDataCard ref={cardRef} bioData={bioData} qrCodeValue={qrCodeValue} />
          {/* Action Buttons for the Card */}
          <div className="mt-6 flex justify-center items-center gap-4">
             <button onClick={handleReset} className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold">Create Another BioData</button>
             <button onClick={handleDownload} className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">Download Card (PNG)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BioDataForm;

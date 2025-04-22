// src/components/StudentIDForm.jsx
import React, { useState, useRef } from 'react';
// Import html2canvas-pro for downloading
import html2canvas from 'html2canvas-pro';
import StudentIDCard from './StudentIDCard';
// Keep QRCode import if needed by StudentIDCard
import QRCode from 'react-qr-code';

// --- InputField Component (Keep as is) ---
const InputField = ({ label, name, type = 'text', required = false }) => (
  <div className="space-y-1"> {/* Adjusted spacing */}
    <label className="block text-sm font-medium text-blue-900">{label}{required && ' *'}</label>
    <input
      type={type}
      name={name}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm border p-2 text-sm"
    />
  </div>
);

// --- Modified SocialInput Component (No Icon) --- [3]
const SocialInput = ({ icon, label }) => {
  // The 'icon' prop is now only used for the name attribute
  return (
    // Removed the flex container and SVG part
    <div className="space-y-1"> {/* Added spacing similar to InputField */}
      <label className="block text-sm font-medium text-blue-900">{label}</label> {/* Added Label */}
      <input
        type="url" // Keep type as URL
        name={`social_${icon}`} // Use icon name for unique field name
        placeholder={`Enter ${label} URL`} // Updated placeholder
        className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm border p-2 text-sm"
      />
    </div>
  );
};
// --- End of SocialInput ---

// --- Main Form Component ---
const StudentIDForm = () => {
  // --- State ---
  const [photoPreview, setPhotoPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [showIDCard, setShowIDCard] = useState(false);
  const [formData, setFormData] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState('');

  // --- Refs ---
  const formRef = useRef();
  const cardRef = useRef(); // For downloading the StudentIDCard

  // --- Handlers ---
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader(); reader.onloadend = () => setPhotoPreview(reader.result); reader.readAsDataURL(file);
    } else { setPhotoPreview(null); if(file) alert("Invalid photo file."); }
  };
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
     if (file && file.type.startsWith('image/')) {
      const reader = new FileReader(); reader.onloadend = () => setLogoPreview(reader.result); reader.readAsDataURL(file);
    } else { setLogoPreview(null); if(file) alert("Invalid logo file."); }
  };
  const handleReset = () => {
    if (formRef.current) formRef.current.reset();
    setPhotoPreview(null); setLogoPreview(null); setShowIDCard(false);
    setFormData(null); setQrCodeValue(''); console.log("Student form reset.");
  };

  // Generate ID Handler (Collects data including social links)

  // const handleGenerateID = (e) => {
  //   e.preventDefault();
  //   if (!formRef.current) return;
  //   const formElements = formRef.current.elements;

  //   try {
  //     // 1. Collect Form Data
  //     const submittedData = {
  //       photoPreview, logoPreview,
  //       name: formElements.name?.value || '', age: formElements.age?.value || '',
  //       student_contact: formElements.student_contact?.value || '', student_email: formElements.student_email?.value || '',
  //       school: formElements.school?.value || '', id_number: formElements.id_number?.value || '',
  //       address: formElements.address?.value || '', parent_contact: formElements.parent_contact?.value || '',
  //       parent_email: formElements.parent_email?.value || '', // Optional field
  //       // Collect social media data using their names
  //       social_instagram: formElements.social_instagram?.value || '',
  //       social_facebook: formElements.social_facebook?.value || '',
  //       social_linkedin: formElements.social_linkedin?.value || '',
  //       social_twitter: formElements.social_twitter?.value || '',
  //       social_globe: formElements.social_globe?.value || '',
  //     };
  //      // Basic Validation
  //     if (!submittedData.name || !submittedData.school || !submittedData.id_number || !photoPreview || !logoPreview) {
  //         alert("Please fill in all required fields (*), including photo and logo.");
  //         return;
  //     }
  //     setFormData(submittedData);

  //     // 2. Prepare QR Code Data
  //     const qrData = { Name: submittedData.name, ID: submittedData.id_number, School: submittedData.school, Contact: submittedData.student_contact };
  //     const qrString = JSON.stringify(qrData);
  //     setQrCodeValue(qrString || 'error');

  //     // 3. Show Card
  //     setShowIDCard(true);
  //   } catch (error) {
  //     console.error("Error processing student form:", error);
  //     alert("Failed to generate ID card.");
  //     setShowIDCard(false); setFormData(null); setQrCodeValue('');
  //   }
  // };
  // --- Generate ID Handler (Modified QR Data Section) ---
const handleGenerateID = (e) => {
  e.preventDefault(); // Prevent default form submission

  // Use formRef for reliable access, ensure ref is attached to form
  if (!formRef.current) {
      console.error("Form ref is not available.");
      return;
  }
  const formElements = formRef.current.elements; // Use ref.current

  try {
    // 1. Collect Form Data (including social links)
    const submittedData = {
      photoPreview: photoPreview,
      logoPreview: logoPreview,
      name: formElements.name?.value || '',
      age: formElements.age?.value || '',
      student_contact: formElements.student_contact?.value || '',
      student_email: formElements.student_email?.value || '',
      school: formElements.school?.value || '',
      id_number: formElements.id_number?.value || '',
      address: formElements.address?.value || '',
      parent_contact: formElements.parent_contact?.value || '',
      parent_email: formElements.parent_email?.value || '',
      // Collect social media data using their names
      social_instagram: formElements.social_instagram?.value || '',
      social_facebook: formElements.social_facebook?.value || '',
      social_linkedin: formElements.social_linkedin?.value || '',
      social_twitter: formElements.social_twitter?.value || '',
      social_globe: formElements.social_globe?.value || '',
    };

     // Basic Validation (Ensure essential fields + images are present)
    if (!submittedData.name || !submittedData.school || !submittedData.id_number || !photoPreview || !logoPreview) {
        alert("Please fill in all required fields (*), including photo and logo.");
        return;
    }

    setFormData(submittedData); // Store all collected data

    // 2. *** Prepare Data for QR Code (Conditionally add social links) ***
    const qrData = {
      Name: submittedData.name,
      ID: submittedData.id_number,
      School: submittedData.school,
      Contact: submittedData.student_contact,
      // Email: submittedData.student_email, // Decide if email is essential for QR
    };

    // Conditionally add social links if they have a non-empty value [4]
    if (submittedData.social_instagram?.trim()) { qrData.Instagram = submittedData.social_instagram.trim(); }
    if (submittedData.social_facebook?.trim()) { qrData.Facebook = submittedData.social_facebook.trim(); }
    if (submittedData.social_linkedin?.trim()) { qrData.LinkedIn = submittedData.social_linkedin.trim(); }
    if (submittedData.social_twitter?.trim()) { qrData.Twitter = submittedData.social_twitter.trim(); }
    if (submittedData.social_globe?.trim()) { qrData.Website = submittedData.social_globe.trim(); }
    // --- End of QR Data Modification ---

    // Encode the potentially larger qrData object as a JSON string [3, 7]
    const qrString = JSON.stringify(qrData);
    setQrCodeValue(qrString || 'error-generating-qr'); // Set QR state

    // 3. Show the ID Card
    setShowIDCard(true);
    console.log("Student ID Card Data Ready, QR Data:", qrData);

  } catch (error) {
    console.error("Error processing student form:", error);
    alert("Failed to generate ID card. Check console for details.");
    // Reset relevant state on error
    setShowIDCard(false);
    setFormData(null);
    setQrCodeValue('');
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
          const safeName = formData?.name?.replace(/[^a-zA-Z0-9]/g, '-') || 'student';
          downloadLink.download = `student-id-${safeName}.png`;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 md:p-8">
      {!showIDCard ? (
        // --- Form View ---
        <form ref={formRef} onSubmit={handleGenerateID} className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-5">
           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg -m-6 mb-6">
            <h2 className="text-2xl font-bold text-center">Student ID Card Application</h2>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-900">Student Photo *</label>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" required />
                {photoPreview && <img src={photoPreview} alt="Student Preview" className="mt-2 w-24 h-24 rounded-full object-cover border-2 border-blue-200" />}
              </div>
              <InputField label="Full Name" name="name" required />
              <InputField label="Age" name="age" type="number" required />
              <InputField label="Student Contact" name="student_contact" type="tel" required placeholder="e.g., +1-555-1234"/>
              <InputField label="Student Email" name="student_email" type="email" required />
            </div>
            {/* Right Column */}
            <div className="space-y-4">
               <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-900">School Logo *</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" required />
                {logoPreview && <img src={logoPreview} alt="Logo Preview" className="mt-2 w-24 h-24 object-contain border border-gray-300 rounded" />}
              </div>
              <InputField label="School Name" name="school" required />
              <InputField label="ID Card Number" name="id_number" required />
               <div className="space-y-1">
                <label className="block text-sm font-medium text-blue-900">Address *</label>
                <textarea name="address" rows="3" className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm border p-2 text-sm resize-none" required />
              </div>
              <InputField label="Parent Contact" name="parent_contact" type="tel" required placeholder="e.g., +1-555-5678"/>
              <InputField label="Parent Email (Optional)" name="parent_email" type="email" />
            </div>
          </div>

          {/* --- Modified Social Links Section (No Icons) --- [3] */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-base font-semibold text-blue-900 mb-3">Social Media Links (Optional)</h3>
            {/* Display all 5 inputs without icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <SocialInput icon="instagram" label="Instagram" />
              <SocialInput icon="facebook" label="Facebook" />
              <SocialInput icon="linkedin" label="LinkedIn" />
              <SocialInput icon="twitter" label="Twitter (X)" /> {/* Updated label */}
              <SocialInput icon="globe" label="Personal Website" />
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-200">
            <button type="submit" className="flex-1 w-full sm:w-auto bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">Generate ID</button>
            <button type="button" onClick={handleReset} className="flex-1 w-full sm:w-auto bg-gray-500 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold text-sm">Reset Form</button>
          </div>
        </form>
      ) : (
        // --- Card View ---
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Generated Student ID Card</h2>
          {/* Render the card, passing the ref */}
          <StudentIDCard ref={cardRef} formData={formData} qrCodeValue={qrCodeValue} />
          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
             <button onClick={handleReset} className="w-full sm:w-auto bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition font-semibold text-sm">Create Another ID</button>
             {/* Download button triggers the revised handleDownload */}
             <button onClick={handleDownload} className="w-full sm:w-auto bg-indigo-600 text-white py-2 px-5 rounded-lg hover:bg-indigo-700 transition font-semibold text-sm">Download Card (PNG)</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentIDForm;

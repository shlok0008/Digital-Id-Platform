import { useState, useRef } from 'react';
import React from 'react';

const ProfessionalIdForm = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const formRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setPreviewImage(null);
    setLogoPreview(null);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <form ref={formRef} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Professional ID Card Details</h2>
          <p className="text-blue-100">Please fill all the required information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Individual Photo</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="block w-full text-sm text-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {previewImage && (
                <img src={previewImage} alt="Preview" className="w-32 h-32 rounded-full object-cover border-2 border-blue-200" />
              )}
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <InputField label="Full Name" name="fullName" required />
              <InputField label="Mobile Number" name="mobile" type="tel" required />
              <InputField label="Email" name="email" type="email" required />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Company Information */}
            <InputField label="Company Name" name="company" required />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Office Address</label>
              <textarea
                name="address"
                className="mt-1 block w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-24 resize-none"
                required
              />
            </div>
            <InputField label="Services" name="services" required />

            {/* Company Logo */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Company Logo</label>
              <input
                type="file"
                onChange={handleLogoUpload}
                className="block w-full text-sm text-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {logoPreview && (
                <img src={logoPreview} alt="Logo Preview" className="w-32 h-32 object-contain border-2 border-blue-200 rounded" />
              )}
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="border-t-2 border-blue-100 pt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SocialInput label="WhatsApp Number" />
            <SocialInput label="Instagram Link" />
            <SocialInput label="Facebook Link" />
            <SocialInput label="LinkedIn Link" />
            <SocialInput label="Twitter Link" />
            <SocialInput label="Website Link" />
            <SocialInput label="Location" />
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Generate ID Card
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, name, type = 'text', required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-blue-900">{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      className="mt-1 block w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2"
    />
  </div>
);

// Social Input with Icons
const SocialInput = ({ icon, label }) => {
  const icons = {
    whatsapp: 'M13 8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2V8zm-3 0H8a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2V8zM5 8H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2V8z',
    instagram: 'M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z',
    facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
    linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
    twitter: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z',
    globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-8a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4zm-3.99-4.66L8 12l1.41 1.41 1.06-1.06-.7-.7 1.06-1.06.7.7 1.06-1.06-1.06-1.06.7-.7-1.06-1.06-.7.7-1.06-1.06L8 6.59l1.06 1.06.7-.7z',
    'map-marker': 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z'
  };

  return (
    <div className="flex items-center space-x-2">
      <svg
        className="w-5 h-5 text-blue-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[icon]} />
      </svg>
      <input
        type="url"
        placeholder={label}
        className="flex-1 rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 text-sm"
      />
    </div>
  );
};

export default ProfessionalIdForm;
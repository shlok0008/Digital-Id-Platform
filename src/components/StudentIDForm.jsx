import { useState, useRef } from 'react';
import React from 'react';

const StudentIDForm = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const formRef = useRef();

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setPhotoPreview(null);
    setLogoPreview(null);
  };

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <form ref={formRef} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Student ID Card Application</h2>
          <p className="text-blue-100">Please provide all required student information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Student Photo</label>
              <input
                type="file"
                onChange={handlePhotoUpload}
                className="block w-full text-sm text-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {photoPreview && (
                <img src={photoPreview} alt="Preview" className="w-32 h-32 rounded-full object-cover border-2 border-blue-200" />
              )}
            </div>

            <InputField label="Full Name" name="name" required />
            <InputField label="Age" name="age" type="number" required />
            <InputField label="Student Contact Number" name="student_contact" type="tel" required />
            <InputField label="Student Email" name="student_email" type="email" required />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">School Logo</label>
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

            <InputField label="School Name" name="school" required />
            <InputField label="ID Card Number" name="id_number" required />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Address</label>
              <textarea
                name="address"
                className="mt-1 block w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-24 resize-none"
                required
              />
            </div>

            <InputField label="Parent Contact Number" name="parent_contact" type="tel" required />
            <InputField label="Parent Email" name="parent_email" type="email" />
          </div>
        </div>

        {/* Social Links Section */}
        <div className="border-t-2 border-blue-100 pt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SocialInput icon="instagram" label="Instagram" />
            <SocialInput icon="facebook" label="Facebook" />
            <SocialInput icon="linkedin" label="LinkedIn" />
            <SocialInput icon="twitter" label="Twitter" />
            <SocialInput icon="globe" label="Personal Website" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Generate Student ID
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

// Reusable Input Component (same as previous)
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

// Social Input Component (same as previous)
const SocialInput = ({ icon, label }) => {
  const icons = { /* Keep same icon paths as previous implementation */ };
  return (
    <div className="flex items-center space-x-2">
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default StudentIDForm;
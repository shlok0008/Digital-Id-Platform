import { useState, useRef } from 'react';
import React from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ProfessionalIdForm = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = formRef.current;
    const data = {
      fullName: form.elements.fullName.value,
      mobile: form.elements.mobile.value,
      email: form.elements.email.value,
      photo: previewImage,
      company: form.elements.company.value,
      address: form.elements.address.value,
      services: form.elements.services.value,
      logo: logoPreview,
      whatsapp: form.elements.whatsapp?.value,
      instagram: form.elements.instagram?.value,
      facebook: form.elements.facebook?.value,
      linkedin: form.elements.linkedin?.value,
      twitter: form.elements.twitter?.value,
      website: form.elements.website?.value,
      location: form.elements.location?.value
    };

    try {
      await axios.post('http://localhost:5000/api/professionals', data);
      toast.success('Professional ID generated!');
      handleReset();
    } catch (error) {
      const errorMsg = error.response?.data?.errors?.join('\n') || 'Error creating ID';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
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
    setPreviewImage(null);
    setLogoPreview(null);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 relative">
      <Toaster position="top-center" />
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        <div className="bg-blue-600 text-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Professional ID Card Details</h2>
          <p className="text-blue-100">Please fill all the required information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Individual Photo</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="block w-full text-sm text-blue-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-blue-200"
                />
              )}
            </div>
            <InputField label="Full Name" name="fullName" required />
            <InputField label="Mobile Number" name="mobile" type="tel" required />
            <InputField label="Email" name="email" type="email" required />
          </div>

          <div className="space-y-4">
            <InputField label="Company Name" name="company" required />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Office Address</label>
              <textarea
                name="address"
                className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-24 resize-none"
                required
              />
            </div>
            <InputField label="Services" name="services" required />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Company Logo</label>
              <input
                type="file"
                onChange={handleLogoUpload}
                className="block w-full text-sm text-blue-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-32 h-32 object-contain border-2 border-blue-200 rounded"
                />
              )}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-blue-100 pt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="WhatsApp Number" name="whatsapp" type="tel" pattern="[+]{0,1}[0-9]{10,14}" />
            <InputField label="Instagram Link" name="instagram" type="url" />
            <InputField label="Facebook Link" name="facebook" type="url" />
            <InputField label="LinkedIn Link" name="linkedin" type="url" />
            <InputField label="Twitter Link" name="twitter" type="url" />
            <InputField label="Website Link" name="website" type="url" />
            <InputField label="Location" name="location" type="text" />
          </div>
        </div>

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

const InputField = ({ label, name, type = 'text', required = false }) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-blue-900">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      required={required}
      className="mt-1 block w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2"
    />
  </div>
);

export default ProfessionalIdForm;
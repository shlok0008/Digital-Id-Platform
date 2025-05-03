import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';

const SellerCardForm = () => {
  const [brandColor, setBrandColor] = useState('#3B82F6');
  const [logoPreview, setLogoPreview] = useState(null);
  const [permits, setPermits] = useState(['']);
  const formRef = useRef();

  const [formData, setFormData] = useState({
    owner: '',
    businessName: '',
    mobile: '',
    address: '',
  });

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddPermit = () => {
    setPermits([...permits, '']);
  };

  const handlePermitChange = (index, value) => {
    const newPermits = [...permits];
    newPermits[index] = value;
    setPermits(newPermits);
  };

  const handleRemovePermit = (index) => {
    if (permits.length > 1) {
      const newPermits = permits.filter((_, i) => i !== index);
      setPermits(newPermits);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setBrandColor('#3B82F6');
    setLogoPreview(null);
    setPermits(['']);
    setFormData({
      owner: '',
      businessName: '',
      mobile: '',
      address: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        logo: logoPreview,
        brandColor,
        permits,
      };

      const res = await axios.post('http://localhost:5000/api/sellers', payload);
      alert('Seller registered successfully!');
      handleReset();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.error || 'Submission failed. Try again.';
      alert(message);
    }
  };

  return (
    <div className="min-h-fit bg-gray-50 p-8">
      <form ref={formRef} onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="p-4 rounded-lg" style={{ backgroundColor: brandColor }}>
          <h2 className="text-2xl font-bold text-white">Seller Card Registration</h2>
          <p className="text-opacity-90 text-white">Business information portal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <InputField label="Owner Name" name="owner" value={formData.owner} onChange={handleInputChange} required />
            <InputField label="Business Name" name="businessName" value={formData.businessName} onChange={handleInputChange} required />
            <InputField label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleInputChange} type="tel" required />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Brand Color</label>
              <input
                type="color"
                value={brandColor}
                onChange={(e) => setBrandColor(e.target.value)}
                className="w-full h-12 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Business Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-32 resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Business Logo</label>
              <input
                type="file"
                onChange={handleLogoUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                required
              />
              {logoPreview && (
                <img src={logoPreview} alt="Logo Preview" className="w-32 h-32 object-contain border-2 border-gray-200 rounded mt-2" />
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Product Code Permits</label>
              {permits.map((permit, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={permit}
                    onChange={(e) => handlePermitChange(index, e.target.value)}
                    className="flex-1 rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2"
                    placeholder={`Permit #${index + 1}`}
                  />
                  {permits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePermit(index)}
                      className="px-3 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddPermit}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Permit
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            style={{ backgroundColor: brandColor }}
            className="flex-1 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity font-semibold"
          >
            Generate Seller Card
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

const InputField = ({ label, name, type = 'text', value, onChange, required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2"
    />
  </div>
);

export default SellerCardForm;

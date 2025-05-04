import { useState, useRef } from 'react';
import React from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BuyerCardForm = () => {
  const [brandColor, setBrandColor] = useState('#3B82F6');
  const [productCodes, setProductCodes] = useState(['']);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = {
      name: formRef.current.elements.name.value,
      email: formRef.current.elements.email.value,
      phone: formRef.current.elements.phone.value,
      brandColor,
      address: formRef.current.elements.address.value,
      productCodes: productCodes.filter(code => code.trim() !== '')
    };

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/buyercards', formData);
      toast.success('Buyer card created!');
      handleReset();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProductCode = () => {
    setProductCodes([...productCodes, '']);
  };

  const handleProductCodeChange = (index, value) => {
    const newCodes = [...productCodes];
    newCodes[index] = value;
    setProductCodes(newCodes);
  };

  const handleRemoveProductCode = (index) => {
    if (productCodes.length > 1) {
      const newCodes = productCodes.filter((_, i) => i !== index);
      setProductCodes(newCodes);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setBrandColor('#3B82F6');
    setProductCodes(['']);
  };

  return (
    <div className="min-h-fit bg-gray-50 p-8">
      <div className="relative">
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
          {/* Header with dynamic brand color */}
          <div className="p-4 rounded-lg" style={{ backgroundColor: brandColor }}>
            <h2 className="text-2xl font-bold text-white">Buyer Card Registration</h2>
            <p className="text-opacity-90 text-white">Customize your buyer profile</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <InputField label="Full Name" name="name" required />
              
              <div className="space-y-2">
                <InputField type="email" label="Email Address" name="email" required />
                <InputField type="tel" label="Phone Number" name="phone" required />
              </div>

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

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  className="mt-1 block w-full rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-32 resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Codes</label>
                {productCodes.map((code, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => handleProductCodeChange(index, e.target.value)}
                      className="flex-1 rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2"
                      placeholder={`Product Code #${index + 1}`}
                    />
                    {productCodes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveProductCode(index)}
                        className="px-3 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddProductCode}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Product Code
                </button>
              </div>
            </div>
          </div>

          {/* Buttons with dynamic brand color */}
          <div className="flex gap-4">
            <button
              type="submit"
              style={{ backgroundColor: brandColor }}
              className="flex-1 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Create Buyer Card
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
    </div>
  );
};

// Reusable Input Component
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

export default BuyerCardForm;

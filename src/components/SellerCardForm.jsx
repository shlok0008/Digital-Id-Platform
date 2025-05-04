// SellerCardForm.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SellerCardForm = () => {
  const [brandColor, setBrandColor] = useState("#3B82F6");
  const [logoPreview, setLogoPreview] = useState(null);
  const [permits, setPermits] = useState([""]);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddPermit = () => setPermits([...permits, ""]);

  const handlePermitChange = (index, value) => {
    const updated = [...permits];
    updated[index] = value;
    setPermits(updated);
  };

  const handleRemovePermit = (index) => {
    if (permits.length > 1) {
      setPermits(permits.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(formRef.current);
    const data = {
      owner: form.get("owner"),
      businessName: form.get("business"),
      phone: form.get("mobile"),
      address: form.get("address"),
      logo: logoPreview,
      permits,
      brandColor,
    };

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/sellers", data);
      toast.success("Seller created successfully!");
      handleReset();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setBrandColor("#3B82F6");
    setLogoPreview(null);
    setPermits([""]);
  };

  return (
    <div className="min-h-fit bg-gray-50 p-8">
      {/* Blur overlay when loading */}
      {loading && (
        <div className="absolute inset-0  bg-opacity-25 backdrop-blur-sm z-10 flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-700">
            Submitting...
          </span>
        </div>
      )}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6"
      >
        <div className="p-4 rounded-lg" style={{ backgroundColor: "#3B82F6" }}>
          <h2 className="text-2xl font-bold text-white">
            Seller Card Registration
          </h2>
          <p className="text-opacity-90 text-white">
            Business information portal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <InputField label="Owner Name" name="owner" required />
            <InputField label="Business Name" name="business" required />
            <InputField
              label="Mobile Number"
              name="mobile"
              type="tel"
              required
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Brand Color
              </label>
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
              <label className="block text-sm font-medium text-gray-700">
                Business Address
              </label>
              <textarea
                name="address"
                required
                className="mt-1 block w-full rounded-md border-gray-200 shadow-sm border-2 p-2 h-32 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Business Logo
              </label>
              <input
                type="file"
                onChange={handleLogoUpload}
                className="block w-full text-sm text-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500 hover:file:bg-blue-400"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-32 h-32 object-contain border-2 mt-2"
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Code Permits
              </label>
              {permits.map((permit, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={permit}
                    onChange={(e) => handlePermitChange(index, e.target.value)}
                    className="flex-1 rounded-md border-gray-200 shadow-sm border-2 p-2"
                    placeholder={`Permit #${index + 1}`}
                  />
                  {permits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePermit(index)}
                      className="px-3 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
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
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Permit
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "#3B82F6" }}
            className={`flex-1 text-white py-3 px-4 cursor-pointer rounded-lg font-semibold transition-opacity ${
              loading ? "opacity-25 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Submitting..." : "Generate Seller Card"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleReset}
            className={`flex-1 bg-gray-500 text-white py-3 cursor-pointer px-4 rounded-lg font-semibold transition-colors ${
              loading ? "opacity-25 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, type = "text", required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-200 shadow-sm border-2 p-2"
    />
  </div>
);

export default SellerCardForm;

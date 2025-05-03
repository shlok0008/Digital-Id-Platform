import { useState, useRef } from 'react';
import React from 'react';
import axios from 'axios';

const BioDataForm = () => {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [educationEntries, setEducationEntries] = useState([{ id: 0 }]);
  const formRef = useRef();

// Inside your BioDataForm component, add the submit handler:
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // 1. Prepare form data
  const formData = new FormData(formRef.current);
  const data = {
    fullName: formData.get('fullName'),
    dob: formData.get('dob'),
    // ... collect all other fields similarly
    education: educationEntries.map((entry, index) => ({
      degree: formData.get(`degree-${index}`),
      institution: formData.get(`institution-${index}`),
      year: formData.get(`year-${index}`),
      specialization: formData.get(`specialization-${index}`)
    })),
    photo: photoPreview // Base64 string from state
  };

  // 2. Submit to backend
  try {
    const response = await axios.post('http://localhost:5000/api/biodata', data);
    console.log('Success:', response.data);
    alert('BioData saved successfully!');
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    alert(error.response?.data?.error || 'Failed to save BioData');
  }
};

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addEducationEntry = () => {
    setEducationEntries([...educationEntries, { id: Date.now() }]);
  };

  const removeEducationEntry = (id) => {
    if (educationEntries.length > 1) {
      setEducationEntries(educationEntries.filter(entry => entry.id !== id));
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setPhotoPreview(null);
    setEducationEntries([{ id: 0 }]);
  };

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <form ref={formRef} onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold">BioData Form</h2>
          <p className="text-blue-100">Complete your personal profile</p>
        </div>

        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-blue-900 border-b-2 border-blue-100 pb-2">
            Personal Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField label="Full Name" name="fullName" required />
              <InputField label="Date of Birth" name="dob" type="date" required />
              <InputField label="Height (cm)" name="height" type="number" />
              <InputField label="Weight (kg)" name="weight" type="number" />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-900">Photo</label>
                <input
                  type="file"
                  onChange={handlePhotoUpload}
                  className="block w-full text-sm text-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {photoPreview && (
                  <img src={photoPreview} alt="Preview" className="w-32 h-32 rounded-full object-cover border-2 border-blue-200 mt-2" />
                )}
              </div>
              <InputField label="Religion/Caste" name="religion" />
              <InputField label="Mother Tongue" name="motherTongue" required />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Nationality" name="nationality" required />
            <InputField label="Current Location" name="location" required />
          </div>
        </div>

        {/* Contact & Education */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-blue-900 border-b-2 border-blue-100 pb-2">
            Contact & Education
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField label="Phone Number" name="phone" type="tel" required />
              <InputField label="Email Address" name="email" type="email" required />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-900">Address</label>
                <textarea
                  name="address"
                  className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-32 resize-none"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {educationEntries.map((entry, index) => (
                <div key={entry.id} className="space-y-2 group">
                  <div className="flex gap-2">
                    <InputField label={`Degree #${index + 1}`} name={`degree-${index}`} />
                    <button
                      type="button"
                      onClick={() => removeEducationEntry(entry.id)}
                      className={`${educationEntries.length > 1 ? 'visible' : 'invisible'} mt-6 px-3 text-red-500 hover:text-red-700`}
                    >
                      ×
                    </button>
                  </div>
                  <InputField label="Institution" name={`institution-${index}`} />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Year" name={`year-${index}`} type="number" />
                    <InputField label="Specialization" name={`specialization-${index}`} />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addEducationEntry}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Education Entry
              </button>
            </div>
          </div>
        </div>

        {/* Family & Attributes */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-blue-900 border-b-2 border-blue-100 pb-2">
            Family & Attributes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-900">Parents Details</label>
                <textarea
                  name="parents"
                  className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-32 resize-none"
                  placeholder="Father's name, occupation\nMother's name, occupation"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-900">Siblings Information</label>
                <textarea
                  name="siblings"
                  className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-32 resize-none"
                  placeholder="Name, age, occupation"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <InputField 
                label="Personality Traits" 
                name="personality" 
                placeholder="Comma separated traits (e.g., honest, caring)"
              />
              <InputField 
                label="Hobbies & Interests" 
                name="hobbies" 
                placeholder="Comma separated hobbies (e.g., reading, sports)"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-blue-900">Partner Preferences</label>
                <textarea
                  name="preferences"
                  className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-32 resize-none"
                  placeholder="Describe your expectations"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Save BioData
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
const InputField = ({ label, name, type = 'text', required = false, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-blue-900">{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2"
    />
  </div>
);

export default BioDataForm;
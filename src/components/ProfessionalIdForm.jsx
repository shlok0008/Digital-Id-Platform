import { useState, useRef } from 'react';
import React from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ProfessionalIdForm = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [qrPreview, setQrPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState(['']);
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
      designation: form.elements.designation.value,
      description: form.elements.description.value,
      logo: logoPreview,
      whatsapp: form.elements.whatsapp?.value,
      instagram: form.elements.instagram?.value,
      facebook: form.elements.facebook?.value,
      linkedin: form.elements.linkedin?.value,
      twitter: form.elements.twitter?.value,
      website: form.elements.website?.value,
      location: form.elements.location?.value,
      productsAndServices: products.map(p => ({
        title: p.name, // Map 'name' to 'title'
        description: p.description,
        image: p.image,
        price: p.price,
        currency: p.currency
      })),
      youtubeLinks: youtubeLinks.filter(link => link.trim() && isValidYouTubeUrl(link)),
        paymentName: form.elements.paymentName?.value,
      paymentContact: form.elements.paymentContact?.value,
      qrCode: qrPreview

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

  const handleImageUpload = (e, setImageFunc) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      e.target.value = null;
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageFunc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    formRef.current.reset();
    setPreviewImage(null);
    setLogoPreview(null);
    setProducts([]);
    setYoutubeLinks(['']);
    setQrPreview(null);
  };


  const handleAddProduct = () => {
    if (products.length < 3) {
      setProducts([...products, { name: '', description: '', image: '', price: '', currency: 'INR' }]);
    } else {
      toast.error("Only 3 products/services can be added");
    }
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const handleProductImage = (index, file) => {
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Product image must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...products];
      updated[index].image = reader.result;
      setProducts(updated);
    };
    reader.readAsDataURL(file);
  };

  const removeProduct = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const isValidYouTubeUrl = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w\-]{11}$/;
    return pattern.test(url);
  };

  const extractYouTubeID = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleYoutubeLinkChange = (index, value) => {
    const updated = [...youtubeLinks];
    updated[index] = value;
    setYoutubeLinks(updated);
  };

  const handleAddYoutubeLink = () => {
    if (youtubeLinks.length < 4) {
      setYoutubeLinks([...youtubeLinks, '']);
    } else {
      toast.error("You can add up to 4 video links only.");
    }
  };

  const handleRemoveYoutubeLink = (index) => {
    const updated = [...youtubeLinks];
    updated.splice(index, 1);
    setYoutubeLinks(updated);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 relative">
      <Toaster position="top-center" />
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="bg-blue-600 text-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold">Professional ID Card Details</h2>
          <p className="text-blue-100">Please fill all the required information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Individual Photo <span className="text-xs text-gray-500">(Max 2MB)</span></label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, setPreviewImage)}
                className="block w-full text-sm text-blue-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {previewImage && (
                <img src={previewImage} alt="Preview" className="w-32 h-32 rounded-full object-cover border-2 border-blue-200" />
              )}
            </div>
            <InputField label="Full Name" name="fullName" required />
            <InputField label="Mobile Number" name="mobile" type="tel" required />
            <InputField label="Email" name="email" type="email" required />
            <InputField label="Designation" name="designation" required />
          </div>

          <div className="space-y-4">
            <InputField label="Company Name" name="company" required />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Office Address</label>
              <textarea name="address" className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-24 resize-none" required />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Description</label>
              <textarea name="description" className="w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2 h-24 resize-none" placeholder='About Yourself' required />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-900">Company Logo <span className="text-xs text-gray-500">(Max 2MB)</span></label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, setLogoPreview)}
                className="block w-full text-sm text-blue-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {logoPreview && (
                <img src={logoPreview} alt="Logo Preview" className="w-32 h-32 object-contain border-2 border-blue-200 rounded" />
              )}
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="border-t-2 border-blue-100 pt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Products / Services</h3>
          {products.map((product, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4 relative">
              <button type="button" onClick={() => removeProduct(index)} className="absolute top-2 right-2 text-red-500 font-bold text-lg">×</button>
              <InputField label="Name" name={`name${index}`} value={product.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)} required />
              <InputField label="Description" name={`description${index}`} value={product.description} onChange={(e) => handleProductChange(index, 'description', e.target.value)} required />
              <InputField label="Price" name={`price${index}`} value={product.price} onChange={(e) => handleProductChange(index, 'price', e.target.value)} type="number" required />
              <div className="mt-2">
                <label className="block text-sm font-medium text-blue-900">Currency</label>
                <select value={product.currency} onChange={(e) => handleProductChange(index, 'currency', e.target.value)} className="block w-full p-2 border-blue-200 rounded-md shadow-sm">
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-blue-900">Image <span className="text-xs text-gray-500">(Max 2MB)</span></label>
                <input type="file" onChange={(e) => handleProductImage(index, e.target.files[0])} className="block w-full text-sm text-blue-500 file:bg-blue-50 hover:file:bg-blue-100" />
                {product.image && <img src={product.image} alt="Product" className="w-24 h-24 mt-2 border rounded object-cover" />}
              </div>
            </div>
          ))}
          {products.length < 3 && (
            <button type="button" onClick={handleAddProduct} className="mt-2 px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg hover:bg-blue-200 transition">
              Add Product / Service
            </button>
          )}
        </div>

        {/* YouTube Section */}
        <div className="border-t-2 border-blue-100 pt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">YouTube Video Links</h3>
          {youtubeLinks.map((link, index) => (
            <div key={index} className="relative mb-6">
              <InputField
                label={`Video Link ${index + 1}`}
                name={`youtube${index}`}
                value={link}
                onChange={(e) => handleYoutubeLinkChange(index, e.target.value)}
                type="url"
                required
              />
              <button type="button" onClick={() => handleRemoveYoutubeLink(index)} className="absolute top-0 right-0 mt-7 mr-2 text-red-600 hover:text-red-800 text-sm font-bold">
                ✕
              </button>
              {isValidYouTubeUrl(link) && (
                <div className="mt-2">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${extractYouTubeID(link)}`}
                    title={`YouTube video ${index + 1}`}
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-lg border border-blue-200"
                  ></iframe>
                </div>
              )}
            </div>
          ))}
          {youtubeLinks.length < 4 && (
            <button type="button" onClick={handleAddYoutubeLink} className="mt-2 px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg hover:bg-blue-200 transition">
              Add Video Link
            </button>
          )}
        </div>

        <div className="border-t-2 border-blue-100 pt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Payment Option</h3>
          <InputField label="Payee" name="paymentName" required  />
          <InputField label="Contact Number" name="paymentContact" type="tel" required />
          <label className="block text-sm font-medium my-2.5 text-blue-900">Upload QR Code <span className="text-xs text-gray-500">(Max 2MB)</span></label>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setQrPreview)} className='text-sm text-blue-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100' />
          {qrPreview && <img src={qrPreview} alt="QR Code" className="w-24 h-24 mt-2 border rounded object-cover" />}
        </div>

        {/* Social Links */}
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

        {/* Submit */}
        <div className="flex gap-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            Generate ID Card
          </button>
          <button type="button" onClick={handleReset} className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold">
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, type = 'text', required = false, value, onChange }) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-blue-900">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      required={required}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-blue-200 focus:border-blue-500 focus:ring-blue-500 shadow-sm border-2 p-2"
    />
  </div>
);

export default ProfessionalIdForm;

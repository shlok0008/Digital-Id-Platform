import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { QRCodeCanvas } from 'qrcode.react';
import domtoimage from 'dom-to-image-more';
import { saveAs } from 'file-saver';

const BioDataProfile = () => {
  const { id } = useParams();
  const [bioData, setBioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchBioData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/biodata/${id}`);
        setBioData(response.data);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchBioData();
  }, [id]);

  const profileURL = `http://localhost:5173/biodata/${id}`;

  const handleDownload = () => {
    if (!profileRef.current) return;

    domtoimage.toBlob(profileRef.current)
      .then((blob) => {
        saveAs(blob, `${bioData.fullName}_biodata.png`);
      })
      .catch((err) => {
        toast.error('Failed to download image');
        console.error(err);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  if (!bioData) {
    return <div className="text-center mt-10 text-red-500">Profile not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl mt-10 relative">

      {/* QR */}
      <div className="flex absolute right-20 gap-4 mb-4">
        <div className="border border-gray-300 p-1 rounded">
          <QRCodeCanvas value={profileURL} size={100} />
        </div>
      </div>
      {/* Profile Content */}
      <div ref={profileRef}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={bioData.photo || '/path/to/fallback-image.jpg'}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-400"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{bioData.fullName}</h1>
            <p className="text-gray-600">{bioData.location}</p>
            <p className="text-gray-500 mt-1">DOB: {new Date(bioData.dob).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <Section title="Personal Information">
            <Info label="Height" value={`${bioData.height} cm`} />
            <Info label="Weight" value={`${bioData.weight} kg`} />
            <Info label="Religion" value={bioData.religion} />
            <Info label="Mother Tongue" value={bioData.motherTongue} />
            <Info label="Nationality" value={bioData.nationality} />
          </Section>

          <Section title="Contact Details">
            <Info label="Phone" value={bioData.phone} />
            <Info label="Email" value={bioData.email} />
            <Info label="Address" value={bioData.address} />
          </Section>

          <Section title="Education">
            {bioData.education && bioData.education.length > 0 ? (
              bioData.education.map((edu, index) => (
                <div key={index} className="pl-4 border-l-2 border-blue-300">
                  <Info label="Degree" value={edu.degree || 'N/A'} />
                  <Info label="College" value={`${edu.institution || 'Unknown'} (${edu.year || 'N/A'})`} />
                  <Info label="Specialization" value={edu.specialization || 'N/A'} />
                </div>
              ))
            ) : (
              <p>No education details available.</p>
            )}
          </Section>

          <Section title="Family & Personality">
            <Info label="Parents" value={bioData.parents} />
            <Info label="Siblings" value={bioData.siblings} />
            <Info label="Personality" value={bioData.personality} />
            <Info label="Hobbies" value={bioData.hobbies} />
            <Info label="Preferences" value={bioData.preferences} />
          </Section>
        </div> <br />

        {/* Download & QR */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Download Profile as Image
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-xl font-semibold text-blue-600 mb-2">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Info = ({ label, value }) => (
  value ? (
    <p><span className="font-medium">{label}:</span> {value}</p>
  ) : null
);

export default BioDataProfile;

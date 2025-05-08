import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import domtoimage from 'dom-to-image-more';
import { saveAs } from 'file-saver';

const StudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Failed to fetch student profile");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const profileURL = `http://localhost:5173/student/${id}`;

  const handleDownloadCard = () => {
    if (!cardRef.current) return;

    domtoimage.toBlob(cardRef.current)
      .then((blob) => {
        saveAs(blob, `${student.name}_school_ID.png`);
      })
      .catch((error) => {
        console.error('Error downloading profile:', error);
      });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!student) return <div className="text-center py-8 text-red-500">Student not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div ref={cardRef} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">{student.school}</h1>
              <p className="text-blue-100">Official Student ID Card</p>
            </div>
            <img
              src={student.logo}
              alt="School Logo"
              className="w-16 h-16 object-contain bg-white rounded-lg p-1"
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {/* Left Column - Photo & QR */}
            <div className="space-y-6">
              <img
                src={student.photo}
                alt="Student"
                className="w-48 h-48 mx-auto object-cover rounded-lg border-4 border-white shadow-lg"
              />
              <div className="mx-auto">
                <QRCodeCanvas value={profileURL} size={128} />
              </div>
            </div>

            {/* Center Column - Personal Info */}
            <div className="col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
                <p className="text-gray-600">ID: {student.id_number}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoSection title="Personal Information">
                  <InfoItem label="Age" value={student.age} />
                  <InfoItem label="Email" value={student.student_email} />
                  <InfoItem label="Contact" value={student.student_contact} />
                  <InfoItem label="Address" value={student.address} />
                </InfoSection>

                <InfoSection title="Parent/Gaurdian">
                  <InfoItem label="Parent Contact" value={student.parent_contact} />
                  <InfoItem label="Parent Email" value={student.parent_email} />
                </InfoSection>
              </div>

              {/* Social Media Section */}
              {(student.instagram || student.facebook || student.linkedin || student.twitter || student.website) ? (
                <InfoSection title="Social Media">
                  <div className="flex flex-wrap gap-4">
                    {student.instagram && (
                      <SocialLink
                        url={student.instagram}
                        label="Instagram"
                        icon="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                      />
                    )}
                    {student.facebook && (
                      <SocialLink
                        url={student.facebook}
                        label="Facebook"
                        icon="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                      />
                    )}
                    {student.linkedin && (
                      <SocialLink
                        url={student.linkedin}
                        label="LinkedIn"
                        icon="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"
                      />
                    )}
                    {student.twitter && (
                      <SocialLink
                        url={student.twitter}
                        label="Twitter"
                        icon="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                      />
                    )}
                    {student.website && (
                      <SocialLink
                        url={student.website}
                        label="Website"
                        icon="M12 2a10 10 0 100 20 10 10 0 000-20zM4 12h16M4 12a8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8z"
                      />
                    )}
                  </div>
                </InfoSection>
              ) : null}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-4 text-center text-sm text-gray-600">
            Valid through {new Date().getFullYear() + 4} | {student.school}
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownloadCard}
          className="mt-8 w-full max-w-xs mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors"
        >
          Download ID Card
        </button>
      </div>
    </div>
  );
};

// Reusable Components
const InfoSection = ({ title, children }) => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{title}</h3>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const InfoItem = ({ label, value }) => (
  value && (
    <div className="flex justify-between items-center border-b border-gray-100 py-1">
      <span className="text-gray-600">{label}:</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  )
);

const SocialLink = ({ url, icon, label }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
    </svg>
    <span className="text-sm">{label}</span>
  </a>
);

export default StudentProfile;
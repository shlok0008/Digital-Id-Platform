import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import studentImg from '../assets/card3.jpg';
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

  const profileURL = `http://localhost:5173/viewprofile/${id}`;

  const handleDownloadCard = () => {
    if (!cardRef.current) return;

    domtoimage.toBlob(cardRef.current)
      .then((blob) => {
        saveAs(blob, `${student.name}_Profile.png`);
      })
      .catch((error) => {
        console.error('Error downloading profile:', error);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-center items-center h-full p-4 gap-3">
      {/* Profile Card */}
      <div
        ref={cardRef}
        id="student-profile-card"
        className="relative w-[300px] h-[550px] bg-cover bg-center shadow-2xl rounded-md"
        style={{ backgroundImage: `url(${studentImg})` }}
      >
        {/* Student Photo */}
        <img
          src={student.photo}
          alt="Student"
          className="absolute top-[100px] left-[83px] w-[135px] h-[135px] object-cover rounded-sm border-2 border-white"
        />

        {/* School Logo */}
        <img
          src={student.logo}
          alt="School Logo"
          className="absolute top-[15px] left-[10px] w-[60px] h-[60px] object-cover rounded-sm "
        />

        {/* Name */}
        <div className="absolute top-[250px] left-[30px] text-[16px] text-black font-bold text-center w-[240px]">
          {student.name}
        </div>

        {/* ID Number */}
        <div className="absolute top-[300px] left-5 text-[12px] text-gray-800 font-semibold w-[240px]">
          ID: {student.id_number}
        </div>

        {/* School */}
        <div className="absolute top-[325px] left-5 text-[12px] text-gray-800 font-semibold w-[240px]">
          School: {student.school}
        </div>

        {/* Contact */}
        <div className="absolute top-[350px] left-5 text-[12px] text-gray-800 font-semibold w-[240px]">
          Contact: {student.student_contact}
        </div>

        {/* Email */}
        <div className="absolute top-[375px] left-5 text-[12px] text-gray-700 font-semibold w-[240px] truncate">
          Email: {student.student_email}
        </div>

        {/* Address */}
        <div className="absolute top-[400px] left-5 text-[12px] text-gray-700 font-semibold w-[240px] truncate">
          Address: {student.address}
        </div>

        {/* QR Code */}
        <div className="absolute bottom-[5px] right-[10px]">
          <QRCodeCanvas value={profileURL} size={75} />
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownloadCard}
        className="bg-green-600 hover:bg-green-700 text-white text-sm mt-7 px-4 py-2 rounded-md"
      >
        Download Profile as Image
      </button>
    </div>
  );
};

export default StudentProfile;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const StudentProfile = () => {
//   const { id } = useParams();
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/students/${id}`);
//         setStudent(res.data);
//       } catch (err) {
//         console.error("Failed to fetch student profile");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStudent();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return student ? (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{student.name}'s Profile</h1>
//       <img src={student.photo} alt="Student" className="w-32 h-32 rounded-full object-cover mt-4" />
//       <p><strong>Age:</strong> {student.age}</p>
//       <p><strong>Contact:</strong> {student.student_contact}</p>
//       <p><strong>Email:</strong> {student.student_email}</p>
//       <p><strong>School:</strong> {student.school}</p>
//       <p><strong>Address:</strong> {student.address}</p>
//       <div>
//         <h3>Social Media Links</h3>
//         <ul>
//           {student.instagram && <li><a href={student.instagram}>Instagram</a></li>}
//           {student.facebook && <li><a href={student.facebook}>Facebook</a></li>}
//           {student.linkedin && <li><a href={student.linkedin}>LinkedIn</a></li>}
//           {student.twitter && <li><a href={student.twitter}>Twitter</a></li>}
//         </ul>
//       </div>
//     </div>
//   ) : (
//     <div>No student found</div>
//   );
// };

// export default StudentProfile;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import studentImg from '../assets/card3.jpg'
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-full p-4">
      <div
        className="relative w-[300px] h-[550px] bg-cover bg-center shadow-2xl rounded-md"
        style={{
          backgroundImage: `url(${studentImg})`,
        }}
      >
        {/* Student Photo */}
        <img
          src={student.photo}
          alt="Student"
          className="absolute top-[100px] left-[83px] w-[135px] h-[135px] object-cover rounded-sm border-2 border-white"
        />

        {/* Name */}
        <div className="absolute top-[250px] left-[30px] text-[16px] text-black font-bold text-center w-[240px] ">
          {student.name}
        </div>

        {/* ID Number */}
        <div className="absolute top-[300px] font-semibold left-5 text-[12px] text-gray-800 w-[240px] ">
          ID: {student.id_number}
        </div>

        {/* School */}
        <div className="absolute top-[325px] font-semibold  left-5 text-[12px] text-gray-800 w-[240px] ">
          School: {student.school}
        </div>

        {/* Contact */}
        <div className="absolute top-[350px] left-5 font-semibold  text-[12px] text-gray-800 w-[240px] ">
          Contact: {student.student_contact}
        </div>

        {/* Email */}
        <div className="absolute top-[375px] left-5 font-semibold  text-[12px] text-gray-700 w-[240px]  truncate">
          Email: {student.student_email}
        </div>

        {/* Address */}
        <div className="absolute top-[400px] left-5 font-semibold    text-[12px] text-gray-700 w-[240px] truncate">
          Address: {student.address}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

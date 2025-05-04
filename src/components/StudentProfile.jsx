import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  return student ? (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{student.name}'s Profile</h1>
      <img src={student.photo} alt="Student" className="w-32 h-32 rounded-full object-cover mt-4" />
      <p><strong>Age:</strong> {student.age}</p>
      <p><strong>Contact:</strong> {student.student_contact}</p>
      <p><strong>Email:</strong> {student.student_email}</p>
      <p><strong>School:</strong> {student.school}</p>
      <p><strong>Address:</strong> {student.address}</p>
      <div>
        <h3>Social Media Links</h3>
        <ul>
          {student.instagram && <li><a href={student.instagram}>Instagram</a></li>}
          {student.facebook && <li><a href={student.facebook}>Facebook</a></li>}
          {student.linkedin && <li><a href={student.linkedin}>LinkedIn</a></li>}
          {student.twitter && <li><a href={student.twitter}>Twitter</a></li>}
        </ul>
      </div>
    </div>
  ) : (
    <div>No student found</div>
  );
};

export default StudentProfile;

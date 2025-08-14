// EnrollmentContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';

const EnrollmentContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const EnrollmentProvider = ({ children }) => {
  const { user } = useUser();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchEnrollments = async () => {
    if (!user?.id) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`${BACKEND_URL}/api/enrollments/user/${user.id}/courses`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    setEnrolledCourses(data.courses?.map(c => c.id) || []);
  };

  const enrollInCourse = async (userId, courseId) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BACKEND_URL}/api/enrollments/${userId}/${courseId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to enroll');
    setEnrolledCourses(prev => [...prev, courseId]); // immediately update local state
  };

  const isEnrolled = (courseId) => enrolledCourses.includes(courseId);

  useEffect(() => {
    fetchEnrollments();
  }, [user?.id]);

  return (
    <EnrollmentContext.Provider value={{ enrolledCourses, enrollInCourse, isEnrolled, fetchEnrollments }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => useContext(EnrollmentContext);

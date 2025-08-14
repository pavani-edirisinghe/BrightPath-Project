import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
const CourseContext = createContext();
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Create provider component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/api/courses`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addCourse = async (courseData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/api/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(courseData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add course');
      }

      const newCourse = await response.json();
      setCourses(prev => [...prev, newCourse]);
      return newCourse;
    } catch (err) {
      throw new Error(err.message || 'An error occurred');
    }
  };

// ... existing imports and context setup ...

 // REPLACE THE EXISTING updateCourse FUNCTION WITH THIS NEW VERSION
  const updateCourse = async (id, courseData) => {
    try {
      console.log("Updating course:", id, courseData);
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(courseData)
      });

      console.log("Update response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update failed:", errorText);
        throw new Error(errorText || 'Failed to update course');
      }

      const updatedCourse = await response.json();
      console.log("Updated course:", updatedCourse);
      
      setCourses(prev => prev.map(c => 
        c.id === id ? {...c, ...updatedCourse} : c
      ));
      
      return updatedCourse;
    } catch (err) {
      console.error("Update error:", err);
      throw new Error(err.message || 'An error occurred');
    }
  };


// ... rest of CourseContext ...

  const deleteCourse = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/api/courses/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete course');
      }

      setCourses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      throw new Error(err.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ 
      courses, 
      loading, 
      error, 
      addCourse,
      updateCourse,
      deleteCourse,
      refreshCourses: fetchCourses
    }}>
      {children}
    </CourseContext.Provider>
  );
};

// Create custom hook
export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
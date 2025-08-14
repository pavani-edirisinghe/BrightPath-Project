import React, { useState, useEffect } from 'react';
import { useCourses } from '../../context/CourseContext';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import '../../assets/css/dashboard.css';

const AvailableCourses = () => {
  const { user } = useUser();
  const { 
    courses, 
    loading, 
    error, 
    deleteCourse, 
    refreshCourses, 
    updateCourse 
  } = useCourses();
  
  const { isEnrolled, enrollInCourse, loading: enrollmentLoading } = useEnrollment();
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Handle body scroll on modal open
  useEffect(() => {
    if (showEditModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showEditModal]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      day: date.getDate()
    };
  };

const handleEnroll = async (courseId) => {
  if (!user || !user.id) {
    alert('Please login to enroll in courses');
    return;
  }

  try {
    setEnrollingCourseId(courseId);
    await enrollInCourse(user.id, courseId); // updates EnrollmentContext
    alert('Successfully enrolled!');
  } catch (error) {
    alert(`Enrollment failed: ${error.message}`);
  } finally {
    setEnrollingCourseId(null);
  }
};


  const handleEdit = (course) => {
    console.log('Editing course:', course);
    setEditingCourse(course);
    setShowEditModal(true);
    console.log('Modal state after setting:', { showEditModal: true, editingCourse: course });
  };
  
  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingCourse(null);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        alert('Course deleted successfully!');
        await refreshCourses();
      } catch (error) {
        alert(`Failed to delete course: ${error.message}`);
      }
    }
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get('name');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price'));
    const imageUrl = formData.get('imageUrl');
    
    // Ensure date is properly formatted
    const startDate = formData.get('startDate');
    
    // Create updated course object
    const updatedCourse = {
      name,
      description,
      startDate: startDate ? new Date(startDate).toISOString() : editingCourse.startDate,
      price,
      imageUrl
    };
    
    try {
      await updateCourse(editingCourse.id, updatedCourse);
      alert('Course updated successfully!');
      handleCloseModal();
      await refreshCourses();
    } catch (error) {
      alert(`Failed to update course: ${error.message}`);
    }
  };

  // Debug logging
  console.log('Component render - showEditModal:', showEditModal, 'editingCourse:', editingCourse);

  return (
    <div className="available-courses">
      <h2>Available Courses</h2>
      
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading courses...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger">
          Error loading courses: {error}
        </div>
      ) : courses.length === 0 ? (
        <div className="alert alert-info">
          No courses available. Add some courses to get started.
        </div>
      ) : (
        <div className="course-grid">
          {courses.map(course => {
            const formattedDate = formatDate(course.startDate);
            const enrolled = isEnrolled(course.id);
            const isEnrolling = enrollingCourseId === course.id;
            const isAdmin = user?.username === 'Admin';
            
            return (
              <div className="course-card" key={course.id}>
                <div className="course-thumb">
                  {course.imageUrl ? (
 // Update the image URL in AvailableCourses.jsx
<img 
  src={course.imageUrl}
  alt={course.name} 
  
/>
) : (
  <div className="course-placeholder">
    <i className="fas fa-book"></i>
  </div>
)}

                  <div className="course-price">
                    {course.price > 0 ? `LKR ${course.price}` : 'Free'}
                  </div>
                  {isAdmin && (
                    <div className="course-actions-admin">
                      <button 
                        className="edit-btn" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEdit(course);
                        }}
                        type="button"
                        title="Edit Course"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDelete(course.id);
                        }}
                        type="button"
                        title="Delete Course"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  )}
                </div>
                <div className="course-details">
                  <div className="course-date">
                    <h6>{formattedDate.month} <span>{formattedDate.day}</span></h6>
                  </div>
                  <div className="course-content">
                    <h4>{course.name}</h4>
                    <p>{course.description}</p>
                  </div>
                  {!isAdmin && (
  <div className="course-enroll">
{!isAdmin && (
  <div className="course-enroll">
    {isEnrolled(course.id) ? (
      <button className="enrolled-btn" disabled>
        <i className="fas fa-check"></i> Enrolled
      </button>
    ) : (
      <button className="enroll-btn" 
              onClick={() => handleEnroll(course.id)} 
              disabled={enrollingCourseId === course.id}>
        {enrollingCourseId === course.id ? (
          <>
            <span className="spinner-border spinner-border-sm" role="status"></span>
            Enrolling...
          </>
        ) : (
          <>
            <i className="fas fa-plus"></i> Add to My Courses
          </>
        )}
      </button>
    )}
  </div>
)}

  </div>
)}

                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/courses" className="btn btn-outline-primary">
          View All Courses
        </Link>
      </div>

      {/* Edit Modal - Now using CSS classes */}
      {showEditModal && editingCourse && (
        <div 
          className="edit-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div className="edit-modal-container">
            {/* Modal Header */}
            <div className="edit-modal-header">
              <h3 className="edit-modal-title">Edit Course</h3>
              <button 
                onClick={handleCloseModal}
                type="button"
                className="edit-modal-close-btn"
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveCourse} className="edit-modal-body">
              {/* Course Name */}
              <div className="edit-modal-form-group">
                <label className="edit-modal-label">Course Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editingCourse?.name || ''}
                  required
                  className="edit-modal-input"
                />
              </div>

              {/* Description */}
              <div className="edit-modal-form-group">
                <label className="edit-modal-label">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingCourse?.description || ''}
                  required
                  rows="3"
                  className="edit-modal-textarea"
                />
              </div>

              {/* Date and Price Row */}
              <div className="edit-modal-form-row">
                <div className="edit-modal-form-col">
                  <label className="edit-modal-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    defaultValue={editingCourse?.startDate?.split?.('T')[0] || ''}
                    required
                    className="edit-modal-input"
                  />
                </div>
                <div className="edit-modal-form-col">
                  <label className="edit-modal-label">Price (LKR)</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingCourse?.price || 0}
                    required
                    min="0"
                    step="0.01"
                    className="edit-modal-input"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="edit-modal-form-group">
                <label className="edit-modal-label">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  defaultValue={editingCourse?.imageUrl || ''}
                  className="edit-modal-input"
                />
              </div>

              {/* Modal Footer */}
              <div className="edit-modal-footer">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="edit-modal-btn edit-modal-btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="edit-modal-btn edit-modal-btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableCourses;


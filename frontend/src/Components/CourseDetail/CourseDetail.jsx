import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourses } from '../../context/CourseContext';
import { useEnrollment } from '../../context/EnrollmentContext'; // Import useEnrollment
import { useUser } from '../../context/UserContext'; // Import useUser
import CourseHeader from '../CourseDetail/CourseHeader.jsx';

const CourseDetail = () => {
  const { courseId } = useParams();
  const { courses, loading, error } = useCourses();
  const { user } = useUser(); // Get user from context
  const { isEnrolled, enrollInCourse, loading: enrollmentLoading } = useEnrollment(); // Get enrollment functions
  const [course, setCourse] = useState(null);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  useEffect(() => {
    if (courses && courses.length > 0) {
      const foundCourse = courses.find(c => c.id.toString() === courseId);
      setCourse(foundCourse);
    }
  }, [courses, courseId]);

  const handleEnroll = async (courseId) => {
    if (!user || !user.id) {
      alert('Please login to enroll in courses');
      return;
    }
    
    try {
      setEnrollingCourseId(courseId);
      await enrollInCourse(user.id, courseId);
      alert('Successfully enrolled in the course!');
    } catch (error) {
      alert(`Enrollment failed: ${error.message}`);
    } finally {
      setEnrollingCourseId(null);
    }
  };

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p>Error loading course: {error}</p>;
  if (!course) return <p>Course not found.</p>;

  const formattedDate = new Date(course.startDate).toLocaleDateString(
    'en-US', {
      month: 'short',
      day: 'numeric'
    }
  ).toUpperCase();

  const enrolled = isEnrolled(course.id);
  const isEnrolling = enrollingCourseId === course.id;

  return (
    <div className="course-detail-page">
      <CourseHeader course={course} />

      <section className="meetings-page1" id="meetings">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-12">
                  <div className="meeting-single-item">
                    <div className="thumb">
                      <div className="price">
                        <span>{course.price > 0 ? `LKR ${course.price}` : 'Free'}</span>
                      </div>
                      <div className="date">
                        <h6>{formattedDate.split(' ')[0]} <span>{formattedDate.split(' ')[1]}</span></h6>
                      </div>
                      <a href="#">
                          {course.imageUrl ? (
                            <img src={course.imageUrl}  alt={course.name} />
                          ) : (
                            <div className="course-img-placeholder">
                              <i className="fas fa-book"></i>
                            </div>
                          )}
                      </a>
                    </div>
                    <div className="down-content">
                      <a href="#">
                        <h4>{course.name}</h4>
                      </a>
                      <p>{course.description}</p>
                      <p className="description">
                        Learn to build powerful web applications from scratch with our
                        online Full-Stack Web Development course. This hands-on
                        program covers everything from frontend basics like HTML, CSS,
                        and JavaScript, to advanced backend skills using Node.js,
                        Express, and MongoDB.
                        <br /><br />
                        All sessions are conducted live via Zoom with recorded access
                        for flexibility. Whether you're a student, job seeker, or
                        professional looking to upskill, this course is perfect for
                        you. Complete real-world projects and earn a certificate that
                        can boost your tech career.
                      </p>
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="hours">
                            <h5>Hours</h5>
                            <p>
                              Weekdays: 06:00 PM - 08:00 PM<br />
                              Weekend Q&A: Sundays 10:00 AM - 11:30 AM
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="location">
                            <h5>Location</h5>
                            <p>
                              100% Online via Zoom<br />
                              Access from anywhere in Sri Lanka
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="book-now">
                            <h5>Enroll Now</h5>
                            <p>
                              TechLily@info.com<br />
                              +94 71 123 4567
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
  <div
    className="main-button-red"
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '10px', 
      flexWrap: 'wrap' 
    }}
  >
    <Link
      to="/courses"
      style={{
        textDecoration: 'none',
        borderRadius: '20px',
        fontWeight: '500',
      }}
    >
      Back To Courses List
    </Link>

    {enrolled ? (
      <button
        className="enrolled-btn"
        style={{ width: '200px', borderRadius: '20px', background: '#28a745', color: '#fff' }}
        disabled
      >
        <i className="fas fa-check"></i> Enrolled
      </button>
      
    ) : (
      <button
        className="btn enroll-btn"
        style={{
          width: '200px',
        borderRadius: '20px',
          fontWeight: '500',
        }}
        onClick={() => handleEnroll(course.id)}
        disabled={isEnrolling}
      >
        {isEnrolling ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Enrolling...
          </>
        ) : (
          <>
            <i className="fas fa-plus me-2"></i> Enroll Now
          </>
        )}
      </button>
    )}
  </div>
</div>


              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;


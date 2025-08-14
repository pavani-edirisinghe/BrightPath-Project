import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CourseHeader from '../CourseDetail/CourseHeader.jsx';
import { useEnrollment } from '../../context/EnrollmentContext';
import { useUser } from '../../context/UserContext';

const SpecialOfferDetail = () => {
  const { offerId } = useParams();
  const location = useLocation();
  const [offer, setOffer] = useState(null);
  const { user } = useUser();
  const { isEnrolled, enrollInCourse, loading: enrollmentLoading } = useEnrollment();
  const [enrollingOfferId, setEnrollingOfferId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.offer) {
      setOffer(location.state.offer);
    }
  }, [location.state]);

  const handleEnroll = async (offerId) => {
    if (!user || !user.id) {
      alert('Please login to enroll in offers');
      return;
    }

    try {
      setEnrollingOfferId(offerId);
      await enrollInCourse(user.id, offerId);
      alert('Successfully enrolled in the special offer!');
    } catch (error) {
      alert(`Enrollment failed: ${error.message}`);
    } finally {
      setEnrollingOfferId(null);
    }
  };

  if (!offer) {
    return <p>Loading offer details or offer not found...</p>;
  }

  const formattedDate = offer.date
    ? new Date(offer.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }).toUpperCase()
    : 'N/A';

  const enrolled = isEnrolled(offer.id);
  const isEnrolling = enrollingOfferId === offer.id;

  return (
    <div className="course-detail-page">
      <CourseHeader />

      <section className="meetings-page1" id="meetings">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="meeting-single-item">
                <div className="thumb">
                  <div className="price">
                    <span>{offer.price > 0 ? `LKR ${offer.price}` : 'Free'}</span>
                  </div>
                  <div className="date">
                    <h6>{formattedDate.split(' ')[0]} <span>{formattedDate.split(' ')[1]}</span></h6>
                  </div>
                  {offer.imageUrl ? (
                    <img src={`/${offer.imageUrl}`} alt={offer.title} />
                  ) : (
                    <div className="course-img-placeholder">
                      <i className="fas fa-book"></i>
                    </div>
                  )}
                </div>

                <div className="down-content">
                  <h4>{offer.title}</h4>
                  <p>{offer.description}</p>

                  <div className="row mt-4">
                    <div className="col-lg-4">
                      <div className="hours">
                        <h5>Instructor</h5>
                        <p>{offer.instructor}</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="location">
                        <h5>Duration</h5>
                        <p>{offer.duration}</p>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="book-now">
                        <h5>Students</h5>
                        <p>{offer.students}</p>
                      </div>
                    </div>
                  </div>

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

              <div
                className="main-button-red"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginTop: '20px'
                }}
              >
                <a
                  href="/courses"
                  style={{
                    textDecoration: 'none',
                    borderRadius: '20px',
                    fontWeight: '500'
                  }}
                >
                  Back To Courses List
                </a>

                {enrolled ? (
                  <button
                    className="enrolled-btn"
                    style={{
                      width: '200px',
                      borderRadius: '20px',
                      background: '#28a745',
                      color: '#fff'
                    }}
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
                      fontWeight: '500'
                    }}
                    onClick={() => handleEnroll(offer.id)}
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
      </section>
    </div>
  );
};

export default SpecialOfferDetail;

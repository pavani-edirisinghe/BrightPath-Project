import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import '../../assets/lib/owlcarousel/owl.carousel.min.js';
import '../../assets/lib/owlcarousel/assets/owl.carousel.min.css';
import '../../assets/css/style.css';

import Categaries from '../Courses/Couses Categaries.jsx';
import Reviews from '../Courses/Reviews.jsx';
import AllCourses from '../Courses/All courses.jsx';

const Courses = () => {
    return(
<div>
        <div className="container-fluid bg-primary py-5 mb-5 page-header1">
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-10 text-center">
        <h1 className="display-3 text-primary animated slideInDown">Courses</h1>
        <p className="fs-5 text-white mb-4 pb-2">
           Explore beginner-friendly courses in coding, design, and more—crafted to 
           support and empower learners of all backgrounds. Join BrightPath to build your skills 
           and confidence in tech through engaging, supportive courses.

        </p>
      </div>
    </div>
  </div>
</div>

<Categaries />
<AllCourses />
<Reviews />
<a
  href="#"
  className="btn btn-lg btn-primary btn-lg-square back-to-top"
  onClick={(e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
>
  <i className="bi bi-arrow-up"></i>
</a>

</div>
    );
};

export default Courses;

import React from 'react';
import { Link } from 'react-router-dom';

const CoursesHeader = () => {

  return (
<div className="container-fluid bg-primary py-5 mb-5 page-header4">
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-10 text-center">
        <h1 className="display-3 text-light animated slideInDown">
          Get All Details
        </h1>
        <p className="fs-5 text-white mb-4 pb-2">
          Explore in-depth information about each course, including topics
          covered, duration, and how it can boost your career.
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default CoursesHeader;

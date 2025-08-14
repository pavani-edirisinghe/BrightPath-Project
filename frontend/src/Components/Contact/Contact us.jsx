import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import '../../assets/lib/owlcarousel/owl.carousel.min.js';
import '../../assets/lib/owlcarousel/assets/owl.carousel.min.css';
import '../../assets/css/style.css';

import Map from '../Contact/map.jsx';

const Contact = () => {
     return (
<div>
        <div className="container-fluid bg-primary py-5 mb-5 page-header2">
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-lg-10 text-center">
        <h1 className="display-3 text-primary animated slideInDown">
          
          Contact Us
        </h1>
        <p className="fs-5 text-white mb-4 pb-2">
          Have a question or need assistance? Our team is ready to help you with
          course details, enrollment support, or any general inquiries. Don’t
          hesitate to get in touch!
        </p>
      </div>
    </div>
  </div>
</div>

        <Map />

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

export default Contact;

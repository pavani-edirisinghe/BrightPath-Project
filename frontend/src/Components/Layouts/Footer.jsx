import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/css/style.css';

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Quick Link</h4>
            <NavLink className="btn btn-link" to="/about-us">About Us</NavLink>
            <NavLink className="btn btn-link" to="/contact">Contact Us</NavLink>
            <NavLink className="btn btn-link" to="/privacy-policy">Privacy Policy</NavLink>
            <NavLink className="btn btn-link" to="/term-of-service">Terms & Condition</NavLink>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Contact</h4>
            <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />No.253, Wakwella Road, Galle.</p>
            <p className="mb-2"><i className="fa fa-phone-alt me-3" />+94 77 1234657</p>
            <p className="mb-2"><i className="fa fa-envelope me-3" />BrightPath@info.com</p>
            <div className="d-flex pt-2">
              <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-youtube" /></a>
              <a className="btn btn-outline-light btn-social" href="https://www.linkedin.com/in/pavani-edirisinghe-473295318"><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Gallery</h4>
            <div className="row g-2 pt-2">
              <div className="col-4"><img className="img-fluid bg-light p-1" src="/img/9.jpg" alt="Gallery 1" /></div>
              <div className="col-4"><img className="img-fluid bg-light p-1" src="/img/course-2.jpg" alt="Gallery 2" /></div>
              <div className="col-4"><img className="img-fluid bg-light p-1" src="/img/course-3.jpg" alt="Gallery 3" /></div>
              <div className="col-4"><img className="img-fluid bg-light p-1" src="/img/12.jpg" alt="Gallery 4" /></div>
              <div className="col-4"><img className="img-fluid bg-light p-1" src="/img/11.jpg" alt="Gallery 5" /></div>
              <div className="col-4"><img className="img-fluid bg-light p-1" src="/img/10.jpg" alt="Gallery 6" /></div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-3">Get Involved</h4>
            <p>
              Be a part of positive change! Volunteer or partner with us to support
              tech education and awareness campaigns across Sri Lanka.
            </p>
            <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
              <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="email" placeholder="Your email address" />
              <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              © <a className="border-bottom" href="#">BrightPath</a>, All Rights Reserved.
              Empowering Learners in Tech from Sri Lanka to the World.<br />
              Designed By <a className="border-bottom" href="https://www.linkedin.com/in/pavani-edirisinghe-473295318">Pavani Edirisinghe</a>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-menu">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/privacy-policy">Cookies</NavLink>
                <NavLink to="/help">Help</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

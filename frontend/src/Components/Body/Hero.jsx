import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import '../../assets/lib/owlcarousel/owl.carousel.min.js';
import '../../assets/lib/owlcarousel/assets/owl.carousel.min.css';
import '../../assets/css/style.css';
import AboutDescription from '../About/Description.jsx';
import Causes from '../Courses/Couses Categaries.jsx';
import Instructors from '../About/First Instructors.jsx';
import Reviews from '../Courses/Reviews.jsx';

const HeroSection = () => {
  return (
    <>
      <div className="container-fluid p-0 mb-5">
        <OwlCarousel
          className="owl-theme header-carousel"
          items={1}
          loop={true}
          autoplay={true}
          smartSpeed={1500}
          dots={false}
          nav={true}
          navText={[
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
          ]}
        >
          <div className="owl-carousel-item position-relative">
            <img className="img-fluid" src="/img/1.jpg" alt="Slide 1" />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: 'rgba(5, 6, 11, 0.7)' }}
            >
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-sm-10 col-lg-8">
                    <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                      Empowering Minds Through Learning
                    </h5>
                    <h1 className="display-3 text-white animated slideInDown">
                      Welcome to BrightPath
                    </h1>
                    <p className="fs-5 text-white mb-4 pb-2">
                      Discover a world where creativity meets code, and passion leads to purpose. 
        From technology to the arts, BrightPath is your space to learn, grow, and thrive — whoever you are.
                    </p>
                    <a
                      href="#services"
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Start Learning
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="owl-carousel-item position-relative">
            <img className="img-fluid" src="/img/2.jpg" alt="Slide 2" />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: 'rgba(5, 6, 11, 0.7)' }}
            >
              <div className="container">
                <div className="row justify-content-start">
                  <div className="col-sm-10 col-lg-8">
                    <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                      Empowering Minds Through Learning
                    </h5>
                    <h1 className="display-3 text-white animated slideInDown">
                      Welcome to BrightPath
                    </h1>
                    <p className="fs-5 text-white mb-4 pb-2">
                      Discover a world where creativity meets code, and passion leads to purpose. 
        From technology to the arts, BrightPath is your space to learn, grow, and thrive — whoever you are.
                    </p>
                    <a
                      href="#services"
                      className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
                    >
                      Start Learning
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OwlCarousel>
        <AboutDescription />
        <Causes />
        <Instructors />
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

      
    </>
  );
};

export default HeroSection;

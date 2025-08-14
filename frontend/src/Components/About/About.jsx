import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import CountUp from 'react-countup';
import '../../assets/lib/owlcarousel/owl.carousel.min.js';
import '../../assets/lib/owlcarousel/assets/owl.carousel.min.css';
import '../../assets/css/style.css';

import AboutDescription from '../About/Description.jsx';
import Experts from '../About/Expert Instructors.jsx';
import Map from '../Contact/map.jsx';
import { useInView } from "react-intersection-observer";

const About = () => {
  // Hook inside the component!
  const { ref, inView } = useInView({
    triggerOnce: true, // count only once
    threshold: 0.3,    // trigger when 30% of element visible
  });

  return (
    <div>
      <div className="container-fluid bg-primary py-0 mb-0 page-header">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-primary animated slideInDown">About Us</h1>
              <p className="fs-5 text-white mb-4 pb-2">
                Welcome to BrightPath, where we empower learners through education and technology. 
                Our mission is to create a supportive and inclusive environment for everyone to learn, grow, and thrive in the digital age.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AboutDescription />
      <Experts />

      <section className="our-facts" ref={ref}>
        <div className="container">
          <div className="row">
            {/* Left side */}
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <h2>A Few Facts About Our University</h2>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="count-area-content percentage">
                        <div className="count-digit">
                          {inView ? <CountUp start={1} end={94} duration={2} /> : 1}
                        </div>
                        <div className="count-title">Succesed Students</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="count-area-content">
                        <div className="count-digit">
                          {inView ? <CountUp start={1} end={126} duration={2} /> : 1}
                        </div>
                        <div className="count-title">Current Teachers</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-12">
                      <div className="count-area-content new-students">
                        <div className="count-digit">
                          {inView ? <CountUp start={1} end={2345} duration={2} /> : 1}
                        </div>
                        <div className="count-title">New Students</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="count-area-content">
                        <div className="count-digit">
                          {inView ? <CountUp start={1} end={32} duration={2} /> : 1}
                        </div>
                        <div className="count-title">Awards</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right side with video */}
            <div className="col-lg-6 align-self-center">
              <div className="video">
                <a href="https://www.youtube.com/watch?v=HndV87XpkWg" target="_blank" rel="noreferrer">
                  <img src="img/play-icon.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default About;

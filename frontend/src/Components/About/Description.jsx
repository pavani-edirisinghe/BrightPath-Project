import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Description = () => {

      useEffect(() => {
    const accordionHeads = document.querySelectorAll('.accordion-head');

    accordionHeads.forEach(head => {
      head.addEventListener('click', function () {
        const parent = document.querySelector('.accordions');
        parent?.classList.remove('is-first-expanded');

        const allHeads = document.querySelectorAll('.accordion-head');
        const allBodies = document.querySelectorAll('.accordion-body');

        const thisBody = this.nextElementSibling;
        const isOpen = this.classList.contains('is-open');

        allHeads.forEach(h => {
          h.classList.remove('is-open');
          const icon = h.querySelector('.icon');
          if (icon) icon.style.transform = 'rotate(0deg)';
        });

        allBodies.forEach(b => {
          b.style.maxHeight = null;
        });

        if (!isOpen) {
          this.classList.add('is-open');
          const icon = this.querySelector('.icon');
          if (icon) icon.style.transform = 'rotate(90deg)';
          thisBody.style.maxHeight = thisBody.scrollHeight + 'px';
        }
      });
    });

    const firstAccordion = document.querySelector('.is-first-expanded .accordion:first-child');
    if (firstAccordion) {
      const firstHead = firstAccordion.querySelector('.accordion-head');
      const firstBody = firstAccordion.querySelector('.accordion-body');

      firstHead?.classList.add('is-open');
      const icon = firstHead?.querySelector('.icon');
      if (icon) icon.style.transform = 'rotate(90deg)';
      if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
    }

    return () => {
      accordionHeads.forEach(head => {
        head.replaceWith(head.cloneNode(true));
      });
    };
  }, []);
    return (
        
   <>
  <div id="services" className="container-xxl py-5">
  <div className="container">
    <div className="row g-4" style={{ paddingTop: 60 }}>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className="service-item text-center pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-graduation-cap text-primary mb-4" />
            <h5 className="mb-3">Skilled Instructors</h5>
            <p>
              Learn from passionate mentors and expert educators who guide and inspire you at every step of your journey.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
        <div className="service-item text-center pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-globe text-primary mb-4" />
            <h5 className="mb-3">Online Classes</h5>
            <p>
              Flexible, fun, and interactive courses designed to help anyone learn anytime, anywhere—from coding to creativity.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
        <div className="service-item text-center pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-home text-primary mb-4" />
            <h5 className="mb-3">Home Projects</h5>
            <p>
              Hands-on projects that bring learning to life—build websites, design, solve problems, and innovate from home.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
        <div className="service-item text-center pt-3">
          <div className="p-4">
            <i className="fa fa-3x fa-book-open text-primary mb-4" />
            <h5 className="mb-3">Book Library</h5>
            <p>
                  Access a growing digital library filled with eBooks, guides, and
                inspiring reads curated especially for all.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div
          className="col-lg-6 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ minHeight: 400 }}
        >
          <div className="position-relative h-100">
            <img
              className="img-fluid position-absolute w-100 h-100"
              src="img/3.jpg"
              alt=""
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
          <h6 className="section-title bg-white text-start text-primary pe-3">
            About Us
          </h6>
          <h1 className="mb-4">Welcome to BrightPath</h1>
          <p className="mb-4">
             BrightPath is more than just a learning platform — it's a vibrant community where learners are encouraged to explore, build, and shine. 
             We believe in nurturing confidence, creativity, and curiosity through accessible education and supportive mentorship.
          </p>
          <p className="mb-4">
             Our courses are crafted to inspire future creators, thinkers, and leaders. 
             Whether it's coding your first webpage, designing a digital project, or discovering a new skill,
              we’re here to support you every step of the way.
              Everyone deserves the opportunity to learn and lead — and BrightPath is here to make that possible.
          </p>
          <div className="row gy-2 gx-4 mb-4">
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                Empowering Learning Environment
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                Expert Mentors
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                Project-Based Learning
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                Creative Tech Courses
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                Flexible Online Access
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-0">
                <i className="fa fa-arrow-right text-primary me-2" />
                Supportive Peer Community
              </p>
            </div>
          </div>
          <Link to="/about-us" className="btn btn-primary py-3 px-5 mt-2">
  Read More
</Link>

        </div>
      </div>
    </div>
  </div>
  <section className="apply-now" id="apply">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 align-self-center">
          <div className="row">
            <div className="col-lg-12">
              <div className="item">
                <h3>START YOUR LEARNING JOURNEY</h3>
                <p>
                  Join a growing community of passionate, creative, 
                  and ambitious learners who are shaping the future through education and innovation. 
                  Our programs are designed to empower everyone with the tools and confidence to achieve their dreams.
    
                </p>
                <div className="main-button-red1">
                  <div className="scroll-to-section">
                    <Link to="/courses">Join Us Now!</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="item">
                <h3>EMPOWER YOURSELF WITH SKILLS</h3>
                <p>
                 Explore hands-on courses, mentorship, and real-world projects that help you grow your abilities and 
                 prepare for exciting opportunities in technology, leadership, and beyond.
                </p>
                <div className="main-button-yellow">
                  <div className="scroll-to-section">
                    <Link to="/courses">Join Us Now!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="accordions is-first-expanded">
            <article className="accordion">
              <div className="accordion-head">
                <span>Why Join BrightPath?</span>
                <span className="icon">
                  <i className="icon fa fa-chevron-right" />
                </span>
              </div>
              <div className="accordion-body">
                <div className="content">
                  <p>
                    BrightPath provides a safe, inclusive space where all can
                    explore technology, express creativity, and build leadership
                    skills. With guidance from expert mentors and inspiring
                    peers, every learner finds unique path to success.
                  </p>
                </div>
              </div>
            </article>
            <article className="accordion">
              <div className="accordion-head">
                <span>Who Can Apply?</span>
                <span className="icon">
                  <i className="icon fa fa-chevron-right" />
                </span>
              </div>
              <div className="accordion-body">
                <div className="content">
                  <p>
                    Our platform is open to anyone with a passion for learning regardless of background, identity, or experience level. 
                    Whether you're just getting started or already have a dream in mind, BrightPath is here to support your journey.
                  </p>
                </div>
              </div>
            </article>
            <article className="accordion">
              <div className="accordion-head">
                <span>How to Get Started?</span>
                <span className="icon">
                  <i className="icon fa fa-chevron-right" />
                </span>
              </div>
              <div className="accordion-body">
                <div className="content">
                  <p>
                    Getting started is simple — just click “Join Us Now,” fill out a short application, 
                    and begin your learning journey. Our team is here to guide and support you every step of the way.
          
                  </p>
                </div>
              </div>
            </article>
            <article className="accordion last-accordion">
              <div className="accordion-head">
                <span>Spread the Word</span>
                <span className="icon">
                  <i className="icon fa fa-chevron-right" />
                </span>
              </div>
              <div className="accordion-body">
                <div className="content">
                  <p>
                    Know someone who could benefit from BrightPath? Share our platform! 
                    Together, we can grow a community of confident, skilled, and forward-thinking learners.
          
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

    );
};

export default Description;
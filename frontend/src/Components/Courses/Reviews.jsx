import React, { useEffect } from 'react';

const Reviews = () => {
   
     useEffect(() => {
    window.$('.testimonial-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      center: true,
      margin: 24,
      dots: true,
      loop: true,
      nav: false,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 },
      },
    });
  }, []);
  
    return (
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
  <div className="container">
    <div className="text-center">
      <h6 className="section-title bg-white text-center text-primary px-3">
        Reviews
      </h6>
      <h1 className="mb-5">What Our Students Say</h1>
    </div>
    <div className="owl-carousel testimonial-carousel position-relative">
      <div className="testimonial-item text-center">
        <img
          className="border rounded-circle p-2 mx-auto mb-3"
          src="img/testimonial-1.jpg"
          style={{ width: 80, height: 80 }}
        />
        <h5 className="mb-0">Tharushi Perera</h5>
        <p>University of Moratuwa</p>
        <div className="testimonial-text bg-light text-center p-4">
          <p className="mb-0">
            “This course helped me understand web development in Sinhala, which
            made it so much easier to follow. The instructors were very friendly
            and supportive.”
          </p>
        </div>
      </div>
      <div className="testimonial-item text-center">
        <img
          className="border rounded-circle p-2 mx-auto mb-3"
          src="img/testimonial-2.jpg"
          style={{ width: 80, height: 80 }}
        />
        <h5 className="mb-0">Mohamed Rizwan</h5>
        <p>SLIIT Student</p>
        <div className="testimonial-text bg-light text-center p-4">
          <p className="mb-0">
            “Very practical and well-organized lessons. I was able to build my
            first website in just a few weeks. Highly recommend for beginners in
            Sri Lanka.”
          </p>
        </div>
      </div>
      <div className="testimonial-item text-center">
        <img
          className="border rounded-circle p-2 mx-auto mb-3"
          src="img/testimonial-3.jpg"
          style={{ width: 80, height: 80 }}
        />
        <h5 className="mb-0">Sasindu Jayawardena</h5>
        <p>Advanced Level Student</p>
        <div className="testimonial-text bg-light text-center p-4">
          <p className="mb-0">
            “I joined the course during school holidays and learned a lot! The
            content was easy to grasp, even for someone new to coding.”
          </p>
        </div>
      </div>
      <div className="testimonial-item text-center">
        <img
          className="border rounded-circle p-2 mx-auto mb-3"
          src="img/testimonial-4.jpg"
          style={{ width: 80, height: 80 }}
        />
        <h5 className="mb-0">Nethmi Rajapaksha</h5>
        <p>Freelancer, Galle</p>
        <div className="testimonial-text bg-light text-center p-4">
          <p className="mb-0">
            “Thanks to this program, I started freelancing online. The tips they
            gave about platforms like Fiverr and Upwork were extremely
            valuable.”
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

    );
};

export default Reviews;
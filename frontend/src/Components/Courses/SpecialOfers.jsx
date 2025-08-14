import React from 'react';
import { Link } from 'react-router-dom';

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Data Science and AI",
      price: 4500,
      instructor: "Ms. Ishara Perera",
      duration: "2.5 Hrs",
      students: "30 Students",
      imageUrl: "img/8.jpg",
      description: "This comprehensive Data Science and AI course covers everything from foundational concepts to advanced machine learning algorithms. Learn data analysis, predictive modeling, and artificial intelligence techniques. Ideal for beginners and professionals looking to enhance their skills in the rapidly growing field of AI."
    },
    {
      id: 2,
      title: "Cyber Security Awareness",
      price: 1000,
      instructor: "Ms. Ruwani Wijesinghe",
      duration: "1 Hrs",
      students: "50 Students",
      imageUrl: "img/9.jpg",
      description: "Protect yourself and your data with our Cyber Security Awareness course. This essential program teaches you how to identify and avoid common cyber threats, understand online privacy, and implement best practices for digital safety. Perfect for individuals and small businesses."
    },
    {
      id: 3,
      title: "Web Design & Development Course",
      price: 2000,
      instructor: "Mr. Niroshan Jayasinghe",
      duration: "3 Hrs",
      students: "65 Students",
      imageUrl: "img/course-3.jpg",
      description: "Master the art of creating stunning and functional websites with our Web Design & Development course. From responsive design to interactive elements, you'll learn HTML, CSS, JavaScript, and modern frameworks to build professional web applications. Suitable for aspiring web developers and designers."
    }
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Courses
          </h6>
          <h1 className="mb-5">Special Offers for Everyone</h1>
        </div>
        <div className="row g-4 justify-content-center">
          {offers.map(offer => (
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={offer.id}>
              <div className="course-item bg-light">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid" src={offer.imageUrl} alt={offer.title} />
                  <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                    <Link
                      to={`/offer/${offer.id}`}
                      state={{ offer: offer }}
                      className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                      style={{ borderRadius: "30px 0 0 30px" }}
                    >
                      Read More
                    </Link>
                    <Link
                      to={`/offer/${offer.id}`}
                      state={{ offer: offer }}
                      className="flex-shrink-0 btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "0 30px 30px 0" }}
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
                <div className="text-center p-4 pb-0">
                  <h3 className="mb-0">Rs. {offer.price.toLocaleString()}</h3>
                  <div className="mb-3">
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small className="fa fa-star text-primary" />
                    <small>(1200)</small>
                  </div>
                  <h5 className="mb-4">{offer.title}</h5>
                </div>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-user-tie text-primary me-2" />
                    {offer.instructor}
                  </small>
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-clock text-primary me-2" />
                    {offer.duration}
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2" />
                    {offer.students}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;


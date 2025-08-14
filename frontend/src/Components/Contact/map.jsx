const map = () => {
    return (
        <div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title bg-white text-center text-primary px-3">
        Contact Us
      </h6>
      <h1 className="mb-5">Contact For Any Question</h1>
    </div>
    <div className="row g-4">
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
        <h5>Get In Touch</h5>
        <p className="mb-4">
          We'd love to hear from you! Whether you have questions, feedback, or
          simply want to learn more about our programs, feel free to reach out.
          Our team is always ready to assist and support you in any way we can.
        </p>
        <div className="d-flex align-items-center mb-3">
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
            style={{ width: 50, height: 50 }}
          >
            <i className="fa fa-map-marker-alt text-white" />
          </div>
          <div className="ms-3">
            <h5 className="text-primary">Office</h5>
            <p className="mb-0">No.253, Wakwella Road, Galle.</p>
          </div>
        </div>
        <div className="d-flex align-items-center mb-3">
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
            style={{ width: 50, height: 50 }}
          >
            <i className="fa fa-phone-alt text-white" />
          </div>
          <div className="ms-3">
            <h5 className="text-primary">Mobile</h5>
            <p className="mb-0">+94 77 1234657</p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div
            className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
            style={{ width: 50, height: 50 }}
          >
            <i className="fa fa-envelope-open text-white" />
          </div>
          <div className="ms-3">
            <h5 className="text-primary">Email</h5>
            <p className="mb-0">BrightPath@info.com</p>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
        <iframe
          className="position-relative rounded w-100 h-100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63480.8374898179!2d80.17697731341235!3d6.055975780910134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173bb6932fce3%3A0x4a35b903f9c64c03!2sGalle!5e0!3m2!1sen!2slk!4v1669952452895!5m2!1sen!2slk"
          frameBorder={0}
          style={{ minHeight: 300, border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
      <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
        <form>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                />
                <label htmlFor="name">Your Name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                />
                <label htmlFor="email">Your Email</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Subject"
                />
                <label htmlFor="subject">Subject</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a message here"
                  id="message"
                  style={{ height: 150 }}
                  defaultValue={""}
                />
                <label htmlFor="message">Message</label>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary w-100 py-3"
                type="submit"
                href="contact.html"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

    );
};

export default map;
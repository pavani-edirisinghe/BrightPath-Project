import MapComponent from '../Contact/map.jsx';

const Help = () => {
    return (
        <div>
            <>
  <div className="container-fluid bg-primary py-5 mb-5 page-header5">
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <h1 className="display-3 text-primary animated slideInDown">
            Help Center
          </h1>
          <p className="fs-5 text-white mb-4 pb-2">
            Welcome to TechLily, where support meets empowerment. We're here to
            assist you every step of the way — from technical questions to
            account guidance and everything in between.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
    <h6 className="section-title bg-white text-center text-primary px-3">
      Categories
    </h6>
    <h1 className="mb-5">How can we help you?</h1>
  </div>
  <div className="help-container">
    <p className="help-intro">
      Welcome to the TechLily Help Center. Whether you're new here or just need
      some quick assistance, we're here to guide you through.
    </p>
    <div className="help-faq">
      <h2 className="help-section-title">Frequently Asked Questions</h2>
      <ul className="faq-list">
        <li className="faq-item">
          <strong>Q: How do I create an account?</strong>
          <br />
          A: Click on the "Sign Up" button at the top right and follow the
          instructions.
        </li>
        <li className="faq-item">
          <strong>Q: I forgot my password. What do I do?</strong>
          <br />
          A: Use the “Forgot Password” link on the login page to reset it.
        </li>
        <li className="faq-item">
          <strong>Q: Can I update my profile information?</strong>
          <br />
          A: Yes, go to your profile page and click "Edit Profile".
        </li>
        <li className="faq-item">
          <strong>Q: How can I delete my account?</strong>
          <br />
          A: Contact support via email to request account deletion.
        </li>
        <li className="faq-item">
          <strong>Q: What browsers are supported?</strong>
          <br />
          A: TechLily supports the latest versions of Chrome, Firefox, Safari,
          and Edge.
        </li>
      </ul>
    </div>
    <div className="help-contact">
      <h2 className="help-section-title">Still need help?</h2>
      <p>
        If you didn't find the answer you're looking for, feel free to reach out
        to us. We're always happy to help!
      </p>
      <ul className="contact-list">
        <li>
          Email:{" "}
          <a href="mailto:support@techlily.com" className="help-link">
            support@techlily.com
          </a>
        </li>
        <li>Phone: +94 76 123 4567</li>
        <li>Live Chat: Available Mon–Fri, 9 AM–6 PM</li>
      </ul>
      <form className="contact-form">
        <label htmlFor="name">Your Name:</label>
        <input
          type="text"
          id="name"
          className="form-input"
          placeholder="Enter your name"
          required=""
        />
        <label htmlFor="email">Your Email:</label>
        <input
          type="email"
          id="email"
          className="form-input"
          placeholder="Enter your email"
          required=""
        />
        <label htmlFor="message">Your Message:</label>
        <textarea
          id="message"
          className="form-textarea"
          placeholder="Type your message here..."
          required=""
          defaultValue={""}
        />
        <button type="submit" className="form-button">
          Send Message
        </button>
      </form>
    </div>
    <div className="help-links">
      <h2 className="help-section-title">Quick Links</h2>
      <ul className="quick-links">
        <li>
          <a href="terms.html" className="help-link">
            Terms &amp; Conditions
          </a>
        </li>
        <li>
          <a href="privacy.html" className="help-link">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="about.html" className="help-link">
            About TechLily
          </a>
        </li>
      </ul>
    </div>
  </div>
  <br /> <br />
</>

            <MapComponent />

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
export default Help;
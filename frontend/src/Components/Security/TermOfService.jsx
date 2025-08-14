import MapComponent from '../Contact/map.jsx';

const TermofService = () => {
    return(
        <div>
        <section id="terms" className="terms-conditions">
  <div className="container">
    <div className="section-title">
      <h2>Terms and Conditions</h2>
      <p>Last Updated: January 2025</p>
    </div>
    <div className="terms-content">
      <div className="terms-item">
        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing and using the TechLily website , you accept and agree to
          be bound by the terms and provisions of this agreement. If you do not
          agree to abide by these terms, please do not use this Service.
        </p>
      </div>
      <div className="terms-item">
        <h3>2. Description of Service</h3>
        <p>
          TechLily provides users with access to educational resources, courses,
          and related services. All content and services are subject to these
          Terms and Conditions.
        </p>
      </div>
      <div className="terms-item">
        <h3>3. User Responsibilities</h3>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>
            Upload or transmit any content that is unlawful, harmful, or
            offensive
          </li>
          <li>Violate any laws or regulations</li>
          <li>Impersonate any person or entity</li>
          <li>Interfere with or disrupt the Service</li>
        </ul>
        <p />
      </div>
      <div className="terms-item">
        <h3>4. Intellectual Property</h3>
        <p>
          All content included on this site, such as text, graphics, logos,
          button icons, images, audio clips, digital downloads, and software, is
          the property of TechLily or its content suppliers and protected by
          international copyright laws.
        </p>
      </div>
      <div className="terms-item">
        <h3>5. Account Registration</h3>
        <p>
          Some features may require account registration. You agree to provide
          accurate information and keep your password secure. You are
          responsible for all activities under your account.
        </p>
      </div>
      <div className="terms-item">
        <h3>6. Payment Terms</h3>
        <p>For paid services:</p>
        <ul>
          <li>All fees are non-refundable unless otherwise stated</li>
          <li>Prices are subject to change without notice</li>
          <li>You are responsible for any taxes associated with the Service</li>
        </ul>
        <p />
      </div>
      <div className="terms-item">
        <h3>7. Disclaimer of Warranties</h3>
        <p>
          The Service is provided "as is" without warranty of any kind. TechLily
          does not guarantee that:
        </p>
        <ul>
          <li>The Service will meet your requirements</li>
          <li>The Service will be uninterrupted or error-free</li>
          <li>The results obtained will be accurate or reliable</li>
        </ul>
        <p />
      </div>
      <div className="terms-item">
        <h3>8. Limitation of Liability</h3>
        <p>
          TechLily shall not be liable for any indirect, incidental, special,
          consequential or punitive damages resulting from:
        </p>
        <ul>
          <li>The use or inability to use the Service</li>
          <li>Unauthorized access to your transmissions or data</li>
          <li>Statements or conduct of any third party</li>
        </ul>
        <p />
      </div>
      <div className="terms-item">
        <h3>9. Modifications to Service</h3>
        <p>
          TechLily reserves the right to modify or discontinue the Service with
          or without notice. We shall not be liable to you or any third party
          for any modification, suspension, or discontinuance.
        </p>
      </div>
      <div className="terms-item">
        <h3>10. Governing Law</h3>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of [Your Country/State], without regard to its conflict of law
          provisions.
        </p>
      </div>
      <div className="terms-item">
        <h3>11. Changes to Terms</h3>
        <p>
          TechLily reserves the right to update these Terms at any time.
          Continued use of the Service after changes constitutes acceptance of
          the new Terms.
        </p>
      </div>
      <div className="terms-item">
        <h3>12. Contact Information</h3>
        <p>
          For any questions about these Terms, please contact us at{" "}
          <a href="mailto:legal@techlily.com">legal@techlily.com</a>.
        </p>
      </div>
    </div>
  </div>
</section>
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

export default TermofService;
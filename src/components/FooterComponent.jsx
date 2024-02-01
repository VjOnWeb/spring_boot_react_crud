import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>My Company</h5>
            <p>A short description about your company.</p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#home">Home</a></li>
              <li><a href="imageCRUD.html">User Images</a></li>
              <li><a href="#services">Services</a></li>
              {/* Add more links as needed */}
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li><a href="mailto:vijayanandvj1998@gmail.com">vijayanandvj1998@gmail.com</a></li>
              <li><a href="tel:+918838301883">8838301883</a></li>
              {/* Add more contact information as needed */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

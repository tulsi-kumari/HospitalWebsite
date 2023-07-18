import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

const Footer = () => {
  return (
    <footer className="bg-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact</h5>
            <p>Email: info@example.com</p>
            <p>Phone: +1 123-456-7890</p>
            <p>Address: 123 Street, City, Country</p>
          </div>
          <div className="col-md-6">
            <h5>Social Media</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="https://www.facebook.com">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.twitter.com">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="https://www.instagram.com">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

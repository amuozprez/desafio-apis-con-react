import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center mt-4">
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f mx-2"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram mx-2"></i>
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in mx-2"></i>
        </a>
      </div>
      <p className="mt-2">
      © by Alvaro Muñoz 2024
      </p>
    </footer>
  );
};

export default Footer;

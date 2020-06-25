import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="d-flex justify-content-between">
        <ul className="footer__list">
          <li className="footer__list-link">ABOUT</li>
          <li className="footer__list-link">HELP & FAQ</li>
          <li className="footer__list-link">TERMS</li>
          <li className="footer__list-link">ACCESSIBILITY</li>
        </ul>

        <div className="footer__social">
          <i className="fa fa-facebook-square" />
          <i className="fa fa-instagram" />
          <i className="fa fa-twitter" />
          <i className="fa fa-youtube" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

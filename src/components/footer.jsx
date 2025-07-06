import React from "react";
import "./css/footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      
      </div>
    </footer>
  );
}
export default Footer;

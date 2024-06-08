import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'

const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-top">
                        <div className="footer-top-social">
                            <Link href="#" aria-label="Facebook" className="social-icon"><i className="fab fa-facebook-f"></i></Link>
                            <Link href="#" aria-label="Instagram" className="social-icon"><i className="fab fa-instagram"></i></Link>
                            <Link href="#" aria-label="Twitter" className="social-icon"><i className="fab fa-twitter"></i></Link>
                            <Link href="#" aria-label="YouTube" className="social-icon"><i className="fab fa-youtube"></i></Link>
                        </div>
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <Link href="#">FAQ</Link>
                            <Link href="#">Investor Relations</Link>
                            <Link href="#">Privacy</Link>
                            <Link href="#">Speed Test</Link>
                        </div>
                        <div className="footer-column">
                            <Link href="#">Help Center</Link>
                            <Link href="#">Jobs</Link>
                            <Link href="#">Cookie Preferences</Link>
                            <Link href="#">Legal Notices</Link>
                        </div>
                        <div className="footer-column">
                            <Link href="#">Account</Link>
                            <Link href="#">Ways to Watch</Link>
                            <Link href="#">Corporate Information</Link>
                            <Link href="#">Only on Netflix</Link>
                        </div>
                        <div className="footer-column">
                            <Link href="#">Media Center</Link>
                            <Link href="#">Terms of Use</Link>
                            <Link href="#">Contact Us</Link>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-service-code">
                            <button className="service-code-button">Nguyen Hoang Son</button>
                        </div>
                        <p className="footer-note">© 2024 Netflix, Inc.</p>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Footer;
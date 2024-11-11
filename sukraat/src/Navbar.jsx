import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./Navbar.module.css";
import Logo from "./assets/logo.jpg";
import {
  FaHome,
  FaInfoCircle,
  FaUser,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Navbar() {
  // Scroll event for navbar background change
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (navbar) { // Check if navbar exists
      if (window.scrollY > 0) { 
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 1)'; // Fully opaque on scroll
      } else {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.50)'; // Back to original transparency
      }
    }
  });
  window.addEventListener('load', function() {
    const navbar = document.querySelector('nav');
    if (navbar) {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.50)';
    }
});
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    gsap.to(`.${styles.navLinks}`, {
      duration: 0.3,
      opacity: isMenuOpen ? 0 : 1,
      y: isMenuOpen ? -20 : 0,
      ease: "power1.inOut",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    gsap.from([`.${styles.brandLogo}`, `.${styles.navLinks} a`, `.${styles.dropbtn}`], { 
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.1,
      ease: "power1.inOut",
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userProfile = { name: "" };

  return (
    <nav className={styles.navbar} ref={navbarRef}>
      <Link to="/" className={styles.navItem}>
        <div className={styles.brandLogo}>
          <img src={Logo} alt="Logo" className={styles.logo} />
          سقراط علمی سوسائٹی
        </div>
      </Link>
      <div className={`${styles.navLinks} ${isMenuOpen ? styles.show : ""}`}>
        <Link to="/" className={styles.navItem}>
          <FaHome /> ہوم 
        </Link>
        <Link to="/about" className={styles.navItem}>
          <FaInfoCircle /> ہمارے متعلق
        </Link>
        <div className={styles.dropdown}>
          <button className={styles.dropbtn}>
            <FaUser /> مصنفین
          </button>          
          <div className={styles.dropdownContent}>
            <Link to="/author1" className={styles.dropdownItem}>
              مصنف 1
            </Link>
            <Link to="/author2" className={styles.dropdownItem}>
              مصنف 2
            </Link>
            <Link to="/author3" className={styles.dropdownItem}>
              مصنف 3
            </Link>
          </div>
        </div>
        <Link to="/contact" className={styles.navItem}>
          <FaEnvelope /> رابطہ کریں
        </Link>

        {isSmallScreen && (
          <div className={styles.authButtons}>
            {!isAuthenticated ? (
              <>
                <button
                  className={`${styles.signIn} ${styles.authButton}`}
                  onClick={() => {
                    alert("سائن ان کا بٹن دبایا گیا۔ صارف کی توثیق کی جائے گی۔");
                    setIsAuthenticated(true);
                  }}
                >
                  <FaSignInAlt /> سائن ان
                </button>
                <button className={`${styles.register} ${styles.authButton}`}>
                  <FaUserPlus /> رجسٹر
                </button>
              </>
            ) : (
              <>
                <Link to="/userId" className={styles.userProfile}>
                  <img src={Logo} alt="Logo" className={styles.logo} />
                  {userProfile.name}
                </Link>
                <button
                  className={`${styles.signOut} ${styles.authButton}`}
                  onClick={() => {
                    setIsAuthenticated(false);
                  }}
                >
                  <FaSignOutAlt /> سائن آؤٹ
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {!isSmallScreen && (
        <div className={styles.authButtons}>
          {!isAuthenticated ? (
            <>
              <button
                className={`${styles.signIn} ${styles.authButton}`}
                onClick={() => {
                  alert("سائن ان کا بٹن دبایا گیا۔ صارف کی توثیق کی جائے گی۔");
                  setIsAuthenticated(true);
                }}
              >
                <FaSignInAlt /> سائن ان
              </button>
              <button className={`${styles.register} ${styles.authButton}`}>
                <FaUserPlus /> رجسٹر
              </button>
            </>
          ) : (
            <>
              <Link to="/userId" className={styles.userProfile}>
                <img src={Logo} alt="Logo" className={styles.logo} />
                {userProfile.name}
              </Link>
              <button
                className={`${styles.signOut} ${styles.authButton}`}
                onClick={() => {
                  setIsAuthenticated(false);
                }}
              >
                <FaSignOutAlt /> سائن آؤٹ
              </button>
            </>
          )}
        </div>
      )}

      <button
        className={`${styles.hamburger} ${styles.authButton}`}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}

export default Navbar;

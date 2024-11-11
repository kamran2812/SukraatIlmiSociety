import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'; // Import your CSS module

import Navbar from './Navbar.jsx';
import HeroSection from './HeroSection.jsx';
import SearchCategories from './SearchCategories.jsx';
import RecentArticles from './RecentArticles.jsx';
import Articles from './Articles.jsx';
import AuthorsSection from './AuthorsSection.jsx';
import Footer from './Footer.jsx';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time - REPLACE with your actual data fetching
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust timing as needed
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className={styles['shimmer-wrapper']}> 
          {/* Navbar shimmer placeholder */}
          <div className={`${styles['shimmer']} ${styles['line']}`}></div>

          {/* HeroSection shimmer placeholders */}
          <div className={`${styles['shimmer']} ${styles['heading']}`}></div>
          <div className={`${styles['shimmer']} ${styles['paragraph']}`}></div>

          {/* SearchCategories shimmer placeholder */}
          <div className={`${styles['shimmer']} ${styles['line']}`}></div>

          {/* RecentArticles shimmer placeholders */}
          <div className={`${styles['shimmer']} ${styles['heading']}`}></div>
          <div className={`${styles['shimmer']} ${styles['paragraph']}`}></div>

          {/* Articles shimmer placeholders */}
          <div className={`${styles['shimmer']} ${styles['heading']}`}></div>
          <div className={`${styles['shimmer']} ${styles['paragraph']}`}></div>

          {/* AuthorsSection shimmer placeholder */}
          <div className={`${styles['shimmer']} ${styles['line']}`}></div>

          {/* Footer shimmer placeholder */}
          <div className={`${styles['shimmer']} ${styles['line']}`}></div>
        </div>
      ) : (
        <>
          <Navbar />
          <HeroSection />
          <SearchCategories />
          <RecentArticles />
          <Articles />
          <AuthorsSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;
import { useEffect, useState } from 'react';
import './App.css';
import Home from './Home.jsx'


function App() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
   <Home/>
      
      {/* Scroll-to-Top Button */}
      {isVisible && (
        <button className="scrollToTop" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </>
  );
}

export default App;

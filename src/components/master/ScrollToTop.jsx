'use client';
import { useState, useEffect } from 'react';

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
      setShowButton(scrollTop > 400); // Show button when scrolled down 400px
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={'scrollButtonContainer'} style={{ opacity: showButton ? 1 : 0 }}>
      <svg
        viewBox="0 0 102 102"
        className={'progressContainer'}
      >
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          style={{ strokeDasharray: '307.919, 307.919', strokeDashoffset: `${307.919 - (scrollProgress * 3.07919)}` }}
          fill="none"
        ></path>
      </svg>
      <button
        onClick={scrollToTop}
        className={'scrollButton'}
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  );
};

export default ScrollButton;


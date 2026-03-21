import React, { useState, useEffect } from 'react';

export default function Footer({ resumeData }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-social">
            {resumeData.socialLinks?.map((item) => (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name}>
                <i className={item.className} />
              </a>
            ))}
          </div>
          <p className="footer-text">
            &copy; {new Date().getFullYear()} {resumeData.name}
          </p>
        </div>
      </footer>

      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        &#8593;
      </button>
    </>
  );
}

import React, { useEffect, useRef, useCallback } from 'react';

export default function Portfolio({ resumeData }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    const inner = card.querySelector('.project-card-inner');
    if (inner) {
      inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const inner = e.currentTarget.querySelector('.project-card-inner');
    if (inner) {
      inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
  }, []);

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <p className="section-label">Portfolio</p>
        <h2 className="section-title">Selected projects</h2>

        <div className="portfolio-grid reveal-stagger" ref={gridRef}>
          {resumeData.portfolio?.map((item) => (
            <div key={item.name} className="project-card" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <a
                href={item.location.startsWith('http') ? item.location : `${process.env.PUBLIC_URL}/${item.location}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block' }}
              >
                <div className="project-card-inner">
                  <div className="project-card-image">
                    <img src={`${process.env.PUBLIC_URL}/${item.imgurl}`} alt={item.name} />
                    <div className="overlay">
                      <span className="view-link">View Project &rarr;</span>
                    </div>
                  </div>
                  <div className="project-card-body">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="project-tag">{item.description}</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

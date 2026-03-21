import React, { useEffect, useRef } from 'react';

export default function About({ resumeData }) {
  const sectionRef = useRef(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const techStack = [
    'TypeScript',
    'JavaScript',
    'Python',
    'MySQL',
    'Angular',
    'React',
    'NestJS',
    'Express',
    'Flask',
    'AWS',
    'Docker',
    'Swagger',
    'PowerBI',
    'Jira',
    'OpenAI API',
    'D3.js',
    'Numpy',
    'Pandas',
    'CI/CD',
    '508 Accessibility',
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <p className="section-label">About</p>
        <h2 className="section-title">A bit about me</h2>

        <div className="bento-grid reveal-stagger" ref={sectionRef}>
          <div className="bento-card photo-card">
            <img
              className="profile-pic"
              src={`${process.env.PUBLIC_URL}/images/profilepic.jpg`}
              alt={`${resumeData.name}`}
            />
          </div>

          <div className="bento-card wide">
            <h3>Background</h3>
            <p>{resumeData.aboutme}</p>
          </div>

          <div className="bento-card">
            <h3>Details</h3>
            <div className="detail-item">
              <span className="detail-icon">&#9679;</span>
              <span>{resumeData.name}</span>
            </div>
            <div className="detail-item">
              <i className="fa fa-map-marker" />
              <span>{resumeData.address}</span>
            </div>
            <div className="detail-item">
              <i className="fa fa-envelope" />
              <span>{resumeData.email}</span>
            </div>
            <div className="detail-item">
              <i className="fa fa-linkedin" />
              <a
                href={resumeData.linkedinId}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)' }}
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          <div className="bento-card wide">
            <h3>Tech Stack</h3>
            <div className="tech-pills">
              {techStack.map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

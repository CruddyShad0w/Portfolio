import React, { useEffect, useRef } from 'react';

export default function ContactUs({ resumeData }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section">
      <div className="container">
        <p className="section-label">Contact</p>
        <h2 className="section-title">Get in touch</h2>

        <div className="reveal" ref={sectionRef}>
          <p className="contact-text">
            Feel free to reach out for collaborations, opportunities, or just to say hello.
          </p>

          <div className="contact-buttons">
            <a href={`mailto:${resumeData.email}`} className="contact-btn primary">
              <i className="fa fa-envelope" />
              Send Email
            </a>
            <a href={resumeData.linkedinId} target="_blank" rel="noopener noreferrer" className="contact-btn">
              <i className="fa fa-linkedin" />
              LinkedIn
            </a>
            <a
              href={resumeData.socialLinks?.find((s) => s.name === 'github')?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              <i className="fa fa-github" />
              GitHub
            </a>
            <a
              href={resumeData.socialLinks?.find((s) => s.name === 'resume')?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
            >
              <i className="fa fa-file-text" />
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

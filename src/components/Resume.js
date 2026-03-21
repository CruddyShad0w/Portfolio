import React, { useEffect, useRef } from 'react';
import SkillsDonut from './SkillsDonut';

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      ref.current?.classList.add('revealed');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function splitAchievements(text) {
  if (!text) return [];
  return text
    .split(/\.\s+/)
    .map((s) => s.replace(/\.$/, '').trim())
    .filter((s) => s.length > 10);
}

export default function Resume({ resumeData }) {
  const timelineRef = useScrollReveal();

  return (
    <section id="resume" className="section">
      <div className="container">
        <p className="section-label">Experience</p>
        <h2 className="section-title">Where I've worked</h2>

        <div className="resume-grid">
          <div>
            <div className="reveal" ref={timelineRef}>
              <div className="timeline">
                {resumeData.work?.map((item, i) => (
                  <div key={item.CompanyName} className={`timeline-item ${i === 0 ? 'current' : ''}`}>
                    <h4>{item.CompanyName}</h4>
                    <p className="role">{item.specialization}</p>
                    <p className="date">
                      {item.MonthOfLeaving === 'Present' ? 'Present' : `${item.MonthOfLeaving} ${item.YearOfLeaving}`}
                    </p>
                    <ul className="achievements">
                      {splitAchievements(item.Achievements)
                        .slice(0, 4)
                        .map((achievement, j) => (
                          <li key={j}>{achievement}</li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Education */}
            <div className="reveal" style={{ marginBottom: '48px' }}>
              <p className="section-label" style={{ marginBottom: '24px' }}>
                Education
              </p>
              {resumeData.education?.map((item) => (
                <div key={item.UniversityName} style={{ marginBottom: '32px' }}>
                  <h4
                    style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}
                  >
                    {item.UniversityName}
                  </h4>
                  <p className="role">{item.specialization}</p>
                  <p className="date">
                    {item.MonthOfPassing} {item.YearOfPassing}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills Donut */}
            <div className="skills-section">
              <p className="section-label" style={{ marginBottom: '32px' }}>
                Focus Areas
              </p>
              <SkillsDonut skills={resumeData.skills} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

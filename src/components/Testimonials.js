import React, { useState, useEffect, useRef } from 'react';

export default function Testimonials({ resumeData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = resumeData.testimonials || [];
  const sectionRef = useRef(null);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <p className="section-label">Testimonials</p>
        <h2 className="section-title">What people say</h2>

        <div className="reveal" ref={sectionRef}>
          <div className="testimonial-carousel">
            {testimonials.map((item, i) => (
              <div key={i} className={`testimonial-slide ${i === activeIndex ? 'active' : ''}`}>
                <p className="testimonial-quote">{item.description}</p>
                <p className="testimonial-author">{item.name}</p>
              </div>
            ))}
            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={i === activeIndex ? 'active' : ''}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

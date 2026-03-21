import { useEffect, useRef, useState, useMemo } from 'react';

const COLORS = ['#6366f1', '#a855f7', '#3b82f6', '#06b6d4'];

export default function SkillsDonut({ skills }) {
  const canvasRef = useRef(null);
  const [animated, setAnimated] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const animationDone = useRef(false);

  const normalizedSkills = useMemo(() => {
    const total = skills.reduce((sum, s) => sum + parseInt(s.style, 10), 0);
    return skills.map((s, i) => ({
      name: s.skillname,
      percentage: Math.round((parseInt(s.style, 10) / total) * 100),
      color: COLORS[i % COLORS.length],
    }));
  }, [skills]);

  // Observe for scroll reveal
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Draw donut
  useEffect(() => {
    if (!animated) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio, 2);
    const size = 200;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cx = size / 2;
    const cy = size / 2;
    const outerR = 90;
    const innerR = 58;
    const gap = 0.05;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function drawDonut(progress) {
      ctx.clearRect(0, 0, size, size);
      const totalAngle = Math.PI * 2 * progress;
      let startAngle = -Math.PI / 2;

      normalizedSkills.forEach((skill, i) => {
        const segmentAngle = (skill.percentage / 100) * Math.PI * 2;
        const segmentEnd = startAngle + segmentAngle;

        if (startAngle < -Math.PI / 2 + totalAngle) {
          const clampedEnd = Math.min(segmentEnd, -Math.PI / 2 + totalAngle);
          const drawStart = startAngle + gap / 2;
          const drawEnd = clampedEnd - gap / 2;

          if (drawEnd > drawStart) {
            const r = i === hoveredIndex ? outerR + 5 : outerR;
            const ir = i === hoveredIndex ? innerR - 2 : innerR;

            ctx.beginPath();
            ctx.arc(cx, cy, r, drawStart, drawEnd);
            ctx.arc(cx, cy, ir, drawEnd, drawStart, true);
            ctx.closePath();
            ctx.fillStyle = skill.color;
            ctx.globalAlpha = hoveredIndex === -1 || i === hoveredIndex ? 1 : 0.3;
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }

        startAngle = segmentEnd;
      });
    }

    // If animation already completed, just redraw (for hover updates)
    if (animationDone.current) {
      drawDonut(1);
      return;
    }

    // Animate sweep
    const duration = 1500;
    const start = performance.now();
    let animId;

    function animate(timestamp) {
      const elapsed = timestamp - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      drawDonut(easeOutCubic(rawProgress));

      if (rawProgress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        animationDone.current = true;
      }
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [animated, hoveredIndex, normalizedSkills]);

  return (
    <div className="skills-donut">
      <canvas ref={canvasRef} style={{ width: 200, height: 200 }} aria-label="Skills distribution chart" />
      <div className="donut-legend">
        {normalizedSkills.map((skill, i) => (
          <div
            key={skill.name}
            className={`donut-legend-item ${hoveredIndex === i ? 'active' : ''}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <span className="donut-legend-dot" style={{ background: skill.color }} />
            <span className="donut-legend-name">{skill.name}</span>
            <span className="donut-legend-value">{skill.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

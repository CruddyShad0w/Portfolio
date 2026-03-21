import { useEffect, useRef } from 'react';

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    let width, height, animId;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const particleCount = 120;
    const maxDist = 160;
    const mouseRadius = 200;
    let mouseX = -1000;
    let mouseY = -1000;
    let frame = 0;

    const particles = Array.from({ length: particleCount }, (_, i) => {
      // 15% of particles are "stars" — larger and brighter
      const isStar = i < particleCount * 0.15;
      return {
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        baseRadius: isStar ? Math.random() * 1.5 + 2.5 : Math.random() * 1.5 + 0.8,
        radius: 0,
        opacity: isStar ? Math.random() * 0.3 + 0.7 : Math.random() * 0.4 + 0.4,
        isStar,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      };
    });

    function resize() {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.forEach((p) => {
        if (p.x === 0 && p.y === 0) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }
      });
    }

    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);

    function animate() {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);
      frame++;

      // Theme-aware colors
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const pR = isLight ? 67 : 99;
      const pG = isLight ? 56 : 102;
      const pB = isLight ? 202 : 241;
      const connOpacity = isLight ? 0.35 : 0.2;
      const lineWidth = isLight ? 1 : 0.8;
      const mouseConnOpacity = isLight ? 0.5 : 0.35;

      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];

        // Pulse effect
        const pulse = Math.sin(frame * p.pulseSpeed + p.pulseOffset);
        p.radius = p.baseRadius + pulse * (p.isStar ? 0.8 : 0.3);

        // Mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          const strength = p.isStar ? 0.06 : 0.04;
          p.vx += (dx / dist) * force * strength;
          p.vy += (dy / dist) * force * strength;
        }

        // Damping
        p.vx *= 0.993;
        p.vy *= 0.993;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw glow for star particles
        if (p.isStar) {
          const glowRadius = p.radius * 4;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
          gradient.addColorStop(0, `rgba(${pR}, ${pG}, ${pB}, ${p.opacity * 0.25})`);
          gradient.addColorStop(1, `rgba(${pR}, ${pG}, ${pB}, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${pR}, ${pG}, ${pB}, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connections between particles
      ctx.lineWidth = lineWidth;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * connOpacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${pR}, ${pG}, ${pB}, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      // Draw mouse attractor connections — bright lines from cursor to nearby particles
      if (mouseX > 0 && mouseY > 0) {
        const attractRadius = mouseRadius * 1.2;
        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < attractRadius) {
            const opacity = (1 - dist / attractRadius) * mouseConnOpacity;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${pR}, ${pG}, ${pB}, ${opacity})`;
            ctx.lineWidth = (1 - dist / attractRadius) * 1.5 + 0.3;
            ctx.stroke();
          }
        }
        ctx.lineWidth = lineWidth; // Reset

        // Draw a subtle glow at cursor position
        const cursorGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 60);
        cursorGlow.addColorStop(0, `rgba(${pR}, ${pG}, ${pB}, ${isLight ? 0.08 : 0.06})`);
        cursorGlow.addColorStop(1, `rgba(${pR}, ${pG}, ${pB}, 0)`);
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 60, 0, Math.PI * 2);
        ctx.fillStyle = cursorGlow;
        ctx.fill();
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

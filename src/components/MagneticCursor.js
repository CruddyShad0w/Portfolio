import { useEffect, useRef } from 'react';

export default function MagneticCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;
    let visible = false;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        cursor.classList.add('visible');
      }
    };

    const handleMouseEnter = (e) => {
      const target = e.target.closest('a, button, .magnetic');
      if (target) cursor.classList.add('cursor-hover');
    };

    const handleMouseLeave = (e) => {
      const target = e.target.closest('a, button, .magnetic');
      if (target) cursor.classList.remove('cursor-hover');
    };

    const handleMouseOut = () => {
      visible = false;
      cursor.classList.remove('visible');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseOut);

    function animate() {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}

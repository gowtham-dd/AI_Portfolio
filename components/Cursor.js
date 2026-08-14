'use client';
import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0, ringX = 0, ringY = 0;
    let animId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    function animateRing() {
      curX += (mouseX - curX) * 0.75;
      curY += (mouseY - curY) * 0.75;
      if (cursor) cursor.style.transform = `translate3d(${curX - 6}px, ${curY - 6}px, 0)`;

      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (cursorRing) cursorRing.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;

      animId = requestAnimationFrame(animateRing);
    }
    animateRing();

    const bindHover = () => {
      document.querySelectorAll('a, button, .card, .project-card, .skill-chip, .skill-card, .experience-card').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor?.classList.add('hovering');
          cursorRing?.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
          cursor?.classList.remove('hovering');
          cursorRing?.classList.remove('hovering');
        });
      });
    };
    bindHover();
    const interval = setInterval(bindHover, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursor-ring"></div>
    </>
  );
}

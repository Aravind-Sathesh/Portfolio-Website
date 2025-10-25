'use client';

import { useEffect, useRef, useState } from 'react';

export function DotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Check if dark mode by checking computed styles
    const isDarkMode = () => {
      return document.documentElement.classList.contains('dark');
    };

    // Create particles in a grid pattern
    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      offset: number;
    }> = [];

    // Create particles in a uniform grid - much more sparse
    const spacing = 80; // Increased spacing for fewer dots
    const cols = Math.ceil(canvas.width / spacing);
    const rows = Math.ceil(canvas.height / spacing);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * spacing + spacing / 2;
        const y = j * spacing + spacing / 2;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          radius: 1.5, // Slightly larger, uniform size
          offset: Math.random() * Math.PI * 2,
        });
      }
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      // Clear canvas to transparent
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dot color based on theme
      const isDark = isDarkMode();
      const dotColor = isDark ? '255, 255, 255' : '100, 100, 100';

      time += 0.005; // Slower animation

      // Update and draw particles with subtle wave motion
      particles.forEach((particle) => {
        // Create subtle wave motion
        const waveX =
          Math.sin(time + particle.offset + particle.baseY * 0.005) * 8;
        const waveY =
          Math.cos(time + particle.offset + particle.baseX * 0.005) * 8;

        particle.x = particle.baseX + waveX;
        particle.y = particle.baseY + waveY;

        // Draw particle
        ctx.fillStyle = `rgba(${dotColor}, 0.25)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas ref={canvasRef} className='fixed inset-0 z-0 pointer-events-none' />
  );
}

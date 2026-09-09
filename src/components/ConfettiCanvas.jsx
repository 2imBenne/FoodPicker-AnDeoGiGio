import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

/** Confetti celebration canvas — called via ref.launch() */
const ConfettiCanvas = forwardRef(function ConfettiCanvas(_, ref) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animatingRef = useRef(false);

  useImperativeHandle(ref, () => ({
    launch() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const colors = ['#f0c040', '#f39c12', '#ef4444', '#8b5cf6', '#22c55e', '#22d3ee', '#ff6b9d'];
      for (let i = 0; i < 120; i++) {
        particlesRef.current.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 300,
          y: canvas.height * 0.35 + (Math.random() - 0.5) * 100,
          vx: (Math.random() - 0.5) * 18,
          vy: (Math.random() - 1) * 14 - 4,
          w: Math.random() * 10 + 4,
          h: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 12,
          opacity: 1,
          gravity: 0.25 + Math.random() * 0.1,
          drag: 0.98 + Math.random() * 0.015,
        });
      }
      if (!animatingRef.current) {
        animatingRef.current = true;
        animate();
      }
    },
    launchGold() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const goldColors = ['#ffd700', '#ffb700', '#fff4cc', '#f39c12', '#ffe066', '#ffffff', '#e67e22'];
      // Bắn 240 mảnh vàng rực rỡ từ 2 góc và tâm màn hình
      for (let i = 0; i < 240; i++) {
        particlesRef.current.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 400,
          y: canvas.height * 0.3 + (Math.random() - 0.5) * 120,
          vx: (Math.random() - 0.5) * 26,
          vy: (Math.random() - 1) * 20 - 6,
          w: Math.random() * 14 + 5,
          h: Math.random() * 9 + 4,
          color: goldColors[Math.floor(Math.random() * goldColors.length)],
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 16,
          opacity: 1,
          gravity: 0.22 + Math.random() * 0.08,
          drag: 0.982 + Math.random() * 0.01,
        });
      }
      if (!animatingRef.current) {
        animatingRef.current = true;
        animate();
      }
    }
  }));

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current = particlesRef.current.filter(p => p.opacity > 0.01);
    for (const p of particlesRef.current) {
      p.vx *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.006;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (particlesRef.current.length > 0) {
      requestAnimationFrame(animate);
    } else {
      animatingRef.current = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="confetti-canvas" />;
});

export default ConfettiCanvas;

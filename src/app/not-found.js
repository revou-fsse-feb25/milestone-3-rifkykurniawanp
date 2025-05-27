'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Mouse movement parallax effect
    const handleMouseMove = (e) => {
      const particles = document.querySelectorAll('.particle');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 2;
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleButtonClick = (e) => {
    // Create ripple effect
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Navigate to home
    setTimeout(() => {
      router.push('/');
    }, 300);
  };

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes glow {
          from { text-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
          to { 
            text-shadow: 0 0 50px rgba(255, 255, 255, 0.8), 
                         0 0 60px rgba(255, 255, 255, 0.6); 
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes glitch1 {
          0%, 14%, 15%, 49%, 50%, 99%, 100% {
            transform: translate(0, 0);
          }
          15%, 49% {
            transform: translate(-2px, 0);
          }
        }

        @keyframes glitch2 {
          0%, 14%, 15%, 49%, 50%, 99%, 100% {
            transform: translate(0, 0);
          }
          15%, 49% {
            transform: translate(2px, 0);
          }
        }

        @keyframes loadingDots {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }

        .not-found-container {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Arial', sans-serif;
          background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
        }

        .container {
          text-align: center;
          color: white;
          z-index: 10;
          position: relative;
        }

        .error-code {
          font-size: 12rem;
          font-weight: bold;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          animation: glow 2s ease-in-out infinite alternate;
          margin-bottom: 20px;
          position: relative;
        }

        .error-message {
          font-size: 2.5rem;
          margin-bottom: 10px;
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .error-description {
          font-size: 1.2rem;
          margin-bottom: 40px;
          opacity: 0.9;
          animation: fadeInUp 1s ease-out 1s both;
        }

        .btn-home {
          display: inline-block;
          padding: 15px 40px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          animation: fadeInUp 1s ease-out 1.5s both;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .btn-home:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-home::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .btn-home:hover::before {
          left: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 40%; left: 90%; animation-delay: 1s; }
        .particle:nth-child(3) { top: 60%; left: 20%; animation-delay: 2s; }
        .particle:nth-child(4) { top: 80%; left: 80%; animation-delay: 1.5s; }
        .particle:nth-child(5) { top: 30%; left: 70%; animation-delay: 0.5s; }
        .particle:nth-child(6) { top: 70%; left: 30%; animation-delay: 2.5s; }

        .glitch {
          position: relative;
        }

        .glitch::before,
        .glitch::after {
          content: '404';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          font-size: inherit;
          font-weight: inherit;
        }

        .glitch::before {
          animation: glitch1 2s infinite;
          color: #ff0040;
          z-index: -1;
        }

        .glitch::after {
          animation: glitch2 2s infinite;
          color: #00ff80;
          z-index: -2;
        }

        .loading-dots {
          display: inline-block;
          margin-left: 10px;
        }

        .loading-dots span {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.8);
          margin: 0 2px;
          animation: loadingDots 1.4s infinite ease-in-out both;
        }

        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

        @media (max-width: 768px) {
          .error-code {
            font-size: 8rem;
          }
          
          .error-message {
            font-size: 2rem;
          }
          
          .error-description {
            font-size: 1rem;
            padding: 0 20px;
          }
          
          .btn-home {
            padding: 12px 30px;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .error-code {
            font-size: 6rem;
          }
          
          .error-message {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="not-found-container">
        {/* Floating particles */}
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>

        <div className="container">
          <div className="error-code glitch">404</div>
          <h1 className="error-message">Oops! Page Not Found</h1>
          <p className="error-description">
            The page you're looking for seems to have vanished into the digital void.
            <span className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </p>
          <button className="btn-home" onClick={handleButtonClick}>
            Take Me Home
          </button>
        </div>
      </div>
    </>
  );
}
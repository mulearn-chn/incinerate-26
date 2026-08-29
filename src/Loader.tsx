import React, { useEffect, useMemo, useRef } from 'react';
import './Loader.css';

type Props = { onComplete: () => void };

export default function Loader({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Total timeline is ~6000ms. Trigger onComplete at the end.
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 6000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Generate particle data once. Fewer particles on small screens.
  const particles = useMemo(() => {
    const isClient = typeof window !== 'undefined';
    const w = isClient ? window.innerWidth : 1200;
    const base = w < 480 ? 30 : w < 900 ? 50 : 72; // responsive count

    return Array.from({ length: base }).map((_, i) => {
      const spread = 35; // percent spread around center
      const left = 50 + (Math.random() - 0.5) * spread; // center +/- spread/2
      const rotation = Math.random() * 360;
      const elongated = Math.random() > 0.7;
      const width = elongated ? (Math.random() * 2 + 1) : (Math.random() * 6 + 2);
      const height = elongated ? (Math.random() * 20 + 8) : width;
      const delay = Math.random() * 1.5 + 0.2; // start between ~0.2s and 1.7s
      const duration = 1.5 + Math.random() * 2.0; // 1.5s - 3.5s
      const velocityX = (Math.random() - 0.5) * 120; // px travel
      const velocityY = - (60 + Math.random() * 260); // upward
      const glow = Math.random() > 0.6 ? '--hot' : '--warm';

      return {
        id: i,
        left: `${left}%`,
        top: `${50 + (Math.random() - 0.5) * 8}%`,
        width: `${width}px`,
        height: `${height}px`,
        rotation: `${rotation}deg`,
        delay: `${delay}s`,
        duration: `${duration}s`,
        vx: velocityX,
        vy: velocityY,
        glow,
        elongated,
        opacity: 0.6 + Math.random() * 0.4,
      } as const;
    });
  }, []);

  return (
    <div className="incinerate-loader" ref={rootRef} aria-hidden>
      {/* Cinematic ambient layers */}
      <div className="ambience-layer"></div>
      <div className="grain-layer" aria-hidden></div>

      {/* Distant embers (behind) */}
      <div className="embers distant">
        {particles.slice(0, Math.floor(particles.length * 0.45)).map(p => (
          <span
            key={`d-${p.id}`}
            className={`ember ${p.elongated ? 'ember-spark' : 'ember-dot'}`}
            style={{
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
              ['--rot' as any]: p.rotation,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: p.opacity,
              ['--vx' as any]: `${p.vx}px`,
              ['--vy' as any]: `${p.vy}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Reactor ring / core and plasma */}
      <div className="reactor-wrapper">
        <div className="reactor-ring"></div>

        <div className="plasma plasma-deep"></div>
        <div className="plasma plasma-mid"></div>
        <div className="plasma plasma-hot"></div>
      </div>

      {/* Logo + sweep + foreground sparks */}
      <div className="loader-center">
        <img
          src="/images/Group 1171275092.png"
          alt="INCINERATE"
          className="loader-logo-center"
        />

        <div className="energy-sweep" />

        <div className="embers front">
          {particles.slice(Math.floor(particles.length * 0.45)).map(p => (
            <span
              key={`f-${p.id}`}
              className={`ember ${p.elongated ? 'ember-spark' : 'ember-dot'}`}
              style={{
                  left: p.left,
                  top: p.top,
                  width: p.width,
                  height: p.height,
                  ['--rot' as any]: p.rotation,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                  opacity: p.opacity,
                  ['--vx' as any]: `${p.vx}px`,
                  ['--vy' as any]: `${p.vy}px`,
                } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Final flash / burst (timed) */}
      <div className="final-burst" />
    </div>
  );
}

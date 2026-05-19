"use client";

import { useState, useEffect } from "react";

const heroImages = [
  "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1600&q=80",
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?w=1600&q=80",
  "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1600&q=80",
  "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=1600&q=80",
];

export function HeroImageRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === index ? 0.15 : 0,
          }}
        />
      ))}
    </div>
  );
}

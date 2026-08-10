import React, { useMemo } from 'react';
import './Hero.css';
import bannerOne from "../Assets/new_banner-2.webp";
import bannerTwo from "../Assets/new_banner-1.webp";
import bannerThree from "../Assets/new_banner-3.webp";
import bannerFour from "../Assets/new_banner-4.webp";
import bannerFive from "../Assets/new_banner-5.webp";
import bannerSix from "../Assets/new_banner-6.webp";

const banners = [bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix];

export default function Hero() {
  // Memoize random banner choice on mount to prevent re-evaluation on re-renders
  const randomBanner = useMemo(() => {
    return banners[Math.floor(Math.random() * banners.length)];
  }, []);

  return (
    <div className="hero-wrapper">
      <h1 className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: 0 }}>
        Wink &amp; Wear | Online Fashion Store for Men, Women &amp; Kids
      </h1>
      <img
        src={randomBanner}
        alt="Wink & Wear - Online Fashion Store Hero Banner"
        className="hero-full"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}

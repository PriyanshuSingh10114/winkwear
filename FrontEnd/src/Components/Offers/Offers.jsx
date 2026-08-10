import React, { useEffect, useState, useMemo } from "react";
import "./Offers.css";
import offer1 from "../Assets/offer_banner-1.webp";
import offer2 from "../Assets/banner_1.webp";

const banners = [offer1, offer2];

const Offers = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isLive, setIsLive] = useState(false);
  const [label, setLabel] = useState("Black Friday Sale Goes Live In:");

  // 🎲 Memoize random banner choice so 1-second timer ticks do NOT trigger image re-evaluation/flicker
  const randomBanner = useMemo(() => {
    return banners[Math.floor(Math.random() * banners.length)];
  }, []);

  const getNextFriday = () => {
    const now = new Date();
    const next = new Date();
    next.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7));
    next.setHours(0, 0, 0, 0);
    return next;
  };

  const getEndOfFriday = () => {
    const fridayEnd = getNextFriday();
    fridayEnd.setHours(23, 59, 59, 999);
    return fridayEnd;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextFridayStart = getNextFriday();
      const fridayEnd = getEndOfFriday();

      let targetDate;

      if (now < nextFridayStart) {
        setIsLive(false);
        setLabel("Black Friday Sale Goes Live In:");
        targetDate = nextFridayStart;
      } else if (now >= nextFridayStart && now <= fridayEnd) {
        setIsLive(true);
        setLabel("Black Friday Sale is LIVE!");
        targetDate = fridayEnd;
      } else {
        setIsLive(false);
        setLabel("Black Friday Sale Goes Live In:");
        targetDate = getNextFriday();
      }

      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="offers-container">
      <div className="offers-scroll">
        <img src={randomBanner} alt="Exclusive Offer 1" decoding="async" loading="lazy" />

        {/* COUNTDOWN TIMER */}
        <div className="timer-box">
          <h2>BLACK FRIDAY SALE</h2>
          <p>{label}</p>

          <div className="timer-values">
            <span>{timeLeft.days || 0}d</span> :
            <span>{timeLeft.hours || 0}h</span> :
            <span>{timeLeft.minutes || 0}m</span> :
            <span>{timeLeft.seconds || 0}s</span>
          </div>

          {isLive && <p className="live-tag">🔥 Sale Ends Tonight! Hurry!</p>}
        </div>
      </div>
    </div>
  );
};

export default Offers;

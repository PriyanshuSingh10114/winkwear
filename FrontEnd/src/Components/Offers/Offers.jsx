import React, { useEffect, useState } from "react";
import "./Offers.css";
import offer1 from "../Assets/offer_banner-1.webp";
import offer2 from "../Assets/banner_1.webp";

const Offers = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isLive, setIsLive] = useState(false);
  const [label, setLabel] = useState("Black Friday Sale Goes Live In:");

    // 🔥 All your promo banners
  const banners = [offer1, offer2];

  // 🎲 Random banner selection on each refresh
  const randomBanner = banners[Math.floor(Math.random() * banners.length)];

  const getNextFriday = () => {
    const now = new Date();
    const next = new Date();

    // Set to Friday (5 = Friday)
    next.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7));

    // Set to 00:00:00 Friday start
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
        // Black Friday not started yet → Pre-Live mode
        setIsLive(false);
        setLabel("Black Friday Sale Goes Live In:");
        targetDate = nextFridayStart;
      } else if (now >= nextFridayStart && now <= fridayEnd) {
        // Black Friday is LIVE
        setIsLive(true);
        setLabel("Black Friday Sale is LIVE!");
        targetDate = fridayEnd;
      } else {
        // It’s after Friday → Set next Friday as target
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
        <img src={randomBanner} alt="Exclusive Offer 1" />

        {/* COUNTDOWN TIMER */}
        <div className="timer-box">
          <h2>BLACK FRIDAY SALE</h2>
          <p>{label}</p>

          <div className="timer-values">
            <span>{timeLeft.days}d</span> :
            <span>{timeLeft.hours}h</span> :
            <span>{timeLeft.minutes}m</span> :
            <span>{timeLeft.seconds}s</span>
          </div>

          {isLive && <p className="live-tag">🔥 Sale Ends Tonight! Hurry!</p>}
        </div>
      </div>
    </div>
  );
};

export default Offers;

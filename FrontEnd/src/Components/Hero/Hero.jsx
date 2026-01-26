import './Hero.css'
import bannerOne from "../Assets/new_banner-2.webp";
import bannerTwo from "../Assets/new_banner-1.webp";
import bannerThree from "../Assets/new_banner-3.webp";
import bannerFour from "../Assets/new_banner-4.webp";
import bannerFive from "../Assets/new_banner-5.webp";
import bannerSix from "../Assets/new_banner-6.webp";

const banners = [bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix];

export default function Hero() {

  const randomBanner = banners[Math.floor(Math.random() * banners.length)];

  return (
    <div className="hero-wrapper">
      <img src={randomBanner} alt="Hero Banner" className="hero-full" />
    </div>
  );
}

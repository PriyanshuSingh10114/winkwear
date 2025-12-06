import './Hero.css'
import bannerOne from "../Assets/new_banner-2.png";
import bannerTwo from "../Assets/new_banner-1.png";
import bannerThree from "../Assets/new_banner-3.png";
import bannerFour from "../Assets/new_banner-4.png";
import bannerFive from "../Assets/new_banner-5.png";
import bannerSix from "../Assets/new_banner-6.png";

const banners = [bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix];

export default function Hero() {

  const randomBanner = banners[Math.floor(Math.random() * banners.length)];

  return (
    <div className="hero-wrapper">
      <img src={randomBanner} alt="Hero Banner" className="hero-full" />
    </div>
  );
}


import './Hero.css'

import bannerOne from "../assets/banner-1.webp";
import bannerTwo from "../assets/banner-2.webp";
import bannerThree from "../assets/banner-3.webp";

const Hero = () => {


  return (

    <div className="hero-container">
      <div className="hero-scroll">
        <img src={bannerOne} alt="Banner 1" className="hero-banner" />
        <img src={bannerTwo} alt="Banner 2" className="hero-banner" />
        <img src={bannerThree} alt="Banner 3" className="hero-banner" />
      </div>
    </div>

  );
};

export default Hero
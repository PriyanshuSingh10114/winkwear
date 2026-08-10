import React from 'react'
import '../Pages/CSS/About.css'
import aboutImg from '../Components/Assets/about.webp'
import SEO from '../Components/SEO/SEO'
import { PAGE_SEO } from '../config/seoConfig'

const About = () => {
  return (
    <div className='about-container'>
      <SEO
        title={PAGE_SEO.about.title}
        description={PAGE_SEO.about.description}
        canonical={PAGE_SEO.about.canonical}
      />
      <div className='about-content'>

        <div className='image-container'>
          <img src={aboutImg} alt="Wink & Wear fashion" className='about-image'/>
        </div>
        <div className='about-text'>
          <h1>Welcome to Wink & Wear—where fashion meets individuality!</h1>
          <p>
            At Wink & Wear, we believe that clothing is more than just fabric—it's a statement, a mood, and an extension of your unique personality. Our carefully curated collection blends bold designs, timeless elegance, and playful creativity to help you stand out in every crowd.
          </p>
          <p>
            From effortlessly chic everyday wear to head-turning statement pieces, each item in our collection is handpicked to inspire confidence and self-expression. Whether you're dressing up for a special occasion or keeping it cool for a casual day out, Wink & Wear has something to match your vibe.
          </p>
          <p>
            <h3>Why choose us?</h3><br />
            ✨ Unique Designs – No mass-market repeats here! Our pieces are as distinctive as you are.<br />
            ✨ Quality & Comfort – Fashion shouldn't compromise comfort—our fabrics feel as good as they look.<br />
            ✨ Affordable Luxury – Style shouldn't break the bank. We offer premium looks at accessible prices.
          </p>
          <p>
            At Wink & Wear, we're not just selling clothes—we're celebrating individuality. So go ahead, wink at the world and wear your confidence!
          </p>
          <p>
            Stay Bold. Stay You. 💫<br />
            Wink & Wear
          </p>
          <h2>Meet the Minds Behind Wink & Wear</h2>
          <p><h3>Meet the Minds Behind Wink & Wear</h3>

At Wink & Wear, we’re more than just a brand—we’re a passionate team of dreamers, designers, and tech enthusiasts dedicated to redefining online fashion. Here’s a little about the people who brought Wink & Wear to life:
<br />
<h3>The Tech Brains</h3>
<h4>Priyanshu Singh – Lead Developer/Visionary</h4>
A coding wizard with a passion for seamless user experiences, Priyanshu didn’t just build Wink & Wear’s e-commerce platform from scratch—he envisioned its very foundation. As our Lead Developer, his technical mastery brought the brand’s identity to life, crafting a website as stylish as our clothes. From smooth browsing to secure payments, every pixel and function reflects his relentless pursuit of innovation, ensuring Wink & Wear isn’t just a platform, but an experience.
<br />
<h4>Priyansh Singh – Frontend Developer/Logic Analyzer</h4>
A visionary tech innovator, Priyansh spearheaded the complete AI-powered transformation of Wink & Wear’s e-commerce platform. Leveraging cutting-edge AI tools and his deep full-stack expertise His meticulous approach eliminated critical bugs, optimized performance, and crafted a dynamic, secure shopping experience as sleek as Wink & Wear’s fashion.
<br />
<h3>The Style Squad</h3>
<h4>Bhakti Chopra – Fashion Curator/Figma Designing</h4>
With an impeccable eye for detail, Bhakti curates Wink & Wear’s collection—handpicking every piece to strike the perfect balance between trendsetting and timeless styles. Beyond selection, she brings the brand’s vision to life, crafting eye-catching banners, styling outfits, and even shaping design choices to ensure every visual tells a story as captivating as the clothes themselves.
<br />
<h4>— The Wink & Wear Team</h4></p>
        </div>
      </div>
    </div>
  )
}

export default About
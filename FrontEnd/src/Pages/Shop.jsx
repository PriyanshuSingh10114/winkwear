import React from 'react'
import SEO from '../Components/SEO/SEO'
import { PAGE_SEO, SITE_URL } from '../config/seoConfig'
import Hero from '../Components/Hero/Hero'
import CategoryShowcase from '../Components/CategoryShowcase/CategoryShowcase'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import CreatorPicks from '../Components/CreatorPicks/CreatorPicks'
import CustomerSpotlight from '../Components/CustomerSpotlight/CustomerSpotlight'
import Testimonials from '../Components/Testimonials/Testimonials'
import FashionBlog from '../Components/FashionBlog/FashionBlog'

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Wink & Wear",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/new_logo2.png`
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Wink & Wear",
      "publisher": {
        "@id": `${SITE_URL}/#organization`
      }
    }
  ]
};

const Shop = () => {
  return (
    <div>
      <SEO
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        canonical={PAGE_SEO.home.canonical}
        schemaData={homepageSchema}
      />
      <h1 style={{ textAlign: "center", color: "#ffffff", fontSize: "1.8rem", fontWeight: "700", margin: "24px 5% 8px 5%", letterSpacing: "0.5px" }}>
        Wink & Wear | Online Fashion Store for Men, Women & Kids
      </h1>
      <Hero/>
      <CategoryShowcase />
      <Popular/>
      <Offers/>
      <NewCollections/>
      <FashionBlog/>
      <CreatorPicks/>
      <CustomerSpotlight/>
      <Testimonials/>
      <NewsLetter/>
    </div>
  )
}

export default Shop

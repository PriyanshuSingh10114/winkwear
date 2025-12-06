import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import CreatorPicks from '../Components/CreatorPicks/CreatorPicks'
import CustomerSpotlight from '../Components/CustomerSpotlight/CustomerSpotlight'
import Testimonials from '../Components/Testimonials/Testimonials'
import FashionBlog from '../Components/FashionBlog/FashionBlog'

const Shop = () => {
  return (
    <div>
        <Hero/>
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
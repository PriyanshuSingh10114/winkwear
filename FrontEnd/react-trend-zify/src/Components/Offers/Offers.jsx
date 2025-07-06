import React from 'react'
import './Offers.css'
import offer1 from '../Assets/banner_3.png'


const Offers = () => {
  return (
    <div className="offers-container">
      <div className="offers-scroll">
        <img src={offer1} alt="Exclusive Offer 1" />
      </div>
    </div>
  )
}

export default Offers

import React from 'react'
import CartItems from '../Components/CartItems/CartItems'
import SEO from '../Components/SEO/SEO'

const Cart = () => {
  return (
    <div>
      <SEO title="Shopping Cart | Wink & Wear" robots="noindex, nofollow" />
      <CartItems/>
    </div>
  )
}

export default Cart
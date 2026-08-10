import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { createProductSlug } from '../../utils/slugify'

const Item = (props) => {
  const productUrl = createProductSlug(props.name, props.id);

  return (
    <div className='item'>
      <Link to={productUrl} onClick={() => window.scrollTo(0, 0)}>
        <img src={props.image} alt={props.name || "Wink & Wear Fashion Item"} loading="lazy" decoding="async" />
      </Link>
      <p>
        <Link to={productUrl} onClick={() => window.scrollTo(0, 0)}>
          {props.name}
        </Link>
      </p>
      <div className="item-prices">
        <div className="item-price-new">
          ${props.new_price}
        </div>
        <div className="item-price-old">
          ${props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
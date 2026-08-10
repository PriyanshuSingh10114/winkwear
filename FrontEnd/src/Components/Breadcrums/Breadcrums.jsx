import React from 'react';
import './Breadcrums.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';
import { Link } from 'react-router-dom';

const Breadcrums = ({ product }) => {
  if (!product) return null;

  const catLower = (product.category || "").toLowerCase();
  const categoryPath = (catLower === 'men' || catLower === 'mens') ? '/mens' : (catLower === 'women' || catLower === 'womens') ? '/womens' : '/kids';
  const categoryName = product.category ? (catLower === 'kid' ? 'Kids' : product.category.charAt(0).toUpperCase() + product.category.slice(1)) : "Collection";

  return (
    <div className='breadcrums' aria-label="Breadcrumb">
      <Link to="/">HOME</Link>
      <img src={arrow_icon} alt=">" />
      <Link to={categoryPath}>{categoryName.toUpperCase()}</Link>
      <img src={arrow_icon} alt=">" />
      <span>{product?.name}</span>
    </div>
  );
};

export default Breadcrums;

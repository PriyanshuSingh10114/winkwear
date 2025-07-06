import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('');
    const [added, setAdded] = useState(false);

    // ✅ Safe guard for undefined product
    if (!product) {
        return (
            <div className="productdisplay-loading">
                <h2>Loading product...</h2>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size before adding to cart.');
            return;
        }
        addToCart(product.id, selectedSize);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className='productdisplay'>
            {/* ✅ Popup on Add to Cart */}
            {added && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    background: '#4BB543',
                    color: '#fff',
                    padding: '16px 32px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    fontWeight: 'bold'
                }}>
                    Added to cart! Size: {selectedSize}
                </div>
            )}

            {/* ✅ Product Images */}
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>

            {/* ✅ Product Details */}
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>

                <div className="productdisplay-right-description">
                    From classic blue shirts with semi-spread collars to slim fit shirts with cutaway
                    collars in brighter hues, we have everything you need to look dapper at work.
                </div>

                {/* ✅ Size Selector */}
                <div className="productdisplay-right-sizes">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {sizes.map(size => (
                            <div
                                key={size}
                                className={`size-option${selectedSize === size ? ' selected' : ''}`}
                                onClick={() => setSelectedSize(size)}
                                style={{
                                    border: selectedSize === size ? '2px solid #000' : '1px solid #ccc',
                                    padding: '8px 16px',
                                    margin: '0 4px',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    background: selectedSize === size ? '#f3f3f3' : '#fff'
                                }}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ✅ Add to Cart Button */}
                <button onClick={handleAddToCart}>ADD TO CART</button>
                {selectedSize && (
                    <p style={{ marginTop: '10px' }}>
                        <strong>Selected Size:</strong> {selectedSize}
                    </p>
                )}

                {/* ✅ Product Meta */}
                <p className='productdisplay-right-category'>
                    <span>Category :</span> {product.category || 'Uncategorized'}
                </p>
                <p className='productdisplay-right-category'>
                    <span>Tags :</span> Modern, Latest
                </p>
            </div>
        </div>
    );
};

export default ProductDisplay;

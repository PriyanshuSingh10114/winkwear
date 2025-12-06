import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import crossIcon from '../../Assets/cross_icon.png';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:4000/allproducts');
    const data = await res.json();
    setAllProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-header">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Action</p>
      </div>

      <div className="listproduct-content">
        <hr />
        {allProducts.map((product, index) => (
          <React.Fragment key={product.id || index}>
            <div className="listproduct-row">
              <img src={product.images} alt="Product" className="product-img" />
              <p>{product.name}</p>
              <p>{product.old_price}</p>
              <p>{product.new_price}</p>
              <p>{product.category}</p>
              <img
                src={crossIcon}
                alt="Remove"
                className="remove-icon"
                onClick={() => removeProduct(product.id)}
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;

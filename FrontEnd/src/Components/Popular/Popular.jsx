import React, { useState, useEffect } from 'react';
import './Popular.css';
import popular from '../Assets/popular';
import Item from '../Item/Item';

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState(popular);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BACKEND_URL}/popularinwomen`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const validRemote = data.filter((item) => (item.images || item.image) && String(item.images || item.image).trim().length > 0);

          const seen = new Set(validRemote.map((p) => p.id));
          const merged = [...validRemote];

          popular.forEach((item) => {
            if (!seen.has(item.id)) {
              merged.push(item);
              seen.add(item.id);
            }
          });

          setPopularProducts(merged.slice(0, 4));
        }
      })
      .catch(() => {
        setPopularProducts(popular);
      });
  }, []);

  return (
    <div className="popular">
      <h2>POPULAR IN WOMEN</h2>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          return (
            <Item
              key={item.id || i}
              id={item.id}
              name={item.name}
              image={item.images || item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              priority={i < 4}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;

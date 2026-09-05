import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import new_collections from '../Assets/new_collections';
import Item from '../Item/Item';

const NewCollections = () => {
  const [collection, setCollection] = useState(new_collections);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BACKEND_URL}/newcollection`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Filter remote products with valid images and merge with fallback
          const validRemote = data.filter((item) => (item.images || item.image) && String(item.images || item.image).trim().length > 0);
          
          const seen = new Set(validRemote.map((p) => p.id));
          const merged = [...validRemote];

          new_collections.forEach((item) => {
            if (!seen.has(item.id)) {
              merged.push(item);
              seen.add(item.id);
            }
          });

          setCollection(merged.slice(0, 12));
        }
      })
      .catch(() => {
        setCollection(new_collections);
      });
  }, []);

  return (
    <div className="new-collections" id="new-collections">
      <h2>NEW COLLECTIONS</h2>
      <hr />
      <div className="collections">
        {collection.map((item, i) => {
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

export default NewCollections;

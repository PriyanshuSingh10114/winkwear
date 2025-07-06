import './CSS/ShopCategory.css'
import { useContext, useState, useRef } from 'react'
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Show 8 products initially

  const productsEndRef = useRef(null);

  const categories = ['Summer', 'Winter', 'Casual', 'Formal', 'Athletic', 'Party'];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((item) => item !== value));
    }
  };

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setSelectedTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  const filteredProducts = all_product.filter((item) => {
    const categoryMatch = props.category === item.category;
    const typeMatch = selectedCategories.length === 0 || selectedCategories.includes(item.type);
    return categoryMatch && typeMatch;
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
    setTimeout(() => {
      productsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Wait for render
  };

  return (
    <div className='shop-category'>
      <div className='layout-align'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
      </div>

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length}</span> product(s)
        </p>
        <div className='shopcategory-sort'>
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.slice(0, visibleCount).map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
        <div ref={productsEndRef}></div>
      </div>
      {visibleCount < filteredProducts.length && (
        <div className="shopcategory-loadmore">
          <button type="button" onClick={handleLoadMore}>Explore More</button>
        </div>
      )}
    </div>
  )
}

export default ShopCategory;
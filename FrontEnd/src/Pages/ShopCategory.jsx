import './CSS/ShopCategory.css'
import { useContext, useState, useRef } from 'react'
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  // SORTING STATES
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortOption, setSortOption] = useState("default");

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

  const handleSort = (option) => {
    setSortOption(option);
    setShowSortMenu(false);
  };

  // FILTER PRODUCTS (BY CATEGORY + TYPE)
  let filteredProducts = all_product.filter((item) => {
    const categoryMatch = props.category === item.category;
    const typeMatch =
      selectedCategories.length === 0 || selectedCategories.includes(item.type);
    return categoryMatch && typeMatch;
  });

  // APPLY SORTING
  if (sortOption === "lowToHigh") {
    filteredProducts = filteredProducts.sort((a, b) => a.new_price - b.new_price);
  }
  if (sortOption === "highToLow") {
    filteredProducts = filteredProducts.sort((a, b) => b.new_price - a.new_price);
  }
  if (sortOption === "nameAZ") {
    filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
    setTimeout(() => {
      productsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className='shop-category'>
      <div className='layout-align'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
      </div>

      {/* SORT SECTION */}
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing {filteredProducts.length}</span> product(s)
        </p>

        <div
          className='shopcategory-sort'
          onClick={() => setShowSortMenu(!showSortMenu)}
        >
          <span>
            {sortOption === "default" && "Sort by"}
            {sortOption === "lowToHigh" && "Price: Low to High"}
            {sortOption === "highToLow" && "Price: High to Low"}
            {sortOption === "nameAZ" && "Name: A to Z"}
          </span>

          <img
            className={showSortMenu ? "rotate-arrow" : ""}
            src={dropdown_icon}
            alt=""
          />
        </div>

        {/* SORT DROPDOWN MENU */}
        {showSortMenu && (
          <div className="sort-dropdown">
            <p onClick={() => handleSort("lowToHigh")}>Price: Low → High</p>
            <p onClick={() => handleSort("highToLow")}>Price: High → Low</p>
            <p onClick={() => handleSort("nameAZ")}>Name: A → Z</p>
            <p onClick={() => handleSort("default")}>Reset</p>
          </div>
        )}
      </div>

      {/* PRODUCTS */}
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

      {/* LOAD MORE */}
      {visibleCount < filteredProducts.length && (
        <div className="shopcategory-loadmore">
          <button type="button" onClick={handleLoadMore}>Explore More</button>
        </div>
      )}
    </div>
  )
}

export default ShopCategory;

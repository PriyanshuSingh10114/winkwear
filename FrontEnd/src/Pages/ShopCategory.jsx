import "./CSS/ShopCategory.css";
import { useContext, useState, useRef, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = ({ category, banner }) => {
  const { all_product } = useContext(ShopContext);

  const [visibleCount, setVisibleCount] = useState(8);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortOption, setSortOption] = useState("default");

  const [filterSeason, setFilterSeason] = useState("all");
  const [filterStyle, setFilterStyle] = useState("all");
  const [filterOccasion, setFilterOccasion] = useState("all");

  const productsEndRef = useRef(null);

  useEffect(() => {
    setVisibleCount(8);
  }, [filterSeason, filterStyle, filterOccasion, sortOption, category]);

  /* FILTER */
  const filtered = all_product.filter((item) => {
    return (
      item.category === category &&
      (filterSeason === "all" || item.season === filterSeason) &&
      (filterStyle === "all" || item.style === filterStyle) &&
      (filterOccasion === "all" || item.occasion === filterOccasion)
    );
  });

  /* SORT (non-mutating) */
  const sorted = [...filtered];
  if (sortOption === "lowToHigh") sorted.sort((a, b) => a.new_price - b.new_price);
  if (sortOption === "highToLow") sorted.sort((a, b) => b.new_price - a.new_price);
  if (sortOption === "nameAZ") sorted.sort((a, b) => a.name.localeCompare(b.name));

  const handleLoadMore = () => {
    setVisibleCount((p) => p + 8);
    setTimeout(() => {
      productsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="shop-category">
      {/* BANNER */}
      <div className="layout-align">
        <img className="shopcategory-banner" src={banner} alt={category} />
      </div>

      {/* TOOLBAR */}
      <div className="shopcategory-toolbar">
        {/* LEFT (HIDDEN ON PHONE) */}
        <div className="toolbar-left">
          <span>Showing {sorted.length}</span> product(s)
        </div>

        {/* FILTERS (HIDDEN ON PHONE) */}
        <div className="toolbar-center">
          <select value={filterSeason} onChange={(e) => setFilterSeason(e.target.value)}>
            <option value="all">All Seasons</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="all-season">All Season</option>
          </select>

          <select value={filterStyle} onChange={(e) => setFilterStyle(e.target.value)}>
            <option value="all">All Styles</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="partywear">Party Wear</option>
            <option value="streetwear">Streetwear</option>
            <option value="athletic">Athletic</option>
            <option value="ethnic">Ethnic</option>
          </select>

          <select value={filterOccasion} onChange={(e) => setFilterOccasion(e.target.value)}>
            <option value="all">All Occasions</option>
            <option value="daily">Daily</option>
            <option value="office">Office</option>
            <option value="party">Party</option>
            <option value="vacation">Vacation</option>
            <option value="festive">Festive</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>

        {/* SORT */}
        <div className="toolbar-right mobile-sort">
          <div
            className="shopcategory-sort"
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            <span className="sort-text">
              {sortOption === "default" && "Sort by"}
              {sortOption === "lowToHigh" && "Price: Low → High"}
              {sortOption === "highToLow" && "Price: High → Low"}
              {sortOption === "nameAZ" && "Name: A → Z"}
            </span>
            <img
              src={dropdown_icon}
              className={showSortMenu ? "rotate-arrow" : ""}
              alt="sort"
            />
          </div>

          {showSortMenu && (
            <div className="sort-dropdown">
              <p onClick={() => setSortOption("lowToHigh")}>Price: Low → High</p>
              <p onClick={() => setSortOption("highToLow")}>Price: High → Low</p>
              <p onClick={() => setSortOption("nameAZ")}>Name: A → Z</p>
              <p onClick={() => setSortOption("default")}>Reset</p>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="shopcategory-products">
        {sorted.slice(0, visibleCount).map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
        <div ref={productsEndRef} />
      </div>

      {/* LOAD MORE */}
      {visibleCount < sorted.length && (
        <div className="shopcategory-loadmore">
          <button onClick={handleLoadMore}>Explore More</button>
        </div>
      )}
    </div>
  );
};

export default ShopCategory;

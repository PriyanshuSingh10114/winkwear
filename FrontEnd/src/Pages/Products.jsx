import React, { useContext, useEffect, useRef, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import SEO from "../Components/SEO/SEO";
import CategoryHero from "../Components/CategoryHero/CategoryHero";
import { PAGE_SEO, SITE_URL } from "../config/seoConfig";
import { createProductSlug } from "../utils/slugify";
import { Link } from "react-router-dom";

const Products = () => {
  const { all_product } = useContext(ShopContext);

  const [visibleCount, setVisibleCount] = useState(12);
  const [sortOption, setSortOption] = useState("default");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterSeason, setFilterSeason] = useState("all");
  const [filterStyle, setFilterStyle] = useState("all");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const endRef = useRef(null);

  useEffect(() => {
    setVisibleCount(12);
  }, [sortOption, filterCategory, filterSeason, filterStyle]);

  const filtered = all_product.filter((item) => {
    const catMatch =
      filterCategory === "all" ||
      (filterCategory === "men" && (item.category === "men" || item.category === "mens")) ||
      (filterCategory === "women" && (item.category === "women" || item.category === "womens")) ||
      (filterCategory === "kids" && (item.category === "kid" || item.category === "kids"));

    const seasonMatch = filterSeason === "all" || item.season === filterSeason;
    const styleMatch = filterStyle === "all" || item.style === filterStyle;

    return catMatch && seasonMatch && styleMatch;
  });

  const sorted = [...filtered];
  if (sortOption === "lowToHigh") sorted.sort((a, b) => a.new_price - b.new_price);
  if (sortOption === "highToLow") sorted.sort((a, b) => b.new_price - a.new_price);
  if (sortOption === "nameAZ") sorted.sort((a, b) => a.name.localeCompare(b.name));

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "All Clothing & Fashion Collections | Wink & Wear",
    "url": `${SITE_URL}/products`,
    "numberOfItems": sorted.length,
    "itemListElement": sorted.slice(0, 16).map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": product.name,
      "url": `${SITE_URL}${createProductSlug(product.name, product.id)}`
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${SITE_URL}/products`
      }
    ]
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [itemListSchema, breadcrumbSchema]
  };

  const resetFilters = () => {
    setSortOption("default");
    setFilterCategory("all");
    setFilterSeason("all");
    setFilterStyle("all");
  };

  return (
    <div className="shop-category">
      <SEO
        title={PAGE_SEO.products.title}
        description={PAGE_SEO.products.description}
        canonical={PAGE_SEO.products.canonical}
        schemaData={combinedSchema}
      />



      {/* ================= MOBILE FILTER BAR ================= */}
      <div className="mobile-filter-wrapper">
        <div className="mobile-filter-bar">
          <button
            className="mobile-filter-btn"
            onClick={() => setShowMobileFilter(true)}
          >
            <span>
              Filter & Sort
              {(filterCategory !== "all" ||
                filterSeason !== "all" ||
                filterStyle !== "all") && " •"}
            </span>
            <img src={dropdown_icon} alt="filter" />
          </button>
        </div>
      </div>

      {/* ================= CATEGORY HERO SPOTLIGHT ================= */}
      <CategoryHero
        category="products"
        title="All Clothing & Fashion Collections"
        intro="Explore the complete fashion catalog from Wink & Wear. Browse trending styles across Men, Women, and Kids collections with fast shipping across India."
        count={sorted.length}
      />

      {/* ================= DESKTOP TOOLBAR ================= */}
      <div className="shopcategory-toolbar">
        <div className="toolbar-left">
          <span>{sorted.length}</span> product(s)
        </div>

        <div className="toolbar-center">
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Departments</option>
            <option value="men">Men's Apparel</option>
            <option value="women">Women's Fashion</option>
            <option value="kids">Kids' Collection</option>
          </select>

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

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Default Sort</option>
            <option value="lowToHigh">Price: Low → High</option>
            <option value="highToLow">Price: High → Low</option>
            <option value="nameAZ">Name: A → Z</option>
          </select>
        </div>
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <div className="shopcategory-products">
        {sorted.slice(0, visibleCount).map((item, idx) => (
          <Item key={item.id} {...item} priority={idx < 4} />
        ))}
        <div ref={endRef} />
      </div>

      {/* ================= LOAD MORE ================= */}
      {visibleCount < sorted.length && (
        <div className="shopcategory-loadmore">
          <button onClick={() => setVisibleCount((v) => v + 8)}>
            Explore More
          </button>
        </div>
      )}

      {/* ================= MOBILE FILTER SHEET ================= */}
      {showMobileFilter && (
        <div className="mobile-filter-overlay">
          <div className="mobile-filter-sheet">
            <h3>Filter & Sort</h3>

            <div className="filter-group">
              <label>Department</label>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="all">All Departments</option>
                <option value="men">Men's Apparel</option>
                <option value="women">Women's Fashion</option>
                <option value="kids">Kids' Collection</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By</label>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="default">Default</option>
                <option value="lowToHigh">Price: Low → High</option>
                <option value="highToLow">Price: High → Low</option>
                <option value="nameAZ">Name: A → Z</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Season</label>
              <select value={filterSeason} onChange={(e) => setFilterSeason(e.target.value)}>
                <option value="all">All</option>
                <option value="summer">Summer</option>
                <option value="winter">Winter</option>
                <option value="all-season">All Season</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Style</label>
              <select value={filterStyle} onChange={(e) => setFilterStyle(e.target.value)}>
                <option value="all">All</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="partywear">Party Wear</option>
                <option value="streetwear">Streetwear</option>
                <option value="athletic">Athletic</option>
                <option value="ethnic">Ethnic</option>
              </select>
            </div>

            <div className="filter-actions">
              <button className="reset-btn" onClick={resetFilters}>
                Reset
              </button>
              <button className="apply-btn" onClick={() => setShowMobileFilter(false)}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

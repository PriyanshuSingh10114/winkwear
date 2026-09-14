import "./CSS/ShopCategory.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import SEO from "../Components/SEO/SEO";
import { PAGE_SEO, SITE_URL, getSubcategorySEO } from "../config/seoConfig";
import { createProductSlug } from "../utils/slugify";

const getCategorySEO = (category, subcategory) => {
  if (subcategory) {
    return getSubcategorySEO(category, subcategory);
  }

  if (category === "men") {
    return {
      ...PAGE_SEO.mens,
      h1: "Men's Fashion & Apparel Collection",
      intro: "Discover premium men's clothing at Wink & Wear. From casual streetwear t-shirts and formal shirts to jackets and denim, shop stylish apparel designed for modern fit and daily comfort.",
    };
  }
  if (category === "women") {
    return {
      ...PAGE_SEO.womens,
      h1: "Women's Fashion & Apparel Collection",
      intro: "Explore trendy women's fashion at Wink & Wear. Shop chic dresses, casual tops, stylish activewear and everyday outfits crafted with high-quality fabrics.",
    };
  }
  return {
    ...PAGE_SEO.kids,
    h1: "Kids' Fashion & Apparel Collection",
    intro: "Shop comfortable, soft, and durable clothing for kids at Wink & Wear. Discover fun t-shirts, vibrant dresses, and play-ready outfits.",
  };
};

const matchesSubcategory = (item, sub) => {
  if (!sub) return true;
  const target = sub.toLowerCase().replace(/[-_]/g, "");
  const itemType = (item.type || "").toLowerCase().replace(/[-_]/g, "");
  const itemName = (item.name || "").toLowerCase().replace(/[-_]/g, "");

  // Direct type match
  if (itemType.includes(target) || target.includes(itemType)) return true;

  // Common singular / plural mappings
  if (target === "tshirts" && (itemType.includes("tshirt") || itemName.includes("tshirt") || itemName.includes("t-shirt"))) return true;
  if (target === "shirts" && (itemType.includes("shirt") || itemName.includes("shirt"))) return true;
  if (target === "dresses" && (itemType.includes("dress") || itemType.includes("gown") || itemName.includes("dress") || itemName.includes("gown"))) return true;
  if (target === "jackets" && (itemType.includes("jacket") || itemType.includes("coat") || itemName.includes("jacket") || itemName.includes("coat"))) return true;
  if (target === "hoodies" && (itemType.includes("hoodie") || itemType.includes("sweater") || itemName.includes("hoodie") || itemName.includes("sweater"))) return true;
  if (target === "tops" && (itemType.includes("top") || itemType.includes("blouse") || itemName.includes("top") || itemName.includes("blouse"))) return true;
  if (target === "sweaters" && (itemType.includes("sweater") || itemName.includes("sweater"))) return true;
  if (target === "blazers" && (itemType.includes("blazer") || itemType.includes("suit") || itemName.includes("blazer") || itemName.includes("suit"))) return true;
  if (target === "pants" && (itemType.includes("pant") || itemType.includes("jean") || itemType.includes("trouser") || itemName.includes("jean") || itemName.includes("trouser"))) return true;

  return itemName.includes(target);
};

const ShopCategory = ({ category, banner }) => {
  const { all_product } = useContext(ShopContext);
  const { subcategory } = useParams();

  const [visibleCount, setVisibleCount] = useState(8);
  const [sortOption, setSortOption] = useState("default");
  const [filterSeason, setFilterSeason] = useState("all");
  const [filterStyle, setFilterStyle] = useState("all");
  const [filterOccasion, setFilterOccasion] = useState("all");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const endRef = useRef(null);
  const catSEO = getCategorySEO(category, subcategory);

  useEffect(() => {
    setVisibleCount(8);
  }, [category, subcategory, sortOption, filterSeason, filterStyle, filterOccasion]);

  /* ================= BULLETPROOF CATEGORY FILTER ================= */
  const isCategoryMatch = (itemCat, targetCat) => {
    if (!itemCat || !targetCat) return false;
    const c1 = itemCat.toLowerCase().trim();
    const c2 = targetCat.toLowerCase().trim();
    if (c1 === c2) return true;
    if ((c1 === "kid" || c1 === "kids") && (c2 === "kid" || c2 === "kids")) return true;
    if ((c1 === "men" || c1 === "mens") && (c2 === "men" || c2 === "mens")) return true;
    if ((c1 === "women" || c1 === "womens") && (c2 === "women" || c2 === "womens")) return true;
    return false;
  };

  const filtered = all_product.filter((item) =>
    isCategoryMatch(item.category, category) &&
    matchesSubcategory(item, subcategory) &&
    (filterSeason === "all" || item.season === filterSeason) &&
    (filterStyle === "all" || item.style === filterStyle) &&
    (filterOccasion === "all" || item.occasion === filterOccasion)
  );

  /* ================= SORT ================= */
  const sorted = [...filtered];
  if (sortOption === "lowToHigh") sorted.sort((a, b) => a.new_price - b.new_price);
  if (sortOption === "highToLow") sorted.sort((a, b) => b.new_price - a.new_price);
  if (sortOption === "nameAZ") sorted.sort((a, b) => a.name.localeCompare(b.name));

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": catSEO.h1,
    "url": `${SITE_URL}${catSEO.canonical}`,
    "numberOfItems": sorted.length,
    "itemListElement": sorted.slice(0, 16).map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": product.name,
      "url": `${SITE_URL}${createProductSlug(product.name, product.id)}`
    }))
  };

  const categoryPath = category === "men" ? "/mens" : category === "women" ? "/womens" : "/kids";
  const categoryName = category === "men" ? "Men" : category === "women" ? "Women" : "Kids";

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": SITE_URL
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": categoryName,
      "item": `${SITE_URL}${categoryPath}`
    }
  ];

  if (subcategory) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": catSEO.h1,
      "item": `${SITE_URL}${categoryPath}/${subcategory}`
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [itemListSchema, breadcrumbSchema]
  };

  const resetFilters = () => {
    setSortOption("default");
    setFilterSeason("all");
    setFilterStyle("all");
    setFilterOccasion("all");
  };

  return (
    <div className="shop-category">
      <SEO
        title={catSEO.title}
        description={catSEO.description}
        canonical={catSEO.canonical}
        schemaData={combinedSchema}
      />

      {/* ================= BREADCRUMBS ================= */}
      <div style={{ padding: "1rem 5% 0" }}>
        <div className="breadcrums" aria-label="Breadcrumb">
          <Link to="/">HOME</Link>
          <span style={{ margin: "0 8px", color: "#666" }}>&gt;</span>
          {subcategory ? (
            <>
              <Link to={categoryPath}>{categoryName.toUpperCase()}</Link>
              <span style={{ margin: "0 8px", color: "#666" }}>&gt;</span>
              <span style={{ color: "#fff" }}>{subcategory.toUpperCase().replace(/-/g, " ")}</span>
            </>
          ) : (
            <span style={{ color: "#fff" }}>{categoryName.toUpperCase()}</span>
          )}
        </div>
      </div>

      {/* ================= MOBILE FILTER (STABLE) ================= */}
      <div className="mobile-filter-wrapper">
        <div className="mobile-filter-bar">
          <button
            className="mobile-filter-btn"
            onClick={() => setShowMobileFilter(true)}
          >
            <span>
              Filter & Sort
              {(filterSeason !== "all" ||
                filterStyle !== "all" ||
                filterOccasion !== "all") && " •"}
            </span>
            <img src={dropdown_icon} alt="filter" />
          </button>
        </div>
      </div>

      {/* ================= BANNER & H1 ================= */}
      <img className="shopcategory-banner" src={banner} alt={`${catSEO.h1} Banner`} fetchPriority="high" decoding="async" />

      <div style={{ padding: "0 5%", marginTop: "1rem" }}>
        <h1 style={{ color: "#fff", fontSize: "1.8rem", marginBottom: "0.5rem" }}>{catSEO.h1}</h1>
        <p style={{ color: "#aaa", fontSize: "0.95rem", lineHeight: "1.5", maxWidth: "800px" }}>{catSEO.intro}</p>
      </div>

      {/* ================= DESKTOP TOOLBAR ================= */}
      <div className="shopcategory-toolbar">
        <div className="toolbar-left">
          <span>{sorted.length}</span> product(s)
        </div>

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

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Default Sort</option>
            <option value="lowToHigh">Price: Low → High</option>
            <option value="highToLow">Price: High → Low</option>
            <option value="nameAZ">Name: A → Z</option>
          </select>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
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

            <div className="filter-group">
              <label>Occasion</label>
              <select value={filterOccasion} onChange={(e) => setFilterOccasion(e.target.value)}>
                <option value="all">All</option>
                <option value="daily">Daily</option>
                <option value="office">Office</option>
                <option value="party">Party</option>
                <option value="vacation">Vacation</option>
                <option value="festive">Festive</option>
                <option value="outdoor">Outdoor</option>
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

export default ShopCategory;

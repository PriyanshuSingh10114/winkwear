import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import SEO from "../Components/SEO/SEO";
import { SITE_URL } from "../config/seoConfig";
import { createProductSlug, parseProductId } from "../utils/slugify";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const idNum = parseProductId(productId);
  const product = all_product.find(
    (item) => item.id === idNum
  );

  // 🔒 Safety check
  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#fff" }}>
        <SEO
          title="Product Not Found | Wink & Wear"
          description="The requested fashion product could not be found."
          robots="noindex, nofollow"
        />
        <h2>Product Not Found</h2>
        <p style={{ marginTop: "1rem", color: "#aaa" }}>
          Sorry, the product you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const productSlug = createProductSlug(product.name, product.id);
  const categoryPath = product.category === 'men' ? '/mens' : product.category === 'women' ? '/womens' : '/kids';
  const categoryName = product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : "Collection";
  const image = product.image?.startsWith("http") ? product.image : `${SITE_URL}${product.image}`;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [image],
    "description": product.description || `Buy ${product.name} online at Wink & Wear. High-quality fashion apparel for ${product.category || 'all'} with fast delivery across India.`,
    "sku": `WW-${(product.category || 'PRODUCT').toUpperCase()}-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "Wink & Wear"
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}${productSlug}`,
      "priceCurrency": "INR",
      "price": product.new_price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.available !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Wink & Wear"
      }
    }
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
        "name": categoryName,
        "item": `${SITE_URL}${categoryPath}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `${SITE_URL}${productSlug}`
      }
    ]
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [productSchema, breadcrumbSchema]
  };

  return (
    <div>
      <SEO
        title={`${product.name} | Wink & Wear`}
        description={product.description || `Shop ${product.name} online at Wink & Wear. Premium quality, comfortable fit & fast shipping across India.`}
        canonical={productSlug}
        ogImage={image}
        ogType="product"
        schemaData={combinedSchema}
      />
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
      <RelatedProducts category={product.category} />
    </div>
  );
};

export default Product;


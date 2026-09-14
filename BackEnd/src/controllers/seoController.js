const productService = require("../services/productService");

const createProductSlug = (name = "", id = "") => {
  if (!name) return `/product/${id}`;
  const slugifiedName = String(name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return `/product/${slugifiedName}-${id}`;
};

const getSitemap = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    const siteUrl = "https://winkandwear.com";

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static Indexable Pages
    const staticPages = [
      { url: "", priority: "1.0", changefreq: "daily" },
      { url: "/mens", priority: "0.9", changefreq: "daily" },
      { url: "/womens", priority: "0.9", changefreq: "daily" },
      { url: "/kids", priority: "0.8", changefreq: "daily" },
      { url: "/products", priority: "0.9", changefreq: "daily" },
      // Important Category Landing Pages
      { url: "/womens/dresses", priority: "0.8", changefreq: "weekly" },
      { url: "/womens/tops", priority: "0.8", changefreq: "weekly" },
      { url: "/womens/jackets", priority: "0.8", changefreq: "weekly" },
      { url: "/womens/sweaters", priority: "0.8", changefreq: "weekly" },
      { url: "/womens/blazers", priority: "0.8", changefreq: "weekly" },
      { url: "/mens/tshirts", priority: "0.8", changefreq: "weekly" },
      { url: "/mens/shirts", priority: "0.8", changefreq: "weekly" },
      { url: "/mens/jackets", priority: "0.8", changefreq: "weekly" },
      { url: "/mens/hoodies", priority: "0.8", changefreq: "weekly" },
      { url: "/mens/blazers", priority: "0.8", changefreq: "weekly" },
      { url: "/kids/tshirts", priority: "0.7", changefreq: "weekly" },
      { url: "/kids/dresses", priority: "0.7", changefreq: "weekly" },
      { url: "/kids/hoodies", priority: "0.7", changefreq: "weekly" },
      // Content Pages
      { url: "/about", priority: "0.5", changefreq: "monthly" },
      { url: "/contact", priority: "0.5", changefreq: "monthly" },
      { url: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
      { url: "/return-exchange", priority: "0.4", changefreq: "monthly" },
    ];

    staticPages.forEach((page) => {
      xml += `  <url>\n`;
      xml += `    <loc>${siteUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic Product Pages
    if (Array.isArray(products)) {
      products.forEach((product) => {
        const prodPath = createProductSlug(product.name, product.id);
        const lastMod = product.date ? new Date(product.date).toISOString() : new Date().toISOString();
        xml += `  <url>\n`;
        xml += `    <loc>${siteUrl}${prodPath}</loc>\n`;
        xml += `    <lastmod>${lastMod}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });
    }

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.status(200).send(xml);
  } catch (error) {
    next(error);
  }
};

const getRobots = (req, res) => {
  const robotsTxt = `# https://winkandwear.com/robots.txt
# Wink & Wear Search Engine Crawling Instructions

User-agent: *
Allow: /
Allow: /mens
Allow: /womens
Allow: /kids
Allow: /products
Allow: /about
Allow: /contact
Allow: /privacy-policy
Allow: /return-exchange
Allow: /product/

# Disallow Private User & Administrative Routes
Disallow: /cart
Disallow: /wishlist
Disallow: /place-order
Disallow: /payment-success
Disallow: /orders
Disallow: /Orders
Disallow: /profile
Disallow: /login
Disallow: /admin
Disallow: /api/

# Sitemap Location
Sitemap: https://winkandwear.com/sitemap.xml
`;
  res.header("Content-Type", "text/plain");
  res.status(200).send(robotsTxt);
};

module.exports = {
  getSitemap,
  getRobots,
};

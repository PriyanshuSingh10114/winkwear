import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, DEFAULT_SEO } from '../../config/seoConfig';

const SEO = ({
  title,
  description,
  canonical,
  robots = "index, follow",
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  schemaData,
}) => {
  const metaTitle = title || DEFAULT_SEO.title;
  const metaDescription = description || DEFAULT_SEO.description;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}` : SITE_URL;
  const image = ogImage || DEFAULT_SEO.ogImage;
  const cardType = DEFAULT_SEO.twitterCard;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      <meta property="og:title" content={ogTitle || metaTitle} />
      <meta property="og:description" content={ogDescription || metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content={cardType} />
      <meta name="twitter:title" content={ogTitle || metaTitle} />
      <meta name="twitter:description" content={ogDescription || metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

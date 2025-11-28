import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  price?: string;
  currency?: string;
  availability?: 'in stock' | 'out of stock';
  brand?: string;
  schema?: object;
}

export const SEO = ({
  title,
  description,
  canonicalUrl,
  image,
  type = 'website',
  price,
  currency = 'EUR',
  availability,
  brand = 'Garett Beauty',
  schema
}: SEOProps) => {
  const siteUrl = window.location.origin;
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : window.location.href;
  const defaultImage = `${siteUrl}/og-image.jpg`;
  const imageUrl = image || defaultImage;

  // Limitar title a 60 caracteres
  const optimizedTitle = title.length > 60 ? `${title.substring(0, 57)}...` : title;
  
  // Limitar description a 160 caracteres
  const optimizedDescription = description.length > 160 
    ? `${description.substring(0, 157)}...` 
    : description;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{optimizedTitle} | Garett Beauty</title>
      <meta name="title" content={`${optimizedTitle} | Garett Beauty`} />
      <meta name="description" content={optimizedDescription} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={fullUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={`${optimizedTitle} | Garett Beauty`} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Garett Beauty" />
      <meta property="og:locale" content="es_ES" />
      
      {/* Product specific OG tags */}
      {type === 'product' && price && (
        <>
          <meta property="product:price:amount" content={price} />
          <meta property="product:price:currency" content={currency} />
          {availability && (
            <meta property="product:availability" content={availability} />
          )}
          {brand && <meta property="product:brand" content={brand} />}
        </>
      )}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={`${optimizedTitle} | Garett Beauty`} />
      <meta property="twitter:description" content={optimizedDescription} />
      <meta property="twitter:image" content={imageUrl} />
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

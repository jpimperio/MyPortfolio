import { Helmet } from "react-helmet-async";

const defaults = {
  title: "John Paul Imperio | Portfolio",
  description:
    "Full-stack developer crafting immersive digital experiences with React, Three.js, and modern web technologies.",
  url: "https://your-portfolio.vercel.app",
  image: "/og-image.png",
};

export default function SEO({ title, description, image }) {
  const pageTitle = title ? `${title} | John Paul Imperio` : defaults.title;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description || defaults.description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description || defaults.description} />
      <meta property="og:image" content={image || defaults.image} />
      <meta property="og:url" content={defaults.url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description || defaults.description} />
      <meta name="twitter:image" content={image || defaults.image} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "John Paul Imperio",
          url: defaults.url,
          jobTitle: "Full-Stack Developer",
          sameAs: ["https://github.com/jpimperio"],
        })}
      </script>
    </Helmet>
  );
}

import { Navigation } from '@/components/sections/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import FlagshipSection from '@/components/sections/FlagshipSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { getSiteConfiguration, getProductsList } from '@/config/site-content';
import { sortProducts } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [siteConfig, products] = await Promise.all([
    getSiteConfiguration(),
    getProductsList(),
  ]);

  const sortedProducts = sortProducts(products);
  const flagship = sortedProducts.length > 0 ? sortedProducts[0] : null;

  return (
    <>
      <Navigation config={siteConfig} />
      <main>
        <HeroSection config={siteConfig} />
        <ProductsSection products={sortedProducts} headings={siteConfig.sectionHeadings} />
        {flagship && <FlagshipSection product={flagship} />}
        <AboutSection config={siteConfig} headings={siteConfig.sectionHeadings} />
        <ContactSection config={siteConfig} headings={siteConfig.sectionHeadings} />
      </main>
      <Footer config={siteConfig} />
    </>
  );
}

import { Navigation } from '@/components/sections/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { BuilderSection } from '@/components/sections/BuilderSection';
import ContactSection from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { getSiteConfiguration, getProductsList } from '@/config/site-content';
import { sortProducts } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const siteConfig = await getSiteConfiguration();
  const products = await getProductsList(siteConfig);

  const sortedProducts = sortProducts(products);

  return (
    <>
      <Navigation config={siteConfig} />
      <main>
        <HeroSection config={siteConfig} />
        <ProductsSection products={sortedProducts} />
        <CapabilitiesSection />
        <BuilderSection />
        <ContactSection config={siteConfig} headings={siteConfig.sectionHeadings} />
      </main>
      <Footer config={siteConfig} />
    </>
  );
}

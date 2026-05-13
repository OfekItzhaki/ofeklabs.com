# Requirements Document

## Introduction

Professional landing page for OfekLabs (ofeklabs.com) — a software company that builds productivity and automation tools. The site follows a "Quiet Confidence" SaaS design direction (inspired by Linear, Vercel, Raycast) with a dark refined theme. All content is managed through Sanity CMS with zero hardcoded content. The flagship product is Shifter, a keyboard-driven productivity tool hosted at shifter.ofeklabs.com.

## Glossary

- **Landing_Page**: The single-page application served at ofeklabs.com, composed of sequential sections rendered as Server Components
- **Sanity_CMS**: The headless content management system providing all dynamic content via GROQ queries
- **Navigation**: The sticky top bar containing the company logo, section links, and a call-to-action button
- **Hero_Section**: The first visible content section displaying the company value proposition and primary CTA
- **Products_Section**: A grid layout displaying product cards with data fetched from Sanity_CMS
- **Flagship_Section**: A dedicated highlight section for the primary product (Shifter) with features and screenshot
- **About_Section**: A brief company description section
- **Contact_Section**: A section providing contact methods (email, social links, or a form)
- **Footer**: The bottom section containing navigation links, social links, legal links, and copyright
- **Product_Card**: A UI component displaying a single product's name, tagline, status badge, and link
- **URL_Module**: The centralized module (`src/config/urls.ts`) managing all URL construction and resolution
- **Site_Config**: The Sanity document type storing company-wide configuration (name, tagline, email, socials, legal links)
- **Dynamic_Rendering**: Next.js rendering mode using `force-dynamic` to ensure fresh CMS content on every request
- **Server_Component**: A React component rendered on the server without client-side JavaScript unless explicitly marked with `"use client"`
- **Scroll_Animation**: A subtle fade-in animation triggered when an element enters the viewport

## Requirements

### Requirement 1: Dynamic Content Rendering

**User Story:** As a site visitor, I want to see up-to-date content on every page load, so that I always receive the latest information about OfekLabs and its products.

#### Acceptance Criteria

1. THE Landing_Page SHALL use Dynamic_Rendering (`force-dynamic`) to fetch fresh content from Sanity_CMS on every request, bypassing any server-side cache
2. IF Sanity_CMS fails to respond within 5 seconds, returns an HTTP error status, or returns an empty dataset, THEN THE Landing_Page SHALL render using the fallback default configuration without displaying an error message or broken layout to the visitor
3. THE Landing_Page SHALL render all sections as Server_Components unless the section requires browser APIs or user-initiated event handling (e.g., form input, click handlers, scroll listeners)
4. THE Landing_Page SHALL contain zero hardcoded content strings — all visitor-visible text including headings, paragraphs, button labels, and navigation links SHALL originate from Sanity_CMS or the fallback configuration
5. THE fallback default configuration SHALL provide content for all Landing_Page sections (Navigation, Hero, Products, About, Contact, Footer) such that the page renders a complete layout when Sanity_CMS is unavailable

### Requirement 2: Navigation

**User Story:** As a site visitor, I want a persistent navigation bar, so that I can quickly access any section of the page regardless of my scroll position.

#### Acceptance Criteria

1. THE Navigation SHALL remain fixed at the top of the viewport while the visitor scrolls
2. THE Navigation SHALL display the company logo, section links (Products, About, Contact), and a primary CTA button
3. WHEN a section link is activated, THE Navigation SHALL scroll the page to the corresponding section using an animated transition lasting no more than 800ms, with the target section's top edge visible below the navigation bar
4. WHILE the viewport width is less than 768px, THE Navigation SHALL collapse the section links and CTA button into a toggleable menu that the visitor can open and close by activating a menu button
5. THE Navigation SHALL retrieve the company name and CTA text from Site_Config via Sanity_CMS
6. IF Site_Config data is unavailable from Sanity_CMS, THEN THE Navigation SHALL display fallback values for the company name and CTA text

### Requirement 3: Hero Section

**User Story:** As a site visitor, I want to immediately understand what OfekLabs does when I land on the page, so that I can decide whether to explore further.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a headline (maximum 80 characters), a subheadline (maximum 160 characters), and a primary CTA button (maximum 30 characters of label text)
2. THE Hero_Section SHALL retrieve headline, subheadline, and CTA text from Site_Config via Sanity_CMS
3. IF Sanity_CMS is unavailable or returns no hero content, THEN THE Hero_Section SHALL display fallback headline, subheadline, and CTA text from the default Site_Config
4. THE Hero_Section SHALL use a dark background (#09090B) with white (#FFFFFF) text for the headline and light gray (#A1A1AA) text for the subheadline
5. WHEN the CTA button is activated and the configured target is an in-page section, THE Hero_Section SHALL scroll the visitor to that section within the same page
6. WHEN the CTA button is activated and the configured target is an external URL, THE Hero_Section SHALL open the URL in a new browser tab
7. THE Hero_Section SHALL render a fade-in animation on initial page load with a duration between 300ms and 500ms

### Requirement 4: Products Section

**User Story:** As a site visitor, I want to browse available products in a clean grid layout, so that I can discover tools that match my needs.

#### Acceptance Criteria

1. THE Products_Section SHALL display a grid of Product_Cards populated from Sanity_CMS product documents
2. EACH Product_Card SHALL display the product title, tagline, badge text, and a link to the product URL
3. THE Products_Section SHALL order products by the `order` field defined in Sanity_CMS in ascending order, where products without an `order` value appear last
4. WHEN no products are returned from Sanity_CMS, THE Products_Section SHALL not render on the page
5. THE Products_Section SHALL display a responsive grid of one column on viewports below 768px and two columns on viewports of 768px and above
6. EACH Product_Card SHALL apply a Scroll_Animation that triggers when the card enters the viewport
7. IF the Sanity_CMS query fails, THEN THE Products_Section SHALL not render on the page and SHALL NOT display an error to the visitor

### Requirement 5: Flagship Product Highlight

**User Story:** As a site visitor, I want to see a detailed showcase of the flagship product, so that I can understand its key features and try it.

#### Acceptance Criteria

1. THE Flagship_Section SHALL display the flagship product's title, description, screenshot, and a list of key features as retrieved from Sanity_CMS
2. THE Flagship_Section SHALL display a "Try it now" CTA button linking to the flagship product's `url` field from Sanity_CMS
3. THE Flagship_Section SHALL identify the flagship product by selecting the product document in Sanity_CMS with the lowest `order` value
4. WHEN no product screenshot is available in Sanity_CMS, THE Flagship_Section SHALL render the section without an image placeholder
5. THE Flagship_Section SHALL display up to 4 key features from the product's `features` array, each with an accompanying icon selected by the system based on feature index or a predefined icon set
6. IF the product's `features` array contains fewer than 3 items, THEN THE Flagship_Section SHALL display all available features without requiring a minimum count
7. IF no product documents exist in Sanity_CMS, THEN THE Flagship_Section SHALL not render

### Requirement 6: About Section

**User Story:** As a site visitor, I want to learn briefly about the company behind the products, so that I can assess credibility and alignment with my values.

#### Acceptance Criteria

1. THE About_Section SHALL display the company description retrieved from the `description` field in Site_Config via Sanity_CMS
2. THE About_Section SHALL display a maximum of three sentences from the company description, truncating any content beyond the third sentence
3. THE About_Section SHALL use a product-focused voice — referring to the company as "we" and avoiding first-person singular pronouns (e.g., "I", "my")
4. IF the company description field in Site_Config is empty or unavailable, THEN THE About_Section SHALL not render on the page

### Requirement 7: Contact Section

**User Story:** As a site visitor, I want a straightforward way to reach OfekLabs, so that I can inquire about products or collaboration.

#### Acceptance Criteria

1. THE Contact_Section SHALL display the contact email address retrieved from Site_Config via Sanity_CMS as a clickable mailto link
2. THE Contact_Section SHALL display a social media link for each social platform (GitHub, LinkedIn, Twitter/X) that has a URL configured in Site_Config via Sanity_CMS, and SHALL omit any platform whose URL is not configured
3. WHERE a contact form is enabled in Site_Config, THE Contact_Section SHALL render a form with name (maximum 100 characters), email (maximum 254 characters), and message (maximum 2000 characters) fields
4. WHEN the contact form is submitted with a non-empty name, a valid-format email address, and a message of at least 10 characters, THE Contact_Section SHALL send the message and display a visible success confirmation within 5 seconds
5. IF the contact form submission fails due to a network or server error, THEN THE Contact_Section SHALL display an error message indicating the submission was unsuccessful and SHALL retain all entered field data
6. IF the contact form is submitted with any field empty or the email in an invalid format, THEN THE Contact_Section SHALL display a validation error adjacent to each invalid field and SHALL NOT submit the form
7. IF the contact email address is not configured in Site_Config, THEN THE Contact_Section SHALL hide the email display area rather than rendering an empty or broken link

### Requirement 8: Footer

**User Story:** As a site visitor, I want a professional footer with navigation and legal links, so that I can access important pages and trust the site's legitimacy.

#### Acceptance Criteria

1. THE Footer SHALL display the company logo, navigation links (Products, About, Contact), social links, legal links, and a copyright notice
2. THE Footer SHALL retrieve social links and legal links (Privacy Policy, Terms of Service) from Site_Config via Sanity_CMS
3. THE Footer SHALL display the copyright notice in the format "© {current_year} {company_name}" where the year is computed at render time
4. IF a social link or legal link field is not configured in Site_Config, THEN THE Footer SHALL omit that individual link without displaying a broken or empty element
5. IF the viewport width is below 768px, THEN THE Footer SHALL stack its content sections vertically in a single-column layout

### Requirement 9: URL Centralization

**User Story:** As a developer, I want all URLs managed through a single module, so that link changes propagate consistently across the entire site.

#### Acceptance Criteria

1. THE URL_Module SHALL provide a function that accepts a relative path string (up to 2048 characters) and returns an absolute URL by prepending the base site URL, normalizing the result to contain no double slashes in the path segment and no trailing slash
2. THE URL_Module SHALL resolve product URLs from Sanity_CMS product data by accepting a product ID and an array of product records, and returning the matching product's URL field value
3. IF the provided product ID does not match any record in the products array, THEN THE URL_Module SHALL return null
4. THE Landing_Page SHALL use the URL_Module for all internal and external link construction — no component SHALL contain literal URL strings (protocol + domain) outside of the URL_Module
5. THE URL_Module SHALL read the base site URL from the `NEXT_PUBLIC_SITE_URL` environment variable, stripping any trailing slashes from the value
6. IF the `NEXT_PUBLIC_SITE_URL` environment variable is unset or empty, THEN THE URL_Module SHALL fall back to a default base URL of `https://ofeklabs.com`

### Requirement 10: Responsive Design and Performance

**User Story:** As a site visitor on any device, I want the page to load quickly and display correctly, so that I have a smooth experience regardless of screen size or connection speed.

#### Acceptance Criteria

1. THE Landing_Page SHALL achieve a Lighthouse Performance score of 95 or higher when tested in Lighthouse mobile mode with simulated throttling
2. THE Landing_Page SHALL achieve a Lighthouse Accessibility score of 95 or higher when tested in Lighthouse mobile mode
3. THE Landing_Page SHALL render on viewports from 320px to 2560px wide with no horizontal overflow, no overlapping content, no text truncation, and all interactive elements fully visible and operable
4. THE Landing_Page SHALL use a mobile-first CSS approach where base styles target viewports below 640px, with progressive enhancements at breakpoints of 640px, 768px, 1024px, and 1280px
5. THE Landing_Page SHALL lazy-load images that are positioned outside the initial viewport height using native browser lazy loading, and SHALL eagerly load images within the initial viewport to avoid Largest Contentful Paint delays
6. WHILE the Landing_Page is viewed on a viewport below 768px wide, THE Landing_Page SHALL render all tap targets with a minimum size of 44×44 CSS pixels and a minimum spacing of 8px between adjacent targets

### Requirement 11: Design System and Visual Theme

**User Story:** As a site visitor, I want a cohesive, professional visual experience, so that I perceive OfekLabs as a credible and polished company.

#### Acceptance Criteria

1. THE Landing_Page SHALL use a dark theme with background color #09090B and off-white text in the range #E5E5E5 to #FFFFFF
2. THE Landing_Page SHALL use a single accent color from the blue-to-teal range (between #3B82F6 and #06B6D4) for all interactive elements (buttons, links, focus rings) and visual highlights
3. THE Landing_Page SHALL use the Geist font family for all text
4. THE Landing_Page SHALL apply card effects using borders of at most 1px width and a card background color no more than 2 shade steps lighter than the page background (#09090B), with no multi-color gradients, no box-shadow blur exceeding 8px, and no glow effects
5. WHEN a section enters the viewport, THE Landing_Page SHALL apply a fade-in animation with a duration between 300ms and 700ms and an ease-out timing function, with no particle effects, 3D elements, or cursor-tracking animations
6. IF the user has enabled prefers-reduced-motion, THEN THE Landing_Page SHALL disable all Scroll_Animations and display section content immediately without transition

### Requirement 12: SEO and Metadata

**User Story:** As a site owner, I want proper SEO metadata on the page, so that search engines can index and display the site correctly.

#### Acceptance Criteria

1. THE Landing_Page SHALL render a `<title>` tag composed of the company name and tagline from Site_Config, separated by a delimiter (e.g., " | "), with the total output truncated to a maximum of 60 characters
2. THE Landing_Page SHALL render a `<meta name="description">` tag using the company description from Site_Config, truncated to a maximum of 155 characters
3. THE Landing_Page SHALL render Open Graph meta tags (og:title, og:description, og:image, og:url) for social sharing, where og:url matches the canonical URL and og:image references a static asset path in the public directory
4. THE Landing_Page SHALL include a canonical URL meta tag using the base URL returned by the URL configuration module
5. IF the company tagline or description is not available in Site_Config, THEN THE Landing_Page SHALL render the corresponding meta tags using the company name as the fallback value

### Requirement 13: Sanity CMS Schema Structure

**User Story:** As a content editor, I want well-structured CMS schemas, so that I can manage all site content without developer intervention.

#### Acceptance Criteria

1. THE Sanity_CMS SHALL provide a `siteConfig` singleton document type with fields for company name (required string), tagline (string), description (text), contact email (validated as email format), whatsapp number (string), phone number (string), social links (GitHub URL, LinkedIn URL, Twitter/X URL), and legal links (Privacy Policy URL, Terms of Service URL)
2. THE Sanity_CMS SHALL provide a `product` document type with fields for ID (slug, maximum 50 characters, auto-generated from title), title (required string), tagline (string), description (text), status (required, restricted to values: "active", "beta", "dev", "coming-soon"), badge text (required string), URL (required, validated to http or https scheme), features (required array of strings, minimum 1 item), screenshot (image with hotspot support), and display order (number, lower values displayed first)
3. IF a content editor attempts to publish a `product` document with any required field (title, status, badge, URL, or features) empty or missing, THEN THE Sanity_CMS SHALL prevent publishing and indicate which fields require values
4. THE Sanity_CMS SHALL be accessible via the `/studio` route of the application, rendering the Sanity Studio interface for content management

### Requirement 14: URL Module Correctness

**User Story:** As a developer, I want the URL module to handle edge cases correctly, so that links never break regardless of input format.

#### Acceptance Criteria

1. WHEN `buildFullUrl` receives a path with one or more leading slashes, THE URL_Module SHALL normalize the path to contain exactly one leading slash before appending to the base URL
2. WHEN `buildFullUrl` receives an empty string or a whitespace-only string, THE URL_Module SHALL return the base URL without a trailing slash
3. WHEN `getProductUrl` receives a product ID that does not match any record in the provided products array, THE URL_Module SHALL return null
4. WHEN `getBaseUrl` finds the `NEXT_PUBLIC_SITE_URL` environment variable unset or empty, THE URL_Module SHALL return the default production URL "https://ofeklabs.com"
5. FOR ALL valid paths containing only alphanumeric characters, hyphens, underscores, and forward slashes, building a full URL with `buildFullUrl` and extracting the path portion SHALL produce the original normalized path (round-trip property)

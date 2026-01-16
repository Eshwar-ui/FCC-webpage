/**
 * Centralized Assets Configuration
 * 
 * All images, logos, and media assets should be defined here.
 * This makes it easy to update assets in one place.
 * 
 * Usage:
 *   import { assets } from '@/assets' or './assets'
 *   <img src={assets.logo} alt="Logo" />
 * 
 * To add local images:
 *   1. Place image in public/ folder
 *   2. Reference as '/image-name.png'
 * 
 * Or import from src/assets/:
 *   import logoImage from './logo.png'
 *   export const logo = logoImage
 */

// =============================================================================
// LOGO & BRANDING
// =============================================================================

import logoImage from './logo.png';
export const logo = logoImage;

// =============================================================================
// EVENT IMAGES
// =============================================================================

export const eventImages = {
  deadlift: 'https://res.cloudinary.com/doxluexqo/image/upload/v1768557657/WhatsApp_Image_2026-01-07_at_10.22.33_PM_3_jcvzu7.jpg',
  farmersWalk: 'https://res.cloudinary.com/doxluexqo/image/upload/v1768557685/WhatsApp_Image_2026-01-07_at_10.22.33_PM_2_sxrwcl.jpg',
  sandbagLoading: 'https://res.cloudinary.com/doxluexqo/image/upload/v1768557702/WhatsApp_Image_2026-01-07_at_10.22.33_PM_1_kjj6xt.jpg',
  tireFlip: 'https://res.cloudinary.com/doxluexqo/image/upload/v1768557726/WhatsApp_Image_2026-01-07_at_10.22.33_PM_a1clza.jpg',
  yokeWalk: 'https://res.cloudinary.com/doxluexqo/image/upload/v1768572598/event_5_brcr5r.jpg',
};

// =============================================================================
// HERO & SECTION BACKGROUNDS
// =============================================================================

export const heroImages = {
  main: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop',
  // Add more hero/background images here
};

// =============================================================================
// FEATURE & CATEGORY IMAGES
// =============================================================================

export const featureImages = {
  strongmanCompetition: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
  universityChampionship: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
  strengthTraining: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
  championshipTrophy: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop',
};

// =============================================================================
// TEAM / PEOPLE IMAGES
// =============================================================================

export const teamImages = {
  // Add team member photos here
  // john: '/team/john.jpg',
  // jane: '/team/jane.jpg',
};

// =============================================================================
// SPONSOR / PARTNER LOGOS
// =============================================================================

export const sponsorLogos = {
  // Add sponsor logos here
  // sponsor1: '/sponsors/sponsor1.png',
  // sponsor2: '/sponsors/sponsor2.png',
};

// =============================================================================
// SHOP / PRODUCT IMAGES (for future use)
// =============================================================================

export const shopImages = {
  // Product images for when shop goes live
  // tshirt: '/products/tshirt.jpg',
  // hoodie: '/products/hoodie.jpg',
};

// =============================================================================
// ICONS & MISC
// =============================================================================

export const icons = {
  // Custom icons if needed
  // trophy: '/icons/trophy.svg',
};

// =============================================================================
// COMBINED ASSETS EXPORT
// =============================================================================

export const assets = {
  logo,
  events: eventImages,
  hero: heroImages,
  features: featureImages,
  team: teamImages,
  sponsors: sponsorLogos,
  shop: shopImages,
  icons,
};

export default assets;

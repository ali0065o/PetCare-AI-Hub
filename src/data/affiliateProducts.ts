import { AffiliateProduct } from '../types';

export const INITIAL_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'prod-1',
    name: 'Pro-Grade Pet Grooming Vacuum & 7-in-1 Clipper Kit',
    category: 'grooming',
    petTarget: 'all',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewCount: 3420,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
    description: 'All-in-one low-noise vacuum suction system that vacuums up 99% of loose fur while trimming and deshedding. Eliminates messy fur tumbleweeds across the home.',
    highlights: ['Low noise <60dB motor', '3 suction power levels', '7 deshedding & styling attachments', '2.5L dust canister'],
    affiliateUrl: 'https://www.amazon.com/dp/B0PETCARE01?tag=petcareai-20',
    retailerName: 'Amazon',
    badge: 'Best Seller'
  },
  {
    id: 'prod-2',
    name: 'Veterinary Orthopedic High-Density Memory Foam Dog Bed',
    category: 'gear',
    petTarget: 'dog',
    price: 64.50,
    originalPrice: 85.00,
    rating: 4.9,
    reviewCount: 1890,
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    description: 'Therapeutic joint support bed recommended by orthopedists for dogs with hip dysplasia, arthritis, or post-surgical recovery. Waterproof liner with machine-washable faux suede cover.',
    highlights: ['4-inch medical grade foam', 'Waterproof internal lining', 'Non-slip grip bottom', 'Bolstered cervical neck cushion'],
    affiliateUrl: 'https://www.chewy.com/dp/102938?aff_id=petcarehub',
    retailerName: 'Chewy',
    badge: 'Vet Recommended'
  },
  {
    id: 'prod-3',
    name: 'Stainless Steel Whisker-Friendly Pet Water Fountain (3.2L)',
    category: 'health',
    petTarget: 'cat',
    price: 36.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviewCount: 4210,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    description: 'Medical 304 food-grade stainless steel fountain with quadruple filtration. Encourages chronic low-drinkers to drink 3x more water, preventing fatal urinary crystals and kidney failure.',
    highlights: ['Dishwasher safe 304 steel', 'Ultra-silent 20dB pump', 'Multi-layer activated carbon filter', 'Emergency water reservoir during outages'],
    affiliateUrl: 'https://www.amazon.com/dp/B0PETCARE02?tag=petcareai-20',
    retailerName: 'Amazon',
    badge: 'Kidney Health Pick'
  },
  {
    id: 'prod-4',
    name: 'Advanced Synbiotic Daily Probiotic & Digestive Enzymes Chews',
    category: 'nutrition',
    petTarget: 'dog',
    price: 28.95,
    originalPrice: 34.99,
    rating: 4.8,
    reviewCount: 2150,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    description: 'Contains 5 billion CFUs across 6 resilient probiotic strains plus pumpkin & prebiotic MOS. Rapidly relieves loose stool, gas, acid reflux, and skin scratching caused by leaky gut.',
    highlights: ['5 Billion CFU per chew', 'Veterinarian formulated', 'Natural duck flavor dogs love', 'No artificial fillers or wheat'],
    affiliateUrl: 'https://www.chewy.com/dp/543210?aff_id=petcarehub',
    retailerName: 'Chewy',
    badge: 'Vet Formulated'
  },
  {
    id: 'prod-5',
    name: 'No-Pull Tactical Ergonomic Harness & Shock-Absorbing Bungee Leash',
    category: 'gear',
    petTarget: 'dog',
    price: 32.99,
    originalPrice: 42.00,
    rating: 4.6,
    reviewCount: 5600,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    description: 'Front metal D-ring redistributes pulling pressure safely across the chest rather than delicate trachea. Heavy-duty 1050D nylon with breathable air mesh and reflective night stitching.',
    highlights: ['Dual clip attachments', 'Padded traffic control handle', 'Reflective 3M safety piping', 'Escape-proof 4-buckle fit'],
    affiliateUrl: 'https://www.petco.com/shop/en/petcostore/product/778899?affcode=petcareai',
    retailerName: 'Petco',
    badge: 'Top Rated'
  },
  {
    id: 'prod-6',
    name: 'Interactive Smart Laser Ball & Treat Puzzle Enrichment Toy',
    category: 'toys',
    petTarget: 'cat',
    price: 24.50,
    originalPrice: 32.00,
    rating: 4.5,
    reviewCount: 1450,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=800&q=80',
    description: 'Smart 360-degree self-rolling ball with randomized obstacle avoidance and ambient LED glow. Dispenses kibble slowly during play to prevent boredom depression in indoor cats.',
    highlights: ['Obstacle avoidance sensor', 'Type-C USB rechargeable', 'Automatic sleep & wake mode', 'Food grade silicone shell'],
    affiliateUrl: 'https://www.amazon.com/dp/B0PETCARE03?tag=petcareai-20',
    retailerName: 'Amazon',
    badge: 'Mental Stimulation'
  },
  {
    id: 'prod-7',
    name: 'Clinical Pet First-Aid Emergency Kit (65 Essential Pieces)',
    category: 'health',
    petTarget: 'all',
    price: 38.00,
    originalPrice: 45.00,
    rating: 4.9,
    reviewCount: 970,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    description: 'Designed by emergency vet technicians. Packed with cohesive non-stick vet wraps, styptic powder for bleeding nails, tick remover, saline eye wash, digital rapid thermometer, and emergency thermal foil blanket.',
    highlights: ['Comprehensive 65 items', 'Veterinary triage manual included', 'Waterproof compact case', 'Styptic clotting powder included'],
    affiliateUrl: 'https://www.chewy.com/dp/998877?aff_id=petcarehub',
    retailerName: 'Chewy',
    badge: 'Must Have'
  },
  {
    id: 'prod-8',
    name: 'Ultra-Pure Wild Alaskan Salmon Oil with EPA & DHA (32 fl oz)',
    category: 'nutrition',
    petTarget: 'all',
    price: 29.95,
    originalPrice: 38.00,
    rating: 4.8,
    reviewCount: 7800,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    description: 'Liquid gold for dry itchy skin, excessive shedding, and joint stiffness. Sustainably caught wild salmon delivering concentrated Omega-3 fatty acids with mess-free pump dispenser.',
    highlights: ['100% Wild Alaskan Salmon', 'High potency EPA & DHA', 'Noticeable coat shine in 3 weeks', 'Easy pump dispenser'],
    affiliateUrl: 'https://www.amazon.com/dp/B0PETCARE04?tag=petcareai-20',
    retailerName: 'Amazon',
    badge: 'Best For Skin/Coat'
  }
];

const LOCAL_STORAGE_KEY = 'petcare_affiliate_products_v1';

export function getAffiliateProducts(): AffiliateProduct[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Could not load affiliate products from localStorage', e);
  }
  return INITIAL_PRODUCTS;
}

export function saveAffiliateProducts(products: AffiliateProduct[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save affiliate products to localStorage', e);
  }
}

export function resetAffiliateProducts(): AffiliateProduct[] {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (e) {}
  return INITIAL_PRODUCTS;
}

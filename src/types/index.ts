export interface PetInfo {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'guinea_pig' | 'hamster' | 'reptile' | 'fish';
  speciesLabel: string;
  tagline: string;
  image: string;
  idealTemperature: {
    fahrenheit: string;
    celsius: string;
    comfortNotes: string;
    humidity: string;
  };
  environmentRequirements: {
    housing: string;
    spaceNeeds: string;
    beddingSubstrate: string;
    lightingEnrichment: string;
  };
  safeDiet: {
    stapleFoods: string[];
    healthyTreats: string[];
    safeFruitsVegetables: string[];
    feedingFrequency: string;
    dietaryTips: string;
  };
  toxicFoods: {
    strictlyForbidden: {
      name: string;
      dangerLevel: 'Deadly' | 'Severe' | 'Moderate';
      reason: string;
    }[];
    warningNote: string;
  };
  behaviorAndCare: {
    temperament: string;
    lifespan: string;
    exerciseNeeds: string;
    groomingNeeds: string;
    commonBehaviors: string[];
    proCareTips: string[];
  };
  popularBreeds: string[];
}

export interface AffiliateProduct {
  id: string;
  name: string;
  category: 'grooming' | 'nutrition' | 'toys' | 'health' | 'gear';
  petTarget: 'all' | 'dog' | 'cat' | 'bird' | 'rabbit' | 'small_pet';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  highlights: string[];
  affiliateUrl: string;
  retailerName: string; // e.g. Amazon, Chewy, Petco
  badge?: string; // e.g. "Vet Recommended", "Best Seller"
}

export interface VetTriageReport {
  triageLevel: 'mild' | 'moderate' | 'emergency';
  summaryTitle: string;
  conditionSummary: string;
  visualFindings?: string;
  possibleConditions: {
    name: string;
    likelihood: 'High' | 'Medium' | 'Low';
    description: string;
    symptomsMatch: string[];
  }[];
  immediatePrecautions: {
    title: string;
    instruction: string;
    urgency: string;
    warning?: string;
  }[];
  dietRecommendations: {
    recommendedFoods: string[];
    foodsToAvoid: string[];
    hydrationGuide: string;
    specialRecipe: string;
  };
  redFlags: string[];
  questionsForVet: string[];
  disclaimer: string;
}

export interface ConsultationHistoryItem {
  id: string;
  date: string;
  petName: string;
  species: string;
  symptoms: string;
  report: VetTriageReport;
  mediaThumbnail?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

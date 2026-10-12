export interface SampleCase {
  id: string;
  label: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  symptoms: string;
  symptomTags: string[];
  duration: string;
  medicalHistory: string;
  imagePreview?: string;
}

export const SAMPLE_CASES: SampleCase[] = [
  {
    id: 'case-dog-limp',
    label: '🐶 Dog: Sudden Hindleg Limping & Favoring Paw',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '3 years',
    weight: '68 lbs (31 kg)',
    duration: 'Started 4 hours ago after park fetch',
    symptomTags: ['Limping', 'Reluctance to stand', 'Licking paw/joint'],
    symptoms: 'Bella was sprinting after a tennis ball in the wet grass. Suddenly yelped, slowed down, and now refuses to bear full weight on her right hind leg. No visible bleeding, but she keeps licking her knee/hock area and whimpers slightly when standing up.',
    medicalHistory: 'Up to date on rabies & DHPP. No previous joint injuries.',
    imagePreview: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'case-cat-scratch',
    label: '🐱 Cat: Intensive Ear Scratching & Head Shaking',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: '2 years',
    weight: '9.5 lbs (4.3 kg)',
    duration: '2-3 days, worsening today',
    symptomTags: ['Skin scratching / rash', 'Head shaking', 'Lethargy'],
    symptoms: 'Milo has been intensely scratching his right ear with his back paw and tilting his head to the side. Inside the ear canal there is dark brown crumbly coffee-ground discharge and mild redness around the outer pinna. He flinches when his ear is touched.',
    medicalHistory: 'Indoor-only cat adopted 4 months ago. Up to date on FVRCP.',
    imagePreview: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'case-rabbit-stasis',
    label: '🐰 Rabbit: Loss of Appetite & Few Tiny Poops',
    species: 'Rabbit',
    breed: 'Holland Lop',
    age: '1.5 years',
    weight: '3.8 lbs (1.7 kg)',
    duration: '10 hours',
    symptomTags: ['Loss of appetite', 'Lethargy', 'Decreased stool output'],
    symptoms: 'Clover has completely refused his favorite timothy hay and dandelion greens since this morning. He is hunched in a tight ball in the corner of his pen with half-closed eyes. His litter box has only 3 tiny, dry, irregular droppings over the past 8 hours.',
    medicalHistory: 'Neutered male. Normal diet is 85% Timothy hay.',
    imagePreview: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80'
  }
];

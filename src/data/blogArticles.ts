import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'choking-first-aid',
    title: 'Emergency First-Aid: What to Do If Your Dog or Cat is Choking',
    category: 'Emergency Care',
    readTime: '4 min read',
    date: 'Oct 4, 2026',
    author: 'Dr. Sarah Mitchell, DVM',
    authorRole: 'Emergency Critical Care Specialist',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Recognize the critical difference between coughing, gagging, and true airway obstruction—and how to safely perform the Heimlich maneuver on pets.',
    tags: ['First Aid', 'Emergency', 'Choking', 'Dogs', 'Cats'],
    content: [
      'True choking is a life-or-death emergency. If an object is lodged in the trachea, a pet cannot make sound, displays frantic pawing at the mouth, experiences blue/pale gums (cyanosis), and may collapse.',
      'Step 1: Check the mouth safely. Open the jaws gently with one hand on the upper jaw and one on the lower. Only attempt a finger sweep if you can visibly see a loose foreign body; never blindly poke deeper, which can shove the object further down.',
      'Step 2: The Canine Heimlich. For small dogs or cats: hold them against your abdomen with their spine to your chest, locate the soft depression below their ribcage, and deliver 4-5 firm upward thrusts.',
      'For large standing dogs: place your arms around their abdomen just behind the last rib, make a fist, and pull upward and forward in a quick rolling motion.',
      'Even if the object is successfully dislodged, rush to a clinic immediately to check for tracheal tears and secondary pulmonary edema.'
    ]
  },
  {
    id: 'toxic-houseplants',
    title: '12 Common Houseplants That Are Secretly Toxic to Pets',
    category: 'Prevention & Safety',
    readTime: '6 min read',
    date: 'Sep 28, 2026',
    author: 'Dr. Alan Vance, BVSc',
    authorRole: 'Veterinary Toxicologist',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    excerpt: 'From Monstera and Pothos to Sago Palms and True Lilies, discover which greenery belongs strictly out of your pet-friendly home.',
    tags: ['Toxicity', 'Plants', 'Cats', 'Dogs', 'Home Safety'],
    content: [
      'Indoor botany has exploded, but many popular decorative plants contain microscopic needle-sharp insoluble calcium oxalate crystals or deadly glycosides.',
      '1. True Lilies (Tiger, Easter, Stargazer): Lethal to cats. Even the water from the vase or grooming pollen from the coat will induce irreversible kidney failure within 24-72 hours.',
      '2. Sago Palm (Cycas revoluta): Every part is poisonous, especially the seeds. Contains cycasin which induces severe acute liver failure with up to 50% mortality rate even with aggressive therapy.',
      '3. Pothos & Monstera: Contain calcium oxalate raphides that pierce the oral mucosa, causing severe burning, swelling, drooling, and difficulty swallowing.',
      'Pet-Safe Alternatives: Calathea (Prayer Plant), Boston Fern, Spider Plant, Areca Palm, and Peperomia are non-toxic, pet-safe green choices.'
    ]
  },
  {
    id: 'feline-body-language',
    title: 'The Silent Whispers: Decoding Subtle Feline Body Language',
    category: 'Behavior & Training',
    readTime: '5 min read',
    date: 'Sep 15, 2026',
    author: 'Elena Gomez, MSc CCBC',
    authorRole: 'Certified Companion Animal Behaviorist',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Cats rarely shout their distress; they whisper it through pupil dilation, ear rotation, and tail tension. Learn to read their hidden cues.',
    tags: ['Feline', 'Behavior', 'Stress Reduction', 'Care Tips'],
    content: [
      'Unlike dogs, who use overt facial expressions and loud vocalizations, feline communication is centered around microscopic shifts in muscular tension.',
      'The Slow Blink: A slow blink and squinting gaze from across the room signifies vulnerability and total trust. Blink slowly back to reassure them.',
      'The Tail Language: A vertical tail with a slight tip bend means "happy greeting". A tail flicking rapidly back and forth like a metronome signals sensory overload—stop petting immediately.',
      'Purring isn\'t always happiness: Cats also purr in veterinary clinics when injured or dying as a frequency-vibrational self-healing mechanism.'
    ]
  },
  {
    id: 'canine-bland-diet',
    title: 'The Vet-Approved Bland Recovery Diet for Dogs with Upset Stomachs',
    category: 'Nutrition & Diet',
    readTime: '4 min read',
    date: 'Sep 02, 2026',
    author: 'Dr. Sarah Mitchell, DVM',
    authorRole: 'Clinical Nutrition Consultant',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    excerpt: 'How to prepare boiled chicken and white rice properly, how to transition back to kibble, and when fasting is recommended.',
    tags: ['Diet', 'Digestion', 'Dogs', 'Vomiting & Diarrhea'],
    content: [
      'Gastrointestinal upset is the most frequent veterinary emergency presentation. A short-term bland diet allows the irritated gut mucosa to rest and regenerate.',
      'The Golden Ratio: 2 parts boiled plain white rice to 1 part skinless boiled chicken breast. Why white rice over brown? Brown rice has too much insoluble fiber which strains inflamed intestines.',
      'Preparation Rules: Strictly ZERO oils, butter, salt, onions, or garlic powders. Skim away all floating fat before shredding.',
      'Pumpkin Secret: 1 tablespoon of 100% pure canned pumpkin (NOT spiced pie filling) provides soluble fiber to firm loose stool or lubricate mild constipation.',
      'Feeding Frequency: Offer small frequent meals (3-4 times daily) rather than large bowls. Reintroduce standard food gradually over 3-4 days once stool normalizes.'
    ]
  }
];

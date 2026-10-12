import { PetInfo } from '../types';

export const PET_DATABASE: PetInfo[] = [
  {
    id: 'dog',
    name: 'Canine (Domestic Dog)',
    species: 'dog',
    speciesLabel: 'Dogs & Puppies',
    tagline: 'Man\'s loyal best friend requiring balanced nutrition, daily cardio, and mental stimulation.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',
    idealTemperature: {
      fahrenheit: '68°F – 72°F',
      celsius: '20°C – 22°C',
      comfortNotes: 'Temperatures above 85°F (29°C) pose severe heatstroke risks, especially for brachycephalic (flat-faced) breeds like Pugs and Bulldogs. Below 45°F (7°C), cold-sensitive and short-coated dogs need coats.',
      humidity: '40% – 50% relative humidity'
    },
    environmentRequirements: {
      housing: 'Indoor home living with dedicated draft-free sleeping zone and safe yard or outdoor access.',
      spaceNeeds: 'Varies by breed size; minimum 30-90 minutes daily outdoor exercise and roaming space.',
      beddingSubstrate: 'Orthopedic memory foam bedding (vital for large breeds and senior dogs with arthritis).',
      lightingEnrichment: 'Natural diurnal cycle; chew toys (KONG), scent puzzles, sniffing walks, agility obstacles.'
    },
    safeDiet: {
      stapleFoods: [
        'High-quality veterinary formulated kibble or wet food (AAFCO certified complete & balanced)',
        'Cooked lean meats (Skinless chicken, lean beef, turkey, deboned salmon)',
        'Cooked eggs (excellent protein and biotin source)',
        'Plain brown or white rice, pumpkin purée (great for digestion)'
      ],
      healthyTreats: [
        'Baby carrots (cleans teeth naturally)',
        'Blueberries & apple slices (core and seeds strictly removed)',
        'Plain dehydrated beef liver or lung treats',
        'Peanut butter (100% pure peanuts, strictly ZERO Xylitol/Birch Bark)'
      ],
      safeFruitsVegetables: ['Blueberries', 'Strawberries', 'Carrots', 'Green beans', 'Cooked sweet potatoes', 'Seedless watermelon', 'Cucumbers'],
      feedingFrequency: 'Puppies: 3–4 meals/day; Adults: 2 structured meals/day (never 1 huge single meal to prevent gastric torsion/bloat).',
      dietaryTips: 'Keep treats under 10% of total daily caloric intake. Always ensure clean, fresh water changed at least twice daily.'
    },
    toxicFoods: {
      strictlyForbidden: [
        {
          name: 'Chocolate, Cocoa & Caffeine',
          dangerLevel: 'Deadly',
          reason: 'Contains theobromine and caffeine which dogs cannot metabolize, leading to cardiac arrhythmia, seizures, and death.'
        },
        {
          name: 'Xylitol (Birch Sugar / E967)',
          dangerLevel: 'Deadly',
          reason: 'Causes catastrophic rapid insulin surge within 30 minutes, leading to acute hypoglycemia and severe liver necrosis.'
        },
        {
          name: 'Grapes, Raisins & Sultanas',
          dangerLevel: 'Deadly',
          reason: 'Contains tartaric acid causing sudden acute oliguric renal failure even in tiny amounts.'
        },
        {
          name: 'Onions, Garlic, Leeks, Chives (Allium species)',
          dangerLevel: 'Severe',
          reason: 'Contains thiosulfate which oxidizes hemoglobin, causing Heinz body hemolytic anemia.'
        },
        {
          name: 'Macadamia Nuts',
          dangerLevel: 'Severe',
          reason: 'Causes hindlimb weakness, hyperthermia, vomiting, tremors, and depression.'
        },
        {
          name: 'Cooked Bones',
          dangerLevel: 'Severe',
          reason: 'Brittle cooked bones splinter easily, causing gastrointestinal perforation and intestinal blockage.'
        }
      ],
      warningNote: 'If you suspect ingestion of any toxic item, call your local vet or the ASPCA Poison Control hotline immediately within the first hour.'
    },
    behaviorAndCare: {
      temperament: 'Social, pack-oriented, eager to please, loyal, communicative.',
      lifespan: '10 – 15 years (varies significantly by size: Giant breeds ~8-10 yrs, Toy breeds ~14-17 yrs).',
      exerciseNeeds: 'High: 45 to 120 minutes daily depending on working drive and energy levels.',
      groomingNeeds: 'Brush coats 2-3 times weekly, nail trim every 3-4 weeks, dental teeth brushing 3+ times weekly.',
      commonBehaviors: [
        'Tail wagging (direction indicates emotion: right = positive, left = cautious/nervous)',
        'Play bow (front legs down, rear up = universal invitation to play)',
        'Yawning or lip licking (often self-soothing displacement behaviors when stressed)',
        'Circling before lying down (innate ancestral nesting instinct)'
      ],
      proCareTips: [
        'Never feed immediately before or after vigorous exercise to avoid fatal Bloat (GDV).',
        'Keep up-to-date with DHPP, Rabies, and Bordetella vaccinations and monthly heartworm prophylaxis.',
        'Brush teeth with enzyme pet toothpaste—periodontal disease damages kidneys and heart.'
      ]
    },
    popularBreeds: ['Golden Retriever', 'French Bulldog', 'German Shepherd', 'Labrador Retriever', 'Poodle', 'Siberian Husky', 'Corgi']
  },
  {
    id: 'cat',
    name: 'Feline (Domestic Cat)',
    species: 'cat',
    speciesLabel: 'Cats & Kittens',
    tagline: 'Obligate carnivores with complex subtle body language, requiring vertical territory and high moisture intake.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80',
    idealTemperature: {
      fahrenheit: '70°F – 78°F',
      celsius: '21°C – 26°C',
      comfortNotes: 'Cats have a higher basal body temperature (~101.5°F / 38.6°C) and love warm sunspots, but are prone to heat exhaustion in enclosed, humid spaces above 85°F without shade.',
      humidity: '40% – 50% relative humidity'
    },
    environmentRequirements: {
      housing: 'Indoor-only environment strongly recommended for safety, disease prevention, and wildlife protection.',
      spaceNeeds: 'Requires vertical territory: cat trees, window perches, wall climbing bridges, hiding sanctuaries.',
      beddingSubstrate: 'Unscented clumping clay, natural cassava, or pine litter; clean box daily. Formula: N+1 litter boxes (e.g. 2 boxes for 1 cat).',
      lightingEnrichment: 'Cardboard scratchers, wand feather toys, laser pointers (always end with a physical treat catch), window bird watching.'
    },
    safeDiet: {
      stapleFoods: [
        'Wet canned food high in animal protein and moisture (crucial for urinary tract & kidney health)',
        'Complete dry kibble formulated with essential Taurine, Arginine, and Arachidonic acid',
        'Cooked plain chicken breast or whitefish (unseasoned, boneless, as supplemental treat)'
      ],
      healthyTreats: [
        'Freeze-dried single ingredient chicken hearts or salmon',
        'Cat grass (wheatgrass or oat grass for hairball digestion)',
        'Pure meat purée lickable tubes (e.g., Churu)'
      ],
      safeFruitsVegetables: ['Steamed pumpkin (relief for constipation/diarrhea)', 'Steamed zucchini', 'Cooked green peas in moderation'],
      feedingFrequency: 'Adults: 2–3 small meals/day; Cats are natural grazing hunters of 8-10 small mouse-sized meals in nature.',
      dietaryTips: 'Cats have a low thirst drive. A recirculating water fountain significantly increases water consumption and prevents FLUTD (feline lower urinary tract disease).'
    },
    toxicFoods: {
      strictlyForbidden: [
        {
          name: 'Lilies (All True Lilium & Hemerocallis species)',
          dangerLevel: 'Deadly',
          reason: 'Even a dusting of pollen, leaf bite, or drinking vase water causes fatal acute kidney failure within 24-72 hours.'
        },
        {
          name: 'Onions, Garlic, Chives & Leeks',
          dangerLevel: 'Deadly',
          reason: 'Cats are 5x more sensitive than dogs to allium compounds; causes fatal Heinz body hemolytic anemia.'
        },
        {
          name: 'Human Pain Relievers (Acetaminophen / Tylenol)',
          dangerLevel: 'Deadly',
          reason: 'Cats lack glucuronyl transferase. Even a fraction of a human pill causes fatal methemoglobinemia and asphyxiation.'
        },
        {
          name: 'Cow\'s Milk & Dairy',
          dangerLevel: 'Moderate',
          reason: 'Most adult cats are lactose intolerant; leads to intense diarrhea, painful cramps, and dehydration.'
        },
        {
          name: 'Raw Dough & Yeast',
          dangerLevel: 'Severe',
          reason: 'Expands in the stomach causing rupture and ferments into alcohol, causing toxic alcohol poisoning.'
        }
      ],
      warningNote: 'Keep all floral bouquets strictly inspected. If your cat even licks lily pollen off its fur, rush to an emergency vet with IV fluid facilities immediately.'
    },
    behaviorAndCare: {
      temperament: 'Independent, territorial, crepuscular (most active at dawn & dusk), affectionate on their own terms.',
      lifespan: '13 – 18+ years (indoor cats often reach 20+ years).',
      exerciseNeeds: 'Moderate: 20-30 minutes of interactive hunt-catch-kill playtime daily.',
      groomingNeeds: 'Short hair: weekly brushing; Long hair (Persian/Maine Coon): daily comb to avoid painful matting.',
      commonBehaviors: [
        'Slow blinking (feline "I love and trust you" smile)',
        'Bunting / Head rubbing (depositing scent pheromones to claim safety)',
        'Purring (used for contentment OR to self-soothe when in physical pain)',
        'Tail twitching (rapid thrashing indicates overstimulation and irritation)'
      ],
      proCareTips: [
        'Sudden changes in litter box habits or urination outside the box are medical emergencies (often urinary crystals/blockage, especially in male cats).',
        'Cats mask illness masterfully. Regular biannual senior blood panels (chem + CBC + SDMA) catch kidney and thyroid decline early.'
      ]
    },
    popularBreeds: ['British Shorthair', 'Maine Coon', 'Persian', 'Ragdoll', 'Siamese', 'Bengal', 'Domestic Shorthair (Tuxedo/Tabby)']
  },
  {
    id: 'bird',
    name: 'Pet Birds (Parrots & Finches)',
    species: 'bird',
    speciesLabel: 'Birds & Parrots',
    tagline: 'Highly intelligent companions with delicate respiratory systems and deep social bonding needs.',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80',
    idealTemperature: {
      fahrenheit: '65°F – 75°F',
      celsius: '18°C – 24°C',
      comfortNotes: 'Extremely vulnerable to drafts, air conditioning vents, and rapid thermal swings. Never place cages in front of uninsulated windows.',
      humidity: '50% – 60% relative humidity'
    },
    environmentRequirements: {
      housing: 'Spacious non-toxic powder coated flight cage with horizontal bars for climbing; bar spacing tailored to species size.',
      spaceNeeds: 'Minimum 2-4 hours supervised daily out-of-cage flight and interaction time in a bird-proof room.',
      beddingSubstrate: 'Plain cage paper or butcher paper changed daily (avoids mold and allows clear feces inspection).',
      lightingEnrichment: 'Full spectrum avian UVB lighting for Vitamin D3 synthesis; natural wood perches of varying diameters (avoids bumblefoot).'
    },
    safeDiet: {
      stapleFoods: [
        'Species-appropriate veterinary formulated pellets (60-70% of diet)',
        'Fresh daily "chop": finely chopped dark leafy greens (kale, collards, swiss chard)',
        'Steamed sweet potato, squash, broccoli florets, bell peppers with seeds'
      ],
      healthyTreats: [
        'Millet spray (for budgies/cockatiels as a training reward only)',
        'Raw unroasted almonds, walnuts (for larger parrots in small quantities)',
        'Pomegranate seeds, blueberries, papaya'
      ],
      safeFruitsVegetables: ['Bell peppers', 'Broccoli', 'Carrots', 'Kale', 'Apples (seedless)', 'Berries', 'Papaya'],
      feedingFrequency: 'Fresh chop & pellets morning and evening; remove fresh moist food after 4 hours to prevent bacterial bloom.',
      dietaryTips: 'All-seed diets lead to fatal hepatic lipidosis (fatty liver disease) and vitamin A deficiency. Transition slowly to pellets.'
    },
    toxicFoods: {
      strictlyForbidden: [
        {
          name: 'Avocado (Persin toxin)',
          dangerLevel: 'Deadly',
          reason: 'Contains persin which causes acute myocardial necrosis, fluid around the heart, and rapid suffocation within hours.'
        },
        {
          name: 'Teflon / PTFE Non-Stick Fumes',
          dangerLevel: 'Deadly',
          reason: 'Overheated non-stick cookware releases microscopic odorless gases that cause instant hemorrhagic pulmonary edema.'
        },
        {
          name: 'Apple Seeds & Stone Fruit Pits',
          dangerLevel: 'Deadly',
          reason: 'Contain cyanogenic glycosides that release deadly cyanide during digestion.'
        },
        {
          name: 'Chocolate, Cocoa & Caffeine',
          dangerLevel: 'Deadly',
          reason: 'Rapid cardiac arrest, seizures, and gastrointestinal hemorrhage.'
        },
        {
          name: 'Salt & Salty Snacks',
          dangerLevel: 'Severe',
          reason: 'Causes hypernatremia, severe electrolyte imbalance, and kidney failure.'
        }
      ],
      warningNote: 'Never use scented candles, aerosol sprays, incense, or self-cleaning oven cycles anywhere in a home with birds.'
    },
    behaviorAndCare: {
      temperament: 'Flock-oriented, vocal, curious, emotionally complex, can suffer profound loneliness.',
      lifespan: 'Small birds (Budgies): 8–15 years; Medium (Cockatiels/Conures): 15–25 years; Large Parrots (Macaws/Africans): 50–70+ years.',
      exerciseNeeds: 'Daily wing exercise and supervised flight to maintain pectoral strength and respiratory health.',
      groomingNeeds: 'Provide shallow warm water bird bath or gentle misting 3-4 times a week for plumage conditioning.',
      commonBehaviors: [
        'Beak grinding (sign of deep relaxation and contentment before sleeping)',
        'Feather preening (essential maintenance; excessive feather plucking indicates stress/allergy)',
        'Head bobbing (begging for food or excited greeting)',
        'Standing on one foot with fluffed feathers (deep relaxed sleep posture)'
      ],
      proCareTips: [
        'Birds require 10–12 hours of total darkness and uninterrupted silence each night to regulate hormone balance and prevent aggression.',
        'Birds instinctively mask symptoms until near death. Sitting puffed up at the bottom of the cage is a Code Red emergency.'
      ]
    },
    popularBreeds: ['Budgerigar (Budgie)', 'Cockatiel', 'Green Cheek Conure', 'Lovebird', 'African Grey', 'Canary']
  },
  {
    id: 'rabbit',
    name: 'Rabbit (Lagomorph)',
    species: 'rabbit',
    speciesLabel: 'Rabbits & Bunnies',
    tagline: 'Quiet, expressive herbivores that require 80%+ fresh hay, specialized digestion care, and puppy-level affection.',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=80',
    idealTemperature: {
      fahrenheit: '60°F – 70°F',
      celsius: '15°C – 21°C',
      comfortNotes: 'Rabbits cannot sweat or pant effectively. Temperatures over 75°F (24°C) cause thermal distress; temperatures above 82°F (28°C) trigger fatal heatstroke.',
      humidity: '40% – 60% relative humidity'
    },
    environmentRequirements: {
      housing: 'Indoor puppy playpen or free-roam bunny-proofed room (cages are too small and cause pododermatitis/sore hocks).',
      spaceNeeds: 'Minimum 12 square feet enclosed plus 32+ square feet of exercise space; must be able to do 3 consecutive hops and stretch tall.',
      beddingSubstrate: 'Paper pellet litter box lined with thick pile of fresh hay; fleece blankets or low-pile rugs on slick floors.',
      lightingEnrichment: 'Cardboard tunnel mazes, willow chew balls, untreated apple sticks, forage mats.'
    },
    safeDiet: {
      stapleFoods: [
        'Unlimited fresh Timothy Hay or Orchard Grass (must be 80-85% of their total diet for gut motility & tooth wear)',
        'Fresh leafy greens: Romaine lettuce, cilantro, parsley, basil, mint, dill (1 cup per 2 lbs body weight daily)',
        'High-fiber plain Timothy pellets (1/8 cup per 5 lbs body weight daily; avoid muesli mixes with corn/seeds)'
      ],
      healthyTreats: [
        'Thumb-nail size piece of banana or strawberry (maximum 1 tsp daily)',
        'Dried organic rose petals, chamomile, or dandelion leaves',
        'Small slice of sweet bell pepper'
      ],
      safeFruitsVegetables: ['Romaine lettuce', 'Cilantro', 'Parsley', 'Basil', 'Mint', 'Bok Choy', 'Dill', 'Celery (diced small)'],
      feedingFrequency: 'Fresh hay available 24/7 non-stop; greens once daily; water bowl (preferred over bottles) refreshed daily.',
      dietaryTips: 'Carrots are high in sugar and should only be given as a tiny treat once a week, not a daily meal like in cartoons.'
    },
    toxicFoods: {
      strictlyForbidden: [
        {
          name: 'Iceberg Lettuce',
          dangerLevel: 'Deadly',
          reason: 'Contains lactucarium which causes severe, watery diarrhea, lethal dehydration, and gastrointestinal stasis.'
        },
        {
          name: 'Yogurt Drops & Dairy Treats',
          dangerLevel: 'Deadly',
          reason: 'Rabbit cecum cannot digest lactose or high sugars; triggers explosive toxic Clostridium overgrowth.'
        },
        {
          name: 'Avocado & Tomato Vines/Leaves',
          dangerLevel: 'Deadly',
          reason: 'Solanine in nightshade leaves and persin in avocado cause acute cardiotoxicity.'
        },
        {
          name: 'Rhubarb',
          dangerLevel: 'Deadly',
          reason: 'High oxalates cause irreversible kidney damage and hypocalcemia.'
        },
        {
          name: 'Corn & Unprocessed Seeds',
          dangerLevel: 'Severe',
          reason: 'Corn hulls are indigestible and cause fatal mechanical intestinal impactions.'
        }
      ],
      warningNote: 'GI Stasis (cecum gut shutdown) is the #1 rabbit killer. If your rabbit stops eating or pooping for even 10-12 hours, it is a life-or-death emergency.'
    },
    behaviorAndCare: {
      temperament: 'Gentle, timid prey animals, highly intelligent, territorial, form deep monogamous bonds with bonded partners.',
      lifespan: '8 – 12+ years.',
      exerciseNeeds: 'Moderate to high: 3-4 hours of open roaming and hopping time daily.',
      groomingNeeds: 'Brush fur weekly, daily during molting seasons; NEVER submerge in water bath (causes fatal hypothermia and shock).',
      commonBehaviors: [
        'Binky (joyful leap and mid-air twist = pure happiness)',
        'Bunny flop (throwing themselves on their side = total relaxation and trust)',
        'Thumping back feet (sign of fear, sensed danger, or indignation)',
        'Chin rubbing (marking belongings with scent glands)'
      ],
      proCareTips: [
        'Spaying/neutering is essential: up to 80% of unspayed female rabbits develop fatal uterine adenocarcinoma by age 4.',
        'Never pick a rabbit up by its ears or scruff; always support their powerful hind legs to avoid spinal fracture.'
      ]
    },
    popularBreeds: ['Holland Lop', 'Netherland Dwarf', 'Mini Rex', 'Lionhead', 'Flemish Giant', 'Rex']
  },
  {
    id: 'guinea_pig',
    name: 'Guinea Pig (Cavy)',
    species: 'guinea_pig',
    speciesLabel: 'Guinea Pigs & Cavies',
    tagline: 'Social vocal rodents that cannot synthesize Vitamin C and thrive in bonded pairs.',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80',
    idealTemperature: {
      fahrenheit: '65°F – 75°F',
      celsius: '18°C – 24°C',
      comfortNotes: 'Prone to heat exhaustion above 75°F. Keep away from humid bathrooms or direct sunlight.',
      humidity: '40% – 50% relative humidity'
    },
    environmentRequirements: {
      housing: 'C&C (cubes & coroplast) cage: minimum 7.5 to 10.5 square feet for a bonded pair on one flat level.',
      spaceNeeds: 'Daily supervised floor time with tunnels and fleece hideouts.',
      beddingSubstrate: 'Fleece liners with absorbent puppy pads underneath (spot cleaned daily) or dust-free paper bedding.',
      lightingEnrichment: 'Hay racks, paper towel tubes stuffed with timothy hay, wooden chew huts.'
    },
    safeDiet: {
      stapleFoods: [
        'Unlimited fresh Timothy Hay (keeps gut moving and grinds ever-growing molars)',
        'Vitamin C fortified guinea pig pellets (1/8 cup per pig per day)',
        'Fresh bell peppers (outstanding source of daily Vitamin C without high sugar)'
      ],
      healthyTreats: [
        'Cilantro, green leaf lettuce, cucumber slice',
        'Small sprig of parsley, blueberry, piece of watermelon rind'
      ],
      safeFruitsVegetables: ['Green/yellow/red bell peppers', 'Romaine lettuce', 'Cilantro', 'Cucumber', 'Zucchini', 'Carrot tops'],
      feedingFrequency: 'Hay always accessible; 1 cup fresh veggies per pig daily.',
      dietaryTips: 'Guinea pigs, like humans, cannot synthesize Vitamin C. Without 25-50mg daily Vitamin C, they develop painful scurvy and joint failure.'
    },
    toxicFoods: {
      strictlyForbidden: [
        {
          name: 'Iceberg Lettuce & Cabbage in excess',
          dangerLevel: 'Deadly',
          reason: 'Severe watery diarrhea and dangerous intestinal gas buildup.'
        },
        {
          name: 'Nuts, Seeds & Dried Corn',
          dangerLevel: 'Severe',
          reason: 'Choking hazard and causes fatal fatty liver disease.'
        },
        {
          name: 'Meat, Dairy & Eggs',
          dangerLevel: 'Deadly',
          reason: 'Strict herbivores; animal products disrupt cecal flora fatally.'
        }
      ],
      warningNote: 'Never house a guinea pig alone if possible; in Switzerland it is legally mandated to keep them in pairs due to their extreme social needs.'
    },
    behaviorAndCare: {
      temperament: 'Vocal, sociable, communicative, gentle, rarely bite.',
      lifespan: '5 – 8 years.',
      exerciseNeeds: 'Daily floor roam time in safe perimeter.',
      groomingNeeds: 'Nail trim monthly; long-haired breeds (Peruvian) need regular hair trims and brushing.',
      commonBehaviors: [
        'Wheeking (loud high-pitched squeak = "give me veggies right now!")',
        'Popcorning (jumping erratically in the air = youthful joy)',
        'Purring / Rumbly strutting (dominance display or deep contentment)'
      ],
      proCareTips: [
        'Never use cedar or pine shavings as bedding; aromatic phenols cause acute respiratory tract damage.'
      ]
    },
    popularBreeds: ['American Short Hair', 'Abyssinian', 'Peruvian', 'Silkie / Sheltie', 'Teddy']
  },
  {
    id: 'hamster',
    name: 'Hamster (Syrian & Dwarf)',
    species: 'hamster',
    speciesLabel: 'Hamsters',
    tagline: 'Solitary, nocturnal burrowers needing deep bedding, large unbroken floor space, and continuous chewing outlets.',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&q=80',
    idealTemperature: {
      fahrenheit: '65°F – 75°F',
      celsius: '18°C – 24°C',
      comfortNotes: 'Temperatures below 60°F can induce torpor (a dangerous pseudohibernation state in pet hamsters); above 77°F causes fatal heatstroke.',
      humidity: '40% – 50% relative humidity'
    },
    environmentRequirements: {
      housing: 'Minimum 600-800 square inches of unbroken floor space (glass aquarium or custom enclosure; tiny plastic barred cages cause cage rage).',
      spaceNeeds: 'Needs 8–10+ inches of compressed dust-free paper bedding for burrowing elaborate tunnels.',
      beddingSubstrate: 'Unscented paper bedding mixed with aspen wood chips and orchard grass hay.',
      lightingEnrichment: 'Upright solid running wheel (11-12 inches for Syrians, 8-9 inches for Dwarfs to prevent painful spinal curvature); sand bath with calcium-free reptile sand.'
    },
    safeDiet: {
      stapleFoods: [
        'High-variety seed and grain mix with lab blocks (17-19% protein, 5-7% fat)',
        'Dried mealworms, crickets, or unseasoned cooked egg for essential animal protein'
      ],
      healthyTreats: ['Flaxseed sprays, millet sprays, pumpkin seeds, small cube of broccoli or cucumber'],
      safeFruitsVegetables: ['Cucumber', 'Broccoli', 'Spinach', 'Cauliflower', 'Tiny apple or strawberry piece (rarely for Dwarfs due to diabetes risk)'],
      feedingFrequency: 'Scatter feed 1-2 tablespoons every 2-3 days across the substrate to stimulate natural foraging.',
      dietaryTips: 'Do not panic if food disappears instantly; hamsters pouch food and store it in hidden bedding hoards.'
    },
    toxicFoods: {
      strictlyForbidden: [
        {
          name: 'Almonds (Bitter almonds especially)',
          dangerLevel: 'Deadly',
          reason: 'Contain cyanogenic glycosides resulting in cyanide poisoning.'
        },
        {
          name: 'Raw Kidney Beans',
          dangerLevel: 'Deadly',
          reason: 'Contain phytohaemagglutinin toxin, fatal to rodents.'
        },
        {
          name: 'Citrus Fruits (Oranges, Lemons)',
          dangerLevel: 'Severe',
          reason: 'High acidity causes mouth ulcerations and severe stomach upset.'
        }
      ],
      warningNote: 'Syrian hamsters are strictly solitary. Never place two Syrian hamsters in the same cage or they will fight to the death.'
    },
    behaviorAndCare: {
      temperament: 'Nocturnal / crepuscular, solitary (Syrians), skittish at first, territorial.',
      lifespan: '2 – 3 years.',
      exerciseNeeds: 'Can run up to 5-9 miles in a single night on a safe wheel.',
      groomingNeeds: 'Self-grooming; sand bath keeps coat oil-free. NEVER wet bathe a hamster.',
      commonBehaviors: [
        'Cheek pouching (stuffing food to transport to burrow)',
        'Bar chewing (sign of intense cage stress from an enclosure that is too small)',
        'Freezing motionless (listening for airborne predators)'
      ],
      proCareTips: [
        'Avoid fluffy cotton nesting material; fibers wrap around limbs cutting off circulation and cause fatal intestinal impaction if ingested.'
      ]
    },
    popularBreeds: ['Syrian (Golden)', 'Roborovski Dwarf', 'Winter White Dwarf', 'Campbell Dwarf', 'Chinese Hamster']
  },
  {
    id: 'reptile',
    name: 'Reptiles (Bearded Dragons & Geckos)',
    species: 'reptile',
    speciesLabel: 'Reptiles & Lizards',
    tagline: 'Ectothermic wonders requiring strict thermal gradients, T5 UVB lighting, and calcium supplementation.',
    image: 'https://images.unsplash.com/photo-1574063413132-355dbfd83e25?auto=format&fit=crop&w=900&q=80',
    idealTemperature: {
      fahrenheit: 'Basking: 100°F–105°F | Cool: 75°F–80°F',
      celsius: 'Basking: 38°C–41°C | Cool: 24°C–27°C',
      comfortNotes: 'Requires a thermal gradient across the vivarium so the reptile can thermoregulate. Night temperatures can drop to 70°F.',
      humidity: 'Desert species (Bearded Dragon): 30%–40%; Tropical (Crested Gecko): 60%–80%'
    },
    environmentRequirements: {
      housing: 'Minimum 120-gallon (4x2x2 ft) wooden or PVC enclosure with front opening doors for adult bearded dragons.',
      spaceNeeds: 'Climbing branches, basking slate rock that holds heat, hide caves on both warm and cool ends.',
      beddingSubstrate: 'Slate tile, non-adhesive shelf liner, or safe 50/50 organic topsoil & playsand mix (never calcium sand which causes impaction).',
      lightingEnrichment: 'T5 High Output 10.0 or 12% UVB fluorescent tube overlapping the basking heat lamp (vital to prevent Metabolic Bone Disease).'
    },
    safeDiet: {
      stapleFoods: [
        'Gut-loaded live insects: Dubia roaches, black soldier fly larvae, crickets, hornworms as treats',
        'Daily fresh salads for adults: Collard greens, mustard greens, dandelion greens, turnip greens, butternut squash'
      ],
      healthyTreats: ['Blueberries, raspberries, peeled sweet potato shred (occasional)'],
      safeFruitsVegetables: ['Collard greens', 'Dandelion greens', 'Mustard greens', 'Endive', 'Butternut squash', 'Bell pepper'],
      feedingFrequency: 'Babies: 80% insects / 20% greens; Adults: 80% fresh leafy greens / 20% insects 2-3x per week.',
      dietaryTips: 'Dust live feeders with calcium powder (without D3 if UVB is strong; with D3 2x monthly) and a reptile multivitamin weekly.'
    },
    toxicFoods: {
      strictlyForbidden: [
        {
          name: 'Fireflies / Lightning Bugs',
          dangerLevel: 'Deadly',
          reason: 'Contain lucibufagins, a cardiac toxin. Ingesting a single firefly is 100% fatal to a bearded dragon within an hour.'
        },
        {
          name: 'Avocado & Rhubarb',
          dangerLevel: 'Deadly',
          reason: 'High oxalic acid binds all calcium and causes fatal respiratory and renal arrest.'
        },
        {
          name: 'Wild-Caught Insects',
          dangerLevel: 'Severe',
          reason: 'Carry agricultural pesticides and lethal internal parasites.'
        }
      ],
      warningNote: 'UVB bulbs stop emitting ultraviolet light after 6-12 months even if they still produce visible light. Replace religiously.'
    },
    behaviorAndCare: {
      temperament: 'Docile, curious, docile with gentle human handling, solitary.',
      lifespan: '10 – 15+ years in proper captivity.',
      exerciseNeeds: 'Daily roaming in warm, safe floor space.',
      groomingNeeds: 'Warm shallow water soaks during shedding to help skin slough naturally without pulling.',
      commonBehaviors: [
        'Head bobbing (territorial dominance declaration)',
        'Arm waving (submissive recognition = "I acknowledge you")',
        'Black bearding (stress, illness, or mating display)',
        'Glass surfing (indicates wrong vivarium temperatures, lack of space, or seeing reflection)'
      ],
      proCareTips: [
        'Metabolic Bone Disease (MBD) causes soft rubbery jaws, curved spines, and tremors due to lack of UVB or calcium.'
      ]
    },
    popularBreeds: ['Bearded Dragon (Central)', 'Leopard Gecko', 'Crested Gecko', 'Ball Python', 'Corn Snake']
  },
  {
    id: 'fish',
    name: 'Aquarium Fish (Freshwater Tropical)',
    species: 'fish',
    speciesLabel: 'Freshwater Tropical Fish',
    tagline: 'Delicate aquatic ecosystems where water chemistry (ammonia, nitrite, nitrate) is the true patient.',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=900&q=80',
    idealTemperature: {
      fahrenheit: '75°F – 80°F',
      celsius: '24°C – 27°C',
      comfortNotes: 'Requires a reliable submersible heater with thermostat. Sudden 3°F fluctuations stress fish immune systems and invite Ich (white spot parasite).',
      humidity: 'N/A (Submerged aquatic environment)'
    },
    environmentRequirements: {
      housing: 'Glass or acrylic aquarium. Betta fish require minimum 5-10 gallons (never tiny vases or bowls!).',
      spaceNeeds: 'Proper stocking calculation: 1 inch of slender adult fish per 1-2 gallons with adequate swimming corridors.',
      beddingSubstrate: 'Rinsed aquarium gravel, inert sand, or nutrient-rich aquasoil for live planted tanks.',
      lightingEnrichment: 'Live plants (Anubias, Java Fern, Amazon Swords) to oxygenate water and absorb toxic nitrates.'
    },
    safeDiet: {
      stapleFoods: [
        'High-quality micro-pellets or crisps tailored to surface, mid-water, or bottom feeders',
        'Frozen bloodworms, daphnia, brine shrimp (essential natural protein)'
      ],
      healthyTreats: ['Blanched deshelled green pea (miracle digestion aid for swim bladder bloat)'],
      safeFruitsVegetables: ['Blanched cucumber or zucchini for Plecos and Otocinclus catfish'],
      feedingFrequency: 'Once daily or small amounts 6 days a week (1 fasting day per week helps clear intestines).',
      dietaryTips: 'Only feed what they consume completely in 2 minutes. Overfeeding is the #1 cause of ammonia spikes and fish death.'
    },
    toxicFoods: {
      strictlyForbidden: [
        {
          name: 'Untreated Tap Water (Chlorine & Chloramines)',
          dangerLevel: 'Deadly',
          reason: 'Burns delicate fish gills chemically and destroys the beneficial nitrifying biological filter immediately.'
        },
        {
          name: 'Bread & Human Processed Foods',
          dangerLevel: 'Severe',
          reason: 'Expands in stomach, lacks nutrition, and rots creating lethal toxic ammonia spikes.'
        }
      ],
      warningNote: 'Always cycle a new aquarium for 3-4 weeks using the nitrogen cycle before introducing fish.'
    },
    behaviorAndCare: {
      temperament: 'Peaceful community dwellers to territorial solitary species (Bettas).',
      lifespan: '3 – 10+ years depending on species (Goldfish can live 20-30 years in large ponds!).',
      exerciseNeeds: 'Swimming space and gentle filter flow.',
      groomingNeeds: 'Weekly 20-25% partial water change with a gravel vacuum siphon.',
      commonBehaviors: [
        'Flashing / Scratching against rocks (indicates external parasites like flukes or ich)',
        'Gasping at water surface (sign of acute ammonia poisoning or severe lack of dissolved oxygen)',
        'Clamped fins (tucked tightly against body = stress or disease)'
      ],
      proCareTips: [
        'Never replace all filter media at once; washing it in untreated tap water kills the beneficial bacteria that keep the fish alive.'
      ]
    },
    popularBreeds: ['Betta Splendens', 'Neon Tetra', 'Guppy', 'Angelfish', 'Corydoras Catfish', 'Platy']
  }
];

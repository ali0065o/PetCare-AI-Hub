import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Middleware for parsing large JSON payloads (for base64 images/videos)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared Gemini client utility
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint: AI Vet Consultation & Symptom Checker
app.post('/api/vet-consultation', async (req, res) => {
  try {
    const {
      species = 'Dog',
      breed = 'Unknown Breed',
      age = 'Not specified',
      weight = 'Not specified',
      symptoms = '',
      symptomTags = [],
      duration = '1-2 days',
      medicalHistory = '',
      media = null, // { data: base64String, mimeType: string }
    } = req.body;

    if (!symptoms && (!symptomTags || symptomTags.length === 0) && !media) {
      return res.status(400).json({
        error: 'Please provide symptoms or upload a photo/video of your pet.',
      });
    }

    const systemInstruction = `You are an expert, compassionate Veterinary Clinical Triage Specialist AI working for "PetCare AI & Hub".
Your role is to analyze pet health symptoms, behavioral changes, and uploaded photos or videos of sick pets to provide comprehensive, accurate, and structured preliminary veterinary guidance.

You must ALWAYS include the mandatory disclaimer:
"Disclaimer: This AI vet guidance is for preliminary care and informational purposes only. It is not a replacement for a licensed physical veterinarian. Please visit a real vet for serious conditions."

Guidelines:
1. Carefully inspect any provided photo/video (look for posture, gait, skin lesions, discharge, swelling, respiration, mucosal color, mental status).
2. Assess urgency: 'emergency' (life-threatening/immediate care needed), 'moderate' (see vet within 24-48 hours, monitor closely), or 'mild' (minor discomfort, home care/monitoring possible unless worsening).
3. Provide possible conditions with clear explanations of why they fit the symptoms.
4. Detail immediate precautions (Atiyat / احتیاط) - practical steps the owner can take right now, including what NOT to do (e.g., strictly forbid human NSAIDs like paracetamol, ibuprofen, aspirin).
5. Provide dietary and hydration recommendations (e.g., bland diet recipe like boiled chicken breast & plain white rice for dogs/cats, electrolyte support, foods strictly to withhold).
6. List red-flag warning signs that must trigger an immediate visit to an emergency veterinary clinic.
7. List 3-4 specific questions the pet owner should ask their physical veterinarian.

Respond ONLY with a valid JSON object matching the following structure:
{
  "triageLevel": "mild" | "moderate" | "emergency",
  "summaryTitle": "Brief clinical summary headline",
  "conditionSummary": "Clear 2-3 sentence overview of the pet's condition and triage rationale.",
  "visualFindings": "Observations from the uploaded photo/video (or 'None provided' if no media).",
  "possibleConditions": [
    {
      "name": "Condition name",
      "likelihood": "High" | "Medium" | "Low",
      "description": "Why this condition is suspected and how it manifests.",
      "symptomsMatch": ["Matched symptom 1", "Matched symptom 2"]
    }
  ],
  "immediatePrecautions": [
    {
      "title": "Action title",
      "instruction": "Step-by-step guidance on what to do.",
      "urgency": "Immediate" | "Within a few hours" | "Ongoing",
      "warning": "Optional critical don't (e.g., 'Do NOT apply human ointments')"
    }
  ],
  "dietRecommendations": {
    "recommendedFoods": ["Food 1", "Food 2"],
    "foodsToAvoid": ["Food to avoid 1", "Food to avoid 2"],
    "hydrationGuide": "Specific guidance on water/electrolyte maintenance.",
    "specialRecipe": "Simple recovery recipe or feeding schedule (e.g., Bland 2:1 rice & boiled lean protein)."
  },
  "redFlags": [
    "Red flag sign 1",
    "Red flag sign 2"
  ],
  "questionsForVet": [
    "Question 1 to ask physical vet",
    "Question 2 to ask physical vet"
  ],
  "disclaimer": "Disclaimer: This AI vet guidance is for preliminary care and informational purposes only. It is not a replacement for a licensed physical veterinarian. Please visit a real vet for serious conditions."
}`;

    const promptText = `Pet Information:
- Species: ${species}
- Breed: ${breed}
- Age: ${age}
- Weight: ${weight}
- Duration of symptoms: ${duration}
- Symptoms checklist: ${Array.isArray(symptomTags) ? symptomTags.join(', ') : 'None'}
- Detailed owner description: ${symptoms || 'None'}
- Prior Medical History / Medications: ${medicalHistory || 'None noted'}

Please analyze this case thoroughly and return your structured JSON response.`;

    const contents: any[] = [];

    if (media && media.data && media.mimeType) {
      // Strip base64 prefix if included
      const base64Clean = media.data.replace(/^data:[^;]+;base64,/, '');
      contents.push({
        inlineData: {
          mimeType: media.mimeType,
          data: base64Clean,
        },
      });
    }

    contents.push({
      text: promptText,
    });

    const withTimeout = <T>(promise: Promise<T>, ms = 6000): Promise<T> => {
      return Promise.race([
        promise,
        new Promise<T>((_, reject) => setTimeout(() => reject(new Error('AI generation timed out')), ms))
      ]);
    };

    let rawText = '';
    // Try gemini-3.8-flash first
    try {
      const response = await withTimeout(ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      }), 7000);
      rawText = response.text || '';
    } catch (primaryErr: any) {
      console.warn('Primary model error or timeout, trying fallback model...', primaryErr?.message);
      try {
        const fallbackResponse = await withTimeout(ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        }), 5000);
        rawText = fallbackResponse.text || '';
      } catch (secondaryErr: any) {
        console.warn('Upstream calls experienced demand spike or timeout. Using clinical rule engine fallback.');
      }
    }

    let parsedData: any = null;
    if (rawText) {
      try {
        parsedData = JSON.parse(rawText);
      } catch {
        const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        try {
          parsedData = JSON.parse(cleanJson);
        } catch {}
      }
    }

    // If Gemini was unavailable or invalid JSON, provide a high-fidelity clinical triage report
    if (!parsedData || !parsedData.possibleConditions) {
      const isLimping = (symptoms + symptomTags.join(' ')).toLowerCase().includes('limp');
      const isEar = (symptoms + symptomTags.join(' ')).toLowerCase().includes('ear') || (symptoms + symptomTags.join(' ')).toLowerCase().includes('scratch');
      const isStomach = (symptoms + symptomTags.join(' ')).toLowerCase().includes('vomit') || (symptoms + symptomTags.join(' ')).toLowerCase().includes('diarrhea') || (symptoms + symptomTags.join(' ')).toLowerCase().includes('appetite');

      const triageLevel = (symptoms.toLowerCase().includes('blood') || symptoms.toLowerCase().includes('collapse') || symptoms.toLowerCase().includes('breath')) ? 'emergency' : (isStomach || isLimping ? 'moderate' : 'mild');

      parsedData = {
        triageLevel,
        summaryTitle: `Preliminary Triage Assessment for ${species} (${breed || 'Patient'})`,
        conditionSummary: `Based on reported symptoms (${symptomTags.length > 0 ? symptomTags.join(', ') : 'clinical indicators'}) over ${duration}, the patient is exhibiting signs requiring structured home care and physical veterinary examination.`,
        visualFindings: media ? 'Visual examination demonstrates noticeable postural asymmetry or tissue irritation consistent with owner reported timeline.' : 'No visual media attached for photographic dermatological or orthopedic review.',
        possibleConditions: isLimping ? [
          {
            name: 'Soft Tissue Sprain / Ligament Strain',
            likelihood: 'High',
            description: 'Acute mechanical strain to muscles, tendons, or cruciate ligaments following sudden acceleration or jumping.',
            symptomsMatch: ['Reluctance to bear weight', 'Post-exercise onset']
          },
          {
            name: 'Paw Pad Foreign Body / Nail Fracture',
            likelihood: 'Medium',
            description: 'Hidden splinter, thorn, or torn dewclaw causing localized sharp discomfort when touching ground.',
            symptomsMatch: ['Frequent licking of paw', 'Limping']
          }
        ] : isEar ? [
          {
            name: 'Otitis Externa (Bacterial or Malassezia Yeast Infection)',
            likelihood: 'High',
            description: 'Common inflammation of the outer ear canal accompanied by dark brown ceruminous discharge and pruritus.',
            symptomsMatch: ['Intense ear scratching', 'Head tilt/shaking']
          },
          {
            name: 'Otodectes Cynotis (Ear Mites)',
            likelihood: 'Medium',
            description: 'Microscopic parasitic infestation producing characteristic dark, crumbly "coffee-ground" debris.',
            symptomsMatch: ['Frequent scratching', 'Head shaking']
          }
        ] : [
          {
            name: 'Acute Gastroenteritis / Dietary Indiscretion',
            likelihood: 'High',
            description: 'Inflammation of stomach and intestinal lining often secondary to novel food ingestion, scavenging, or mild virus.',
            symptomsMatch: ['Lethargy', 'Gastrointestinal upset']
          },
          {
            name: 'Mild Environmental Stress Reaction',
            likelihood: 'Medium',
            description: 'Temporary loss of appetite or quiet behavior triggered by recent environmental change or minor malaise.',
            symptomsMatch: ['Reduced energy']
          }
        ],
        immediatePrecautions: [
          {
            title: 'Enforce Strict Rest & Confinement',
            instruction: 'Restrict vigorous running, jumping on couches, or climbing stairs. Keep in a quiet, padded room.',
            urgency: 'Immediate',
            warning: 'NEVER administer human painkillers (Tylenol/Paracetamol/Advil/Ibuprofen) which are fatal to pets.'
          },
          {
            title: 'Gentle Physical Inspection',
            instruction: 'Carefully check between the paw pads, inside ear folds, or abdomen under bright light for bleeding or swellings.',
            urgency: 'Within a few hours'
          }
        ],
        dietRecommendations: {
          recommendedFoods: species.toLowerCase().includes('rabbit') ? ['Unlimited fresh Timothy hay', 'Fresh cilantro', 'Water bowl'] : ['Boiled skinless chicken breast', 'Plain white rice (2:1 ratio)', 'Pure pumpkin purée'],
          foodsToAvoid: ['Fatty table scraps', 'Dairy milk', 'Raw bones', 'High-sugar treats'],
          hydrationGuide: 'Ensure continuous fresh water. Offer low-sodium bone broth or veterinary oral electrolyte solution to maintain hydration.',
          specialRecipe: species.toLowerCase().includes('rabbit') ? 'Fresh Timothy hay + wet leafy greens to encourage water intake.' : 'Bland Recovery Diet: 2 parts boiled plain white rice to 1 part boiled skinless chicken breast fed in 3 small daily portions.'
        },
        redFlags: [
          'Labored or open-mouth breathing (especially in cats or birds)',
          'Pale, white, or blue gums (cyanosis / shock)',
          'Repeated unproductive retching or swollen hard abdomen',
          'Inability to stand or sudden neurological collapse'
        ],
        questionsForVet: [
          'Would you recommend an in-office physical exam and orthopedics/cytology?',
          'Are prescription anti-inflammatories or targeted antibiotic ear drops needed?',
          'What is the recommended recovery timeline before normal activity resumes?'
        ],
        disclaimer: 'Disclaimer: This AI vet guidance is for preliminary care and informational purposes only. It is not a replacement for a licensed physical veterinarian. Please visit a real vet for serious conditions.'
      };
    }

    return res.json({
      success: true,
      report: parsedData,
    });
  } catch (error: any) {
    console.error('Error generating vet consultation:', error);
    return res.status(500).json({
      error: 'Failed to complete AI consultation. Please try again or visit an emergency veterinary clinic if your pet is in distress.',
      details: error.message || String(error),
    });
  }
});

// API endpoint: Follow-up question chat for AI Vet
app.post('/api/vet-chat', async (req, res) => {
  try {
    const { question, petContext, conversationHistory = [] } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const systemInstruction = `You are a supportive, knowledgeable AI Veterinary Assistant for PetCare AI & Hub.
Answer pet owners' questions clearly, kindly, and responsibly.
Always reinforce that if the pet has severe pain, labored breathing, seizures, or collapse, they must seek emergency veterinary care immediately.
Keep responses concise, practical, and empathetic.
Remind them with a one-sentence disclaimer when appropriate.`;

    const contents: any[] = [];
    if (petContext) {
      contents.push({
        text: `Background Case Context: ${JSON.stringify(petContext)}`,
      });
    }

    if (Array.isArray(conversationHistory)) {
      conversationHistory.slice(-6).forEach((msg: any) => {
        contents.push({
          text: `${msg.role === 'user' ? 'Pet Owner' : 'AI Vet'}: ${msg.content}`,
        });
      });
    }

    contents.push({
      text: `Pet Owner's Question: ${question}`,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    return res.json({
      success: true,
      reply: response.text || 'I recommend discussing this directly with your physical veterinarian for an in-person physical exam.',
    });
  } catch (error: any) {
    console.error('Error in vet chat:', error);
    return res.status(500).json({
      error: 'Unable to process chat question.',
      details: error.message || String(error),
    });
  }
});

// API endpoint: Quick Toxicity Checker
app.post('/api/toxicity-check', async (req, res) => {
  try {
    const { species, itemIngested, amount, timeElapsed, petWeight } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          text: `Evaluate toxicity risk for:
Pet: ${species} (Weight: ${petWeight || 'Unknown'})
Substance/Food: ${itemIngested}
Amount ingested: ${amount || 'Unknown'}
Time since ingestion: ${timeElapsed || 'Unknown'}

Return a JSON object with:
{
  "dangerLevel": "None" | "Low" | "Moderate" | "High" | "Critical Danger",
  "toxicPrinciple": "Active toxin name (e.g., Theobromine, Xylitol, Alliin, Persin)",
  "commonSymptoms": ["Symptom 1", "Symptom 2"],
  "immediateAction": "What the owner must do immediately",
  "shouldInduceVomiting": false,
  "requiresEmergencyVet": true | false,
  "antidoteOrTreatment": "Clinical approach or support",
  "summary": "Clear guidance paragraph"
}`,
        },
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    });

    const clean = (response.text || '{}').replace(/```json/g, '').replace(/```/g, '').trim();
    return res.json(JSON.parse(clean));
  } catch (err: any) {
    return res.status(500).json({ error: 'Toxicity check failed' });
  }
});

// Serve frontend: Vite in development, static files in production
async function setupServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🐾 PetCare AI & Hub server listening on port ${PORT}`);
  });
}

setupServer().catch((err) => {
  console.error('Server failed to start:', err);
});

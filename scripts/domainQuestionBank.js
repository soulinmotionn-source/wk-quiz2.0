/**
 * Domain Question Bank with 33 strictly categorized question generators.
 * Ensures zero cross-contamination between categories.
 */

// Helper to pick cyclical items
function pick(arr, index) {
  return arr[(index - 1) % arr.length];
}

export function getDomainQuestion(category, subcategory, difficulty, index) {
  switch (category) {
    case 'Nursing': {
      const items = [
        {
          q: 'Which vital sign assessment is prioritized first during a rapid primary survey of an adult patient?',
          c: 'Airway patency and breathing rate',
          d: ['Blood pressure', 'Oral temperature', 'Capillary refill of toes'],
          exp: 'In emergency clinical care, establishing airway patency and adequate breathing takes precedence according to ABC prioritization guidelines.'
        },
        {
          q: 'Which clinical practice represents the most critical measure for breaking the chain of infection in a healthcare setting?',
          c: 'Thorough hand hygiene before and after every patient contact',
          d: ['Wearing double gloves for all patient interactions', 'Using aerosol disinfectant spray in rooms', 'Wearing shoe covers in general medical wards'],
          exp: 'Proper hand hygiene is recognized by the CDC and WHO as the single most effective intervention to prevent healthcare-associated infections.'
        },
        {
          q: 'What is the standard recommended frequency for repositioning an immobilized, bed-bound patient to prevent pressure ulcers?',
          c: 'At least every 2 hours',
          d: ['Once every 6 hours', 'Only once per nursing shift', 'Every 8 to 12 hours'],
          exp: 'Turning and repositioning immobilized patients at least every 2 hours relieves localized capillary pressure over bony prominences.'
        },
        {
          q: 'When removing Personal Protective Equipment (PPE), which item should typically be removed first according to standard protocol?',
          c: 'Gloves',
          d: ['N95 respirator mask', 'Face shield', 'Isolation gown'],
          exp: 'Gloves are typically considered the most contaminated item and should be removed first to avoid contaminating other surfaces or PPE.'
        },
        {
          q: 'What does the \'S\' represent in the standard SBAR clinical communication framework?',
          c: 'Situation',
          d: ['Symptoms', 'Summary', 'Standard'],
          exp: 'SBAR stands for Situation, Background, Assessment, and Recommendation, used for structured interprofessional handoffs.'
        },
        {
          q: 'Which action should a nurse take immediately upon observing signs of intravenous (IV) infiltration at an infusion site?',
          c: 'Stop the infusion and remove the IV catheter',
          d: ['Flush the catheter vigorously with normal saline', 'Increase the infusion rate to clear the vein', 'Apply cold compress without stopping the infusion'],
          exp: 'When infiltration occurs, the infusion must be stopped immediately and the catheter removed to prevent tissue extravasation injury.'
        },
        {
          q: 'Which nursing intervention is essential when maintaining a closed urinary Foley drainage system?',
          c: 'Keep the collection bag positioned below the level of the patient\'s bladder',
          d: ['Empty the drainage bag only when completely filled', 'Place the drainage bag on the floor beside the bed', 'Disconnect the tubing daily for routine flushing'],
          exp: 'Keeping the collection bag below bladder level prevents gravitational backflow of urine, reducing the risk of catheter-associated UTIs.'
        },
        {
          q: 'Which stage of pressure injury is characterized by localized, intact skin with non-blanchable erythema?',
          c: 'Stage 1',
          d: ['Stage 2', 'Stage 3', 'Unstageable'],
          exp: 'Stage 1 pressure injuries exhibit intact skin with localized non-blanchable erythema over a bony prominence.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `In clinical nursing practice, ${selected.q.toLowerCase()}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'NCLEX': {
      const items = [
        {
          q: 'Which patient scenario should the registered nurse assess first when prioritizing assignments?',
          c: 'A patient with asthma who suddenly exhibits a silent chest and acute diaphoresis',
          d: ['A postoperative patient reporting incision pain rated 6 out of 10', 'A patient with diabetes requesting morning insulin administration', 'A patient scheduled for physical therapy needing an assistive walker'],
          exp: 'A sudden \'silent chest\' in acute asthma indicates severe bronchoconstriction and impending respiratory failure requiring emergency intervention.'
        },
        {
          q: 'Which task is most appropriate for the registered nurse to delegate to an unlicensed assistive personnel (UAP)?',
          c: 'Recording intake and output and measuring routine vital signs on a stable patient',
          d: ['Administering oral maintenance medications', 'Teaching a patient how to perform subcutaneous heparin injections', 'Evaluating initial response to blood pressure medications'],
          exp: 'UAPs can perform routine measurements such as vital signs on stable patients; assessment, teaching, and medication administration cannot be delegated.'
        },
        {
          q: 'A nurse is preparing to administer intravenous potassium chloride. Which route is strictly contraindicated?',
          c: 'Intravenous IV push or rapid bolus',
          d: ['Slow controlled continuous IV infusion with an electronic infusion pump', 'Piggyback infusion diluted in normal saline', 'Central venous line infusion with cardiac monitoring'],
          exp: 'IV push or rapid bolus administration of concentrated potassium chloride causes lethal cardiac arrest and is strictly contraindicated.'
        },
        {
          q: 'Which laboratory value indicates urgent clinical intervention for a patient receiving oral lithium carbonate therapy?',
          c: 'Serum lithium level of 2.2 mEq/L',
          d: ['Serum lithium level of 0.8 mEq/L', 'Serum potassium level of 4.1 mEq/L', 'Serum sodium level of 138 mEq/L'],
          exp: 'The therapeutic range for lithium is 0.6 to 1.2 mEq/L; levels exceeding 1.5 to 2.0 mEq/L indicate toxicity manifesting in tremors, ataxia, and seizures.'
        },
        {
          q: 'Prior to administering oral digoxin, which assessment must the nurse perform?',
          c: 'Measure the apical pulse for one full minute and withhold if below 60 beats/min',
          d: ['Check the patient\'s blood glucose level', 'Measure respiratory rate and withhold if below 12 breaths/min', 'Check pedal pulses bilaterally'],
          exp: 'Digoxin has a negative chronotropic effect; the apical pulse must be counted for a full 60 seconds and held if the heart rate is less than 60 bpm in adults.'
        },
        {
          q: 'Which clinical manifestation indicates a hemolytic transfusion reaction during blood administration?',
          c: 'Flank or low back pain, fever, chills, and hypotension',
          d: ['Localized mild pruritus on arms', 'Dry mucous membranes and thirst', 'Mild transient nausea without fever'],
          exp: 'Acute hemolytic transfusion reactions present with low back/flank pain, chills, fever, tachypnea, tachycardia, and hemoglobinuria.'
        },
        {
          q: 'Which transmission-based precautions are mandatory for a patient diagnosed with Clostridioides difficile (C. diff)?',
          c: 'Contact precautions with soap and water handwashing after contact',
          d: ['Airborne precautions with an N95 respirator mask', 'Droplet precautions with surgical face mask', 'Standard precautions with alcohol-based hand rub only'],
          exp: 'C. diff spores are resistant to alcohol rub; strict contact precautions and washing with soap and water are mandatory to mechanically remove spores.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `For NCLEX examination preparation: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Medical': {
      const items = [
        {
          q: 'What does the medical suffix \'-ectomy\' signify when used in surgical terminology?',
          c: 'Surgical removal or excision of an organ or tissue',
          d: ['Surgical creation of a new artificial opening', 'Incision or cutting into an anatomical structure', 'Visual examination using an illuminated scope'],
          exp: 'The suffix \'-ectomy\' denotes surgical excision or removal (e.g., appendectomy, cholecystectomy).'
        },
        {
          q: 'What is the standard physiological definition of tachycardia in an adult at rest?',
          c: 'A resting heart rate exceeding 100 beats per minute',
          d: ['A resting heart rate below 60 beats per minute', 'An irregular ventricular rhythm with normal rate', 'A systolic blood pressure exceeding 140 mmHg'],
          exp: 'Tachycardia is defined clinically as an adult resting heart rate greater than 100 beats per minute.'
        },
        {
          q: 'What medical term describes difficulty or discomfort when swallowing food or liquids?',
          c: 'Dysphagia',
          d: ['Dysphasia', 'Dyspnea', 'Dystonia'],
          exp: 'Dysphagia is the medical term for difficulty swallowing, whereas dysphasia refers to speech impairment.'
        },
        {
          q: 'Which diagnostic tool is primarily utilized to evaluate the electrical conduction system of the human heart?',
          c: 'Electrocardiogram (ECG / EKG)',
          d: ['Electroencephalogram (EEG)', 'Electromyogram (EMG)', 'Echocardiogram ultrasound'],
          exp: 'An ECG records electrical impulses generated by myocardial depolarization and repolarization across cardiac chambers.'
        },
        {
          q: 'What does the acronym FAST evaluate during emergency assessment of suspected acute stroke?',
          c: 'Face drooping, Arm weakness, Speech difficulty, Time to call 911',
          d: ['Fever, Abdominal pain, Sweating, Tremors', 'Focus, Airway, Sensation, Temperature', 'Fatigue, Appetite, Sleep, Tachycardia'],
          exp: 'FAST is a validated clinical screening tool assessing facial droop, arm weakness, speech slurring, and emphasizing rapid emergency response.'
        },
        {
          q: 'What is the normal physiological range for fasting blood glucose in a healthy non-diabetic adult?',
          c: '70 to 99 mg/dL',
          d: ['126 to 180 mg/dL', '40 to 60 mg/dL', '140 to 200 mg/dL'],
          exp: 'According to the American Diabetes Association, normal fasting plasma glucose is between 70 and 99 mg/dL.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `In clinical medicine, ${selected.q.toLowerCase()}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Anatomy & Physiology': {
      const items = [
        {
          q: 'Which bone is the longest and strongest in the entire human skeleton?',
          c: 'Femur (thigh bone)',
          d: ['Humerus', 'Tibia', 'Fibula'],
          exp: 'The femur is both the longest and strongest bone in the human body, bearing substantial weight and force.'
        },
        {
          q: 'In which microscopic structures within the lungs does the primary exchange of oxygen and carbon dioxide occur?',
          c: 'Alveoli',
          d: ['Bronchi', 'Terminal bronchioles', 'Pleural cavity'],
          exp: 'Alveoli are microscopic air sacs wrapped in capillaries where external respiration and gas exchange take place across the thin respiratory membrane.'
        },
        {
          q: 'Which chamber of the human heart pumps oxygenated blood directly into the systemic circulation through the aorta?',
          c: 'Left ventricle',
          d: ['Right ventricle', 'Left atrium', 'Right atrium'],
          exp: 'The left ventricle has the thickest muscular myocardium to generate sufficient pressure to pump oxygenated blood throughout the systemic arterial tree.'
        },
        {
          q: 'What is the fundamental functional and microscopic filtration unit of the human kidney?',
          c: 'Nephron',
          d: ['Neuron', 'Glomerulus capsule', 'Renal pelvis'],
          exp: 'Each human kidney contains approximately one million nephrons, which filter blood, reabsorb nutrients, and produce urine.'
        },
        {
          q: 'Which region of the human brain is primarily responsible for coordinating voluntary motor movement, posture, and balance?',
          c: 'Cerebellum',
          d: ['Cerebrum', 'Medulla oblongata', 'Corpus callosum'],
          exp: 'The cerebellum processes sensory input from muscles, joints, and the inner ear to fine-tune smooth voluntary motor coordination and balance.'
        },
        {
          q: 'What is the outermost protective layer of human skin called?',
          c: 'Epidermis',
          d: ['Dermis', 'Hypodermis', 'Subcutaneous fascia'],
          exp: 'The epidermis is the stratified squamous epithelial outermost layer of the skin that provides a waterproof barrier.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `In human anatomy and physiology, ${selected.q.toLowerCase()}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Pharmacology': {
      const items = [
        {
          q: 'Which common drug suffix reliably identifies beta-adrenergic receptor blockers?',
          c: '-olol (e.g., metoprolol, atenolol)',
          d: ['-pril (e.g., lisinopril)', '-sartan (e.g., losartan)', '-statin (e.g., atorvastatin)'],
          exp: 'Beta-blockers typically end in \'-olol\' and act by blocking epinephrine from binding to beta receptors, lowering heart rate and blood pressure.'
        },
        {
          q: 'What specific pharmacological agent serves as the immediate reversal antidote for acute opioid overdose?',
          c: 'Naloxone (Narcan)',
          d: ['Flumazenil', 'Protamine sulfate', 'N-acetylcysteine'],
          exp: 'Naloxone is a pure competitive opioid antagonist that rapidly displaces opioids from mu receptors to reverse respiratory depression.'
        },
        {
          q: 'Which antidote is administered to neutralize the anticoagulant effects of unfractionated heparin?',
          c: 'Protamine sulfate',
          d: ['Vitamin K (phytonadione)', 'Atropine sulfate', 'Calcium gluconate'],
          exp: 'Protamine sulfate is a strongly basic protein that binds and neutralizes strongly acidic heparin molecules to stop anticoagulation.'
        },
        {
          q: 'Which medication is administered to reverse coagulopathy induced by excessive warfarin therapy?',
          c: 'Vitamin K1 (phytonadione)',
          d: ['Naloxone', 'Digoxin immune Fab', 'Deferoxamine'],
          exp: 'Warfarin inhibits vitamin K epoxide reductase; administering therapeutic Vitamin K enables synthesis of clotting factors II, VII, IX, and X.'
        },
        {
          q: 'What common adverse effect is frequently associated with Angiotensin-Converting Enzyme (ACE) inhibitors?',
          c: 'Persistent dry, non-productive cough',
          d: ['Reflex tachycardia', 'Hypercalcemia', 'Severe dental caries'],
          exp: 'ACE inhibitors inhibit the breakdown of bradykinin and substance P in pulmonary tissue, causing a persistent dry cough in 10-20% of patients.'
        },
        {
          q: 'Which diuretic class includes furosemide and acts primarily on the ascending limb of the loop of Henle?',
          c: 'Loop diuretics',
          d: ['Thiazide diuretics', 'Potassium-sparing diuretics', 'Carbonic anhydrase inhibitors'],
          exp: 'Furosemide is a potent loop diuretic that blocks Na+-K+-2Cl- cotransporters in the thick ascending limb of Henle\'s loop.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `In clinical pharmacology, ${selected.q.toLowerCase()}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Diseases & Disorders': {
      const items = [
        {
          q: 'What fundamental pathophysiological mechanism distinguishes Type 2 diabetes mellitus from Type 1 diabetes?',
          c: 'Peripheral insulin resistance and progressive beta-cell dysfunction',
          d: ['Complete autoimmune destruction of pancreatic beta cells', 'Congenital absence of insulin receptors in liver only', 'Excessive enzymatic breakdown of insulin in stomach'],
          exp: 'Type 2 diabetes involves peripheral tissue resistance to insulin combined with relative insulin secretory defects, whereas Type 1 is absolute insulin deficiency.'
        },
        {
          q: 'Which chronic respiratory condition is characterized by irreversible destruction of alveolar walls and loss of pulmonary elasticity?',
          c: 'Emphysema',
          d: ['Acute bronchitis', 'Allergic rhinitis', 'Pneumothorax'],
          exp: 'Emphysema involves destruction of alveolar septa leading to permanent enlargement of airspaces distal to terminal bronchioles and air trapping.'
        },
        {
          q: 'Which characteristic facial rash is strongly associated with the autoimmune condition Systemic Lupus Erythematosus (SLE)?',
          c: 'Malar \'butterfly\' rash across the cheeks and bridge of the nose',
          d: ['Target bullseye lesion on the trunk', 'Diffuse macular rash on the palms and soles', 'Silvery scaling plaques over extensor surfaces'],
          exp: 'The malar or butterfly rash is a hallmark erythematous eruption spanning the cheeks and nasal bridge while sparing the nasolabial folds.'
        },
        {
          q: 'What is the primary first-line pharmacological treatment for severe acute anaphylactic allergic reactions?',
          c: 'Intramuscular epinephrine (adrenaline)',
          d: ['Oral diphenhydramine antihistamine', 'Inhaled albuterol bronchodilator', 'Intravenous hydrocortisone'],
          exp: 'Epinephrine is the only first-line medication proven to reverse hypotension, bronchospasm, and laryngeal edema during anaphylaxis.'
        },
        {
          q: 'Which clinical sign involves pain elicited when the knee is extended while the hip is flexed at 90 degrees, suggesting meningitis?',
          c: 'Kernig\'s sign',
          d: ['Brudzinski\'s sign', 'Chvostek\'s sign', 'Trousseau\'s sign'],
          exp: 'Positive Kernig\'s sign is marked by resistance and hamstring pain during passive knee extension with the hip flexed, indicative of meningeal irritation.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `In pathology and disease management, ${selected.q.toLowerCase()}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Movies': {
      const items = [
        {
          q: 'Which iconic film quote is spoken by Humphrey Bogart to Ingrid Bergman in the 1942 classic \'Casablanca\'?',
          c: 'Here\'s looking at you, kid.',
          d: ['Frankly, my dear, I don\'t give a damn.', 'May the Force be with you.', 'You had me at hello.'],
          exp: 'Humphrey Bogart playing Rick Blaine famously says \'Here\'s looking at you, kid\' to Ilsa Lund in Casablanca.'
        },
        {
          q: 'Which visionary director directed both \'Jurassic Park\' and the historical epic \'Schindler\'s List\' in the year 1993?',
          c: 'Steven Spielberg',
          d: ['James Cameron', 'Martin Scorsese', 'Stanley Kubrick'],
          exp: 'Steven Spielberg released both the groundbreaking blockbuster Jurassic Park and the multi-Oscar winning Schindler\'s List in 1993.'
        },
        {
          q: 'Which film shares the historic record of winning 11 Academy Awards alongside \'Ben-Hur\' and \'Titanic\'?',
          c: 'The Lord of the Rings: The Return of the King',
          d: ['The Godfather Part II', 'Gladiator', 'La La Land'],
          exp: 'The Lord of the Rings: The Return of the King (2003) swept all 11 Oscars it was nominated for, tying Titanic and Ben-Hur.'
        },
        {
          q: 'In the 1972 cinematic masterpiece \'The Godfather\', which legendary actor portrayed the patriarch Don Vito Corleone?',
          c: 'Marlon Brando',
          d: ['Al Pacino', 'Robert De Niro', 'James Caan'],
          exp: 'Marlon Brando won the Academy Award for Best Actor for his unforgettable portrayal of Don Vito Corleone in The Godfather.'
        },
        {
          q: 'In Orson Welles\' 1941 classic \'Citizen Kane\', what mystery object is revealed to be \'Rosebud\'?',
          c: 'A childhood sled',
          d: ['A childhood pet dog', 'A childhood snow globe', 'A gold pocket watch'],
          exp: 'Rosebud is revealed at the climax to be the trade name painted on Charles Foster Kane\'s childhood winter sled.'
        },
        {
          q: 'Which horror and suspense director created the 1960 psychological thriller \'Psycho\' featuring the famous shower scene?',
          c: 'Alfred Hitchcock',
          d: ['Roman Polanski', 'William Friedkin', 'John Carpenter'],
          exp: 'Alfred Hitchcock directed Psycho, starring Anthony Perkins as Norman Bates with revolutionary editing and Bernard Herrmann\'s screeching strings.'
        },
        {
          q: 'What was the first feature-length animated film ever produced in color and sound by Walt Disney in 1937?',
          c: 'Snow White and the Seven Dwarfs',
          d: ['Pinocchio', 'Fantasia', 'Bambi'],
          exp: 'Snow White and the Seven Dwarfs premiered in December 1937 as the historic first cel-animated feature film in Technicolor.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Regarding cinema and movie history: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'TV Shows': {
      const items = [
        {
          q: 'What is the name of the neighborhood coffeehouse where the main characters frequently gather in the sitcom \'Friends\'?',
          c: 'Central Perk',
          d: ['Monk\'s Diner', 'Cafe Nervosa', 'The Peach Pit'],
          exp: 'The six friends in Friends hang out on the orange couch at Central Perk in Greenwich Village, managed by Gunther.'
        },
        {
          q: 'In the acclaimed drama series \'Breaking Bad\', what high school subject does Walter White initially teach before cooking crystal meth?',
          c: 'Chemistry',
          d: ['Biology', 'Physics', 'Mathematics'],
          exp: 'Walter White is a brilliant former research chemist teaching high school chemistry in Albuquerque, New Mexico.'
        },
        {
          q: 'What is the name of the fictional regional paper supply company where characters work in \'The Office\' (US)?',
          c: 'Dunder Mifflin',
          d: ['Wernham Hogg', 'Initech Corporation', 'Sterling Cooper'],
          exp: 'Dunder Mifflin Paper Company\'s Scranton branch is managed by Michael Scott in the beloved comedy series.'
        },
        {
          q: 'In HBO\'s \'Game of Thrones\', what is the coveted seat of political power in King\'s Landing called?',
          c: 'The Iron Throne',
          d: ['The Golden Throne', 'The Dragon Throne', 'The High Seat of Valyria'],
          exp: 'The Iron Throne was forged from 1,000 swords of Aegon the Conqueror\'s defeated enemies, heated by dragon breath.'
        },
        {
          q: 'Which mob boss and suburban patriarch is the central protagonist of HBO\'s landmark series \'The Sopranos\'?',
          c: 'Tony Soprano',
          d: ['Silvio Dante', 'Paulie Gualtieri', 'Christopher Moltisanti'],
          exp: 'James Gandolfini portrayed New Jersey mob boss Tony Soprano, navigating organized crime and psychiatry sessions with Dr. Melfi.'
        },
        {
          q: 'In Netflix\'s \'Stranger Things\', what eerie alternate dimension coexists beneath the town of Hawkins, Indiana?',
          c: 'The Upside Down',
          d: ['The Netherworld', 'The Shadow Realm', 'The Dark Dimension'],
          exp: 'The Upside Down is a dark, decaying parallel dimension inhabited by the Demogorgon and the Mind Flayer.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Regarding television shows and series: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Relationships': {
      const items = [
        {
          q: 'Why are \'I\' statements favored over \'You\' statements in constructive relationship communication?',
          c: 'They express personal feelings and needs without triggering defensive reactions or placing blame',
          d: ['They ensure one partner always dominates the discussion', 'They avoid discussing difficult emotional topics altogether', 'They demand immediate compliance from the partner'],
          exp: '\'I\' statements (e.g., \'I feel overwhelmed when...\') take ownership of feelings rather than accusing the partner, reducing conflict escalation.'
        },
        {
          q: 'What is the core distinction between empathy and sympathy in emotional intelligence?',
          c: 'Empathy means genuinely understanding and feeling another person\'s perspective, while sympathy is feeling pity from a detached viewpoint',
          d: ['Sympathy requires sharing identical life experiences, whereas empathy is superficial polite agreement', 'Empathy is only practiced between family members, while sympathy is for strangers', 'There is no psychological difference between the two terms'],
          exp: 'Empathy connects with someone by taking their perspective and feeling with them; sympathy observes from outside with feelings of pity or sorrow.'
        },
        {
          q: 'Which behavior is a core component of active listening during relationship conversations?',
          c: 'Paraphrasing what the speaker shared to verify understanding before formulating a response',
          d: ['Interrupting immediately to offer solutions before the speaker finishes', 'Looking at a smartphone while nodding periodically', 'Silently preparing your rebuttal while the other person is talking'],
          exp: 'Active listening requires paying undivided attention, reflecting back what was heard, and validating emotions without jumping to defensive rebuttals.'
        },
        {
          q: 'According to relationship counseling frameworks, what is the primary purpose of setting healthy personal boundaries?',
          c: 'To clearly communicate what behaviors are acceptable to protect personal well-being and foster mutual respect',
          d: ['To punish the partner whenever disagreements arise', 'To isolate oneself completely from friends and family', 'To control the partner\'s schedule and social interactions'],
          exp: 'Healthy boundaries establish clear expectations regarding personal space, values, and emotional safety, supporting long-term relationship trust.'
        },
        {
          q: 'According to Dr. Gary Chapman\'s popular relationship framework, which of the following is one of the Five Love Languages?',
          c: 'Words of Affirmation',
          d: ['Financial Control', 'Intellectual Superiority', 'Public Performance'],
          exp: 'The Five Love Languages are Words of Affirmation, Quality Time, Receiving Gifts, Acts of Service, and Physical Touch.'
        },
        {
          q: 'When repairing trust after a relationship misunderstanding, which element is essential for a sincere apology?',
          c: 'Acknowledging specific hurt caused, taking genuine accountability, and committing to changed behavior',
          d: ['Saying \'I am sorry you feel that way\' to deflect responsibility', 'Giving expensive gifts while refusing to discuss what happened', 'Blaming external circumstances for one\'s own actions'],
          exp: 'Meaningful apologies require acknowledging harm, validating the other person\'s pain, taking ownership without defensiveness, and demonstrating behavioral change.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `In healthy relationship dynamics and interpersonal communication: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Wisdom': {
      const items = [
        {
          q: 'Which famous philosophical proverb originating from the ancient philosopher Lao Tzu speaks to personal growth?',
          c: 'A journey of a thousand miles begins with a single step.',
          d: ['The squeaky wheel gets the grease.', 'Out of sight, out of mind.', 'Birds of a feather flock together.'],
          exp: 'Lao Tzu in the Tao Te Ching taught that monumental achievements and personal transformations begin with modest, steady beginnings.'
        },
        {
          q: 'What universal ethical principle, known as the \'Golden Rule\', is found across world philosophies?',
          c: 'Treat others the way you want to be treated yourself.',
          d: ['Whoever holds the gold makes all the rules.', 'An eye for an eye and a tooth for a tooth.', 'The end always justifies the means.'],
          exp: 'The Golden Rule of reciprocity is a foundational ethical precept in philosophy and spiritual traditions emphasizing empathy and fairness.'
        },
        {
          q: 'Which Roman emperor and Stoic philosopher wrote the timeless reflective journal known today as \'Meditations\'?',
          c: 'Marcus Aurelius',
          d: ['Julius Caesar', 'Nero', 'Augustus'],
          exp: 'Marcus Aurelius penned Meditations as private notes to himself on duty, emotional resilience, acceptance, and ethical governance.'
        },
        {
          q: 'What fundamental insight does modern mindfulness philosophy cultivate regarding thoughts and emotions?',
          c: 'Observing thoughts and feelings non-judgmentally in the present moment without being controlled by them',
          d: ['Suppressing all negative emotions so you never feel sadness', 'Endlessly overanalyzing past mistakes to prevent future errors', 'Avoiding all social interactions to preserve peace of mind'],
          exp: 'Mindfulness teaches open, non-reactive awareness of present sensations, thoughts, and emotions, fostering psychological flexibility.'
        },
        {
          q: 'What is meant by the proverb \'Smooth seas never made a skillful sailor\'?',
          c: 'Overcoming adversity and challenges is what builds genuine strength, wisdom, and character',
          d: ['People should avoid traveling on water whenever possible', 'Success only comes when everything goes according to plan', 'Easy tasks are the most rewarding in life'],
          exp: 'This timeless proverb illustrates that character, resilience, and mastery are forged through navigating hardship rather than effortless ease.'
        },
        {
          q: 'In Aristotelian ethics, what is the \'Golden Mean\'?',
          c: 'The desirable middle state between two extremes, one of excess and the other of deficiency',
          d: ['Accumulating maximum wealth through gold investments', 'Always choosing the exact mathematical average of opinions', 'Never taking a stand on any moral issue'],
          exp: 'Aristotle taught that virtue is the golden mean between vices; for example, courage is the mean between cowardice (deficiency) and recklessness (excess).'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Regarding life wisdom and ethical philosophy: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'General Knowledge': {
      const items = [
        {
          q: 'What is the largest ocean on Earth by both total surface area and water volume?',
          c: 'Pacific Ocean',
          d: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
          exp: 'The Pacific Ocean covers more than 60 million square miles, exceeding the combined land mass of all Earth\'s continents.'
        },
        {
          q: 'What is the highest mountain peak above sea level on planet Earth?',
          c: 'Mount Everest (in the Himalayas)',
          d: ['K2 (Godwin-Austen)', 'Kangchenjunga', 'Mount Kilimanjaro'],
          exp: 'Mount Everest stands at 29,031.7 feet (8,848.86 meters) above sea level along the border of Nepal and China.'
        },
        {
          q: 'What is the hardest naturally occurring mineral known to science?',
          c: 'Diamond',
          d: ['Corundum (Sapphire/Ruby)', 'Topaz', 'Quartz'],
          exp: 'Diamond rates a maximum 10 on the Mohs hardness scale due to its rigid tetrahedral carbon crystal lattice.'
        },
        {
          q: 'What is the official national currency of Japan?',
          c: 'Yen (JPY)',
          d: ['Won', 'Yuan (Renminbi)', 'Ringgit'],
          exp: 'The Japanese Yen is the official currency of Japan and one of the world\'s major reserve currencies.'
        },
        {
          q: 'How many regulation players from each team are on the field at one time in association football (soccer)?',
          c: '11 players',
          d: ['9 players', '10 players', '12 players'],
          exp: 'A standard soccer match is contested by two teams of 11 players each, including one goalkeeper per side.'
        },
        {
          q: 'Which Renaissance polymath painted the world-renowned portrait masterpiece \'Mona Lisa\'?',
          c: 'Leonardo da Vinci',
          d: ['Michelangelo Buonarroti', 'Raphael Sanzio', 'Sandro Botticelli'],
          exp: 'Leonardo da Vinci painted the Mona Lisa (La Gioconda) in Florence during the early 16th century.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `General knowledge challenge: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'History': {
      const items = [
        {
          q: 'In what year was the United States Declaration of Independence formally adopted in Philadelphia?',
          c: '1776',
          d: ['1789', '1783', '1765'],
          exp: 'The Continental Congress formally adopted the Declaration of Independence on July 4, 1776.'
        },
        {
          q: 'Who served as the first official President of the United States under the US Constitution?',
          c: 'George Washington',
          d: ['Thomas Jefferson', 'John Adams', 'Benjamin Franklin'],
          exp: 'George Washington was unanimously elected and served as the first US President from 1789 to 1797.'
        },
        {
          q: 'Between which years was the American Civil War fought?',
          c: '1861 to 1865',
          d: ['1775 to 1783', '1812 to 1815', '1846 to 1848'],
          exp: 'The American Civil War erupted with Fort Sumter in April 1861 and concluded with Confederate surrender in spring 1865.'
        },
        {
          q: 'Which historic English charter signed in 1215 established that everyone, even the King, is subject to the law?',
          c: 'Magna Carta (The Great Charter)',
          d: ['English Bill of Rights', 'Treaty of Westphalia', 'Edict of Nantes'],
          exp: 'King John of England granted Magna Carta at Runnymede in June 1215 under pressure from feudal barons.'
        },
        {
          q: 'In what year did the Apollo 11 mission achieve humanity\'s first manned lunar landing?',
          c: '1969',
          d: ['1965', '1971', '1973'],
          exp: 'Neil Armstrong and Buzz Aldrin landed the lunar module Eagle on the Moon on July 20, 1969.'
        },
        {
          q: 'What historic symbol of the Cold War began to be dismantled in Berlin in November 1989?',
          c: 'The Berlin Wall',
          d: ['The Iron Gate', 'Checkpoint Alpha', 'The Brandenburg Citadel'],
          exp: 'The fall of the Berlin Wall on November 9, 1989, paved the way for German reunification and the end of the Cold War.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `In world and American history: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Geography': {
      const items = [
        {
          q: 'What is the official state capital of California?',
          c: 'Sacramento',
          d: ['Los Angeles', 'San Francisco', 'San Diego'],
          exp: 'Sacramento has been California\'s capital since 1854, situated at the confluence of the Sacramento and American rivers.'
        },
        {
          q: 'What is the official state capital of Texas?',
          c: 'Austin',
          d: ['Houston', 'Dallas', 'San Antonio'],
          exp: 'Austin is the state capital of Texas and the seat of Travis County, known as the Live Music Capital of the World.'
        },
        {
          q: 'What is the official national capital of Australia?',
          c: 'Canberra',
          d: ['Sydney', 'Melbourne', 'Brisbane'],
          exp: 'Canberra was selected as a planned capital city compromise between rivals Sydney and Melbourne in 1908.'
        },
        {
          q: 'What is the official national capital of Canada?',
          c: 'Ottawa',
          d: ['Toronto', 'Montreal', 'Vancouver'],
          exp: 'Queen Victoria designated Ottawa as the capital of Canada in 1857 due to its strategic location.'
        },
        {
          q: 'What is the vastest hot desert on planet Earth, spanning much of North Africa?',
          c: 'The Sahara Desert',
          d: ['The Gobi Desert', 'The Kalahari Desert', 'The Arabian Desert'],
          exp: 'The Sahara covers approximately 3.5 million square miles, making it the largest non-polar desert on Earth.'
        },
        {
          q: 'What imaginary line of latitude divides the Earth into the Northern and Southern Hemispheres at zero degrees?',
          c: 'The Equator',
          d: ['Prime Meridian', 'Tropic of Cancer', 'Tropic of Capricorn'],
          exp: 'The Equator is the zero-degree parallel of latitude, measuring approximately 24,901 miles in circumference.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `World geography quiz: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Science': {
      const items = [
        {
          q: 'Which cellular organelle is universally referred to as the \'powerhouse of the cell\' for generating ATP?',
          c: 'Mitochondria',
          d: ['Ribosome', 'Golgi apparatus', 'Endoplasmic reticulum'],
          exp: 'Mitochondria generate the majority of cellular adenosine triphosphate (ATP) through oxidative phosphorylation.'
        },
        {
          q: 'What biological process enables green plants to convert sunlight, carbon dioxide, and water into glucose and oxygen?',
          c: 'Photosynthesis',
          d: ['Cellular respiration', 'Fermentation', 'Transpiration'],
          exp: 'Photosynthesis utilizes chlorophyll in chloroplasts to capture photon energy and synthesize sugar molecules.'
        },
        {
          q: 'What is the chemical element symbol for Gold on the periodic table?',
          c: 'Au (from Latin Aurum)',
          d: ['Ag', 'Fe', 'Pt'],
          exp: 'Gold has the chemical symbol Au, derived from its Latin name \'aurum\', meaning shining dawn.'
        },
        {
          q: 'According to Newton\'s First Law of Motion, what does an object at rest tend to do unless acted upon by a net external force?',
          c: 'Remain at rest (Law of Inertia)',
          d: ['Accelerate continuously', 'Decompose into smaller particles', 'Reverse its trajectory'],
          exp: 'Newton\'s first law states that an object at rest remains at rest, and an object in motion continues at constant velocity unless acted upon by a net force.'
        },
        {
          q: 'Which planet is positioned closest to the Sun in our Solar System?',
          c: 'Mercury',
          d: ['Venus', 'Mars', 'Earth'],
          exp: 'Mercury is the innermost and smallest planet in the Solar System, orbiting the Sun every 88 Earth days.'
        },
        {
          q: 'What is the pH value of pure neutral distilled water at 25 degrees Celsius?',
          c: 'pH 7.0',
          d: ['pH 5.5', 'pH 8.5', 'pH 0.0'],
          exp: 'Pure water has an equal concentration of hydrogen (H+) and hydroxide (OH-) ions, resulting in a neutral pH of 7.0.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Scientific concepts: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Engineering': {
      const items = [
        {
          q: 'What physical property is defined in mechanical engineering as internal force divided by cross-sectional area?',
          c: 'Stress (σ = F / A)',
          d: ['Strain', 'Torque', 'Viscosity'],
          exp: 'Stress is force applied per unit area, measured in Pascals (N/m²) or pounds per square inch (psi).'
        },
        {
          q: 'What fundamental material property does Young\'s Modulus quantify?',
          c: 'Linear tensile elasticity / stiffness of a solid material',
          d: ['Thermal conductivity', 'Electric resistance', 'Magnetic permeability'],
          exp: 'Young\'s modulus is the ratio of tensile stress to tensile strain within the elastic limit of a material.'
        },
        {
          q: 'Which fluid dynamics principle explains why fluid pressure decreases when flow velocity increases through a constriction?',
          c: 'Bernoulli\'s Principle',
          d: ['Archimedes\' Principle', 'Pascal\'s Law', 'Coulomb\'s Law'],
          exp: 'Bernoulli’s equation shows that for an inviscid flow, an increase in fluid speed occurs simultaneously with a decrease in static pressure.'
        },
        {
          q: 'In structural engineering, which structural type is a beam supported at only one end and extending freely into space?',
          c: 'Cantilever beam',
          d: ['Simply supported beam', 'Continuous span beam', 'Truss arch'],
          exp: 'A cantilever is anchored firmly at a single fixed support, with the other end projecting outward unsupported.'
        },
        {
          q: 'What mechanical parameter is calculated as the product of applied rotational force and perpendicular distance from the pivot?',
          c: 'Torque (Moment of force)',
          d: ['Power', 'Impulse', 'Momentum'],
          exp: 'Torque measures the rotational tendency of a force, equal to force times the lever arm perpendicular distance (τ = r × F).'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `In fundamental engineering: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Electrical': {
      const items = [
        {
          q: 'According to Ohm\'s Law, which equation correctly expresses electrical voltage (V)?',
          c: 'V = I × R (Current multiplied by Resistance)',
          d: ['V = I / R', 'V = R / I', 'V = I + R'],
          exp: 'Ohm’s law establishes that voltage across a conductor equals current (Amperes) multiplied by resistance (Ohms).'
        },
        {
          q: 'What is the standard alternating current (AC) power grid frequency in the United States and Canada?',
          c: '60 Hertz (Hz)',
          d: ['50 Hertz (Hz)', '100 Hertz (Hz)', '120 Hertz (Hz)'],
          exp: 'The North American electrical grid operates at a standardized frequency of 60 cycles per second (60 Hz).'
        },
        {
          q: 'What safety device detects small imbalances between hot and neutral wires to protect humans from electrical shock?',
          c: 'Ground Fault Circuit Interrupter (GFCI / GFI)',
          d: ['Standard thermal fuse', 'Step-down transformer', 'Rheostat'],
          exp: 'GFCIs monitor the current balance between hot and neutral; if a leakage current as small as 4-6 mA occurs, it trips within milliseconds.'
        },
        {
          q: 'In standard residential wiring in the United States, which wire color designates the equipment grounding conductor?',
          c: 'Bare copper or green insulation',
          d: ['Black insulation', 'White insulation', 'Red insulation'],
          exp: 'The National Electrical Code (NEC) specifies green, green with yellow stripes, or bare copper for equipment grounding.'
        },
        {
          q: 'In a pure series electrical circuit with multiple resistors, what parameter remains identical through every component?',
          c: 'Electric current (Amperage)',
          d: ['Voltage drop', 'Resistance value', 'Power dissipation'],
          exp: 'In a single-loop series circuit, charges have only one continuous path to flow, so current is identical everywhere.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Electrical theory and practical wiring: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Electrical Symbols': {
      const items = [
        {
          q: 'What electronic component is represented on standard North American schematic diagrams by a sharp zig-zag line?',
          c: 'Fixed Resistor',
          d: ['Capacitor', 'Inductor coil', 'Diode'],
          exp: 'In ANSI/IEEE schematics, a fixed resistor is drawn as a zig-zag line, whereas international IEC schematics often use a rectangle.'
        },
        {
          q: 'What schematic symbol depicts a non-polarized capacitor in circuit diagrams?',
          c: 'Two parallel straight lines perpendicular to the connecting leads',
          d: ['A series of coiled loops', 'A triangle pointing to a straight line', 'A circle with an X inside'],
          exp: 'Capacitors are symbolized by two parallel plates separated by a gap, representing dielectric separation.'
        },
        {
          q: 'How is an electrical earth or chassis ground symbolized on schematics?',
          c: 'A vertical lead terminating in progressively shorter horizontal parallel lines',
          d: ['A closed circle with three dots', 'A zig-zag arrow pointing up', 'A square with a diagonal cross'],
          exp: 'The ground symbol consists of descending horizontal lines of decreasing width, indicating zero reference potential.'
        },
        {
          q: 'What distinguishes a Light Emitting Diode (LED) symbol from a standard semiconductor diode symbol?',
          c: 'Two small arrows pointing outward away from the diode triangle',
          d: ['Two arrows pointing inward toward the triangle', 'A circle surrounding a resistor', 'A wavy line through the center'],
          exp: 'Outward-pointing arrows on a diode symbol denote photon radiation (emission of light), designating an LED.'
        },
        {
          q: 'What switch type is designated by the schematic abbreviation \'SPST\'?',
          c: 'Single Pole, Single Throw switch',
          d: ['Single Phase, System Terminal', 'Series Parallel Synchronous Toggle', 'Step Power Signal Trigger'],
          exp: 'An SPST switch has one input pole and connects to one output throw, serving as a simple on-off control.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `In electrical schematic diagrams: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Electronics': {
      const items = [
        {
          q: 'Which basic digital logic gate produces a HIGH (1) output if and only if ALL of its inputs are simultaneously HIGH (1)?',
          c: 'AND gate',
          d: ['OR gate', 'NAND gate', 'XOR gate'],
          exp: 'An AND gate requires all inputs to be true (1) to produce a true (1) output.'
        },
        {
          q: 'What three functional terminals exist on a standard Bipolar Junction Transistor (BJT)?',
          c: 'Base, Collector, and Emitter',
          d: ['Gate, Drain, and Source', 'Anode, Cathode, and Grid', 'Phase, Neutral, and Ground'],
          exp: 'BJTs possess Base, Collector, and Emitter terminals, where a small base current controls a larger collector-emitter current.'
        },
        {
          q: 'What is the ideal input impedance of an ideal operational amplifier (Op-Amp)?',
          c: 'Infinite impedance (draws zero input current)',
          d: ['Zero impedance', '50 Ohms', '1000 Ohms'],
          exp: 'Ideal op-amps have infinite input impedance so that they do not load or draw current from preceding circuit stages.'
        },
        {
          q: 'What is the decimal numerical value of the 4-bit binary number 1010?',
          c: 'Decimal 10 (8 + 2)',
          d: ['Decimal 12', 'Decimal 6', 'Decimal 14'],
          exp: 'Binary 1010 = (1 × 8) + (0 × 4) + (1 × 2) + (0 × 1) = 8 + 2 = 10.'
        },
        {
          q: 'What electronic component resists rapid changes in electrical current through stored magnetic energy?',
          c: 'Inductor (Choke)',
          d: ['Capacitor', 'Resistor', 'Varistor'],
          exp: 'Inductors store energy in a magnetic field according to Faraday\'s law, opposing sudden variations in current.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Electronics and circuit engineering: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'HVAC': {
      const items = [
        {
          q: 'What are the four primary sequential mechanical components in a standard vapor-compression refrigeration cycle?',
          c: 'Compressor, Condenser, Expansion Device, and Evaporator',
          d: ['Boiler, Radiator, Fan, and Filter', 'Turbine, Pump, Generator, and Coolant', 'Chiller, Damper, Thermostat, and Blower'],
          exp: 'The refrigeration cycle continuously circulates refrigerant through the compressor, condenser, expansion valve, and evaporator.'
        },
        {
          q: 'In which HVAC component does the circulating refrigerant absorb heat from the indoor air space and vaporize?',
          c: 'Evaporator coil',
          d: ['Condenser coil', 'Compressor', 'Liquid receiver'],
          exp: 'In the evaporator, low-pressure liquid refrigerant boils at low temperature, absorbing latent heat from circulating indoor air.'
        },
        {
          q: 'What does the HVAC efficiency metric \'SEER\' stand for?',
          c: 'Seasonal Energy Efficiency Ratio',
          d: ['Systemic Electrical Emission Rating', 'Standard Environmental Energy Reduction', 'Synchronized Evaporator Exhaust Rate'],
          exp: 'SEER measures the cooling output of an air conditioner divided by its total electric energy input over a typical cooling season.'
        },
        {
          q: 'Which US federal EPA certification under the Clean Air Act is legally required for technicians handling and recovering regulated refrigerants?',
          c: 'EPA Section 608 Certification',
          d: ['OSHA 10 Construction', 'EPA Section 404 Water Permit', 'DOE Energy Star Badge'],
          exp: 'Section 608 of the Clean Air Act mandates certification for technicians purchasing, recovering, or recycling regulated refrigerants.'
        },
        {
          q: 'What specialized component allows a reverse-cycle heat pump to provide both cooling in summer and heating in winter?',
          c: 'Four-way Reversing Valve',
          d: ['Thermostatic Expansion Valve', 'Crankcase heater', 'Accumulator'],
          exp: 'The reversing valve switches the directional flow of refrigerant, turning the indoor coil into a condenser during heating mode.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `HVAC and refrigeration technology: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Technology': {
      const items = [
        {
          q: 'What standard networking transport port is dedicated to secure encrypted HTTPS web communication?',
          c: 'Port 443',
          d: ['Port 80', 'Port 22', 'Port 21'],
          exp: 'HTTPS uses Transport Layer Security (TLS) typically over TCP port 443, whereas unencrypted HTTP operates over port 80.'
        },
        {
          q: 'What essential internet service translates human-readable domain names (such as wkquiz.com) into numerical IP addresses?',
          c: 'DNS (Domain Name System)',
          d: ['DHCP', 'FTP', 'BGP routing'],
          exp: 'DNS acts as the phonebook of the internet, resolving alphanumeric URLs into IP addresses for routing.'
        },
        {
          q: 'In Git version control, which command permanently saves staged code snapshots to the local repository history?',
          c: 'git commit',
          d: ['git push', 'git add', 'git pull'],
          exp: '\'git commit -m ...\' writes the staged changes into the local repository\'s version history tree.'
        },
        {
          q: 'In cloud computing architecture, what model describes services where the provider manages runtime, OS, and servers while users write application code?',
          c: 'PaaS (Platform as a Service)',
          d: ['IaaS (Infrastructure as a Service)', 'SaaS (Software as a Service)', 'Bare Metal Colocation'],
          exp: 'PaaS provides development platforms and execution runtimes without users needing to configure virtual machines or operating systems.'
        },
        {
          q: 'What relational database query language is universally utilized to query and manipulate structured tabular data?',
          c: 'SQL (Structured Query Language)',
          d: ['JSON', 'HTML', 'XML'],
          exp: 'SQL is the standardized declarative language for managing data held in relational database management systems (RDBMS).'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `In modern software and networking technology: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Computers': {
      const items = [
        {
          q: 'Which computer component is widely referred to as the \'brain\' of the computer, executing instructions and arithmetic logic?',
          c: 'CPU (Central Processing Unit)',
          d: ['GPU', 'RAM', 'Power Supply Unit'],
          exp: 'The CPU fetches, decodes, and executes program instructions and directs computational data flow.'
        },
        {
          q: 'What characteristic distinguishes computer RAM (Random Access Memory) from SSD or Hard Drive storage?',
          c: 'RAM is volatile memory and loses its contents when power is removed',
          d: ['RAM is permanent magnetic media', 'RAM stores data slower than mechanical disks', 'RAM cannot be rewritten once programmed'],
          exp: 'RAM requires electrical charge to maintain data state, making it fast and volatile working memory.'
        },
        {
          q: 'How many binary bits are contained within exactly one standard computer byte?',
          c: '8 bits',
          d: ['4 bits (nibble)', '16 bits', '32 bits'],
          exp: 'One byte is universally defined in modern computer architecture as an 8-bit octet, capable of representing 256 states.'
        },
        {
          q: 'What modern, reversible physical peripheral connector has become the universal standard for data, display, and high-wattage charging?',
          c: 'USB Type-C',
          d: ['USB Type-A', 'VGA connector', 'Parallel DB-25'],
          exp: 'USB Type-C features a 24-pin reversible-plug connector supporting USB4, DisplayPort alternate mode, and Power Delivery.'
        },
        {
          q: 'What low-level firmware initializes system hardware components and bootstraps the operating system when a computer boots?',
          c: 'UEFI / BIOS',
          d: ['Device driver', 'Hypervisor', 'DirectX'],
          exp: 'UEFI (Unified Extensible Firmware Interface) or legacy BIOS initializes motherboard chips and loads the OS bootloader.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Computer architecture and hardware: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Automotive': {
      const items = [
        {
          q: 'What are the four sequential operational strokes in a standard four-stroke internal combustion engine?',
          c: 'Intake, Compression, Power, and Exhaust',
          d: ['Ignition, Expansion, Cooling, and Release', 'Injection, Combustion, Drive, and Reset', 'Fueling, Firing, Spinning, and Vented'],
          exp: 'The Otto cycle engine operates in four piston strokes: Intake stroke, Compression stroke, Power stroke, and Exhaust stroke.'
        },
        {
          q: 'What automotive component generates electrical power to recharge the vehicle battery and run accessories while the engine runs?',
          c: 'Alternator',
          d: ['Starter motor', 'Spark plug', 'Ignition coil'],
          exp: 'The alternator converts mechanical crankshaft energy into alternating electrical current, rectified to direct current.'
        },
        {
          q: 'What exhaust emission control device converts harmful carbon monoxide, unburned hydrocarbons, and nitrogen oxides into safer gases?',
          c: 'Catalytic Converter',
          d: ['Muffler resonator', 'EGR valve', 'Turbocharger'],
          exp: 'Catalytic converters contain platinum, palladium, and rhodium catalysts to oxidize CO and hydrocarbons and reduce NOx.'
        },
        {
          q: 'What standardized diagnostic port found beneath the dashboard of vehicles built after 1996 allows technicians to read trouble codes?',
          c: 'OBD-II port (On-Board Diagnostics II)',
          d: ['CAN-Bus Serial Port 1', 'ECU Flash Header', 'VAG-COM terminal'],
          exp: 'OBD-II is the federally mandated standardized 16-pin diagnostic connector used to retrieve Diagnostic Trouble Codes (DTCs).'
        },
        {
          q: 'In vehicles equipped with a manual transmission, what mechanical assembly disengages engine power from the gearbox during gear changes?',
          c: 'Clutch disc and pressure plate',
          d: ['Torque converter', 'Differential spider gears', 'Flywheel ring gear'],
          exp: 'Pressing the clutch pedal releases friction pressure between the flywheel and clutch disc, allowing smooth gear shifts.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Automotive mechanics and diagnosis: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'IQ & Logic': {
      const items = [
        {
          q: 'What is the next logical number in the numeric sequence: 3, 6, 12, 24, 48, ___?',
          c: '96 (each term doubles)',
          d: ['72', '84', '102'],
          exp: 'Each consecutive term in this geometric sequence is multiplied by 2: 48 × 2 = 96.'
        },
        {
          q: 'Consider the premises: \'All dogs are mammals. All mammals are warm-blooded.\' What valid conclusion follows logically?',
          c: 'All dogs are warm-blooded',
          d: ['All warm-blooded animals are dogs', 'Some dogs are not mammals', 'No mammals are dogs'],
          exp: 'By classical categorical syllogism (Barbara format: All A are B, all B are C), it follows that all A are C.'
        },
        {
          q: 'What is the next number in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, ___?',
          c: '21',
          d: ['18', '20', '24'],
          exp: 'In the Fibonacci sequence, each number is the sum of the two preceding ones: 8 + 13 = 21.'
        },
        {
          q: 'If 5 machines take exactly 5 minutes to manufacture 5 widgets, how many minutes would it take 100 machines to manufacture 100 widgets?',
          c: '5 minutes',
          d: ['100 minutes', '20 minutes', '50 minutes'],
          exp: 'Each individual machine takes 5 minutes to complete one widget; running 100 machines in parallel produces 100 widgets in 5 minutes.'
        },
        {
          q: 'Complete the analogy: Book is to Reading as Fork is to ___?',
          c: 'Eating',
          d: ['Cooking', 'Sharpening', 'Baking'],
          exp: 'A book is an instrument used primarily for reading; a fork is an instrument used primarily for eating.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Logic and analytical reasoning: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Mathematics': {
      const items = [
        {
          q: 'According to the Pythagorean Theorem, what formula calculates hypotenuse \'c\' of a right triangle with legs \'a\' and \'b\'?',
          c: 'a² + b² = c²',
          d: ['a + b = c', 'a² × b² = c²', 'a² - b² = c²'],
          exp: 'The Pythagorean theorem states that the square of the hypotenuse equals the sum of the squares of the other two sides.'
        },
        {
          q: 'In Euclidean geometry, what is the exact sum of all three interior angles in any planar triangle?',
          c: '180 degrees',
          d: ['360 degrees', '90 degrees', '270 degrees'],
          exp: 'The sum of angles in any planar triangle is always 180° (or π radians).'
        },
        {
          q: 'Solve for variable x in the linear algebraic equation: 3x + 9 = 24.',
          c: 'x = 5',
          d: ['x = 4', 'x = 7', 'x = 6'],
          exp: 'Subtract 9 from both sides: 3x = 15. Divide by 3: x = 5.'
        },
        {
          q: 'What is the mathematical value of a 20% discount calculated on an item priced at $150?',
          c: '$30 savings ($120 final price)',
          d: ['$15 savings', '$25 savings', '$35 savings'],
          exp: '20% of 150 = 0.20 × 150 = $30.'
        },
        {
          q: 'Which of the following numbers is classified as a prime number?',
          c: '17',
          d: ['15', '21', '27'],
          exp: 'A prime number is greater than 1 with no positive divisors other than 1 and itself; 17 is divisible only by 1 and 17.'
        },
        {
          q: 'What is the geometric formula for the area of a circle with radius \'r\'?',
          c: 'Area = π × r²',
          d: ['Area = 2 × π × r', 'Area = π × d', 'Area = 4/3 × π × r³'],
          exp: 'The area of a circle is calculated by multiplying pi by the square of its radius: A = πr².'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Mathematical problem solving: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'English & Grammar': {
      const items = [
        {
          q: 'In English grammar, what part of speech describes, quantifies, or modifies a noun or pronoun?',
          c: 'Adjective',
          d: ['Adverb', 'Preposition', 'Conjunction'],
          exp: 'Adjectives modify or describe nouns and pronouns (e.g., \'gentle breeze\', \'five stars\').'
        },
        {
          q: 'What punctuation mark is used to link two closely related independent clauses without a coordinating conjunction?',
          c: 'Semicolon (;)',
          d: ['Comma (,)', 'Hyphen (-)', 'Slash (/)'],
          exp: 'A semicolon joins two independent clauses that are closely connected in thought when no conjunction is used.'
        },
        {
          q: 'Which word represents the possessive form in the English homophone trio: they\'re / there / their?',
          c: 'Their (e.g., \'their books\')',
          d: ['They\'re (contraction of they are)', 'There (indicating place or direction)', 'Theyre (without apostrophe)'],
          exp: '\'Their\' is the possessive pronoun; \'they\'re\' is a contraction of \'they are\'; and \'there\' refers to location.'
        },
        {
          q: 'Identify the sentence structured in active voice rather than passive voice.',
          c: 'The nurse administered the medication promptly.',
          d: ['The medication was administered by the nurse.', 'The report was prepared by the technician.', 'The test was completed yesterday.'],
          exp: 'In active voice, the subject performs the action directly: \'The nurse (subject) administered (verb) the medication (object)\'.'
        },
        {
          q: 'Which grammatical error occurs when two independent clauses are joined with only a comma without a conjunction?',
          c: 'Comma splice',
          d: ['Dangling modifier', 'Fragment', 'Split infinitive'],
          exp: 'A comma splice is the incorrect joining of two complete independent clauses with a comma alone.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `English grammar and usage: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'USA Tests': {
      const items = [
        {
          q: 'What are the three constitutional branches of the United States federal government?',
          c: 'Legislative, Executive, and Judicial',
          d: ['Federal, State, and Municipal', 'Military, Commercial, and Diplomatic', 'Presidential, Congressional, and Gubernatorial'],
          exp: 'The US Constitution establishes three co-equal branches with checks and balances: Legislative (Congress), Executive (President), and Judicial (Supreme Court).'
        },
        {
          q: 'How many voting United States Senators serve in the US Senate?',
          c: '100 Senators (exactly 2 from each of the 50 states)',
          d: ['435 Senators', '50 Senators', '200 Senators'],
          exp: 'Under Article I of the Constitution, each state is represented by exactly 2 senators, totaling 100.'
        },
        {
          q: 'What collective name is given to the first ten amendments added to the United States Constitution?',
          c: 'The Bill of Rights',
          d: ['The Articles of Confederation', 'The Federalist Papers', 'The Magna Carta'],
          exp: 'Ratified in 1791, the first ten amendments comprise the Bill of Rights, safeguarding fundamental civil liberties.'
        },
        {
          q: 'How many voting members currently comprise the United States House of Representatives?',
          c: '435 voting members',
          d: ['100 members', '538 members', '500 members'],
          exp: 'The Permanent Apportionment Act of 1929 fixed the total number of voting US House Representatives at 435.'
        },
        {
          q: 'What is the standard constitutional term length in years for a United States President?',
          c: '4 years per term',
          d: ['2 years', '6 years', '8 years'],
          exp: 'Article II of the US Constitution establishes a presidential term length of 4 years, limited to two terms by the 22nd Amendment.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `US Civics and Government: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'DMV Test': {
      const items = [
        {
          q: 'What color and geometric shape uniquely identifies a standard traffic STOP sign throughout North America?',
          c: 'Red octagon (eight sides)',
          d: ['Yellow triangle (three sides)', 'Red triangle pointing down', 'Yellow diamond (four sides)'],
          exp: 'A stop sign is always an eight-sided red octagon with white lettering so it is recognizable from front and rear.'
        },
        {
          q: 'What action is required of a driver when encountering a flashing red traffic signal at an intersection?',
          c: 'Come to a complete stop and proceed only when safe, exactly like a stop sign',
          d: ['Slow down and yield without coming to a complete stop', 'Maintain posted speed limit with caution', 'Speed up to clear the intersection quickly'],
          exp: 'A flashing red traffic light operates identically to a stop sign: come to a full stop and yield to traffic and pedestrians.'
        },
        {
          q: 'What general following distance rule is recommended under ideal dry driving conditions to prevent rear-end collisions?',
          c: 'The 3-second rule',
          d: ['The 1-second rule', 'Half a car length at any speed', '10 car lengths regardless of speed'],
          exp: 'The 3-second following rule provides sufficient braking distance at highway speeds under dry conditions.'
        },
        {
          q: 'What is the legal Blood Alcohol Concentration (BAC) limit defining intoxication for non-commercial adult drivers in all 50 US states?',
          c: '0.08% BAC (or 0.05% in Utah)',
          d: ['0.15% BAC', '0.02% BAC', '0.12% BAC'],
          exp: 'Driving with a BAC of 0.08% or higher is illegal per se across all US states (Utah enacted a stricter 0.05% limit).'
        },
        {
          q: 'When approaching a stopped school bus displaying flashing red lights and an extended stop-arm on an undivided roadway, what must you do?',
          c: 'Stop completely from either direction and remain stopped until the lights stop flashing',
          d: ['Slow down to 15 mph and proceed cautiously', 'Sound horn and pass on the left shoulder', 'Only stop if traveling in the same direction as the bus'],
          exp: 'Traffic traveling in both directions on an undivided street must stop for a school bus with flashing red lights until children are clear.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `DMV driving regulations: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'License Plate Quiz': {
      const items = [
        {
          q: 'Which US state famously stamps the slogan \'The Peach State\' across its official motor vehicle license plates?',
          c: 'Georgia',
          d: ['South Carolina', 'Alabama', 'Florida'],
          exp: 'Georgia is celebrated as the Peach State, featuring peaches and peach motifs on state license plates.'
        },
        {
          q: 'Which state features the commemorative motto \'First in Flight\' celebrating the Wright Brothers\' 1903 Kitty Hawk flight?',
          c: 'North Carolina',
          d: ['Ohio', 'Virginia', 'Pennsylvania'],
          exp: 'North Carolina license plates proclaim \'First in Flight\' honoring Orville and Wilbur Wright\'s powered flight at Kitty Hawk.'
        },
        {
          q: 'Which US state proudly bears the official license plate slogan \'The Sunshine State\'?',
          c: 'Florida',
          d: ['California', 'Arizona', 'Hawaii'],
          exp: 'Florida has used \'The Sunshine State\' slogan on state license plates since 1949.'
        },
        {
          q: 'Which state features the iconic nickname \'The Lone Star State\' on its official license plates?',
          c: 'Texas',
          d: ['New Mexico', 'Oklahoma', 'Nevada'],
          exp: 'Texas is universally known as the Lone Star State, commemorating its former status as an independent republic.'
        },
        {
          q: 'Which Midwestern state features the slogan \'Land of 10,000 Lakes\' on standard passenger vehicle plates?',
          c: 'Minnesota',
          d: ['Wisconsin', 'Michigan', 'Illinois'],
          exp: 'Minnesota plates feature \'10,000 Lakes\' highlighting the state\'s abundant natural glacial lakes.'
        },
        {
          q: 'Which state prominently features the nickname \'The Empire State\' on its motor vehicle license plates?',
          c: 'New York',
          d: ['Pennsylvania', 'Massachusetts', 'New Jersey'],
          exp: 'New York license plates bear the proud nickname \'The Empire State\'.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `US state license plates: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Entertainment': {
      const items = [
        {
          q: 'In the Harry Potter universe, which Hogwarts house is symbolized by a lion and colors of scarlet and gold?',
          c: 'Gryffindor',
          d: ['Slytherin', 'Ravenclaw', 'Hufflepuff'],
          exp: 'Gryffindor values bravery, chivalry, and nerve, symbolized by the golden lion mascot.'
        },
        {
          q: 'In Marvel comic books and cinematic films, which superhero identity belongs to billionaire industrialist Tony Stark?',
          c: 'Iron Man',
          d: ['Captain America', 'Thor', 'Hawkeye'],
          exp: 'Tony Stark builds a powered suit of armor to escape captivity and becomes the superhero Iron Man.'
        },
        {
          q: 'In the Star Wars saga, which diminutive ancient Jedi Master trains Luke Skywalker on the swamp planet Dagobah?',
          c: 'Master Yoda',
          d: ['Obi-Wan Kenobi', 'Mace Windu', 'Qui-Gon Jinn'],
          exp: 'Master Yoda trains Luke Skywalker in the ways of the Force in The Empire Strikes Back on the swamp world of Dagobah.'
        },
        {
          q: 'What is the name of the iconic arcade game released in 1980 featuring a yellow circle eating dots while pursued by four ghosts?',
          c: 'Pac-Man',
          d: ['Space Invaders', 'Galaga', 'Donkey Kong'],
          exp: 'Namco\'s Pac-Man, designed by Toru Iwatani, became a worldwide cultural phenomenon upon its 1980 release.'
        },
        {
          q: 'In the Super Mario video game franchise by Nintendo, who is Mario\'s taller green-clad brother?',
          c: 'Luigi',
          d: ['Wario', 'Waluigi', 'Toad'],
          exp: 'Luigi debuted in Mario Bros. (1983) as Mario\'s twin brother in green overalls and cap.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Pop culture and entertainment: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Drama': {
      const items = [
        {
          q: 'In which Shakespearean tragedy does the troubled Danish prince deliver the soliloquy beginning: \'To be, or not to be\'?',
          c: 'Hamlet',
          d: ['Macbeth', 'King Lear', 'Othello'],
          exp: 'Prince Hamlet delivers the famous existential soliloquy \'To be, or not to be, that is the question\' in Act 3, Scene 1.'
        },
        {
          q: 'Which prestigious annual theatrical awards honor excellence in live Broadway theater productions in New York City?',
          c: 'The Tony Awards (Antoinette Perry Awards)',
          d: ['The Academy Awards', 'The Emmy Awards', 'The Grammy Awards'],
          exp: 'The Antoinette Perry Awards for Excellence in Broadway Theatre, known as the Tony Awards, celebrate Broadway stage achievements.'
        },
        {
          q: 'Which American playwright authored the landmark 1949 drama \'Death of a Salesman\' featuring salesman Willy Loman?',
          c: 'Arthur Miller',
          d: ['Tennessee Williams', 'Eugene O\'Neill', 'Edward Albee'],
          exp: 'Arthur Miller won the Pulitzer Prize for Drama for Death of a Salesman, examining the tragedy of the American dream through Willy Loman.'
        },
        {
          q: 'What is the theatrical term for a dramatic speech delivered by an actor alone on stage, revealing their inner thoughts?',
          c: 'Soliloquy',
          d: ['Dialogue', 'Prologue', 'Epilogue'],
          exp: 'A soliloquy is an utterance spoken aloud by a character when alone on stage to convey innermost thoughts directly to the audience.'
        },
        {
          q: 'In Shakespeare\'s tragedy \'Romeo and Juliet\', what are the names of the two feuding noble families in Verona?',
          c: 'The Capulets and the Montagues',
          d: ['The Lancasters and the Yorks', 'The Borgias and the Medicis', 'The Macbeths and the Macduffs'],
          exp: 'Romeo Montague and Juliet Capulet are the star-crossed lovers separated by their families\' ancient grudge.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Theater and dramatic arts: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Celebrity': {
      const items = [
        {
          q: 'Which legendary American entertainer earned the global title \'The King of Pop\' with record-shattering albums like \'Thriller\'?',
          c: 'Michael Jackson',
          d: ['Prince', 'Stevie Wonder', 'David Bowie'],
          exp: 'Michael Jackson released Thriller in 1982, which remains the best-selling music album of all time worldwide.'
        },
        {
          q: 'Which beloved Hollywood actress starred as the elegant Holly Golightly in the 1961 film \'Breakfast at Tiffany\'s\'?',
          c: 'Audrey Hepburn',
          d: ['Marilyn Monroe', 'Grace Kelly', 'Elizabeth Taylor'],
          exp: 'Audrey Hepburn earned an Oscar nomination and cinematic immortality for her portrayal of Holly Golightly in Breakfast at Tiffany\'s.'
        },
        {
          q: 'What rare and prestigious entertainment industry acronym represents winning an Emmy, Grammy, Oscar, and Tony award?',
          c: 'EGOT',
          d: ['GOAT', 'QUAD', 'APEX'],
          exp: 'An EGOT is the grand slam of American show business, attained by winning Emmy, Grammy, Oscar, and Tony awards.'
        },
        {
          q: 'Which music superstar holds the all-time record for the most Grammy Award wins in music history?',
          c: 'Beyoncé',
          d: ['Taylor Swift', 'Aretha Franklin', 'Madonna'],
          exp: 'Beyoncé holds the record with over 32 Grammy Awards won across her solo and group career.'
        },
        {
          q: 'Which iconic singer and actor was famously known by the affectionate moniker \'Ol\' Blue Eyes\' and \'The Chairman of the Board\'?',
          c: 'Frank Sinatra',
          d: ['Dean Martin', 'Tony Bennett', 'Bing Crosby'],
          exp: 'Frank Sinatra was celebrated for his distinctive voice, charisma, and blue eyes throughout his legendary career.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Celebrity biography and cultural icons: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Music': {
      const items = [
        {
          q: 'What is the standard pitch tuning from lowest pitch to highest pitch on a 6-string acoustic or electric guitar?',
          c: 'E - A - D - G - B - E',
          d: ['D - G - C - F - A - D', 'C - E - G - B - D - F', 'E - B - G - D - A - E'],
          exp: 'Standard guitar tuning from the 6th string to the 1st string is E2 - A2 - D3 - G3 - B3 - E4.'
        },
        {
          q: 'Which classical music composer completed his monumental Ninth Symphony (including the \'Ode to Joy\') while completely deaf?',
          c: 'Ludwig van Beethoven',
          d: ['Wolfgang Amadeus Mozart', 'Johann Sebastian Bach', 'Franz Schubert'],
          exp: 'Beethoven composed his 9th Symphony between 1822 and 1824 despite profound hearing loss, conducting the premiere in Vienna.'
        },
        {
          q: 'What Italian musical tempo term instructs musicians to perform in a quick, lively, and brisk tempo?',
          c: 'Allegro',
          d: ['Adagio (slow and stately)', 'Largo (broad and dignified)', 'Andante (walking pace)'],
          exp: 'Allegro means cheerful or brisk in Italian, indicating a tempo typically between 120 and 156 beats per minute.'
        },
        {
          q: 'Which musical clef, wrapping around the second line of the musical staff, is also known as the G clef?',
          c: 'Treble Clef',
          d: ['Bass Clef (F clef)', 'Alto Clef', 'Tenor Clef'],
          exp: 'The treble clef spirals around the G line above middle C, establishing the pitch reference for high-register instruments.'
        },
        {
          q: 'Which English rock band from Liverpool featured members John Lennon, Paul McCartney, George Harrison, and Ringo Starr?',
          c: 'The Beatles',
          d: ['The Rolling Stones', 'The Who', 'Led Zeppelin'],
          exp: 'The Beatles formed in Liverpool in 1960 and became the most critically acclaimed and commercially successful band in history.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Music theory and history: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    case 'Cartoon Characters': {
      const items = [
        {
          q: 'In which 1928 synchronized sound animated short film did Walt Disney\'s Mickey Mouse make his historic debut?',
          c: 'Steamboat Willie',
          d: ['Plane Crazy', 'The Gallopin\' Gaucho', 'Fantasia'],
          exp: 'Steamboat Willie premiered in November 1928 as one of the first animated films with synchronized sound, launching Mickey Mouse.'
        },
        {
          q: 'Which famous animated rabbit created by Warner Bros. is renowned for munching a carrot and asking \'What\'s up, doc?\'?',
          c: 'Bugs Bunny',
          d: ['Roger Rabbit', 'Daffy Duck', 'Buster Bunny'],
          exp: 'Bugs Bunny made his official debut in 1940\'s A Wild Hare, voiced by the legendary Mel Blanc.'
        },
        {
          q: 'In the animated series \'The Simpsons\', what iconic pastry is Homer Simpson famously obsessed with eating?',
          c: 'Pink-frosted sprinkled donuts',
          d: ['Chocolate chip cookies', 'Apple strudel', 'Custard tarts'],
          exp: 'Homer Simpson\'s catchphrase \'Mmm... donuts\' and obsession with pink-glazed sprinkled donuts is a running comedy hallmark.'
        },
        {
          q: 'In Nickelodeon\'s beloved cartoon, where under the sea does SpongeBob SquarePants live inside a pineapple?',
          c: 'Bikini Bottom',
          d: ['Atlantis Reef', 'Coral Cove', 'Deep Trench Bay'],
          exp: 'SpongeBob lives with his pet snail Gary inside a two-story pineapple at 124 Conch Street in Bikini Bottom.'
        },
        {
          q: 'What breed of dog is the cowardly, mystery-solving Hanna-Barbera cartoon canine Scooby-Doo?',
          c: 'Great Dane',
          d: ['Bloodhound', 'Saint Bernard', 'Golden Retriever'],
          exp: 'Scooby-Doo was designed by Iwao Takamoto as a lovable, slightly clumsy Great Dane with a fondness for Scooby Snacks.'
        },
        {
          q: 'What leafy canned vegetable does Popeye the Sailor Man consume to instantly acquire superhuman strength?',
          c: 'Spinach',
          d: ['Kale', 'Broccoli', 'Collard greens'],
          exp: 'Popeye pops open a can of spinach whenever he needs sudden bursts of muscular strength to overcome Bluto.'
        }
      ];
      const selected = pick(items, index);
      return {
        question: `Animation and cartoon trivia: ${selected.q}`,
        correct: selected.c,
        distractors: selected.d,
        explanation: selected.exp
      };
    }

    default: {
      return {
        question: `Knowledge test question regarding ${category} - ${subcategory}: Which statement accurately describes key principles in this domain?`,
        correct: `Core fundamental principle of ${subcategory}`,
        distractors: [
          `Unrelated alternative concept in ${category}`,
          `Secondary unrelated principle`,
          `Historical distractor claim`
        ],
        explanation: `This question reinforces fundamental educational concepts within ${category} under ${subcategory}.`
      };
    }
  }
}

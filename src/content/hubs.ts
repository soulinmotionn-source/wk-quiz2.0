/**
 * Long-form, original study-guide content for the priority topic hubs.
 * Each hub is rendered below the quiz launcher on its category page and feeds
 * the FAQ structured data. Only categories listed here are indexed by search
 * engines (see src/seo/indexing.ts); the rest stay noindex until they get the
 * same treatment.
 */

export interface HubSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface HubContent {
  slug: string;
  /** H2 above the guide on the category page */
  headline: string;
  /** Keyword-led <title> (before the site name) */
  seoTitle: string;
  /** Meta description (≈150 chars) */
  seoDescription: string;
  intro: string[];
  sections: HubSection[];
  faqs: { question: string; answer: string }[];
  /** Plain-language note shown under the guide */
  note?: string;
  reviewed: string; // YYYY-MM
}

const MEDICAL_NOTE =
  'WKQuiz is an independent study site. It is not affiliated with the NCSBN, any nursing board or any exam provider, and the questions are original practice material, not real exam items. Content is for education only and is not medical advice.';

export const HUBS: HubContent[] = [
  {
    slug: 'nclex',
    headline: 'NCLEX practice questions: what the exam tests and how to study',
    seoTitle: 'Free NCLEX Practice Questions With Rationales',
    seoDescription:
      'Practice NCLEX-style questions on priority, delegation, safety and pharmacology. Every question has a rationale, plus a study guide and answers to common NCLEX questions.',
    reviewed: '2026-11',
    note: MEDICAL_NOTE,
    intro: [
      'The NCLEX-RN and NCLEX-PN are the licensing exams for nurses in the United States. They are computerized adaptive tests: the software chooses each question based on how you answered the last one, and stops when it is confident whether you are above or below the passing standard.',
      'These practice questions follow the way the exam thinks. Most items ask you to decide what to do first, which client to see first, or which statement shows that teaching worked. Every question here ends with a rationale, because the reasoning is what transfers to exam day, not the individual fact.'
    ],
    sections: [
      {
        heading: 'What the NCLEX-RN covers',
        paragraphs: [
          'The test plan is built on “client needs.” Published percentages are approximate and change between test plan cycles, so check the NCSBN website for the current version before your exam. The largest areas are:'
        ],
        bullets: [
          'Management of care (delegation, prioritization, advocacy, informed consent)',
          'Pharmacological and parenteral therapies (dosage, adverse effects, high-alert drugs, IV therapy)',
          'Physiological adaptation and reduction of risk potential (labs, complications, monitoring)',
          'Safety and infection control (precautions, falls, error prevention)',
          'Basic care and comfort, health promotion, and psychosocial integrity'
        ]
      },
      {
        heading: 'How the exam is delivered',
        paragraphs: [
          'The NCLEX-RN gives between 85 and 150 questions over a maximum of five hours, and the NCLEX-PN gives between 85 and 205 questions. Since 2023 the exam has also included Next Generation NCLEX item types such as case studies, bow-tie items, matrix grids and extended multiple response. Passing is not a percentage: the exam estimates your ability and compares it with a fixed passing standard.'
        ]
      },
      {
        heading: 'Five reasoning frameworks worth knowing',
        bullets: [
          'ABC (airway, breathing, circulation): threats to the airway come before almost everything else.',
          'Maslow’s hierarchy: physiological needs outrank safety, and safety outranks comfort and education.',
          'Assess before you act: unless the client is clearly unstable, collect data before intervening.',
          'The five rights of delegation: right task, circumstance, person, direction and communication, and supervision.',
          'Acute, unstable and new problems come before chronic, stable and expected findings.'
        ]
      },
      {
        heading: 'A realistic four-week plan',
        paragraphs: [
          'In week one, review the content you find hardest and take short practice sets (10 to 15 questions) to find gaps. In weeks two and three, practice by topic and write one sentence explaining every question you miss. In week four, take mixed sets under timed conditions, then stop adding new material two days before the exam. Reading rationales for questions you answered correctly is just as useful as reading them for the ones you missed, because you often guessed right for the wrong reason.'
        ]
      },
      {
        heading: 'Common mistakes',
        bullets: [
          'Choosing an answer because it is the longest or most technical-sounding.',
          'Treating the question as “what is the right thing to do” rather than “what is the best next step for this client now.”',
          'Memorizing lab values without knowing what to do about an abnormal one.',
          'Skipping rationales to complete more questions.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these the real NCLEX questions?',
        answer:
          'No. They are original practice questions written for study. The real exam items are confidential, and no legitimate site can provide them.'
      },
      {
        question: 'How many questions are on the NCLEX-RN?',
        answer:
          'Between 85 and 150, with a five-hour limit. The exam can end early once it is confident of the result, so finishing at 85 does not mean you failed.'
      },
      {
        question: 'What is a passing score on the NCLEX?',
        answer:
          'There is no percentage score. The exam estimates your ability level and passes you when it is confident you are above the passing standard.'
      },
      {
        question: 'How many practice questions should I do?',
        answer:
          'Quality matters more than volume. Many students do a few thousand across all sources, but only if they read the rationale for every item and revisit weak areas.'
      },
      {
        question: 'What is the difference between NCLEX-RN and NCLEX-PN?',
        answer:
          'They share the same format, but the PN test plan reflects practical nursing scope: 85 to 205 questions, with more weight on direct care and less on management of care.'
      }
    ]
  },

  {
    slug: 'nursing',
    headline: 'Nursing fundamentals: the skills every nurse learns first',
    seoTitle: 'Nursing Fundamentals Quiz: Practice Questions and Study Guide',
    seoDescription:
      'Test your nursing fundamentals: nursing process, vital signs, infection control and patient safety. Questions include explanations and a short study guide.',
    reviewed: '2026-11',
    note: MEDICAL_NOTE,
    intro: [
      'Fundamentals is the first nursing course and the foundation for everything that follows. The questions here cover the nursing process, vital signs, infection control, safe medication administration and communication, with an explanation after each answer.'
    ],
    sections: [
      {
        heading: 'The nursing process (ADPIE)',
        paragraphs: [
          'Nurses work in a cycle: assess, diagnose, plan, implement and evaluate. Assessment always comes first, and evaluation sends you back to assessment. When a question asks what to do next, check which step the client is on. If the problem has not been assessed, the answer is almost always to gather more data.'
        ]
      },
      {
        heading: 'Vital signs you should know cold',
        bullets: [
          'Adult heart rate: about 60 to 100 beats per minute at rest',
          'Adult respiratory rate: about 12 to 20 breaths per minute',
          'Blood pressure: below 120/80 mmHg is considered normal in the commonly used US guideline',
          'Temperature: roughly 36.1 to 37.2 °C (97 to 99 °F), with normal variation through the day',
          'Oxygen saturation: usually 95% or higher; some chronic lung conditions have lower targets set by the provider'
        ]
      },
      {
        heading: 'Preventing infection',
        paragraphs: [
          'Hand hygiene is the single most effective way to stop infection spreading. Use soap and water for visibly soiled hands and after contact with Clostridioides difficile, because alcohol rubs do not reliably destroy spores. Standard precautions apply to every client; add contact, droplet or airborne precautions based on how the organism spreads.'
        ]
      },
      {
        heading: 'Safe medication administration',
        bullets: [
          'Verify the client with two identifiers, such as name and date of birth, never the room number.',
          'Check the right client, drug, dose, route and time, and also the right documentation, reason and response.',
          'Know the usual angle for an intramuscular injection: 90 degrees.',
          'Report and document any error, assess the client first, and file an incident report.'
        ]
      },
      {
        heading: 'How to study fundamentals',
        paragraphs: [
          'Practice skills out loud: describe what you would do and why. Use mnemonics for lists, but tie each one to a client scenario. Review the questions you miss after a day, not immediately, to test what has stuck.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the nursing process?',
        answer:
          'A five-step problem-solving method: assessment, diagnosis, planning, implementation and evaluation. It is how nurses make and review care decisions.'
      },
      {
        question: 'Which vital signs are most important to learn first?',
        answer:
          'Heart rate, respiratory rate, blood pressure, temperature and oxygen saturation, together with pain. Know normal ranges and what changes are urgent.'
      },
      {
        question: 'Why use two patient identifiers?',
        answer:
          'Room and bed numbers change, so they are unreliable. Two identifiers such as full name and date of birth prevent wrong-client errors.'
      },
      {
        question: 'Is this a substitute for my nursing course?',
        answer:
          'No. It is a revision tool. Follow your instructor’s materials and your facility’s policies for real care.'
      }
    ]
  },

  {
    slug: 'medical',
    headline: 'Medical terminology: learn to build and decode medical words',
    seoTitle: 'Medical Terminology Quiz: Prefixes, Suffixes and Roots',
    seoDescription:
      'Practice medical terminology with prefix, root and suffix questions, common abbreviations and clinical terms. Free quiz with explanations and a study guide.',
    reviewed: '2026-11',
    note: MEDICAL_NOTE,
    intro: [
      'Most medical words are built from a few reusable parts. Once you know about 100 of them, you can read words you have never seen before. This quiz trains the three skills students struggle with: breaking a word apart, building a word from a meaning, and recognizing common abbreviations.'
    ],
    sections: [
      {
        heading: 'How medical words are built',
        paragraphs: [
          'A term usually has a root (the body part or subject), a suffix (what is happening) and sometimes a prefix (a modifier). A combining vowel, usually “o”, joins parts that would be hard to say together. For example, gastr/o/enter/itis combines stomach, intestine and inflammation, so it means inflammation of the stomach and intestines.'
        ]
      },
      {
        heading: 'Suffixes worth memorizing first',
        bullets: [
          '-itis: inflammation (arthritis, hepatitis)',
          '-ectomy: surgical removal (appendectomy)',
          '-otomy: cutting into (craniotomy)',
          '-ostomy: creating an opening (colostomy)',
          '-plasty: surgical repair (rhinoplasty)',
          '-emia: condition of the blood (anemia, hypoglycemia)',
          '-megaly: enlargement (cardiomegaly)'
        ]
      },
      {
        heading: 'Prefixes that cause the most mix-ups',
        bullets: [
          'hyper- (above, excessive) versus hypo- (below, deficient)',
          'tachy- (fast) versus brady- (slow)',
          'dys- (difficult, abnormal) versus eu- (normal)',
          'intra- (within) versus inter- (between)',
          'peri- (around) versus endo- (within)'
        ]
      },
      {
        heading: 'Abbreviation safety',
        paragraphs: [
          'Abbreviations save time but cause errors. The Joint Commission maintains a “Do Not Use” list that includes “U” for units, “QD” for daily, trailing zeros such as 5.0 mg, and “MS” for morphine or magnesium sulfate. When in doubt, spell it out. PRN means as needed, BID means twice a day and NPO means nothing by mouth.'
        ]
      },
      {
        heading: 'Study method',
        paragraphs: [
          'Study roots by body system rather than alphabetically, say terms out loud, and use flashcards that include a full term, not just the part. Quiz yourself in both directions: from term to meaning and from meaning to term.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What are the three parts of a medical term?',
        answer: 'Root, suffix and prefix, often joined by a combining vowel. Not every word has all three.'
      },
      {
        question: 'What is the difference between -ostomy and -otomy?',
        answer:
          '-otomy means cutting into an organ, and -ostomy means creating a permanent or temporary opening, as with a colostomy.'
      },
      {
        question: 'How many word parts should I learn?',
        answer:
          'Around 100 to 150 common parts cover most terms you will meet in a first terminology course.'
      },
      {
        question: 'Why are some abbreviations unsafe?',
        answer:
          'They can be misread, for example “U” for units looks like a zero. Organizations such as the Joint Commission keep lists of abbreviations to avoid.'
      }
    ]
  },

  {
    slug: 'anatomy-physiology',
    headline: 'Anatomy and physiology: a quick tour of the body’s systems',
    seoTitle: 'Anatomy and Physiology Quiz: Body Systems Practice Questions',
    seoDescription:
      'Free anatomy and physiology quiz covering the skeletal, muscular, cardiovascular, respiratory and nervous systems, with explanations and study tips.',
    reviewed: '2026-11',
    note: 'WKQuiz is an independent study site. Content is for education only and is not medical advice.',
    intro: [
      'Anatomy is what the body is made of; physiology is how it works. The questions here move across the major systems so you can test yourself on structure, function and the links between them.'
    ],
    sections: [
      {
        heading: 'The skeletal system',
        paragraphs: [
          'An adult skeleton has 206 bones. The vertebral column has 33 vertebrae in total: 7 cervical, 12 thoracic and 5 lumbar, plus 5 fused sacral and 4 fused coccygeal vertebrae. The femur is the longest and strongest bone, and the stapes in the middle ear is the smallest.'
        ]
      },
      {
        heading: 'The heart and circulation',
        bullets: [
          'The heart has four chambers: two atria that receive blood and two ventricles that pump it out.',
          'The right side sends oxygen-poor blood to the lungs; the left side sends oxygen-rich blood to the body.',
          'Arteries carry blood away from the heart and veins carry it back; capillaries are where exchange happens.',
          'The left ventricle has the thickest wall because it pumps against the highest pressure.'
        ]
      },
      {
        heading: 'Breathing and gas exchange',
        paragraphs: [
          'Air travels through the nose or mouth, pharynx, larynx, trachea and bronchi to the alveoli, where oxygen moves into the blood and carbon dioxide moves out. The diaphragm is the main muscle of inspiration.'
        ]
      },
      {
        heading: 'The nervous and endocrine systems',
        paragraphs: [
          'The nervous system uses fast electrical signals; the endocrine system uses slower hormones. The central nervous system is the brain and spinal cord, and the peripheral nervous system carries signals to and from the rest of the body. The skin is the body’s largest organ.'
        ]
      },
      {
        heading: 'Study tips',
        bullets: [
          'Draw each system from memory, then compare it with a textbook.',
          'Learn the Latin and Greek roots; they describe location and function.',
          'Study structure and function together: ask “why is it built this way?”',
          'Use spaced repetition: review a topic after one day, one week and one month.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How many bones are in the adult human body?',
        answer: '206 in most adults. Babies are born with more, which fuse as they grow.'
      },
      {
        question: 'What is the difference between anatomy and physiology?',
        answer: 'Anatomy studies structure, while physiology studies function. They are best learned together.'
      },
      {
        question: 'Which is the largest organ?',
        answer: 'The skin, by surface area and weight.'
      },
      {
        question: 'Why is the left ventricle thicker than the right?',
        answer:
          'It pumps blood to the entire body against higher pressure, whereas the right ventricle only pumps to the nearby lungs.'
      }
    ]
  },

  {
    slug: 'dmv-test',
    headline: 'DMV practice test: rules of the road explained',
    seoTitle: 'Free DMV Practice Test: Permit Questions With Explanations',
    seoDescription:
      'Practice for your driver permit test with questions on road signs, right of way, safe driving and alcohol laws. Free DMV practice test with explanations.',
    reviewed: '2026-11',
    note: 'WKQuiz is not affiliated with any state DMV or government agency. Traffic laws vary by state: use your state driver handbook as the official source, and treat these questions as practice.',
    intro: [
      'The written permit test checks that you know traffic signs, right-of-way rules, safe driving habits and the effects of alcohol and drugs. These practice questions focus on rules that are the same, or nearly the same, in most states, and each answer is explained so you understand why.'
    ],
    sections: [
      {
        heading: 'How the written test works',
        paragraphs: [
          'Each state sets its own number of questions and passing mark, so check your state’s driver handbook. Typical tests have about 20 to 50 multiple-choice questions and require a score somewhere between 70% and 85%. Many states also test road signs with images.'
        ]
      },
      {
        heading: 'Road sign colors and shapes',
        bullets: [
          'Red: stop, yield or prohibition',
          'Yellow: warning (diamond shape is the most common)',
          'Orange: construction and temporary work zones',
          'Green: directions and distances',
          'Blue: motorist services such as fuel and food',
          'Brown: parks and recreational areas',
          'Octagon: stop only; pennant: no-passing zone; round: railroad crossing ahead'
        ]
      },
      {
        heading: 'Right-of-way rules that appear again and again',
        bullets: [
          'At a four-way stop, the first vehicle to arrive goes first; if two arrive together, the driver on the right goes first.',
          'When turning left on a plain green light, yield to oncoming traffic and pedestrians.',
          'In a roundabout, yield to vehicles already in the circle.',
          'Pedestrians in a crosswalk have the right of way.',
          'Stop for school buses with flashing red lights on an undivided road, in both directions.'
        ]
      },
      {
        heading: 'Stopping distance and safe following',
        paragraphs: [
          'Stopping distance is your perception distance, plus reaction distance, plus braking distance. Speed matters a great deal: doubling your speed roughly quadruples your braking distance. In good conditions, keep at least a three-second gap behind the vehicle ahead, and add time in rain, fog or at night.'
        ]
      },
      {
        heading: 'Alcohol, drugs and distraction',
        paragraphs: [
          'The legal blood alcohol limit for drivers 21 and over is 0.08% in nearly every state, but impairment begins earlier. Drivers under 21 face zero-tolerance laws. Phones, passengers, food and fatigue all take attention off the road, and the safest policy is to remove the temptation before you drive.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How many questions are on the DMV written test?',
        answer: 'It depends on the state, but usually between 20 and 50. Check your state’s handbook for the exact number and passing score.'
      },
      {
        question: 'Do these questions match my state’s test?',
        answer: 'They cover general rules found in most states. Always study your state’s official driver handbook, because speed limits, fines and some signals differ.'
      },
      {
        question: 'What is the best way to pass the permit test?',
        answer: 'Read your state handbook, then take practice quizzes and review every explanation. Re-take sets that contain questions you missed.'
      },
      {
        question: 'What happens if I fail the permit test?',
        answer: 'Most states let you retake it after a short wait or a fee. The rules vary, so check your local DMV.'
      }
    ]
  },

  {
    slug: 'geography',
    headline: 'US state capitals and world geography',
    seoTitle: 'US State Capitals Quiz and World Geography Practice',
    seoDescription:
      'Learn all 50 US state capitals and test your world geography with free quizzes, memory tips and fun facts about capitals that are not the biggest city.',
    reviewed: '2026-11',
    note: 'Country and capital information changes rarely, but borders and names do change. Check an atlas or official source for the latest details.',
    intro: [
      'Geography questions reward pattern recognition. Knowing why Sacramento, not Los Angeles, is California’s capital turns a memorized fact into a story you can recall. The questions here cover US state capitals first, then countries, capitals and physical features around the world.'
    ],
    sections: [
      {
        heading: 'Why capitals are often not the biggest city',
        paragraphs: [
          'Many state capitals were chosen for central location, political compromise or access to rivers, not size. Albany, Sacramento, Tallahassee, Springfield, Olympia, Juneau, Pierre, Montpelier and Harrisburg are all capitals that are much smaller than their state’s largest city. That is the most common trap on state-capital quizzes.'
        ]
      },
      {
        heading: 'Capital pairs students mix up',
        bullets: [
          'Lincoln (Nebraska) versus Topeka (Kansas)',
          'Columbus (Ohio) versus Columbia (South Carolina)',
          'Jackson (Mississippi) versus Jefferson City (Missouri)',
          'Santa Fe (New Mexico) versus Phoenix (Arizona)',
          'Olympia (Washington) versus Salem (Oregon)'
        ]
      },
      {
        heading: 'Memory tips that work',
        bullets: [
          'Learn regionally, five or six states at a time.',
          'Group capitals by shared names or themes, such as capitals named for presidents.',
          'Draw or label a blank map from memory.',
          'Use a quiz in short daily sessions rather than one long cram.'
        ]
      },
      {
        heading: 'Beyond the United States',
        paragraphs: [
          'World geography has the same traps: Canberra is Australia’s capital, not Sydney; Ottawa is Canada’s, not Toronto; Brasília is Brazil’s, not Rio de Janeiro. Start with continents and the largest countries, then fill in region by region.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How many states and capitals are there?',
        answer: 'There are 50 states, each with one capital city. Washington, D.C. is the national capital and is not part of any state.'
      },
      {
        question: 'What is the oldest US state capital?',
        answer: 'Santa Fe, New Mexico, founded in 1610, is generally recognized as the oldest capital city in the United States.'
      },
      {
        question: 'What is the fastest way to learn all 50 capitals?',
        answer: 'Study by region, use short daily quizzes, and focus extra time on the capitals that are not the largest city.'
      },
      {
        question: 'Are these questions good for school geography tests?',
        answer: 'Yes, as practice. Teachers may use specific lists, so check your class materials too.'
      }
    ]
  },

  {
    slug: 'science',
    headline: 'General science: the ideas behind the questions',
    seoTitle: 'Science Quiz: Biology, Chemistry, Physics and Earth Science',
    seoDescription:
      'Free science quiz with questions on cells, atoms, forces, energy and space. Each answer includes an explanation and the key idea behind it.',
    reviewed: '2026-11',
    intro: [
      'Good science questions test understanding, not just vocabulary. Each question here includes an explanation of the idea behind the answer, so you can reason about similar problems you have not seen.'
    ],
    sections: [
      {
        heading: 'Biology in five facts',
        bullets: [
          'Cells are the basic unit of life; the mitochondria produce most of a cell’s usable energy as ATP.',
          'DNA stores genetic information using four bases: adenine pairs with thymine, and cytosine pairs with guanine.',
          'Photosynthesis turns carbon dioxide and water into glucose and oxygen using light energy.',
          'Natural selection acts on variation within a population over many generations.',
          'The human body has about 37 trillion cells, according to widely cited estimates.'
        ]
      },
      {
        heading: 'Chemistry essentials',
        paragraphs: [
          'Atoms are made of protons, neutrons and electrons. The periodic table currently lists 118 elements ordered by atomic number (the number of protons). Acids have a pH below 7, bases above 7, and pure water is neutral at about 7.'
        ]
      },
      {
        heading: 'Physics you can use',
        bullets: [
          'Light travels at about 299,792 kilometers per second in a vacuum.',
          'Newton’s second law: force equals mass times acceleration.',
          'Energy is conserved: it changes form but is not created or destroyed.',
          'Gravity on Earth’s surface accelerates objects at about 9.8 m/s².'
        ]
      },
      {
        heading: 'Earth and space',
        paragraphs: [
          'The Sun is a star that holds more than 99% of the Solar System’s mass. Earth’s tilt of about 23.5 degrees causes the seasons, not its distance from the Sun. The atmosphere is roughly 78% nitrogen and 21% oxygen.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How many elements are on the periodic table?',
        answer: 'There are 118 confirmed elements.'
      },
      {
        question: 'What causes the seasons?',
        answer: 'The tilt of Earth’s axis, about 23.5 degrees, changes how directly sunlight hits each hemisphere through the year.'
      },
      {
        question: 'What is the powerhouse of the cell?',
        answer: 'The mitochondrion, which makes most of the cell’s ATP through cellular respiration.'
      },
      {
        question: 'How can I get better at science quizzes?',
        answer: 'Explain each answer in your own words and link it to a real-world example.'
      }
    ]
  },

  {
    slug: 'history',
    headline: 'History quizzes: key events, people and turning points',
    seoTitle: 'History Quiz: US and World History Practice Questions',
    seoDescription:
      'Test your knowledge of US and world history with questions on key events, leaders and turning points, with clear explanations and a quick timeline guide.',
    reviewed: '2026-11',
    intro: [
      'History is easier to remember as a story of cause and effect than as a list of dates. The questions here ask what happened, who was involved and why it mattered, and every answer comes with the context.'
    ],
    sections: [
      {
        heading: 'A short US timeline',
        bullets: [
          '1776: the Declaration of Independence is adopted',
          '1787: the Constitution is written in Philadelphia',
          '1861 to 1865: the Civil War; the 13th Amendment ends slavery in 1865',
          '1920: the 19th Amendment protects women’s right to vote',
          '1941 to 1945: United States involvement in World War II',
          '1964 and 1965: the Civil Rights Act and the Voting Rights Act'
        ]
      },
      {
        heading: 'Turning points in world history',
        paragraphs: [
          'The Agricultural Revolution allowed settled societies. The Renaissance and the printing press (around 1450) spread ideas quickly, and the Industrial Revolution, starting in Britain in the late 1700s, changed how people worked and lived. The two world wars reshaped borders and led to the United Nations in 1945.'
        ]
      },
      {
        heading: 'How to study history',
        bullets: [
          'Build timelines and ask what caused each event and what it led to.',
          'Learn people with their roles, not just their names.',
          'Tie events to places by using maps.',
          'Test yourself on causes and consequences, not only dates.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Who wrote the Declaration of Independence?',
        answer: 'Thomas Jefferson was the main author, working with a committee that included John Adams and Benjamin Franklin.'
      },
      {
        question: 'When did the Civil War end?',
        answer: 'The major fighting ended in the spring of 1865.'
      },
      {
        question: 'How do I remember dates?',
        answer: 'Anchor each date to a cause and a consequence. Remembering the story helps you recall the number.'
      }
    ]
  }
];

export const HUB_SLUGS = new Set(HUBS.map(h => h.slug));

export function getHub(slug: string | undefined): HubContent | undefined {
  return HUBS.find(h => h.slug === slug);
}

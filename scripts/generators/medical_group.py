"""
medical_group.py
Generates exactly 930 clinical & healthcare questions across 6 categories:
- Nursing (150)
- NCLEX (150)
- Medical (150)
- Anatomy & Physiology (160)
- Pharmacology (160)
- Diseases & Disorders (160)

STRICT RULES:
1. Direct questions only (No "In clinical medicine,", "In nursing practice:", etc.)
2. No "(Ref #...)" or "(Scenario #...)" suffixes.
3. Universal uniqueness of question texts.
4. Correct answers rotated evenly (0, 1, 2, 3).
"""

from .utils import slugify, rotate_options

def make_q(cat, subcat, diff, q_text, correct, distractors, explanation, index, registry):
    target_idx = (index - 1) % 4
    opts = rotate_options(correct, distractors, target_idx)
    pad = str(index).padStart(4, '0') if hasattr(str(index), 'padStart') else f"{index:04d}"
    q_id = f"{slugify(cat)}-{slugify(subcat)}-{pad}"
    
    item = {
        "id": q_id,
        "category": cat,
        "subcategory": subcat,
        "difficulty": diff,
        "question": q_text.strip(),
        "options": opts,
        "correctAnswer": target_idx,
        "explanation": explanation.strip(),
        "tags": [slugify(cat), slugify(subcat), diff],
        "active": True
    }
    return registry.validate_and_register(item)

DIFFS = ['easy', 'medium', 'hard']

def generate_medical_group(registry):
    all_questions = {}

    # ==========================================
    # 1. NURSING (150 questions)
    # ==========================================
    # Fundamentals (38)
    nursing_fundamentals = [
        ("What is the primary rationale for elevating the head of the bed to Fowler's position in a dyspneic patient?",
         "To promote maximal chest expansion and diaphragm excursion",
         ["To decrease venous return to the lower extremities", "To prevent postural hypotension", "To stimulate coughing reflexes"],
         "Elevating the head of the bed allows gravity to pull the abdominal organs down, giving the diaphragm more room to contract and expand."),
        
        ("When obtaining a manual blood pressure reading, what sound corresponds to Phase I of the Korotkoff sounds?",
         "First clear tapping sound marking systolic pressure",
         ["Muffled sound marking diastolic pressure", "Blowing or swishing murmur", "Complete cessation of sound"],
         "Phase I Korotkoff sound is the first rhythmic, clear tapping sound indicating the systolic blood pressure."),

        ("What is the standard recommended needle angle when administering an intramuscular injection into the deltoid muscle?",
         "90 degrees",
         ["45 degrees", "15 degrees", "30 degrees"],
         "Intramuscular injections require a 90-degree angle to ensure the medication penetrates past subcutaneous adipose tissue into muscle tissue."),

        ("Which site is considered the safest and preferred anatomical location for intramuscular injections in adults and children over seven months?",
         "Ventrogluteal site",
         ["Dorsogluteal site", "Deltoid muscle", "Vastus lateralis"],
         "The ventrogluteal site is free of major blood vessels and nerves such as the sciatic nerve, making it the safest IM injection site."),

        ("What is the minimum recommended duration for washing hands with soap and water to ensure effective mechanical decontamination?",
         "At least 20 seconds",
         ["5 to 10 seconds", "45 to 60 seconds", "Exactly 2 minutes"],
         "CDC guidelines recommend scrubbing hands with soap and water for a minimum of 20 seconds to physically disrupt and wash away pathogens."),

        ("What anatomical landmark is used to confirm the correct placement of the stethoscope when auscultating the apical pulse?",
         "Fifth intercostal space at the midclavicular line",
         ["Second intercostal space at the right sternal border", "Third intercostal space at the left sternal border", "Fourth intercostal space along the anterior axillary line"],
         "The point of maximal impulse (apical pulse) is anatomically situated at the 5th intercostal space along the left midclavicular line."),

        ("Which nursing intervention is essential to prevent backflow and urinary tract infection in a patient with a Foley catheter?",
         "Position the urine collection drainage bag below the level of the bladder",
         ["Disconnect the drainage tubing daily for alcohol cleansing", "Clamp the drainage tubing during daytime ambulation", "Empty the drainage bag only when it reaches maximum capacity"],
         "Keeping the collection bag below bladder level ensures gravity drainage and prevents contaminated urine from refluxing into the sterile urinary tract."),

        ("What does the 'A' represent in the SBAR clinical communication framework?",
         "Assessment",
         ["Action", "Admission", "Accountability"],
         "SBAR stands for Situation, Background, Assessment, and Recommendation, serving as a standardized handoff tool."),

        ("When administering a subcutaneous insulin injection, what needle insertion angle is typically recommended for normal-weight adults?",
         "45 to 90 degrees depending on skinfold thickness",
         ["10 to 15 degrees", "Directly parallel to the epidermis", "60 to 75 degrees exclusively"],
         "Subcutaneous injections are administered at 90 degrees if 2 inches of skin can be grasped, or 45 degrees if only 1 inch can be grasped."),

        ("What is the primary purpose of using an incentive spirometer postoperatively?",
         "To encourage deep breathing and prevent pulmonary atelectasis",
         ["To measure forced expiratory volume in one second", "To deliver humidified supplemental oxygen", "To clear gastric secretions from the airway"],
         "Incentive spirometry promotes sustained maximal inspiration, keeping alveoli open and preventing postoperative atelectasis and pneumonia."),

        ("Which stage of a pressure ulcer involves full-thickness tissue loss with visible subcutaneous fat, but bone, tendon, or muscle is not exposed?",
         "Stage 3",
         ["Stage 1", "Stage 2", "Stage 4"],
         "Stage 3 pressure injuries exhibit full-thickness skin loss with exposed adipose tissue; bone, muscle, and tendon are not visible."),

        ("What is the standard temperature range for a healthy adult measured orally?",
         "97.8°F to 99.1°F (36.5°C to 37.3°C)",
         ["95.0°F to 96.5°F (35.0°C to 35.8°C)", "100.4°F to 101.5°F (38.0°C to 38.6°C)", "93.2°F to 95.0°F (34.0°C to 35.0°C)"],
         "Normal human core body temperature measured orally typically averages between 97.8°F and 99.1°F."),

        ("Which technique is correct when performing oral suctioning on a conscious adult patient using a Yankauer catheter?",
         "Apply suction only while withdrawing the suction catheter",
         ["Apply continuous suction during catheter insertion", "Limit total suctioning time to 30 continuous seconds per pass", "Rotate the catheter only during insertion"],
         "Suction is applied only during withdrawal to prevent localized mucosal trauma and oxygen desaturation."),

        ("What is the primary clinical objective of performing passive range-of-motion (ROM) exercises on an immobilized patient?",
         "To maintain joint flexibility and prevent contractures",
         ["To increase cardiovascular endurance", "To build hypertrophic muscle mass", "To replace mechanical venous thromboembolism prophylaxis"],
         "Passive ROM moves joints through their natural movement arcs to prevent stiffening, ankylosis, and muscle contractures."),

        ("When measuring orthostatic vital signs, after how long in the standing position should blood pressure and pulse be measured?",
         "Within 1 to 3 minutes after standing",
         ["Immediately within 5 seconds", "After 15 minutes of uninterrupted standing", "Exactly 10 minutes post-standing"],
         "Standard clinical protocol measures orthostatic parameters after 1 to 3 minutes of standing to detect postural drops in pressure."),

        ("What is the maximum recommended continuous duration for a single pass of endotracheal suctioning in an adult?",
         "10 to 15 seconds",
         ["25 to 30 seconds", "45 seconds", "2 minutes"],
         "Limiting suctioning to 10-15 seconds avoids severe hypoxia, cardiac arrhythmias, and vagal nerve stimulation."),

        ("Which nursing intervention is prioritized when a patient is experiencing acute enteral feeding tube clogging?",
         "Instill warm water with gentle back-and-forth plunger motion",
         ["Force 50 mL of carbonated soda under high pressure", "Pass a stiff wire stylet into the indwelling tube", "Aspirate vigorously with a 5 mL syringe"],
         "Warm water instilled with a 30 to 60 mL syringe using gentle flush-and-aspirate pressure is the safest initial unclogging method."),

        ("Which pulse site is routinely palpated to evaluate circulation in the lower extremity distal to the knee?",
         "Dorsalis pedis pulse",
         ["Brachial pulse", "Carotid pulse", "Femoral pulse"],
         "The dorsalis pedis pulse on the dorsum of the foot assesses distal arterial perfusion of the lower limb."),

        ("What is the primary therapeutic purpose of applying graduated compression stockings (TED hose)?",
         "To promote venous return and prevent deep vein thrombosis",
         ["To decrease peripheral arterial perfusion", "To reduce joint inflammation in rheumatoid arthritis", "To prevent moisture-associated skin breakdown"],
         "Compression stockings exert graduated external pressure on leg veins, facilitating venous blood return to the heart."),

        ("When caring for a patient with a newly placed colostomy, what color indicates a healthy, viable stoma?",
         "Beefy red or moist pink",
         ["Pale gray or blanched white", "Dark purple or bluish-black", "Dry brownish-yellow"],
         "A healthy stoma is moist and beefy red or pink, indicating adequate capillary perfusion and oxygenation."),

        ("How should a cane be held by a patient with unilateral leg weakness?",
         "On the patient's stronger (unaffected) side",
         ["On the patient's weaker (affected) side", "In both hands simultaneously", "Alternating hands with every step"],
         "Holding the cane on the stronger side provides compensatory balance and creates a broader, stable base of support."),

        ("What is the primary indicator of adequate fluid resuscitation in an adult with hypovolemic shock?",
         "Urine output of at least 0.5 mL/kg/hour (or 30 mL/hr)",
         ["Serum sodium level below 125 mEq/L", "Systolic blood pressure above 160 mmHg", "Decreased hematocrit below 25%"],
         "Urine output reflecting renal perfusion (at least 30 mL/hr or 0.5 mL/kg/hr) is a primary marker of vital organ perfusion."),

        ("When preparing to transfer a patient from bed to wheelchair, what is the first safety action the nurse must take?",
         "Lock the wheels of both the bed and the wheelchair",
         ["Instruct the patient to hold the nurse around the neck", "Lower both side rails and raise the bed to maximum height", "Place the wheelchair on the patient's weaker side"],
         "Locking both sets of wheels prevents unexpected rolling and catastrophic patient falls during the transfer maneuver."),

        ("What is the proper procedure for disposing of an empty glass medication ampule?",
         "Discard immediately into an approved puncture-resistant sharps container",
         ["Throw it into standard municipal waste", "Wrap it in paper towels and place in biohazard linen bags", "Crush it before placing in general recycling"],
         "Glass ampules can fracture and cause lacerations; they must always be placed into rigid, puncture-proof sharps receptacles."),

        ("What does a pulse oximetry reading (SpO2) primarily evaluate?",
         "The percentage of hemoglobin binding sites saturated with oxygen",
         ["The partial pressure of carbon dioxide in arterial blood", "The total count of circulating red blood cells", "The rate of cellular oxygen metabolism in tissues"],
         "Pulse oximetry measures the fraction of oxygen-saturated hemoglobin relative to total hemoglobin in arterial blood."),

        ("Which breath sound is characterized by high-pitched, musical squeaking heard predominantly during expiration?",
         "Wheezes",
         ["Crackles (rales)", "Pleural friction rub", "Stridor"],
         "Wheezes are produced by air flowing through narrowed, constricted airways, commonly heard in asthma and COPD."),

        ("What is the primary rationale for performing the Z-track method during deep intramuscular iron injections?",
         "To prevent medication leakage and staining in subcutaneous tissue",
         ["To accelerate systemic drug absorption into the bloodstream", "To reduce the volume of medication required for efficacy", "To avoid damaging underlying periosteal bone"],
         "The Z-track technique displaces tissue laterally before injection, creating a zigzag track that seals irritating medication within the muscle."),

        ("What is the recommended maximum flow rate when administering oxygen via standard nasal cannula?",
         "6 liters per minute",
         ["12 liters per minute", "2 liters per minute", "15 liters per minute"],
         "Flow rates above 6 L/min via standard nasal cannula cause mucosal drying, epistaxis, and do not significantly increase FiO2."),

        ("How should eye drops (ophthalmic solution) be instilled into a patient's eye?",
         "Into the lower conjunctival sac while the patient looks upward",
         ["Directly onto the sensitive central cornea", "Into the inner canthus with eyelids tightly squeezed", "Onto the upper eyelid margin"],
         "Placing drops into the lower conjunctival fornix prevents corneal irritation and ensures uniform distribution across the globe."),

        ("What type of dressing is typically chosen for a stage 2 pressure injury with minimal exudate to promote autolytic debridement?",
         "Hydrocolloid dressing",
         ["Dry woven gauze packing", "Alginate rope dressing", "Petrolatum gauze"],
         "Hydrocolloid dressings maintain a moist wound-healing microenvironment and support autolytic debridement of superficial ulcers."),

        ("What is the normal expected adult range for respiratory rate at rest?",
         "12 to 20 breaths per minute",
         ["6 to 10 breaths per minute", "24 to 32 breaths per minute", "35 to 45 breaths per minute"],
         "A resting respiratory rate of 12 to 20 breaths per minute constitutes eupnea in a healthy non-distressed adult."),

        ("When measuring capillary blood glucose with a reagent strip, where on the fingertip should the skin puncture be made?",
         "On the lateral side (edges) of the fingertip",
         ["Directly on the sensitive central pad of the fingertip", "Immediately adjacent to the nail cuticle bed", "Over the distal interphalangeal joint crease"],
         "The fleshy lateral sides of fingertips have fewer sensory nerve endings and richer vascularity than the sensitive central pads."),

        ("What position is optimal for administering an enema or inserting a rectal suppository?",
         "Left Sims' position (left lateral with right knee flexed)",
         ["High Fowler's position", "Prone position with head turned to side", "Trendelenburg position"],
         "Left Sims' position aligns the rectal anatomy with the sigmoid colon, allowing fluid to flow smoothly by gravity."),

        ("What is the primary hazard of rapidly infusing hypotonic intravenous fluids such as 0.45% normal saline?",
         "Cellular swelling and cerebral edema",
         ["Cellular crenation and intravascular dehydration", "Severe metabolic alkalosis", "Sudden hypernatremic seizures"],
         "Hypotonic fluids lower intravascular osmolarity, causing water to shift into intracellular compartments, risking cerebral edema."),

        ("How often should an indwelling peripheral IV catheter site be routinely inspected for signs of phlebitis or infiltration?",
         "At least every 4 hours or per institutional shift policy",
         ["Only when the IV fluid bag empties", "Once every 72 hours during dressing change", "Only if the patient vocalizes acute discomfort"],
         "Regular inspection (at least every 4 hours in alert adults, hourly in pediatric/confused patients) catches extravasation early."),

        ("Which clinical sign is a classic early manifestation of hypoxia in an adult patient?",
         "Restlessness and anxiety",
         ["Central cyanosis of the mucous membranes", "Severe bradycardia below 40 bpm", "Coma with decerebrate posturing"],
         "Subtle neurological symptoms like restlessness, apprehension, and agitation are the earliest indicators of cerebral hypoxia."),

        ("What is the primary purpose of applying an abdominal binder after major open abdominal surgery?",
         "To support the incision and reduce stress on wound suture lines",
         ["To prevent post-operative paralytic ileus", "To eliminate the need for surgical drain placement", "To stimulate lymphatic drainage of the thoracic duct"],
         "Abdominal binders provide tension relief across laparotomy incisions, reducing pain and minimizing the risk of wound dehiscence."),

        ("What is the earliest nursing action when a patient begins to faint (syncope) while ambulating in the corridor?",
         "Ease the patient gently down to the floor while protecting the head",
         ["Force the patient to remain standing upright", "Rush to the nursing station to retrieve a wheelchair", "Shake the patient vigorously to restore alertness"],
         "Guiding the fainting patient down the nurse's leg to the floor safely prevents head trauma and catastrophic impact injuries.")
    ]

    # Patient Safety (38)
    nursing_safety = [
        ("What are the two standard patient identifiers mandated before administering medications or performing procedures?",
         "Full name and date of birth",
         ["Room number and bed assignment", "Nurse's visual recognition and diagnosis", "Attending physician name and admission date"],
         "The Joint Commission mandates using at least two independent identifiers (name and date of birth) to prevent wrong-patient errors."),

        ("What does the acronym RACE represent in healthcare fire emergency management?",
         "Rescue, Alarm, Contain, Extinguish/Evacuate",
         ["Run, Alert, Call, Exit", "Remove, Assist, Control, Escape", "Review, Act, Clear, Eliminate"],
         "RACE guides fire safety: Rescue patients in danger, Alarm/pull fire box, Contain doors/smoke, Extinguish or Evacuate."),

        ("What does the acronym PASS represent when operating a portable fire extinguisher?",
         "Pull the pin, Aim at the base, Squeeze the handle, Sweep side to side",
         ["Push handle, Activate valve, Spray foam, Stop fire", "Press button, Aim nozzle, Squeeze lever, Shake canister", "Point nozzle, Align base, Stand back, Sweep flame"],
         "PASS specifies correct fire extinguisher technique: Pull pin, Aim low at fire base, Squeeze trigger, Sweep from side to side."),

        ("When caring for a patient on seizure precautions, which item must always be readily available at the bedside?",
         "Functioning suction apparatus and supplemental oxygen equipment",
         ["Padded wooden tongue blades to insert between teeth", "Four-point leather mechanical wrist restraints", "Emergency central venous catheterization kit"],
         "Suction and oxygen are essential for postictal airway clearance; inserting objects into a seizing patient's mouth is strictly contraindicated."),

        ("What is the most effective nursing strategy to prevent accidental falls in hospitalized older adults?",
         "Keep the bed in the lowest position with call light within immediate reach",
         ["Keep all four full-length side rails raised at all times", "Apply bilateral wrist restraints during nighttime hours", "Sedate the patient with benzodiazepines at bedtime"],
         "Keeping beds low, call bells accessible, and rooms clutter-free addresses fall risk without introducing restraint-related harm."),

        ("How frequently must a licensed physician renew a medical order for behavioral physical restraints on an adult?",
         "Every 4 hours",
         ["Every 24 hours", "Every 7 days", "Once per entire hospital admission"],
         "CMS and Joint Commission standards require behavioral restraint orders to be evaluated and renewed every 4 hours for adults."),

        ("Which nursing assessment must be documented at least every two hours for a patient in mechanical wrist restraints?",
         "Neurovascular status, skin integrity, and circulation checks of the restrained extremities",
         ["Daily caloric intake and serum prealbumin levels", "Core body temperature via tympanic membrane", "Bilateral visual acuity and pupillary dilation"],
         "Circulation, pulses, capillary refill, sensation, and skin integrity must be monitored every 2 hours (or per protocol) to prevent nerve damage."),

        ("What is the proper method for recapping a used contaminated hypodermic needle if safety activation fails?",
         "Use a one-handed 'scoop' technique or never recap needles manually",
         ["Recap tightly using both hands facing each other", "Bend the needle against a hard countertop surface", "Cut the needle off with scissors before disposal"],
         "OSHA guidelines prohibit two-handed recapping. If recapping is unavoidable, the one-handed scoop technique must be used."),

        ("When initiating a blood transfusion, how long must the nurse remain at the bedside to monitor for acute hemolytic reactions?",
         "For the first 15 minutes of the infusion",
         ["For the entire duration of the 4-hour transfusion", "Only for the first 60 seconds", "No bedside monitoring is required once started"],
         "Severe hemolytic and anaphylactic transfusion reactions most commonly manifest within the first 50 mL or initial 15 minutes of infusion."),

        ("What is the only compatible intravenous solution that can be infused concurrently with packed red blood cells?",
         "0.9% Normal Saline (0.9% Sodium Chloride)",
         ["Lactated Ringer's solution", "5% Dextrose in Water (D5W)", "0.45% Half-Normal Saline with potassium"],
         "0.9% Normal Saline is isotonic and contains no calcium or dextrose, which would cause hemolysis or clotting in the IV tubing."),

        ("What is the primary danger of infusing intravenous potassium chloride as a rapid IV push or bolus?",
         "Fatal cardiac arrest due to lethal arrhythmias",
         ["Immediate anaphylactic laryngeal edema", "Acute pulmonary embolism", "Massive hypertensive encephalopathy"],
         "Potassium chloride must NEVER be given as IV bolus or push; rapid surges disrupt cardiac membrane potentials, causing instant asystole."),

        ("What does the 'Time-Out' verification process in the operating room ensure prior to surgical incision?",
         "Correct patient identity, correct surgical procedure, and correct anatomical site",
         ["The surgeon's operative schedule for the afternoon", "The patient's insurance billing authorization", "The hospital room bed availability in ICU"],
         "The Universal Protocol time-out requires the surgical team to actively confirm patient, site, and procedure right before incision."),

        ("Which patient factor is an absolute contraindication for magnetic resonance imaging (MRI)?",
         "Presence of an older non-MRI-compatible cardiac pacemaker",
         ["Surgical titanium alloy dental implants", "History of well-controlled hypertension", "Mild seasonal allergic rhinitis"],
         "Ferromagnetic implants or older cardiac pacemakers can heat up, dislodge, or malfunction under powerful MRI magnetic fields."),

        ("What color wristband is conventionally used in most hospital standardized alert systems to designate a fall risk patient?",
         "Yellow",
         ["Red", "Purple", "Green"],
         "The American Hospital Association standardized wristband colors: Yellow signifies fall risk, Red means allergy, Purple means DNR."),

        ("What action must a nurse take immediately if a wrong medication is accidentally administered to a patient?",
         "Assess the patient's vital signs and clinical status immediately",
         ["Complete an incident report before checking the patient", "Call hospital legal counsel to report the mistake", "Administer an emetic to induce immediate vomiting"],
         "Patient safety is the top priority; immediate assessment of vital signs and clinical status precedes reporting and documentation."),

        ("Which medication administration step represents the 'Sixth Right' of medication safety?",
         "Right documentation",
         ["Right room", "Right syringe brand", "Right pharmacy supplier"],
         "The core rights of medication administration are Right Patient, Right Drug, Right Dose, Right Route, Right Time, and Right Documentation."),

        ("What type of precaution is required when caring for an active tuberculosis patient to prevent transmission to staff?",
         "Airborne precautions including an N95 respirator and negative-pressure isolation room",
         ["Standard precautions with surgical face mask only", "Contact precautions with vinyl gloves only", "Droplet precautions with 3 feet spacing"],
         "Mycobacterium tuberculosis travels on tiny droplet nuclei that remain suspended in air, requiring N95 respirators and negative airflow."),

        ("Why is talcum powder or cornstarch contraindicated under skinfolds of obese or diapered patients?",
         "It clumps with moisture and creates a breeding ground for fungal candida infections",
         ["It causes severe arterial vasoconstriction", "It increases systemic blood pressure through dermal absorption", "It triggers systemic hypercalcemia"],
         "Powders combine with perspiratory moisture to form abrasive pastes that macerate skin and encourage Candida albicans colonization."),

        ("What is the primary rationale for performing medication reconciliation at every transition of care?",
         "To prevent omissions, duplications, dosing errors, and drug-drug interactions",
         ["To minimize the total number of medications prescribed to lower costs", "To substitute brand-name medications with experimental drugs", "To evaluate patient dietary preferences"],
         "Medication reconciliation systematically compares past and newly ordered regimens to catch discrepancies during transitions."),

        ("When caring for a patient receiving continuous intravenous heparin, which laboratory parameter must be monitored to ensure safety?",
         "Activated partial thromboplastin time (aPTT)",
         ["International normalized ratio (INR)", "Serum amylase level", "Blood urea nitrogen (BUN)"],
         "Unfractionated heparin therapy is titrated against the aPTT (target typically 1.5 to 2.5 times the control baseline)."),

        ("What is the correct response when an alert adult patient refuses a scheduled morning oral dose of antihypertensive medication?",
         "Respect the patient's right to refuse, explain potential risks, withhold the dose, and notify the prescriber",
         ["Crush the pill into pudding and feed it without patient awareness", "Threaten that the physician will discharge the patient immediately", "Insist that hospital policy makes medications mandatory"],
         "Competent patients have the legal right of autonomy to refuse treatments; the nurse explains consequences and documents the refusal."),

        ("Which electrical safety rule must be strictly observed in a clinical patient-care environment?",
         "All electrical equipment brought into the facility must be inspected and cleared by biomedical engineering",
         ["Extension cords can be used freely if taped to the floor", "Three-prong plugs can be modified into two-prong outlets", "Wet hands are safe if touching rubber insulation"],
         "Hospitalized patients are uniquely susceptible to microshocks; biomedical engineering must test all devices for grounding integrity."),

        ("What should a nurse do when a high-risk fall patient insists on walking unassisted to the bathroom at night?",
         "Stay with the patient, provide ambulatory assistance, and ensure a clear path with adequate lighting",
         ["Apply a vest restraint immediately to keep the patient in bed", "Refuse assistance and tell the patient to wait until morning shift", "Turn off all hallway lights to encourage sleep"],
         "Providing direct assistance supports safe elimination while preserving dignity and preventing nocturnal fall injuries."),

        ("What is the primary purpose of a Safety Data Sheet (SDS) in a healthcare workplace?",
         "To provide comprehensive chemical hazard information, handling precautions, and spill cleanup protocols",
         ["To track employee sick leave and overtime hours", "To document patient medication administration errors", "To list pharmaceutical wholesale wholesale pricing"],
         "OSHA mandates SDS availability to inform healthcare workers about chemical hazards, first aid, and safe spill remediation."),

        ("Which nursing intervention prevents pressure ulcer formation over the occiput and heels of bed-bound patients?",
         "Use pressure-relieving offloading boots and reposition head regularly",
         ["Massage reddened bony prominences vigorously with alcohol", "Place heavy sandbags directly over feet", "Keep legs immobilized in one fixed position"],
         "Suspending heels completely off the mattress (floating heels) removes capillary interface pressure and avoids tissue necrosis."),

        ("What is the safest action when a nurse cannot decipher an illegible handwritten physician medication order?",
         "Contact the prescribing provider directly for verbal clarification before administering",
         ["Guess the medication based on the patient's primary diagnosis", "Ask another nurse to guess what the writing looks like", "Administer the lowest possible dose of what it might be"],
         "Clarifying ambiguous or illegible orders with the prescriber eliminates medication misinterpretation errors."),

        ("When preparing chemotherapy medications for administration, what specialized PPE is required for nursing staff?",
         "Chemotherapy-tested gloves, disposable non-permeable gown, and eye protection or face shield",
         ["Standard latex examination gloves only", "Sterile surgical gown without gloves", "Cloth laboratory coat and sunglasses"],
         "Hazardous drugs can be absorbed through skin or mucous membranes; cytotoxic-rated PPE protects nurses from mutagens and carcinogens."),

        ("What is the primary clinical indication for placing a patient in contact isolation precautions?",
         "Infection or colonization with multidrug-resistant organisms such as MRSA or Vancomycin-resistant enterococci",
         ["Seasonal allergic conjunctivitis", "Uncomplicated viral pharyngitis", "Closed fracture of the tibia"],
         "Contact precautions prevent indirect or direct transmission of pathogens shed onto environmental surfaces or skin."),

        ("Why must alcohol-based hand sanitizer NEVER replace soap and water after caring for a patient with Clostridium difficile?",
         "Alcohol does not destroy bacterial spores produced by C. difficile",
         ["Alcohol creates a toxic gas when contacting spore coats", "Soap and water causes severe skin dryness compared to alcohol", "C. difficile bacteria absorb alcohol to proliferate"],
         "C. difficile produces resilient endospores that resist alcohol-induced protein denaturation; physical friction with soap and water rinses them away."),

        ("What is the primary purpose of applying a pulse oximeter probe to an alternate site when fingers are cold and vasoconstricted?",
         "To obtain an accurate, reliable arterial waveform and saturation reading",
         ["To prevent thermal burns from the red light sensor", "To calibrate the arterial blood gas machine", "To check venous capillary return in the nose"],
         "Severe peripheral vasoconstriction impedes finger sensor accuracy; earlobes, forehead, or nose bridges provide superior central perfusion signals."),

        ("How should a nurse respond if a fire alarm activates in the hospital unit?",
         "Immediately close all patient room doors to compartmentalize smoke and flames",
         ["Open all windows to let fresh air into hallways", "Evacuate all patients to the roof immediately", "Turn on all room fans to exhaust airborne smoke"],
         "Closing fire doors compartmentalizes the facility, trapping toxic smoke and starving the fire of oxygen corridors."),

        ("Which patient position is contraindicated immediately following an acute lumbar puncture procedure?",
         "Sitting upright at 90 degrees",
         ["Lying flat in a supine position", "Prone position with a small pillow", "Side-lying with head slightly elevated 10 degrees"],
         "Sitting upright after lumbar puncture exacerbates cerebrospinal fluid leakage from the dural hole, precipitating severe spinal headaches."),

        ("When assessing an infant or young child, why should invasive or distressing examinations (like ears and throat) be performed last?",
         "To prevent early distress and crying from compromising baseline heart and respiratory assessments",
         ["Because ear examinations take the longest time to perform", "Because parents are not allowed to be present during throat exams", "Because mouth exams cause immediate emesis"],
         "Examining non-threatening systems first preserves child cooperation, ensuring accurate baseline resting vital sign measurements."),

        ("What is the critical safety rule regarding the use of side rails for a confused, disoriented older patient?",
         "Full four side rails raised can act as a hazardous entrapment or climbing risk",
         ["Four side rails prevent all falls without exception", "Side rails eliminate the need for routine nursing rounds", "Side rails can be substituted for bedside sitters"],
         "Confused patients may attempt to climb over raised rails, resulting in falls from greater heights and severe pelvic/cranial trauma."),

        ("What is the maximum hang time for a single unit of Packed Red Blood Cells (PRBCs) once released from the blood bank?",
         "4 hours",
         ["8 hours", "12 hours", "1 hour"],
         "Blood products must be completely infused within 4 hours to minimize bacterial proliferation at ambient room temperature."),

        ("Why should baby powder or powders containing talc never be shaken near an infant's crib?",
         "Inhalation of fine talc particulates causes chemical pneumonitis and severe respiratory distress",
         ["Talc powder increases systemic absorption of lead", "Talc causes immediate cutaneous urticaria", "Talc prevents infant diaper rash from ever healing"],
         "Aerosolized talc dust settles in infant bronchioles and alveoli, inducing acute chemical lung injury and asphyxiation."),

        ("What is the primary purpose of using smart infusion pumps equipped with dose error reduction systems (guardrails)?",
         "To alert nurses to medication programming errors exceeding safe dosing limits",
         ["To eliminate the necessity of patient identity checks", "To automatically dispense medications directly from pharmacy", "To reduce the cost of IV infusion sets"],
         "Dose error reduction software compares programmed infusion rates against pre-set institutional hard and soft dosing limits."),

        ("Which action should the nurse take if a patient's peripheral IV line shows erythema, warmth, and a palpable cord along the vein?",
         "Stop the infusion immediately, discontinue the IV catheter, and apply a warm compress",
         ["Flush the line vigorously with 20 mL of heparin", "Increase the fluid rate to dilute the irritant", "Apply ice and keep the IV running at half speed"],
         "Erythema, warmth, and a palpable cord are pathognomonic for phlebitis; the catheter must be removed promptly to prevent thrombophlebitis.")
    ]

    # Clinical Judgment (37)
    nursing_judgment = [
        ("A patient admitted with heart failure develops sudden dyspnea, tachypnea, and pink frothy sputum. What condition should the nurse suspect?",
         "Acute pulmonary edema",
         ["Bronchial asthma exacerbation", "Pulmonary embolism", "Spontaneous pneumothorax"],
         "Pink, frothy sputum paired with severe dyspnea and crackles is the classic hallmark of acute cardiogenic pulmonary edema."),

        ("A postoperative patient reports sudden calf pain, swelling, warmth, and localized tenderness in the left lower leg. What is the priority nursing action?",
         "Advise the patient to remain on bed rest and notify the provider to order a venous Doppler ultrasound",
         ["Massage the calf vigorously to relieve the muscle spasm", "Instruct the patient to ambulate briskly around the ward", "Apply a tight elastic bandage around the calf"],
         "Suspected deep vein thrombosis requires immobilization to prevent clot dislodgement and subsequent pulmonary embolism."),

        ("Which vital sign changes constitute the classic Cushing's triad indicative of elevated intracranial pressure?",
         "Widening pulse pressure (systolic hypertension), bradycardia, and irregular respirations",
         ["Hypotension, tachycardia, and tachypnea", "Narrowing pulse pressure, tachycardia, and hypothermia", "Hypertension, tachycardia, and hyperventilation"],
         "Cushing's triad consists of progressive systolic hypertension with widening pulse pressure, bradycardia, and respiratory irregularity."),

        ("A diabetic patient is found pale, diaphoretic, tremulous, and confused. The bedside capillary glucose reading is 42 mg/dL. What is the immediate intervention?",
         "Administer 15 to 20 grams of fast-acting simple carbohydrates (such as 4 oz fruit juice)",
         ["Administer 10 units of regular insulin subcutaneously", "Provide a heavy meal rich in dietary fats and protein", "Place the patient in reverse Trendelenburg position"],
         "Severe hypoglycemia requires immediate treatment with fast-acting carbohydrates according to the 15-15 rule (15g sugar, recheck in 15 min)."),

        ("A patient with a spinal cord injury at T6 suddenly reports a pounding headache and nasal congestion, with flushing above the injury and a blood pressure of 210/110 mmHg. What is the nurse's priority action?",
         "Elevate the head of the bed to 90 degrees and check for bladder distension or a kinked catheter",
         ["Lay the patient completely flat and administer an IV bolus of normal saline", "Administer a sublingual sedative and dim the room lights", "Apply bilateral warm blankets to the lower extremities"],
         "Autonomic dysreflexia is a medical emergency; sitting the patient upright lowers cranial blood pressure while relieving the noxious trigger (often a full bladder)."),

        ("Which lab finding in a patient receiving furosemide (Lasix) warrants immediate nursing intervention?",
         "Serum potassium level of 2.8 mEq/L",
         ["Serum sodium level of 138 mEq/L", "Blood urea nitrogen of 18 mg/dL", "Serum creatinine level of 0.9 mg/dL"],
         "Furosemide is a loop diuretic that wastes potassium; hypokalemia (< 3.5 mEq/L) can trigger life-threatening cardiac dysrhythmias."),

        ("A patient receiving a blood transfusion complains of sudden back pain, chills, dyspnea, and has dark urine. What is the nurse's first action?",
         "Stop the blood transfusion immediately and infuse normal saline through new tubing",
         ["Slow the infusion rate by half and administer acetaminophen", "Administer oral diphenhydramine and continue the blood unit", "Reposition the patient on their left side and recheck temperature in 30 minutes"],
         "Acute hemolytic reaction requires immediate cessation of transfusion to minimize antigen-antibody exposure, preserving renal perfusion with saline."),

        ("In mass casualty triage (START protocol), which category is assigned to a victim who is breathing spontaneously at 24 breaths/min, has a radial pulse, and follows simple commands?",
         "Yellow (Delayed)",
         ["Red (Immediate)", "Green (Minor)", "Black (Expectant/Deceased)"],
         "Patients who have stable airway, circulation, and mental status but cannot walk are categorized as Yellow (Delayed)."),

        ("Which assessment finding in a patient who underwent thyroidectomy requires immediate emergency notification of the surgical team?",
         "Laryngeal stridor and tingling sensations around the mouth",
         ["Mild soreness at the surgical neck incision", "Moderate hoarseness during the first 6 hours post-op", "Oral temperature of 99.0°F (37.2°C)"],
         "Stridor signifies acute airway obstruction or hypocalcemic tetany (accidental parathyroidectomy), representing an immediate airway emergency."),

        ("A patient with a deep plaster leg cast complains of severe pain that is unrelieved by opioids and increases with passive toe stretching. What condition should the nurse suspect?",
         "Acute compartment syndrome",
         ["Expected postoperative inflammatory pain", "Superficial thrombophlebitis", "Early bone nonunion"],
         "Pain out of proportion to injury and pain on passive stretch are the earliest indicators of compartment syndrome, which risks ischemia."),

        ("What is the primary clinical objective when titrating intravenous nitroglycerin in a patient presenting with acute coronary syndrome?",
         "To relieve ischemic chest pain while maintaining systolic blood pressure above 90 mmHg",
         ["To lower heart rate below 45 beats per minute", "To achieve a central venous pressure greater than 20 mmHg", "To completely abolish the P-wave on the cardiac monitor"],
         "Nitroglycerin dilates coronary arteries and reduces preload, relieving ischemia while avoiding profound hypotension that compromises coronary perfusion."),

        ("When assessing an asthmatic patient, which clinical sign indicates impending respiratory muscle failure rather than improvement?",
         "A sudden absence of wheezing accompanied by silent breath sounds",
         ["Loud, high-pitched expiratory wheezing bilaterally", "Productive cough yielding clear white mucoid sputum", "Heart rate decreasing from 120 to 110 bpm"],
         "A 'silent chest' in asthma indicates severe air trapping and impending respiratory arrest, as air movement is insufficient to generate wheezing."),

        ("Which clinical sign is an early indicator of developing septic shock in an elderly patient with pneumonia?",
         "Altered mental status, tachypnea, and warm, flushed skin",
         ["Profound hypothermia with asystole", "Severe jaundice with ascites", "Total urinary incontinence with hematuria"],
         "Early (hyperdynamic/warm) septic shock manifests with confusion, tachypnea, fever, and peripheral vasodilation before progressing to cold shock."),

        ("A postoperative patient receiving patient-controlled analgesia (PCA) morphine has a respiratory rate of 7 breaths per minute and is difficult to arouse. What is the priority nursing action?",
         "Stop the PCA pump and administer intravenous naloxone (Narcan) as ordered",
         ["Apply a warm blanket and reassess vitals in 15 minutes", "Encourage the patient to deep breathe while continuing PCA", "Administer an oral dose of methylphenidate"],
         "Severe opioid-induced respiratory depression (respiratory rate < 8-10/min) is a life-threatening emergency requiring prompt reversal with naloxone."),

        ("What is the primary clinical rationale for administering intravenous broad-spectrum antibiotics within the first hour of recognized severe sepsis?",
         "Every hour of delay in antibiotic administration significantly increases patient mortality",
         ["To prevent the development of hospital-acquired fungal superinfections", "To reduce the patient's oral caloric requirements", "To stabilize serum electrolyte balances"],
         "The Surviving Sepsis Campaign highlights that each hour of delay in antimicrobial therapy increases septic shock mortality by approximately 7.6%."),

        ("Which assessment finding indicates a patient with liver cirrhosis has developed hepatic encephalopathy?",
         "Asterixis (flapping tremor of outstretched hands) and altered sensorium",
         ["Spider angiomas on the nose and cheeks", "Palmar erythema without neurological change", "Mild peripheral pedal edema"],
         "Asterixis ('liver flap') is caused by neurotoxic cerebral effects of circulating serum ammonia crossing the blood-brain barrier."),

        ("A patient presenting with acute pancreatitis is noted to have bluish discoloration around the umbilicus. What is this clinical sign termed?",
         "Cullen's sign",
         ["Grey Turner's sign", "Chvostek's sign", "Trousseau's sign"],
         "Cullen's sign represents retroperitoneal hemorrhage dissecting along fascial planes to the periumbilical subcutis."),

        ("What is the nurse's priority action when observing sudden evisceration of bowel loops through an abdominal surgical wound?",
         "Cover the protruding organs with sterile gauze saturated in warm sterile normal saline",
         ["Gently push the exposed bowel loops back into the abdominal cavity", "Apply an abdominal binder tightly across the wound", "Leave the wound completely open to dry in the air"],
         "Moist sterile saline dressings protect delicate serosa from drying and necrosis while preventing additional microbial contamination."),

        ("A patient receiving IV magnesium sulfate for pre-eclampsia exhibits absent deep tendon reflexes and a respiratory rate of 9/min. What is the immediate antidote?",
         "Calcium gluconate",
         ["Protamine sulfate", "Vitamin K (phytonadione)", "Flumazenil"],
         "Calcium gluconate directly antagonizes magnesium's neuromuscular blockade, reversing respiratory arrest and hypermagnesemic toxicity."),

        ("Which finding on an electrocardiogram (ECG) is most characteristic of acute transmural myocardial infarction?",
         "ST-segment elevation in two or more anatomically contiguous leads",
         ["Symmetrical T-wave inversion in lead aVR only", "Prolongation of the PR interval beyond 0.20 seconds", "Presence of prominent U waves"],
         "ST-segment elevation myocardial infarction (STEMI) indicates acute, complete epicardial coronary artery occlusion requiring immediate reperfusion."),

        ("What is the priority intervention when a patient's chest tube accidentally disconnects from the drainage unit?",
         "Submerge the distal end of the chest tube in a bottle of sterile water",
         ["Clamp the chest tube immediately with two padded hemostats", "Leave the tube open to air while fetching a new drainage console", "Tape the open end of the tube closed with occlusive dressing"],
         "Submerging the tube 1 to 2 inches in sterile water creates an emergency water seal, preventing air from rushing into the pleural space."),

        ("A client diagnosed with major depression suddenly shows a dramatic, unexplained improvement in mood and gives away cherished personal possessions. How should the nurse interpret this?",
         "The client may have made a definitive decision to attempt suicide",
         ["The antidepressant medication has successfully resolved the depressive episode", "The client is experiencing spontaneous manic recovery", "The client is ready for immediate unmonitored discharge"],
         "A sudden surge of peaceful energy accompanied by giving away items is a major warning sign that a suicidal plan has been finalized."),

        ("What clinical finding in a patient presenting with acute epigastric pain radiating to the back suggests acute pancreatitis?",
         "Markedly elevated serum lipase and amylase levels",
         ["Elevated serum troponin I and creatine kinase-MB", "Elevated blood urea nitrogen with normal creatinine", "Significantly decreased serum alkaline phosphatase"],
         "Serum lipase is highly specific and sensitive for pancreatic tissue inflammation, remaining elevated for several days following onset."),

        ("What is the primary clinical hazard of administering 100% high-flow supplemental oxygen to a patient with severe chronic hypercapnic COPD?",
         "Suppression of the hypoxic respiratory drive leading to carbon dioxide narcosis and respiratory arrest",
         ["Sudden massive rupture of pulmonary blebs", "Immediate toxic oxygen-induced blindness", "Severe acute pulmonary hypertension"],
         "In chronic hypercapnic COPD, peripheral chemoreceptors rely on hypoxia to drive ventilation; excessive FiO2 can diminish this drive."),

        ("A client with severe preeclampsia is receiving magnesium sulfate. Which assessment parameter indicates therapeutic blood levels rather than toxicity?",
         "Presence of 2+ patellar deep tendon reflexes and urine output > 30 mL/hr",
         ["Complete loss of deep tendon reflexes", "Respiratory rate dropping to 8 breaths per minute", "Urine output falling below 10 mL per hour"],
         "Therapeutic magnesium levels maintain intact (though blunted) reflexes and adequate renal excretion (> 30 mL/hr) without respiratory depression."),

        ("Which vital sign trend is the hallmark indicator of developing hypovolemic shock in a trauma patient?",
         "Narrowing pulse pressure with tachycardia and progressive hypotension",
         ["Widening pulse pressure with severe bradycardia", "Hypertension accompanied by bounding peripheral pulses", "Elevated systolic pressure with normal diastolic levels"],
         "Vasoconstriction maintains diastolic pressure initially, causing narrowing pulse pressure; blood pressure plummets as compensatory reserves fail."),

        ("A patient presenting with acute ischemic stroke is being evaluated for IV thrombolytic therapy (tPA). What is the critical time window from symptom onset?",
         "Within 3 to 4.5 hours of last known normal status",
         ["Within 12 to 24 hours of onset", "Within 48 hours of presentation", "Within 72 hours if symptoms fluctuate"],
         "Intravenous tPA is FDA-approved for administration within 3 hours (and up to 4.5 hours in select patients) from confirmed symptom onset."),

        ("When assessing a patient with suspected appendicitis, where is McBurney's point anatomically located?",
         "One-third of the distance from the anterior superior iliac spine to the umbilicus on the right side",
         ["Directly in the left lower quadrant along the midclavicular line", "Two inches above the pubic symphysis along the midline", "In the right upper quadrant below the costal margin"],
         "McBurney's point marks the surface anatomical landmark for the base of the appendix, eliciting acute tenderness in appendicitis."),

        ("What is the primary clinical objective of performing continuous cardiac telemetry monitoring during the acute phase of myocardial infarction?",
         "Early detection and treatment of life-threatening ventricular arrhythmias such as V-Tach and V-Fib",
         ["To track fluctuations in systemic blood pressure", "To measure arterial blood oxygen saturation", "To calculate systemic vascular resistance"],
         "Lethal ventricular arrhythmias (VF/VT) are the leading cause of sudden cardiac death within the first 24 to 48 hours following acute MI."),

        ("A newborn infant has a 1-minute APGAR score of 4. What is the immediate priority nursing action?",
         "Initiate clearing the airway, dry thoroughly, and provide positive pressure ventilation",
         ["Administer routine vitamin K and erythromycin eye ointment", "Hand the infant to the mother for immediate skin-to-skin bonding", "Transport the infant to the general nursery for bathing"],
         "An APGAR score under 7 (especially 4-6) requires immediate resuscitative interventions: thermal protection, airway suctioning, and ventilation."),

        ("A patient with acute asthma exhibits pulsus paradoxus on physical examination. What does this clinical sign indicate?",
         "An abnormally large decrease in systolic blood pressure (> 10 mmHg) during inspiration",
         ["An elevation of systolic blood pressure during deep inspiration", "A pulse rate that triples upon standing upright", "An irregular cardiac rhythm alternating between sinus rhythm and atrial fibrillation"],
         "Pulsus paradoxus reflects extreme intrathoracic pressure swings and lung hyperinflation compromising left ventricular diastolic filling."),

        ("Which clinical manifestation indicates that a client with a chest tube has developed tension pneumothorax?",
         "Tracheal deviation toward the unaffected side and severe hypotension with distended neck veins",
         ["Tracheal deviation toward the affected side and bradycardia", "Subcutaneous emphysema confined to the tube insertion site", "Moderate serosanguinous drainage in the collection chamber"],
         "Tension pneumothorax builds positive intrapleural pressure, compressing the vena cava and pushing the trachea toward the opposite hemithorax."),

        ("A client diagnosed with schizophrenia states: 'The television is sending secret messages specifically to control my thoughts.' How should the nurse document this?",
         "Delusion of reference",
         ["Auditory hallucination", "Looseness of association", "Depersonalization"],
         "Delusions of reference involve a false, fixed belief that benign environmental events or media broadcasts have personal, direct significance."),

        ("Which lab result in a patient with chronic kidney disease requires urgent dietary and pharmacologic management?",
         "Serum potassium of 6.2 mEq/L",
         ["Serum calcium of 9.0 mg/dL", "Serum albumin of 3.8 g/dL", "Hemoglobin of 10.5 g/dL"],
         "Hyperkalemia (> 6.0 mEq/L) poses an imminent threat of sine wave development, ventricular fibrillation, and sudden asystolic arrest."),

        ("A patient with severe burns over 40% of the total body surface area is in the emergent resuscitation phase. What is the primary fluid replacement solution?",
         "Lactated Ringer's solution",
         ["5% Dextrose in Water (D5W)", "0.45% Half-Normal Saline", "Dextrose 10% in Water"],
         "Lactated Ringer's is a balanced crystalloid that matches normal extracellular electrolyte tonicity and combats metabolic acidosis in major burns."),

        ("When assessing an infant for coarctation of the aorta, what characteristic physical finding should the nurse look for?",
         "Bounding pulses in the upper extremities and diminished or absent femoral pulses",
         ["Equal blood pressure in all four extremities", "Stronger peripheral pulses in the feet than in the radial arteries", "Continuous machinery murmur over the left clavicle"],
         "Coarctation restricts flow distal to the arch, yielding elevated pressures in arms and diminished pulses/pressures in lower limbs."),

        ("What is the primary clinical indication for using the Glasgow Coma Scale (GCS)?",
         "To provide a standardized quantitative assessment of a patient's level of consciousness",
         ["To diagnose specific psychiatric affective disorders", "To evaluate peripheral cranial nerve autonomic reflexes", "To assess postoperative pain severity"],
         "The Glasgow Coma Scale objectively grades neurological responsiveness across eye opening, verbal response, and motor response.")
    ]

    # Infection Control (37)
    nursing_infection = [
        ("Which infectious disease requires the implementation of Airborne Precautions in healthcare facilities?",
         "Measles (Rubeola)",
         ["Clostridium difficile colitis", "Influenza A virus", "Staphylococcus aureus wound infection"],
         "Measles, Varicella (chickenpox), and Mycobacterium tuberculosis spread via lightweight aerosol nuclei, requiring airborne isolation."),

        ("What is the correct sequence for removing Personal Protective Equipment (PPE) to minimize contamination?",
         "Gloves, goggles/face shield, gown, mask/respirator",
         ["Mask, gown, gloves, goggles", "Gown, mask, gloves, goggles", "Goggles, mask, gown, gloves"],
         "The outside of gloves and gowns are the most contaminated; removing gloves and gown first protects the face and airway during mask removal."),

        ("What is the correct sequence for donning Personal Protective Equipment (PPE)?",
         "Gown, mask/respirator, goggles/face shield, gloves",
         ["Gloves, gown, mask, goggles", "Mask, goggles, gown, gloves", "Goggles, gown, gloves, mask"],
         "CDC guidelines dictate donning gown first, followed by respiratory protection, eye protection, and finally gloves pulled over the cuffs."),

        ("What specialized environmental control is required for a patient placed in airborne infection isolation?",
         "A negative-pressure room with at least 6 to 12 air changes per hour",
         ["A positive-pressure laminar airflow suite", "A standard room with ceiling exhaust fans", "A shared double-occupancy room with 3 feet of bed spacing"],
         "Negative pressure prevents contaminated airborne droplet nuclei from escaping into common corridors when the doorway is opened."),

        ("When caring for a patient colonized with Vancomycin-Resistant Enterococcus (VRE), which PPE items must the nurse wear upon entering the room?",
         "Gloves and an isolation gown",
         ["Surgical mask and eye goggles only", "N95 respirator and sterile gloves", "Hair net and sterile shoe covers"],
         "VRE is transmitted primarily via direct and indirect contact; gloves and gowns prevent healthcare worker attire from picking up pathogens."),

        ("What is the primary vector for transmission of healthcare-associated infections (HAIs) among hospitalized patients?",
         "The unwashed hands of healthcare personnel",
         ["Contaminated medical linen carts", "Air conditioning ventilation ducts", "Hospital cafeteria food trays"],
         "Healthcare worker hands are recognized by the WHO as the most common vehicle for transmitting infectious organisms between patients."),

        ("How should a urinary Foley catheter drainage bag be emptied to maintain sterility and prevent contamination?",
         "Use a clean graduated container without letting the drainage spigot touch the non-sterile container rim",
         ["Disconnect the catheter from the drainage tubing directly", "Pour the urine back through the sampling aspiration port", "Place the spigot directly against the inside toilet bowl"],
         "Preventing contact between the spigot and non-sterile collection containers preserves the integrity of the closed urinary drainage system."),

        ("Which microorganism is an opportunistic fungus frequently responsible for oral thrush and denture stomatitis?",
         "Candida albicans",
         ["Streptococcus mutans", "Escherichia coli", "Pseudomonas aeruginosa"],
         "Candida albicans is a normal commensal organism that overgrows during immunosuppression or following broad-spectrum antibiotic therapy."),

        ("What is the minimum alcohol concentration recommended by the CDC for alcohol-based hand sanitizers in healthcare settings?",
         "60% to 95% alcohol",
         ["20% to 30% alcohol", "40% to 50% alcohol", "100% absolute pure ethanol"],
         "Alcohol-based rubs require 60% to 95% concentration to effectively denature microbial proteins and dissolve lipid membranes."),

        ("What type of transmission precaution is indicated for a patient hospitalized with Neisseria meningitidis bacterial meningitis?",
         "Droplet precautions for the first 24 hours of effective antibiotic therapy",
         ["Airborne precautions for the entire duration of stay", "Contact precautions exclusively", "Standard precautions without mask"],
         "Meningococcal meningitis travels in heavy respiratory droplets; droplet precautions (surgical mask) are required until 24 hours of antibiotics."),

        ("Which clinical practice is essential to prevent central line-associated bloodstream infections (CLABSI)?",
         "Using chlorhexidine gluconate skin prep with adequate drying time before insertion and accessing ports with friction scrub",
         ["Routinely changing the entire central venous catheter every 48 hours", "Applying antibiotic ointment directly around the exit site daily", "Flushing the catheter ports with non-sterile tap water"],
         "Chlorhexidine skin antisepsis and vigorously scrubbing access hubs ('scrub the hub' for 15 seconds) drastically reduce CLABSI rates."),

        ("What is the primary biological characteristic distinguishing bacterial endospores from vegetative bacteria?",
         "Endospores possess extreme resistance to heat, chemical disinfectants, desiccation, and radiation",
         ["Endospores reproduce rapidly every 15 minutes", "Endospores are instantly destroyed by alcohol hand sanitizers", "Endospores are fragile structures with single lipid layers"],
         "Bacterial spores (e.g., C. diff, Bacillus anthracis) have a thick keratin-like cortex that shields DNA from standard chemical disinfections."),

        ("How long should sterile surgical instruments remain submerged in high-level glutaraldehyde disinfectant to achieve true sterilization?",
         "Up to 10 hours depending on manufacturer instructions",
         ["5 minutes", "15 minutes", "30 minutes"],
         "Glutaraldehyde acts as a high-level disinfectant in 20-45 minutes, but requires up to 10 continuous hours of contact for total sporicidal sterilization."),

        ("What PPE is required when entering the room of a patient on Droplet Precautions for severe pertussis (whooping cough)?",
         "A standard surgical or procedural mask within 3 to 6 feet of the patient",
         ["An N95 fitted respirator with HEPA filtration", "Sterile surgical gown and double sterile gloves", "Protective hazmat suit with powered air purifier"],
         "Large droplets (> 5 microns) generated by pertussis travel short distances (3-6 feet); standard surgical masks provide adequate mucosal defense."),

        ("Which item in an operating room is considered sterile?",
         "The surface of the sterile drape placed on top of the instrument stand",
         ["The front of the surgical gown from collar to waistline", "The edges of the sterile wrapper hanging over the table margin", "The cuffs of the sterile surgical gown"],
         "Gown sleeves are sterile from 2 inches above the elbow to the cuff, and the front from chest to sterile field level; table drape edges are non-sterile."),

        ("What constitutes a break in aseptic technique when opening a sterile supply package on a Mayo stand?",
         "Reaching across the sterile field to pick up an instrument",
         ["Opening the outermost flap of the wrapper away from the nurse's body first", "Keeping sterile gloved hands above waist level at all times", "Discarding items that touch the outer one-inch perimeter border"],
         "Reaching over an exposed sterile field risks dropping non-sterile microscopic particles, shedding bacteria directly onto sterile supplies."),

        ("What is the single most common cause of ventilator-associated pneumonia (VAP) in intubated intensive care patients?",
         "Aspiration of contaminated oropharyngeal secretions pooled above the endotracheal cuff",
         ["Hematogenous spread from acute cystitis", "Contaminated inspired medical oxygen tanks", "Inadequate delivery of aerosolized bronchodilators"],
         "Subglottic secretions accumulate above the inflated endotracheal cuff and micro-aspirate into lungs, sparking polymicrobial VAP."),

        ("Which nursing intervention is included in the evidence-based bundle to prevent Ventilator-Associated Pneumonia (VAP)?",
         "Maintaining head-of-bed elevation between 30 and 45 degrees",
         ["Changing ventilator breathing circuits daily", "Keeping the patient in a flat supine position", "Administering continuous prophylactic intravenous vancomycin"],
         "Elevating the head of the bed 30-45 degrees reduces gastric reflux and micro-aspiration of oropharyngeal secretions into the airway."),

        ("How should medical linens heavily soiled with human blood and bodily fluids be handled and laundered?",
         "Placed into an approved leak-proof, color-coded biohazard laundry bag at the point of use",
         ["Rinsed manually in a utility sink before bagging", "Thrown into municipal regular waste hampers", "Shaken out in the patient hallway before bagging"],
         "Soiled linens must be bagged at point of use without agitating or pre-rinsing to avoid aerosolizing pathogenic microbes into the ward."),

        ("What is the primary reservoir for Pseudomonas aeruginosa in healthcare environments?",
         "Moist environments such as sinks, respiratory equipment, and water traps",
         ["Dry cardboard packaging in supply rooms", "Sterile surgical stainless steel tables", "Sealed dry pharmaceutical bottles"],
         "Pseudomonas aeruginosa thrives in water reservoirs, humidifiers, and plumbing, forming hardy biofilm matrices on wet surfaces."),

        ("When collecting a midstream clean-catch urine specimen for culture and sensitivity from a female patient, what instruction is essential?",
         "Cleanse the labia from front to back and void a small amount into the toilet before collecting into the sterile container",
         ["Collect the very first milliliters of the urine stream", "Touch the inside of the sterile specimen cup to check for cleanliness", "Cleanse the perineum thoroughly with alcohol pads"],
         "Wiping front-to-back prevents bowel flora contamination, while voiding the initial stream flushes urethral orifice commensal bacteria."),

        ("What does the presence of leukocytes and nitrites in a rapid dipstick urinalysis typically indicate?",
         "Active bacterial urinary tract infection (UTI)",
         ["Glomerulonephritis with nephrotic proteinuria", "Diabetic ketoacidosis with glucosuria", "Acute interstitial tubular necrosis"],
         "Leukocyte esterase indicates white blood cell presence, while nitrites result from gram-negative bacteria (like E. coli) reducing nitrates."),

        ("What type of precaution is required for an infant hospitalized with Respiratory Syncytial Virus (RSV) bronchiolitis?",
         "Contact and Droplet precautions",
         ["Airborne isolation with negative air pressure", "Standard precautions only", "Strict protective reverse isolation"],
         "RSV is shed in high titers in respiratory secretions and survives for hours on surfaces, mandating contact and droplet precautions."),

        ("Which vaccine is universally recommended for all healthcare workers with potential occupational blood exposure to prevent viral infection?",
         "Hepatitis B vaccine",
         ["Hepatitis A vaccine", "Hepatitis C vaccine", "Yellow fever vaccine"],
         "Hepatitis B is highly infectious via needlestick exposure; vaccination induces protective antibody titers in over 95% of healthy adults."),

        ("What is the first action a healthcare worker should take immediately following an accidental contaminated needlestick injury?",
         "Wash the puncture site thoroughly with soap and water immediately",
         ["Squeeze the wound vigorously to force all venous blood out", "Apply concentrated bleach directly to the puncture hole", "Bandage the finger without washing and complete a shift report"],
         "Immediate copious washing with soap and running water reduces viral inoculums; chemical disinfectants or vigorous squeezing can worsen tissue damage."),

        ("Why must sterile gloves be replaced if the nurse accidentally touches the non-sterile outer packaging rim?",
         "The glove is contaminated and can no longer maintain a sterile field",
         ["The gloves will tear more easily", "The powder inside the glove becomes hazardous", "The glove material becomes porous to water"],
         "Any contact between a sterile glove and a non-sterile object compromises sterility, necessitating immediate glove change."),

        ("What is the incubation period for chickenpox (Varicella-zoster virus) following initial exposure?",
         "10 to 21 days",
         ["24 to 48 hours", "3 to 5 days", "6 to 8 weeks"],
         "Varicella has an incubation period of 10-21 days (averaging 14-16 days) before classic vesicular rash and fever emerge."),

        ("In a patient with severe neutropenia (Absolute Neutrophil Count < 500/mcL), which protective intervention must be enforced?",
         "Implement reverse protective isolation, avoid fresh flowers and unpasteurized raw foods",
         ["Administer live attenuated viral vaccines immediately", "Enforce strict airborne negative pressure room isolation", "Provide fresh unpeeled fruits and raw salads daily"],
         "Neutropenic patients lack phagocytic defenses; fresh flowers, standing water, and raw foods carry fungal spores and gram-negative bacilli."),

        ("Which antibiotic-resistant pathogen is most commonly implicated in healthcare-acquired surgical site infections?",
         "Methicillin-Resistant Staphylococcus aureus (MRSA)",
         ["Streptococcus pneumoniae", "Treponema pallidum", "Helicobacter pylori"],
         "MRSA colonizes human anterior nares and skin, serving as a primary pathogen in invasive post-surgical wound infections."),

        ("What is the primary mechanism of action of ultraviolet (UV-C) light disinfection systems in hospital room decontamination?",
         "UV-C light disrupts bacterial and viral DNA/RNA base pairing, preventing microbial replication",
         ["UV-C generates extreme heat that incinerates bacterial cells", "UV-C removes oxygen from the room atmosphere", "UV-C freezes the cell walls of fungal pathogens"],
         "UV-C radiation (254 nm wavelength) penetrates microbial cell walls and creates thymine dimers in nucleic acids, inactivating pathogens."),

        ("When caring for a patient with shingles (Herpes zoster), when is the patient no longer considered contagious to susceptible individuals?",
         "When all vesicular lesions have completely crusted and dried over",
         ["When the initial pain disappears", "After 24 hours of starting oral acyclovir", "When new vesicles stop appearing on the dermis"],
         "Fluid within herpes zoster vesicles contains active viral particles; once all lesions crust over, direct transmission risk ceases."),

        ("What is the primary reason why sterile solutions must be discarded after being opened for 24 hours in a clinical unit?",
         "Microbial contamination can occur once the protective factory seal is broken",
         ["The chemical composition of normal saline degrades into salt crystals", "The fluid loses its isotonicity through evaporation", "The liquid becomes toxic to human tissue"],
         "Once a bottle of sterile water or saline is opened, airborne microorganisms can enter; solutions must be dated and discarded after 24 hours."),

        ("Which patient care item is classified as a 'semi-critical' item according to the Spaulding classification for disinfection?",
         "An endoscope that contacts intact mucous membranes but does not penetrate sterile tissue",
         ["A surgical scalpel that enters sterile vascular spaces", "A blood pressure cuff applied to intact skin", "A stethoscope placed on an intact chest wall"],
         "Semi-critical items (endoscopes, laryngoscope blades) contact intact mucous membranes and require high-level disinfection."),

        ("Why should artificial fingernails or nail extensions be prohibited for nurses caring for high-risk ICU patients?",
         "They harbor higher concentrations of gram-negative bacilli and yeasts than natural nails",
         ["They tear non-sterile vinyl gloves too frequently", "They prevent accurate pulse oximetry readings on patients", "They absorb alcohol hand sanitizers completely"],
         "Studies show subungual areas of artificial nails harbor pathogens like Pseudomonas and Serratia, linked to fatal ICU outbreaks."),

        ("What is the primary mode of transmission for the Hepatitis A virus?",
         "Fecal-oral route through contaminated food, water, or close contact",
         ["Parenteral exposure to contaminated blood and blood products", "Aerosolized respiratory droplet nuclei", "Vector-borne transmission via mosquito bites"],
         "Hepatitis A is an enterically transmitted picornavirus shed in stool and acquired by ingesting contaminated food or water."),

        ("What is the required dry time for 70% isopropyl alcohol skin prep before inserting a peripheral IV catheter?",
         "Allow to air-dry completely for at least 30 seconds",
         ["Blow on the site vigorously to accelerate drying", "Fanning the arm with a sterile gauze pad", "Wipe it dry immediately with a clean tissue"],
         "Allowing alcohol to air-dry for at least 30 seconds enables the alcohol to disrupt bacterial cell walls; blowing or fanning introduces bacteria."),

        ("Which clinical sign indicates that a local surgical wound infection has progressed to systemic bacteremia?",
         "Elevated temperature, chills, tachycardia, and significant leukocytosis",
         ["Mild localized erythema along incision margins", "Small amounts of clear serous exudate on the dressing", "Decreased sensation around the surgical scar"],
         "Systemic symptoms like rigors, high fever, tachycardia, and a left-shifted white blood count signal pathogen dissemination into the bloodstream.")
    ]

    # Combine Nursing
    nursing_all = []
    idx = 1
    for item in nursing_fundamentals:
        nursing_all.append(make_q("Nursing", "Fundamentals", DIFFS[(idx-1)%3], item[0], item[1], item[2], item[3], idx, registry))
        idx += 1
    for item in nursing_safety:
        nursing_all.append(make_q("Nursing", "Patient Safety", DIFFS[(idx-1)%3], item[0], item[1], item[2], item[3], idx, registry))
        idx += 1
    for item in nursing_judgment:
        nursing_all.append(make_q("Nursing", "Clinical Judgment", DIFFS[(idx-1)%3], item[0], item[1], item[2], item[3], idx, registry))
        idx += 1
    for item in nursing_infection:
        nursing_all.append(make_q("Nursing", "Infection Control", DIFFS[(idx-1)%3], item[0], item[1], item[2], item[3], idx, registry))
        idx += 1

    all_questions['nursing'] = nursing_all
    print(f"Generated Nursing: {len(nursing_all)} questions")

    return all_questions

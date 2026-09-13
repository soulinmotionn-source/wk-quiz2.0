"""
data_health.py
Contains comprehensive question banks for:
- NCLEX (150 questions)
- Anatomy & Physiology (160 questions)
- Pharmacology (160 questions)
- Diseases & Disorders (160 questions)
"""

def get_nclex_items():
    # 1. Priority & Delegation (38)
    # 2. Safe & Effective Care (38)
    # 3. Health Promotion (37)
    # 4. Pharmacological Therapies (37)
    return {
        "Priority & Delegation": [
            ("Which task is most appropriate for a registered nurse (RN) to delegate to an unlicensed assistive personnel (UAP)?",
             "Assisting a stable postoperative patient with ambulation in the hallway",
             ["Evaluating a patient's understanding of discharge insulin instructions", "Assessing the surgical dressing of a fresh laparotomy patient", "Administering oral pain medications to a newly admitted patient"],
             "UAP can assist stable patients with basic ADLs and ambulation; clinical assessment, education, and medication administration require licensed nursing judgment."),

            ("Which client should the triage nurse evaluate first in the emergency department?",
             "A 45-year-old with crushing substernal chest pain radiating to the jaw and diaphoresis",
             ["A 20-year-old with an ankle sprain and moderate swelling", "A 60-year-old with chronic lower back pain and normal vital signs", "A 30-year-old with a minor scalp laceration and stable vitals"],
             "Suspected acute coronary syndrome (crushing chest pain with diaphoresis) is an immediate life threat prioritized under emergency triage guidelines."),

            ("Which task can a registered nurse safely delegate to a licensed practical nurse (LPN/LVN)?",
             "Administering routine subcutaneous insulin to a stable diabetic patient",
             ["Formulating the initial nursing care plan for a newly admitted stroke patient", "Conducting the comprehensive admission assessment", "Evaluating patient response to intravenous titratable vasoactive drugs"],
             "LPNs/LVNs can administer routine subcutaneous medications and perform established care routines, but initial assessment, planning, and evaluation remain RN responsibilities."),

            ("A nurse receives report on four patients. Which patient should the nurse assess first?",
             "A patient with acute asthma whose wheezing has suddenly become completely inaudible (silent chest)",
             ["A patient with pneumonia with an oral temperature of 101.2°F (38.4°C)", "A postoperative patient requesting PRN oral analgesia for surgical pain rated 6/10", "A diabetic patient with a pre-meal blood glucose of 145 mg/dL"],
             "A silent chest in acute asthma indicates severe air trapping and impending respiratory arrest, demanding immediate resuscitation."),

            ("Which clinical responsibility can NEVER be delegated by a registered nurse to an unlicensed assistive personnel?",
             "Assessing, teaching, evaluating, or exercising clinical nursing judgment",
             ["Measuring and recording routine vital signs on stable patients", "Assisting an alert patient with morning personal hygiene", "Recording daily oral intake and urinary output volumes"],
             "The American Nurses Association (ANA) delegation principles specify that assessment, nursing diagnosis, goal-setting, and evaluation cannot be delegated."),

            ("Which postoperative client should the nurse visit first after morning shift handoff?",
             "A client who underwent abdominal aortic aneurysm repair with a sudden drop in urine output to 10 mL/hr",
             ["A client after total knee arthroplasty requesting assistance to transfer to a chair", "A client after appendectomy reporting incision pain of 4 out of 10", "A client after cholecystectomy requesting a scheduled morning oral antibiotic"],
             "Urine output falling below 30 mL/hr after AAA repair indicates severe renal hypoperfusion or acute graft thrombosis, requiring urgent medical intervention."),

            ("An unlicensed assistive personnel reports the following vital signs. Which patient requires immediate assessment by the registered nurse?",
             "A patient admitted for COPD exacerbation with an SpO2 of 81% on room air",
             ["A patient with hypertension with a blood pressure of 138/84 mmHg", "A patient with fever whose temperature decreased from 102.0°F to 100.4°F after antipyretics", "A young adult athlete with a resting heart rate of 54 bpm and no complaints"],
             "An SpO2 of 81% reflects life-threatening hypoxemia requiring immediate oxygenation, airway evaluation, and respiratory assessment."),

            ("Which client assignment is most appropriate for a float nurse from an orthopedic surgical unit to a medical telemetry unit?",
             "A stable client with chronic atrial fibrillation receiving oral warfarin maintenance therapy",
             ["A client experiencing acute unstable angina requiring IV nitroglycerin titration", "A newly admitted client with acute decompensated heart failure and pulmonary edema", "A client with severe diabetic ketoacidosis on an active insulin drip"],
             "Float nurses should be assigned clients with stable, predictable conditions matching core nursing competencies rather than unstable, titratable critical care cases."),

            ("Which patient should the nurse assess first following morning lab results?",
             "A patient on digoxin therapy with a reported serum potassium level of 2.6 mEq/L",
             ["A patient with iron deficiency anemia with a hemoglobin of 10.8 g/dL", "A patient with stable diabetes with a fasting glucose of 132 mg/dL", "A patient with gout with a serum uric acid level of 7.5 mg/dL"],
             "Hypokalemia (< 3.5 mEq/L) drastically increases myocardial sensitivity to digoxin, risking fatal ventricular arrhythmias and severe digoxin toxicity."),

            ("Which task is within the scope of practice for a licensed practical nurse (LPN) caring for a post-surgical client?",
             "Performing a routine sterile dressing change on an existing abdominal surgical incision",
             ["Developing the initial post-surgical rehabilitation nursing care plan", "Administering intravenous push bolus of an anesthetic agent", "Evaluating the overall effectiveness of the discharge education plan"],
             "LPNs can perform sterile wound care and dressing changes on established wounds under the supervision of the RN."),

            ("When assigning rooms on a medical-surgical floor, which two patients can safely share a semi-private room?",
             "Two patients with active, laboratory-confirmed influenza A infection",
             ["A patient with active tuberculosis and an immunocompromised chemotherapy patient", "A patient with Clostridium difficile and a fresh postoperative surgical patient", "A patient with an open MRSA wound infection and a patient receiving systemic corticosteroids"],
             "Cohort isolation allows patients infected with the identical pathogen (influenza A) to share room space without cross-contamination."),

            ("Which client scenario represents the highest clinical priority using Maslow's Hierarchy of Needs?",
             "A client presenting with stridor and intercostal retractions after an insect sting",
             ["A client expressing severe anxiety about an upcoming diagnostic biopsy", "A client requesting a visit from the hospital chaplain", "A client concerned about losing employment due to hospitalization"],
             "Physiological airway compromise takes precedence over all psychological, social, and spiritual needs according to Maslow's hierarchy."),

            ("Which assignment should be prioritized by the nurse caring for four pediatric clients?",
             "A 2-year-old child with suspected epiglottitis who is drooling and sitting in a tripod position",
             ["A 4-year-old with mild gastroenteritis who drank 4 ounces of electrolyte solution", "An 8-year-old with a fractured radius awaiting discharge paperwork", "A 6-year-old with acute otitis media whose ear pain responded to acetaminophen"],
             "Drooling and tripod positioning in suspected epiglottitis indicate impending total airway occlusion, a catastrophic pediatric airway emergency."),

            ("Which task should the registered nurse retain and NOT delegate to an LPN or UAP?",
             "Administering intravenous push medications through a central venous catheter",
             ["Collecting a clean-catch midstream urine specimen", "Checking capillary blood glucose using a bedside glucometer", "Measuring oral temperature and documenting on the electronic record"],
             "IV push administration via central access involves high pharmacology risks and immediate systemic distribution, requiring RN administration."),

            ("A client receiving continuous epidural analgesia reports numbness spreading up to the nipple line. What is the priority nursing action?",
             "Stop the epidural infusion immediately and assess respiratory depth and effort",
             ["Increase the infusion rate to establish anesthesia stability", "Document the finding as an expected dermatomal outcome", "Administer an oral nonsteroidal anti-inflammatory drug"],
             "Sensory blockade ascending to the T4 nipple line can paralyze intercostal respiratory nerves and the diaphragm, requiring immediate infusion cessation."),

            ("Which client should the nurse see first after receiving a shift change report?",
             "A client with deep vein thrombosis who suddenly develops pleuritic chest pain and dyspnea",
             ["A client with osteoarthritis reporting stiffness in both knees upon waking", "A client with chronic hypertension with a morning blood pressure of 142/88 mmHg", "A client with a urinary tract infection who completed their morning antibiotic infusion"],
             "Sudden dyspnea and pleuritic pain in a DVT patient are classic signs of pulmonary embolism, a life-threatening pulmonary vascular emergency."),

            ("Which action by an unlicensed assistive personnel requires immediate intervention by the supervising registered nurse?",
             "Disconnecting a patient's indwelling Foley catheter to empty the drainage bag",
             ["Assisting an alert patient into a wheelchair using a transfer gait belt", "Placing non-skid socks on a high fall-risk patient before ambulation", "Repositioning a bed-bound patient every two hours onto their side"],
             "Disconnecting a Foley catheter breaks the sterile closed drainage system, drastically increasing the risk of catheter-associated urinary tract infection."),

            ("Which client should be assigned to the most experienced registered nurse on the telemetry unit?",
             "A client with third-degree complete heart block awaiting temporary transvenous pacemaker insertion",
             ["A client with stable first-degree atrioventricular block with a PR interval of 0.22 seconds", "A client with sinus bradycardia at 56 bpm who is alert and asymptomatic", "A client in stable sinus rhythm with occasional isolated premature ventricular contractions"],
             "Third-degree AV block features atrioventricular dissociation with high risk of profound hemodynamic collapse and asystolic arrest."),

            ("Which task can the nurse safely delegate to an experienced UAP for a patient with a tracheostomy?",
             "Performing routine oral hygiene with a soft sponge swab",
             ["Performing sterile deep endotracheal suctioning through the tracheostomy", "Changing the inner cannula of a newly placed tracheostomy tube", "Assessing the tracheostomy stoma site for localized subcutaneous emphysema"],
             "Oral hygiene is within UAP scope; sterile airway suctioning, cannula replacement, and stoma assessment are licensed nursing duties."),

            ("A patient with a traumatic brain injury has an intracranial pressure (ICP) reading of 24 mmHg. What is the priority nursing action?",
             "Ensure the patient's head is maintained in a neutral midline position with head of bed elevated 30 degrees",
             ["Place the patient in a flat supine position with the neck flexed forward", "Encourage the patient to perform frequent vigorous coughing exercises", "Perform deep endotracheal suctioning for 30 consecutive seconds"],
             "Elevating the HOB 30 degrees with a neutral neck facilitates cerebral venous jugular drainage, reducing intracranial hypertension (normal ICP 5-15 mmHg)."),

            ("Which client requires the most urgent clinical assessment by the medical-surgical nurse?",
             "A client who underwent thyroidectomy 6 hours ago with persistent surgical neck swelling and stridor",
             ["A client after total hip replacement with 40 mL of serosanguinous drainage in the surgical drain", "A client with viral gastroenteritis with three loose bowel movements during the shift", "A client with an uncomplicated leg fracture awaiting an orthopedic consultation"],
             "Expanding neck hematoma and stridor post-thyroidectomy threaten immediate mechanical airway compression and asphyxiation."),

            ("Which patient finding should be reported to the healthcare provider immediately?",
             "A client receiving IV vancomycin who develops a serum creatinine rising from 0.8 to 2.4 mg/dL",
             ["A client on oral amoxicillin with mild nausea after meals", "A client on metoprolol with a resting heart rate of 64 bpm", "A client on lisinopril with a dry tickling cough without dyspnea"],
             "A tripling of serum creatinine indicates acute drug-induced nephrotoxicity from vancomycin, requiring immediate dosage withholding and trough measurement."),

            ("Which instruction should the nurse emphasize to an unlicensed assistive personnel assisting a client on fall precautions?",
             "Do not leave the client unattended while using the bedside commode",
             ["Instruct the client to get out of bed independently if the call light is unanswered", "Turn off the bathroom nightlight to promote restful sleep", "Keep the bed in the highest position to facilitate nurse transfers"],
             "Falls frequently occur during unassisted toileting; remaining within arm's reach on the commode prevents catastrophic fall injuries."),

            ("Which client should the nurse assess first among four patients with gastrointestinal complaints?",
             "A client with a known peptic ulcer who develops sudden, rigid, board-like abdominal rigidity and severe pain",
             ["A client with irritable bowel syndrome reporting cramping after breakfast", "A client with chronic constipation who has not had a bowel movement in two days", "A client with gastroesophageal reflux disease complaining of mild retrosternal heartburn"],
             "Sudden board-like abdominal rigidity indicates gastrointestinal visceral perforation with chemical peritonitis, a surgical emergency."),

            ("Which task can the registered nurse appropriately assign to an LPN caring for an elderly client?",
             "Inserting an indwelling urinary Foley catheter using sterile aseptic technique",
             ["Conducting the initial comprehensive admission mental status examination", "Formulating nursing diagnoses based on admission laboratory findings", "Administering the first dose of an experimental oncology biologic agent"],
             "Foley catheterization is an established sterile invasive procedure within the clinical competency scope of licensed practical nurses."),

            ("Which client scenario represents the highest priority for contact isolation assignment?",
             "A client with an uncontained draining wound culture positive for Methicillin-Resistant Staphylococcus aureus (MRSA)",
             ["A client with a clean closed surgical wound after laparoscopic cholecystectomy", "A client colonized with MRSA in the anterior nares without active drainage", "A client with well-controlled type 2 diabetes and hypertension"],
             "Uncontained purulent wound drainage heavily contaminates the clinical environment and poses severe transmission risk for MRSA."),

            ("A nurse reviews new orders for a client admitted with acute pancreatitis. Which order should the nurse question?",
             "Administer oral morphine sulfate tablets with meals as needed for pain",
             ["Maintain strict NPO (nothing by mouth) status", "Initiate intravenous fluid resuscitation with Lactated Ringer's solution", "Insert a nasogastric tube to low intermittent wall suction"],
             "Oral medications and feeding stimulate pancreatic enzyme secretion, exacerbating autodigestive inflammation; pancreatitis patients are kept NPO."),

            ("Which client should the charge nurse assign to a newly graduated registered nurse who just completed unit orientation?",
             "A stable client with pneumonia receiving scheduled intravenous antibiotics and oxygen via nasal cannula",
             ["A client receiving a continuous intravenous heparin infusion with fluctuating PTT results", "A client with acute pancreatitis receiving total parenteral nutrition via central line", "A client admitted with acute gastrointestinal bleeding scheduled for emergent endoscopy"],
             "New graduates should be assigned stable clients with predictable clinical trajectories matching core nursing fundamentals."),

            ("What is the priority nursing action when a client with a chest tube has continuous, vigorous bubbling in the water-seal chamber?",
             "Inspect the entire chest tube system from insertion site to drainage unit for an air leak",
             ["Document the bubbling as a normal expected therapeutic finding", "Clamp the chest tube close to the patient's chest with padded hemostats", "Turn up the wall suction regulator to maximum vacuum"],
             "Continuous bubbling in the water-seal chamber indicates a system air leak; intermittent bubbling with expiration or coughing is expected."),

            ("Which task is appropriate to delegate to an unlicensed assistive personnel for a client who had a stroke?",
             "Measuring the volume of oral liquids consumed and recording on the intake log",
             ["Performing the initial bedside swallow screening assessment with thin liquids", "Teaching the client how to use the unaffected arm for buttoning shirts", "Evaluating the client's risk for aspiration during mealtime"],
             "Recording intake and output is an objective measurement task suitable for UAP; swallow evaluation and teaching require licensed nursing."),

            ("Which patient should the triage nurse categorize as 'Immediate' (Red tag) during a mass casualty incident?",
             "An adult with an open tension pneumothorax, severe respiratory distress, and asymmetric breath sounds",
             ["An adult with an open tibial fracture, palpable distal pulse, and normal mental status", "An adult who is unresponsive with absent pulse and no spontaneous respiration", "An adult with minor superficial abrasions who is walking wounded"],
             "Immediate (Red) category represents life-threatening injuries with high survival potential if treated promptly (e.g., tension pneumothorax)."),

            ("Which assessment finding in a patient who received conscious sedation for a colonoscopy requires immediate intervention?",
             "Respiratory rate of 6 breaths per minute with shallow chest excursion",
             ["Oxygen saturation of 96% on 2 liters of oxygen via nasal cannula", "Blood pressure of 118/74 mmHg and heart rate of 68 bpm", "Patient is sleepy but arouses promptly to verbal greeting"],
             "Severe respiratory depression (rate < 8-10/min) indicates oversedation and risks respiratory arrest, requiring immediate stimulation and reversal."),

            ("Which client should the nurse visit first after morning handover?",
             "A client receiving a continuous intravenous potassium chloride infusion reporting severe burning at the peripheral IV site",
             ["A client requesting a refill of ice water at the bedside", "A client awaiting physical therapy evaluation for discharge planning", "A client with chronic stable osteoarthritis asking for a morning warm washcloth"],
             "Burning at a potassium infusion site indicates venous extravasation or phlebitis, requiring immediate inspection to prevent tissue necrosis."),

            ("Which task is within the scope of an LPN assisting in the care of a client receiving a blood transfusion?",
             "Monitoring vital signs 15 minutes after transfusion initiation and hourly thereafter",
             ["Conducting the initial pre-transfusion verification of blood unit numbers independently", "Initiating the blood transfusion and administering the first 50 mL independently", "Evaluating the client for signs of acute hemolytic reaction during the first 15 minutes"],
             "The RN must initiate the transfusion and monitor the critical first 15 minutes; LPNs can assist with subsequent vital signs on stable patients."),

            ("A nurse is caring for four clients. Which client should be reported to the rapid response team?",
             "A client whose heart rate abruptly increases from 74 to 148 bpm accompanied by diaphoresis and dizziness",
             ["A client with a blood pressure of 134/82 mmHg who is alert and resting comfortably", "A client with a chronic cough productive of clear white sputum", "A client whose oral temperature is 99.2°F (37.3°C) after physical therapy"],
             "Acute onset of unstable tachycardia (> 140 bpm) with hypoperfusion signs meets established criteria for rapid response team activation."),

            ("Which assignment should the registered nurse delegate to an experienced UAP?",
             "Obtaining morning weights on four clients before breakfast",
             ["Providing discharge education regarding low-sodium diets to a heart failure client", "Evaluating the effectiveness of subcutaneous insulin given two hours ago", "Assessing the peripheral pulse quality of a postoperative vascular client"],
             "Daily weight measurement follows a standardized protocol and requires no clinical interpretation or teaching."),

            ("Which assessment finding in a client with cirrhosis requires immediate notification of the healthcare provider?",
             "Vomiting 300 mL of bright red blood with clots",
             ["Presence of spider angiomas across the upper chest", "Palmar erythema without pain or localized swelling", "Abdominal girth increased by 0.5 cm compared to yesterday"],
             "Hematemesis in a cirrhotic patient indicates ruptured esophageal or gastric varices, a life-threatening hemorrhagic emergency."),

            ("What is the primary action when a nurse discovers that an incorrect dosage of an IV antibiotic was administered to a patient?",
             "Assess the patient's vital signs and monitor closely for adverse drug reactions",
             ["Notify the hospital risk management department before checking the patient", "Discard the empty IV bag and conceal the packaging in biohazard waste", "Administer an extra dose of the medication to balance the total daily volume"],
             "Patient safety and clinical monitoring take immediate precedence over incident reporting and administrative notifications.")
        ],

        "Safe & Effective Care": [
            ("Which individual is legally and professionally responsible for obtaining informed surgical consent from a patient?",
             "The surgeon or physician performing the surgical procedure",
             ["The preoperative circulating registered nurse", "The patient's assigned medical unit nurse", "The hospital administrative admissions clerk"],
             "The operating surgeon must personally explain the procedure, risks, benefits, and alternatives; the nurse only witnesses the signature."),

            ("What is the primary role of the registered nurse when witnessing a patient sign a surgical informed consent document?",
             "Confirming that the signature is voluntary, the patient is competent, and the patient appears to understand the procedure",
             ["Explaining the technical operative steps of the surgery in detail", "Providing detailed statistical risks of operative mortality", "Authorizing the surgery on behalf of the hospital legal department"],
             "The nurse's signature witnesses the physical act of signing, voluntary consent, and absence of coercion or mental incapacity."),

            ("Under which circumstance may emergency surgical care be initiated without written informed consent?",
             "When the patient is unconscious, life-threatening emergency exists, and no surrogate or next of kin is available",
             ["When the patient is conscious but speaks only a foreign language", "When the hospital legal counsel approves proceeding without asking the family", "When the surgeon prefers to operate without administrative delays"],
             "Emergency doctrine presumes implied consent when immediate intervention is mandatory to preserve life or limb and surrogate consent cannot be reached."),

            ("Which document designates an individual authorized to make healthcare decisions on behalf of an incapacitated patient?",
             "Durable Power of Attorney for Healthcare (Healthcare Proxy)",
             ["A living will containing end-of-life treatment preferences", "A standard last will and testament for estate distribution", "A hospital admission financial responsibility agreement"],
             "A durable power of attorney for healthcare legally assigns surrogate decision-making authority when the principal lacks medical capacity."),

            ("What does the Health Insurance Portability and Accountability Act (HIPAA) Privacy Rule strictly mandate?",
             "Protection of all individually identifiable health information (PHI) in oral, written, or electronic forms",
             ["Mandatory disclosure of patient medical records to all immediate family members", "Universal sharing of patient diagnostic data with all hospital staff members", "Prohibition of patient access to their own electronic health records"],
             "HIPAA restricts access to protected health information to individuals directly involved in the patient's active clinical care."),

            ("What is the nurse's legal obligation if an alert, competent adult patient insists on leaving the hospital against medical advice (AMA)?",
             "Inform the client of the specific risks of departure, request an AMA form signature, and remove the peripheral IV catheter",
             ["Physically restrain the client until security arrives to enforce hospital stay", "Refuse to return the client's personal clothing or belongings", "Call local law enforcement to have the client legally detained"],
             "Competent patients have the legal right to discharge themselves; the nurse must explain clinical risks, document the departure, and remove lines."),

            ("Which scenario represents a violation of patient medical confidentiality under HIPAA?",
             "Discussing a patient's clinical diagnosis and prognosis with a colleague in a crowded public hospital cafeteria",
             ["Giving clinical handover information to the oncoming shift nurse in a private report room", "Reporting a confirmed case of pulmonary tuberculosis to the state public health department", "Disclosing required surgical operative records to the hospital billing and insurance coding team"],
             "Discussing patient care in public areas (cafeterias, elevators, lobbies) breaches confidentiality and exposes PHI to unauthorized listeners."),

            ("What is an incident (variance) report used for within a healthcare organization?",
             "Internal quality improvement, risk management, and identifying systemic safety vulnerabilities to prevent recurrence",
             ["Documenting disciplinary action against individual nursing staff in their personnel file", "Providing evidence in the patient's permanent legal medical chart", "Informing the patient's family about organizational insurance liability"],
             "Incident reports are confidential internal risk-management tools to analyze processes; they are NEVER filed in or mentioned in the medical record."),

            ("Which documentation practice is correct regarding an incident report for an accidental patient fall?",
             "Document objective clinical assessment and interventions in the medical record without mentioning the incident report",
             ["Write in the nursing progress notes: 'Incident report filed with risk management department'", "Document subjective opinions regarding which staff member was at fault for the fall", "Omit all documentation of the fall from the chart to prevent legal liability"],
             "The medical record contains factual clinical events, assessments, and provider notifications; the internal incident report is never referenced."),

            ("What does a 'Living Will' advance directive specify?",
             "The specific medical treatments and life-sustaining interventions a patient desires or refuses if terminally ill",
             ["How the patient's monetary assets and estate property are to be distributed after death", "Which family member receives permanent custody of minor children", "Which physician is authorized to manage the patient's chronic diseases"],
             "A living will outlines written directives regarding end-of-life interventions (mechanical ventilation, CPR, tube feeding, hemodialysis)."),

            ("When must a nurse implement an emergency restraint protocol without a prior physician's order?",
             "When a client exhibits sudden, violent behavior posing an imminent threat of physical harm to self or others",
             ["When a client repeatedly pulls on a nasal cannula during routine sleep", "When a client refuses scheduled oral medications and insists on walking", "When the unit is understaffed and the client wanders down the hallway"],
             "Emergency restraints are justified only to protect immediate physical safety; a physician must be notified and conduct an evaluation within 1 hour."),

            ("What constitutes the tort of 'false imprisonment' in hospital nursing practice?",
             "Restraining a competent client physically or chemically without legal justification or appropriate medical order",
             ["Transferring a client from an intensive care bed to a medical step-down unit", "Refusing to discharge a client before their prescription is filled at pharmacy", "Placing an infectious patient in contact isolation precautions with closed doors"],
             "Confining a client against their will without legal authority or valid clinical emergency criteria constitutes unlawful false imprisonment."),

            ("What constitutes the tort of 'battery' in clinical medical practice?",
             "Performing an invasive surgical procedure or physical intervention on a patient without obtaining legal consent",
             ["Threatening to insert a nasogastric tube if a patient refuses to eat", "Failing to answer a patient call light within an established timeframe", "Documenting an inaccurate blood pressure reading on a vital sign flow sheet"],
             "Battery is unauthorized, intentional, harmful, or offensive physical contact with a patient's body (assault is the threat of contact)."),

            ("What is the primary purpose of the National Patient Safety Goals (NPSGs) established by The Joint Commission?",
             "To address specific high-risk areas in healthcare safety, including patient identification and infection prevention",
             ["To establish standardized nurse-to-patient staffing ratios across all departments", "To regulate the wholesale pricing of pharmaceutical drugs in acute care hospitals", "To manage the accreditation of university nursing education programs"],
             "The Joint Commission establishes annual NPSGs to target critical safety priorities (e.g., medication safety, correct surgery site, alarm safety)."),

            ("Which action is required when administering a telephone or verbal order from a prescribing physician?",
             "Record the order, read it back verbatim to the prescriber, and obtain verbal confirmation ('Read-back' verification)",
             ["Write the order and administer the drug without repeating it to save clinical time", "Instruct the unit secretary to sign the physician's name on the order form", "Wait until the physician arrives on the unit before administering any emergency medication"],
             "The read-back requirement ensures accuracy by verifying the exact drug, dose, route, and frequency directly with the prescriber."),

            ("What is the primary ethical principle exemplified when a nurse respects a patient's informed choice to decline chemotherapy?",
             "Autonomy",
             ["Beneficence", "Nonmaleficence", "Justice"],
             "Autonomy recognizes the patient's moral and legal right to self-determination and independent healthcare decision-making."),

            ("Which ethical principle is demonstrated when a nurse administers pain medication promptly to relieve acute postoperative distress?",
             "Beneficence",
             ["Autonomy", "Justice", "Fidelity"],
             "Beneficence obligates healthcare providers to act for the benefit of the patient and actively promote patient well-being."),

            ("What ethical principle directs healthcare professionals to 'above all, do no harm'?",
             "Nonmaleficence",
             ["Beneficence", "Autonomy", "Veracity"],
             "Nonmaleficence requires clinicians to avoid inflicting intentional harm, injury, or unnecessary risk upon patients."),

            ("Which ethical principle requires fair, equitable, and non-discriminatory distribution of healthcare resources?",
             "Justice",
             ["Fidelity", "Autonomy", "Veracity"],
             "Justice demands that healthcare resources, treatments, and attention be distributed fairly without bias or favoritism."),

            ("Which ethical principle is upheld when a nurse truthfully explains the known side effects of a newly prescribed medication?",
             "Veracity",
             ["Fidelity", "Nonmaleficence", "Paternalism"],
             "Veracity requires healthcare professionals to be honest, transparent, and accurate in all communications with patients."),

            ("What does the ethical principle of 'fidelity' obligate the nurse to do?",
             "Keep promises, remain faithful to professional commitments, and maintain trust in the nurse-patient relationship",
             ["Make all medical decisions on behalf of an indecisive patient", "Ensure equal allocation of hospital ICU beds", "Protect the healthcare organization from financial liability"],
             "Fidelity involves loyalty, keeping commitments, maintaining competence, and upholding the professional code of ethics."),

            ("Which scenario requires a nurse to act as a mandatory reporter under state protective legislation?",
             "Suspecting physical, sexual, emotional abuse, or severe neglect of a vulnerable child or elderly adult",
             ["A competent adult admitting they occasionally smoke cigarettes at home", "An adult patient declining to adhere to a diabetic diet", "An individual refusing to purchase health insurance"],
             "Nurses are legally mandated reporters required by law to report suspected abuse or neglect of children, disabled, or elderly persons."),

            ("How should a nurse handle a situation where a fellow nurse appears on duty with slurred speech and smelling of alcohol?",
             "Immediately remove the nurse from patient care areas and report the observation to the charge nurse or nurse manager",
             ["Ignore the behavior unless the nurse makes a documented medication error", "Offer the nurse coffee and agree to cover their assigned patients secretly", "Confront the nurse publicly in the hallway before shift report begins"],
             "Patient safety is the top priority; impaired practice must be intervened upon immediately to prevent imminent patient harm."),

            ("What constitutes 'negligence' in professional nursing practice?",
             "Failure to act as a reasonably prudent, competent nurse would act under similar clinical circumstances, resulting in harm",
             ["Intentional physical striking of a patient during a medical emergency", "Publishing false defamatory statements regarding a colleague", "Performing an authorized surgical procedure under sterile technique"],
             "Negligence involves breach of the standard of care resulting in foreseeable damages or injury to the patient."),

            ("Which four legal elements must all be proven to establish nursing professional malpractice?",
             "Duty of care, breach of duty, causation (proximate cause), and actual physical or economic damages",
             ["Intent to harm, financial loss, emotional distress, and physician error", "Breach of contract, physical assault, property damage, and hospital reprimand", "Violation of hospital policy, verbal altercation, moral failure, and disciplinary termination"],
             "A malpractice claim requires proving: 1) legal duty owed, 2) duty was breached, 3) the breach caused injury, and 4) measurable damages."),

            ("What is the primary safety purpose of utilizing standardized handoff protocols like SBAR during shift transitions?",
             "To ensure clear, concise, structured, and consistent communication of vital clinical patient information",
             ["To eliminate the need for electronic medical record charting", "To reduce the amount of time nurses spend in direct bedside contact", "To evaluate individual nursing staff productivity metrics"],
             "Communication failure during handoffs is a leading cause of sentinel events; SBAR provides a reliable, structured framework."),

            ("What is the nurse's priority action if a patient's identification band is missing or illegible?",
             "Verify identity against the medical record and immediately replace the wristband before administering care",
             ["Rely on the room number and bed position to verify the patient's identity", "Ask a roommate to confirm the patient's full name", "Administer medications and replace the wristband at the end of the shift"],
             "Never administer medications or perform procedures without a verified, legible patient ID band physically in place."),

            ("Which action is required when documenting clinical observations in a paper medical record?",
             "Document contemporaneously, write legibly in ink, date and time every entry, and sign with professional credentials",
             ["Leave blank lines between entries for colleagues to add notes later", "Use correction fluid (white-out) to erase documentation mistakes cleanly", "Scribble out errors completely so original words cannot be read"],
             "Medical records are legal documents; errors must be corrected with a single strike-through, dated, and initialed without white-out."),

            ("What should a nurse do when an alert adult patient states: 'I want to revoke my DNR (Do Not Resuscitate) order'?",
             "Respect the client's decision, document the revocation immediately, and notify the attending physician to update orders",
             ["Inform the client that a signed DNR order is permanent and cannot be revoked", "Tell the client they must wait until their legal proxy arrives to decide", "Ignore the verbal request until the client submits a notarized letter"],
             "Competent patients can revoke or modify a DNR order verbally at any time; the nurse immediately communicates this to the team."),

            ("What is the primary purpose of a root cause analysis (RCA) following a sentinel event in a hospital?",
             "To investigate systemic process failures and latent organizational hazards rather than assigning individual blame",
             ["To determine which employee should be terminated or prosecuted", "To calculate the financial damages owed to the patient's family", "To provide evidence for the hospital's malpractice defense attorneys"],
             "RCA is a non-punitive quality tool that identifies underlying vulnerabilities in systems to prevent future adverse events."),

            ("What defines a 'sentinel event' according to The Joint Commission?",
             "A patient safety event that reaches a patient and results in death, permanent harm, or severe temporary harm",
             ["Any minor medication error caught before reaching the patient", "A delay in hospital discharge due to pending laboratory results", "A billing error involving commercial insurance reimbursement"],
             "Sentinel events signal the need for immediate investigation and response due to serious physical or psychological injury."),

            ("What is the primary clinical benefit of bedside barcode medication scanning systems?",
             "Validating that the right medication and dose are administered to the right patient at the right time",
             ["Eliminating the necessity for registered nurses to understand drug pharmacology", "Accelerating medication passes by bypassing independent checks", "Replacing clinical verification of patient allergies"],
             "Barcode scanning verifies patient identity and drug NDC codes against electronic orders, preventing administration errors."),

            ("When can a registered nurse refuse to carry out a physician's written order?",
             "When the nurse believes in good clinical judgment that the order is incorrect, unsafe, or hazardous to the patient",
             ["Whenever the nurse personally disagrees with the physician's diagnostic approach", "When the prescribed medication is not available in the unit floor stock", "When the nurse is too busy to complete the scheduled administration"],
             "Nurses have an independent legal duty to protect patient safety; unsafe or lethal orders must be questioned and withheld."),

            ("Which nursing action protects client rights during clinical medical research trials?",
             "Ensuring the client understands they may withdraw from the research trial at any time without penalty to routine care",
             ["Assuring the client that experimental drugs have no unpredictable side effects", "Discouraging the client from asking questions that might bias the trial", "Requiring the client to complete the trial once the consent form is signed"],
             "Informed consent in clinical trials requires voluntary participation and the unconditional right to withdraw without losing medical care."),

            ("What should a nurse do when discovering an empty, unlabeled syringe on a bedside table?",
             "Discard the syringe immediately into sharps or waste; never administer unidentified medications",
             ["Smell the syringe needle to guess the pharmacological agent", "Assume it contains normal saline flush and use it to flush an IV", "Ask another nurse if they recognize the medication"],
             "Unlabeled medications cannot be verified and pose catastrophic medication error risks; they must be disposed of promptly."),

            ("What is the primary rationale for utilizing surgical safety checklists before induction, incision, and wound closure?",
             "To reduce surgical complications, avoid retained foreign objects, and prevent wrong-site or wrong-patient surgery",
             ["To track the time required for surgical procedures for billing purposes", "To evaluate individual surgical team member speed and technique", "To reduce the quantity of anesthesia gases utilized"],
             "WHO surgical checklists standardize communication and verification, drastically reducing operative morbidity and mortality."),

            ("Which client is legally considered capable of giving independent informed consent for their own medical treatment?",
             "A 16-year-old legally emancipated minor living independently and managing their own finances",
             ["A 14-year-old minor receiving general anesthesia for elective tonsillectomy", "An intoxicated adult with a blood alcohol level of 0.25% presenting with head trauma", "A client with severe advanced Alzheimer's dementia unable to recognize family members"],
             "Legally emancipated minors possess adult legal rights to consent to their own healthcare interventions."),

            ("What does the Patient Self-Determination Act (PSDA) require healthcare institutions to do upon patient admission?",
             "Inform patients of their legal rights under state law to formulate advance directives and accept or refuse medical care",
             ["Mandate that every admitted patient execute a formal living will before receiving care", "Appoint an institutional attorney to act as every patient's guardian", "Prohibit patients from modifying DNR orders during acute hospitalizations"],
             "The PSDA requires facilities receiving federal funds to inform patients about advance directives upon hospital admission.")
        ],

        "Health Promotion": [
            ("At what age should average-risk adults begin routine screening for colorectal cancer according to major clinical guidelines?",
             "Age 45",
             ["Age 30", "Age 55", "Age 65"],
             "Guidelines recommend initiating average-risk colorectal cancer screening (e.g., colonoscopy or stool DNA) at age 45."),

            ("What is the primary prevention strategy recommended for preventing human papillomavirus (HPV)-related cervical cancers?",
             "Administering the 9-valent HPV vaccine prior to sexual debut (routinely at ages 11 to 12)",
             ["Undergoing annual Pap smears beginning at age 12", "Taking daily prophylactic acyclovir therapy", "Using antibiotic vaginal washes post-coitus"],
             "The HPV vaccine prevents infection with oncogenic HPV types (16, 18, etc.) responsible for over 90% of cervical cancers."),

            ("At what age should average-risk women begin receiving biennial screening mammography for breast cancer?",
             "Age 40 to 50 depending on shared decision-making guidelines",
             ["Age 20", "Age 30", "Age 65"],
             "USPSTF guidelines recommend initiating biennial mammography screening for average-risk women between ages 40 and 50."),

            ("What is the recommended screening schedule for cervical cancer using cytology (Pap smear) alone in women aged 21 to 29?",
             "Every 3 years",
             ["Every 6 months", "Annually", "Every 10 years"],
             "Women aged 21-29 should undergo cervical cytology screening every 3 years; HPV co-testing is not recommended under 30."),

            ("What is the single most effective clinical intervention to reduce the risk of chronic obstructive pulmonary disease and lung cancer?",
             "Smoking cessation",
             ["Taking high-dose dietary antioxidant supplements", "Using HEPA air filters in the home bedroom", "Annual chest radiographic screening"],
             "Smoking cessation halts accelerated decline in FEV1 and significantly lowers mortality from lung cancer and cardiovascular disease."),

            ("How long should an infant ideally be exclusively breastfed according to the American Academy of Pediatrics (AAP) and WHO?",
             "For the first 6 months of life",
             ["For the first 2 weeks only", "Until 18 months without solid foods", "For the first 30 days"],
             "Exclusive breastfeeding is recommended for approximately 6 months, followed by continued breastfeeding alongside complementary foods."),

            ("At what infant age should solid foods (purees) typically be introduced into the infant's diet?",
             "Around 6 months of age when developmental milestones (head control, sitting) are met",
             ["At 6 weeks of age", "At 2 months of age", "Not until 12 months of age"],
             "Introducing solids around 6 months supports developing nutritional needs (iron, zinc) when extrusion reflex has subsided."),

            ("Why should cow's milk NOT be given to infants under 12 months of age?",
             "It places high renal solute load, lacks adequate bioavailable iron, and risks intestinal micro-bleeding",
             ["It immediately triggers systemic hypercalcemia and kidney stones", "It causes premature fusion of infant cranial fontanelles", "It destroys infant stomach acid enzymes permanently"],
             "Whole cow's milk contains excessive protein and minerals for infant kidneys, lacks adequate iron, and induces occult fecal blood loss."),

            ("Why must honey NEVER be given to an infant under 12 months of age?",
             "Honey can contain Clostridium botulinum spores, causing life-threatening infant botulism ('floppy baby syndrome')",
             ["Honey triggers immediate severe allergic anaphylaxis in all infants", "Honey causes rapid permanent tooth loss in neonates", "Honey destroys intestinal digestive villi"],
             "Infants lack the mature gut flora to suppress Clostridium botulinum germination; ingested spores produce neurotoxins causing flaccid paralysis."),

            ("Until what age or milestone should children ride in a rear-facing infant car safety seat?",
             "Until at least age 2, or until reaching the highest weight or height allowed by the car seat manufacturer",
             ["Until 6 months of age", "Until 12 months regardless of weight", "Until they learn to walk independently"],
             "Rear-facing car seats support the infant's head, neck, and spine, reducing severe crash injuries by over 70%."),

            ("Which vaccine is routinely administered to neonates within 24 hours of birth before hospital discharge?",
             "Hepatitis B vaccine",
             ["Measles, Mumps, Rubella (MMR) vaccine", "Rotavirus oral vaccine", "Varicella vaccine"],
             "The birth dose of hepatitis B vaccine serves as a crucial safety net to prevent perinatal viral transmission."),

            ("At what age is the first dose of the Measles, Mumps, and Rubella (MMR) live vaccine routinely administered?",
             "At 12 to 15 months of age",
             ["At birth within 24 hours", "At 2 months of age", "At 6 months of age"],
             "MMR is a live attenuated vaccine administered at 12-15 months; maternal transplacental antibodies neutralize live vaccines if given earlier."),

            ("Why are live attenuated vaccines (such as MMR and Varicella) strictly contraindicated in severely immunocompromised individuals?",
             "The weakened virus can replicate uncontrolled, causing disseminated, severe disease in an impaired immune system",
             ["They cause immediate allergic contact dermatitis on the injection site", "They neutralize circulating antibiotic medications", "They cause permanent loss of natural active immunity"],
             "In immunosuppressed patients, even attenuated viruses can cause uncontrolled systemic replication and fatal viral illness."),

            ("What is the primary clinical rationale for administering annual influenza immunization to all individuals 6 months and older?",
             "Influenza viruses undergo rapid antigenic drift, requiring updated seasonal viral strain coverage each year",
             ["Influenza antibodies completely disappear from human serum after 30 days", "Influenza vaccines expire permanently in human muscle tissue", "Annual vaccines prevent all bacterial respiratory infections"],
             "Antigenic drift generates minor point mutations in viral hemagglutinin and neuraminidase, necessitating updated seasonal formulations."),

            ("At what age should average-risk adults receive the recombinant zoster vaccine (Shingrix) to prevent shingles?",
             "Age 50 and older (administered as a 2-dose series)",
             ["Age 21", "Age 35", "Age 65 and older only"],
             "Shingrix is FDA-approved and CDC-recommended for adults aged 50 and older to boost waning varicella-zoster immunity."),

            ("What is the recommended minimum duration of moderate-intensity aerobic physical activity for adults per week?",
             "At least 150 minutes per week (e.g., 30 minutes 5 days a week)",
             ["60 minutes once per month", "30 minutes total per week", "600 minutes per week"],
             "CDC guidelines recommend at least 150 minutes of moderate-intensity exercise (or 75 minutes of vigorous exercise) weekly."),

            ("Which dietary pattern is heavily evidence-based to lower blood pressure in hypertensive individuals?",
             "The DASH (Dietary Approaches to Stop Hypertension) diet",
             ["A strict ketogenic diet high in saturated animal fats", "A zero-carbohydrate carnivore diet", "A high-sodium processed food diet"],
             "DASH emphasizes potassium-rich fruits, vegetables, whole grains, and low-fat dairy while restricting sodium to lower blood pressure."),

            ("What is the recommended maximum daily sodium intake for adults with hypertension or prehypertension?",
             "1,500 mg to 2,300 mg per day",
             ["3,500 mg to 4,500 mg per day", "5,000 mg per day", "Zero sodium intake"],
             "Restricting sodium to 1,500-2,300 mg/day significantly reduces extracellular fluid volume and systemic vascular resistance."),

            ("What is the primary clinical purpose of recommending daily folic acid supplementation (400 mcg) to all women of childbearing age?",
             "To prevent fetal neural tube defects such as spina bifida and anencephaly",
             ["To prevent maternal gestational diabetes mellitus", "To eliminate the risk of maternal morning sickness", "To accelerate fetal bone calcification"],
             "Folic acid during periconceptional development is essential for complete closure of the embryonic neural tube by embryonic day 28."),

            ("At what infant age does the anterior fontanelle of the skull normally achieve complete bony closure?",
             "Between 12 and 18 months of age",
             ["Between 2 and 3 months of age", "At birth", "Not until 5 years of age"],
             "The diamond-shaped anterior fontanelle closes by 12-18 months; the posterior triangular fontanelle closes much earlier by 2-3 months."),

            ("What developmental milestone is typically achieved by a healthy infant around 6 months of age?",
             "Sitting momentarily without support and rolling from front to back",
             ["Speaking in complete three-word sentences", "Walking independently without holding furniture", "Climbing stairs alternating feet"],
             "By 6 months, infants achieve good head control, roll over in both directions, and begin unassisted tripod sitting."),

            ("At what age does a child typically speak their first meaningful single words and walk with one hand held or independently?",
             "Around 12 months of age",
             ["At 4 months of age", "At 6 months of age", "Not until 24 months of age"],
             "At 12 months, toddlers typically stand independently, take first steps, and speak recognizable words like 'mama' or 'dada'."),

            ("What is the primary clinical hazard associated with prolonged bottle-propping at bedtime in infants?",
             "Early childhood dental caries ('baby bottle tooth decay') and acute otitis media",
             ["Premature eruption of permanent molar teeth", "Severe bilateral congenital cataracts", "Hypertrophy of infant salivary glands"],
             "Pooled milk around teeth allows oral bacteria to ferment sugars into acids; horizontal feeding also promotes eustachian tube reflux."),

            ("What is the recommended clinical intervention for preventing sudden infant death syndrome (SIDS)?",
             "Place the infant to sleep in the supine position ('Back to Sleep') on a firm, flat, bare mattress without soft bedding",
             ["Place the infant to sleep in the prone position with heavy blankets", "Keep multiple plush pillows and stuffed animals around the infant", "Co-sleep in the same adult bed between two sleeping parents"],
             "The 'Back to Sleep' campaign drastically reduced SIDS; supine sleep maintains patent airway and prevents suffocation."),

            ("What secondary screening test is recommended for adults aged 50 to 80 with a 20 pack-year smoking history who currently smoke?",
             "Annual low-dose computed tomography (LDCT) of the chest",
             ["Annual sputum cytology examination", "Chest magnetic resonance imaging every 6 months", "Routine arterial blood gas analysis"],
             "Annual low-dose CT screening detects early asymptomatic lung malignancies, significantly reducing lung cancer-specific mortality."),

            ("What is the primary clinical rationale for administering the Tdap booster vaccine to pregnant women between 27 and 36 weeks gestation?",
             "To stimulate maternal antibodies against pertussis that cross the placenta and protect the newborn infant before early vaccines",
             ["To prevent maternal gestational hypertension", "To induce early spontaneous labor at full term", "To eradicate tetanus spores from the birth canal"],
             "Transplacental IgG transfer provides vital passive immunity protecting vulnerable newborns against lethal whooping cough."),

            ("What is the recommended screening threshold for initiating universal lipid screening in men without cardiovascular risk factors?",
             "Age 35 (or age 20 if cardiovascular risk factors are present)",
             ["Age 18 universally", "Age 65 only", "Lipid screening is not recommended in asymptomatic adults"],
             "Lipid panels detect hyperlipidemia early to guide lifestyle and statin primary prevention before overt atherosclerosis develops."),

            ("Which clinical intervention represents 'tertiary prevention' in health promotion?",
             "Cardiac rehabilitation program following an acute myocardial infarction",
             ["Administering seasonal influenza vaccines to healthy young adults", "Undergoing routine mammography screening for early breast cancer", "Providing health education on healthy nutrition in elementary schools"],
             "Tertiary prevention focuses on rehabilitation and mitigating disease progression after irreversible pathology has occurred."),

            ("Which clinical intervention represents 'secondary prevention'?",
             "Performing a routine screening colonoscopy to detect pre-malignant polyps in an asymptomatic 45-year-old",
             ["Receiving a childhood measles vaccination", "Teaching healthy dietary habits to prevent obesity", "Undergoing speech therapy following an ischemic stroke"],
             "Secondary prevention involves early detection and prompt treatment of asymptomatic disease before symptoms manifest."),

            ("Which clinical intervention represents 'primary prevention'?",
             "Providing childhood immunizations and counseling on smoking cessation before disease onset",
             ["Screening blood pressure in an asymptomatic community clinic", "Performing a diagnostic bone density scan for osteoporosis", "Administering physical therapy after hip fracture surgery"],
             "Primary prevention aims to prevent disease or injury entirely by reducing exposure to hazards and enhancing resistance."),

            ("What is the primary health benefit of regular resistance (strength) training in older adults?",
             "Preserving lean muscle mass, preventing sarcopenia, and reducing fall and fracture risks",
             ["Eliminating all articular joint cartilage degradation", "Decreasing bone mineral density intentionally", "Replacing the need for dietary protein consumption"],
             "Resistance training stimulates muscle protein synthesis, enhances postural stability, and stresses bone to stimulate osteogenesis."),

            ("What is the recommended daily calcium intake for postmenopausal women to reduce the risk of osteoporosis?",
             "1,200 mg per day (dietary plus supplemental)",
             ["400 mg per day", "2,500 mg per day", "Zero calcium"],
             "Postmenopausal estrogen deficiency accelerates bone loss; 1,200 mg calcium daily paired with vitamin D maintains skeletal balance."),

            ("Why is vitamin D supplementation routinely recommended alongside calcium for bone health promotion?",
             "Vitamin D is essential for stimulating active calcium absorption in the small intestine",
             ["Vitamin D dissolves excess calcium in the bloodstream", "Vitamin D causes rapid urinary excretion of calcium", "Vitamin D prevents calcium from entering bone osteoids"],
             "Calcitriol (active vitamin D) upregulates epithelial calcium transport channels in the intestinal duodenum and jejunum."),

            ("What is the recommended method for preventing Lyme disease when hiking in wooded, brushy areas?",
             "Wear light-colored clothing with long pants tucked into socks, use EPA-registered DEET repellent, and perform prompt tick checks",
             ["Apply sunscreen with SPF 15 without insect repellent", "Avoid showering for 48 hours after hiking in forests", "Wear dark, loose clothing and walk barefoot through tall grass"],
             "Tucking pants into socks forms a physical barrier against Ixodes ticks, while light colors facilitate visual detection."),

            ("What is the primary health hazard associated with chronic exposure to secondhand tobacco smoke in children?",
             "Increased incidence of lower respiratory infections, asthma exacerbations, and chronic middle ear effusions",
             ["Premature fusion of long bone epiphyseal plates", "Severe congenital cardiac septal defects", "Development of adult-onset rheumatoid arthritis"],
             "Passive smoke exposure damages mucociliary clearance in pediatric airways, increasing pneumonia, bronchitis, and otitis media rates."),

            ("What is the recommended screening test for osteoporosis in all women aged 65 and older?",
             "Dual-energy X-ray absorptiometry (DEXA) bone density scan of the hip and lumbar spine",
             ["Serum alkaline phosphatase and calcium measurement", "Plain radiographs of the bilateral hands and wrists", "Magnetic resonance imaging of the entire thoracic spine"],
             "DEXA provides precise quantification of areal bone mineral density, diagnosing osteopenia (T-score -1 to -2.5) and osteoporosis (T-score <= -2.5)."),

            ("What is the primary clinical objective of performing newborn screening heel-stick blood tests within 24 to 48 hours of birth?",
             "Early detection of congenital inborn errors of metabolism (e.g., PKU, congenital hypothyroidism) before irreversible brain damage occurs",
             ["Determining the newborn's future adult height and weight", "Testing for childhood autoimmune arthritis", "Measuring total body fat percentage"],
             "Prompt detection and immediate dietary or hormonal treatment (e.g., phenylalanine restriction in PKU) prevent severe cognitive impairment.")
        ],

        "Pharmacological Therapies": [
            ("What is the therapeutic serum concentration range for digoxin in patients treated for heart failure?",
             "0.5 to 0.9 ng/mL (and up to 2.0 ng/mL for atrial arrhythmias)",
             ["3.0 to 5.0 ng/mL", "10 to 20 ng/mL", "0.01 to 0.05 ng/mL"],
             "Modern heart failure guidelines target 0.5-0.9 ng/mL; levels above 2.0 ng/mL carry high risk of lethal toxicity and arrhythmias."),

            ("What classic early visual disturbance is characteristic of clinical digoxin toxicity?",
             "Yellow-green halos around lights (xanthopsia) and blurred vision",
             ["Complete bilateral blindness", "Tunnel vision with increased intraocular pressure", "Sudden acute conjunctival hemorrhage"],
             "Digoxin toxicity causes characteristic xanthopsia (yellow-green tinted vision and halos), anorexia, nausea, and bradycardia."),

            ("What is the therapeutic serum concentration range for lithium in the acute management of bipolar mania?",
             "0.6 to 1.2 mEq/L",
             ["2.5 to 4.0 mEq/L", "0.1 to 0.3 mEq/L", "5.0 to 7.0 mEq/L"],
             "Lithium has a very narrow therapeutic index; levels > 1.5 mEq/L produce coarse tremors, ataxia, confusion, and renal failure."),

            ("Why must patients taking lithium maintain consistent dietary sodium and fluid intake?",
             "Hyponatremia causes the renal tubules to reabsorb lithium instead of sodium, triggering toxic lithium accumulation",
             ["Excess sodium destroys the lithium molecule in the bloodstream", "Low sodium prevents lithium from crossing the blood-brain barrier", "Fluids cause lithium to precipitate into kidney stones"],
             "The proximal renal tubules treat lithium like sodium; when sodium is depleted (dehydration, diuretics), lithium reabsorption surges."),

            ("What is the therapeutic serum level range for the antiepileptic drug phenytoin (Dilantin)?",
             "10 to 20 mcg/mL",
             ["1 to 5 mcg/mL", "50 to 100 mcg/mL", "0.2 to 0.8 mcg/mL"],
             "Phenytoin therapeutic range is 10-20 mcg/mL; toxicity causes nystagmus, ataxia, dysarthria, and encephalopathy."),

            ("What common adverse effect is associated with chronic phenytoin therapy, requiring rigorous oral hygiene?",
             "Gingival hyperplasia",
             ["Severe enamel erosion", "Black hairy tongue", "Permanent tooth discoloration"],
             "Phenytoin stimulates platelet-derived growth factor, causing fibrous overgrowth of gingival tissue around the teeth."),

            ("What laboratory parameter is routinely monitored to titrate oral warfarin (Coumadin) anticoagulant therapy?",
             "International Normalized Ratio (INR) and Prothrombin Time (PT)",
             ["Activated Partial Thromboplastin Time (aPTT)", "Platelet count", "Serum fibrinogen degradation products"],
             "Warfarin inhibits vitamin K-dependent clotting factors (II, VII, IX, X); therapy is standardized using the INR (target 2.0-3.0 for most indications)."),

            ("What is the immediate pharmacological antidote for warfarin-induced coagulopathy and life-threatening bleeding?",
             "Vitamin K (phytonadione) and 4-factor Prothrombin Complex Concentrate (PCC)",
             ["Protamine sulfate", "Naloxone", "Flumazenil"],
             "Vitamin K restores liver synthesis of clotting factors, while PCC provides immediate exogenous factors II, VII, IX, and X."),

            ("What is the specific pharmacological antidote for unfractionated heparin overdose and severe bleeding?",
             "Protamine sulfate",
             ["Vitamin K", "Idarucizumab", "Deoxtetracycline"],
             "Protamine sulfate is a strongly basic peptide that binds strongly acidic heparin molecules, forming an inactive stable salt."),

            ("Which class of antidepressant medications requires strict dietary avoidance of tyramine-rich foods to prevent hypertensive crisis?",
             "Monoamine Oxidase Inhibitors (MAOIs)",
             ["Selective Serotonin Reuptake Inhibitors (SSRIs)", "Tricyclic Antidepressants (TCAs)", "Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs)"],
             "MAOIs block intestinal catabolism of tyramine (found in aged cheese, red wine, cured meats), causing massive norepinephrine release."),

            ("What serious, life-threatening adverse reaction is associated with antipsychotic medications, featuring hyperthermia, muscle rigidity, and autonomic instability?",
             "Neuroleptic Malignant Syndrome (NMS)",
             ["Serotonin syndrome", "Malignant hyperthermia", "Stevens-Johnson syndrome"],
             "NMS is an idiosyncratic reaction to dopamine D2 antagonism characterized by 'lead-pipe' rigidity, high fever, elevated CK, and altered sensorium."),

            ("Which medication is commonly administered to treat the severe muscle rigidity of Neuroleptic Malignant Syndrome?",
             "Dantrolene sodium (or bromocriptine)",
             ["Naloxone", "Flumazenil", "Physostigmine"],
             "Dantrolene directly inhibits ryanodine calcium channels in the sarcoplasmic reticulum, relaxing rigid skeletal muscles."),

            ("What serious clinical condition is characterized by neuromuscular hyperactivity, hyperreflexia, clonus, and shivering from serotonergic excess?",
             "Serotonin Syndrome",
             ["Neuroleptic Malignant Syndrome", "Tardive dyskinesia", "Akathisia"],
             "Serotonin syndrome features hyperreflexia, myoclonus, ocular clonus, agitation, and diarrhea, contrasting with the rigidity of NMS."),

            ("What is the first-line medication administered for acute anaphylactic shock?",
             "Intramuscular Epinephrine (1:1,000 concentration into the anterolateral thigh)",
             ["Oral diphenhydramine syrup", "Intravenous hydrocortisone bolus", "Inhaled albuterol sulfate nebulizer"],
             "Epinephrine acts rapidly on alpha-1 (vasoconstriction), beta-1 (cardiac output), and beta-2 receptors (bronchodilation and mast cell stabilization)."),

            ("What is the primary clinical indication for administering intravenous naloxone (Narcan)?",
             "Reversal of life-threatening opioid-induced respiratory depression and central nervous system depression",
             ["Reversal of benzodiazepine sedation", "Treatment of alcohol withdrawal delirium tremens", "Management of cocaine cardiovascular toxicity"],
             "Naloxone is a pure opioid competitive antagonist that rapidly displaces opioids from mu receptors, restoring spontaneous ventilation."),

            ("What is the specific pharmacological antidote for acute benzodiazepine overdose?",
             "Flumazenil",
             ["Naloxone", "Atropine sulfate", "Physostigmine"],
             "Flumazenil is a competitive antagonist at the benzodiazepine binding site on the GABA-A receptor complex."),

            ("Why must flumazenil be administered with extreme caution in patients with chronic benzodiazepine dependence?",
             "It can precipitate acute benzodiazepine withdrawal and life-threatening refractory seizures",
             ["It causes immediate respiratory paralysis", "It triggers sudden malignant hyperthermia", "It induces irreversible acute renal failure"],
             "Rapid displacement of benzodiazepines in dependent individuals removes inhibitory GABA tone, triggering severe seizures."),

            ("What is the specific pharmacological antidote for acute acetaminophen (paracetamol) hepatotoxicity?",
             "N-acetylcysteine (NAC)",
             ["Deferoxamine", "Dimercaprol", "Pralidoxime"],
             "NAC restores hepatic glutathione reserves, allowing safe detoxification of the reactive toxic metabolite NAPQI."),

            ("Which pharmacological class of antihypertensives is characteristically associated with a persistent dry cough and risk of angioedema?",
             "Angiotensin-Converting Enzyme (ACE) inhibitors",
             ["Angiotensin Receptor Blockers (ARBs)", "Beta-adrenergic blockers", "Calcium channel blockers"],
             "ACE degrades bradykinin; ACE inhibitors cause bradykinin accumulation in respiratory tissues, inducing cough and angioedema."),

            ("Which electrolyte abnormality is a well-known adverse effect of ACE inhibitors and Angiotensin Receptor Blockers?",
             "Hyperkalemia",
             ["Hypokalemia", "Hypernatremia", "Severe hypocalcemia"],
             "Suppression of angiotensin II reduces aldosterone secretion, diminishing renal potassium excretion in the distal nephron."),

            ("What is the primary mechanism of action of loop diuretics such as furosemide (Lasix)?",
             "Inhibition of the Na+/K+/2Cl- cotransporter in the thick ascending limb of the loop of Henle",
             ["Inhibition of the Na+/Cl- cotransporter in the distal convoluted tubule", "Antagonism of aldosterone receptors in the collecting duct", "Osmotic diuresis in the proximal convoluted tubule"],
             "Loop diuretics block solute reabsorption in the thick ascending limb, producing profound excretion of water, sodium, potassium, and chloride."),

            ("What adverse effect is shared between high-dose intravenous furosemide and aminoglycoside antibiotics?",
             "Ototoxicity (tinnitus, hearing loss, vertigo)",
             ["Severe pulmonary fibrosis", "Acute hemolytic anemia", "Gingival hyperplasia"],
             "Both loop diuretics and aminoglycosides alter endolymph electrolytes in the cochlea, potentiating ototoxic hair cell damage."),

            ("Which rapid-acting insulin analog has an onset of action within 15 minutes, requiring food to be immediately present?",
             "Insulin lispro (Humalog) or insulin aspart (NovoLog)",
             ["Regular human insulin (Humulin R)", "Neutral Protamine Hagedorn (NPH) insulin", "Insulin glargine (Lantus)"],
             "Rapid-acting analogs dissociate quickly from hexamers, producing onset in 10-15 minutes, peaking in 1 hour; meals must be ready."),

            ("What is the characteristic pharmacological profile of long-acting insulin glargine (Lantus)?",
             "Peakless, steady basal insulin release lasting approximately 24 hours",
             ["Onset in 10 minutes with a sharp peak at 2 hours", "Duration of 6 hours requiring administration before every meal", "Must be mixed with rapid-acting insulin in the same syringe"],
             "Glargine microprecipitates in subcutaneous tissue, slowly releasing monomers to provide a continuous, peakless 24-hour basal plateau."),

            ("Why should oral metformin be temporarily discontinued prior to procedures involving intravenous iodinated radiocontrast dye?",
             "Contrast-induced nephropathy can impair renal metformin clearance, leading to life-threatening lactic acidosis",
             ["Metformin reacts with iodine to form toxic cyanide compounds", "Metformin completely blocks contrast visualization on CT imaging", "Contrast precipitates metformin into insoluble biliary stones"],
             "If radiocontrast impairs renal function, metformin accumulates systemically, blocking hepatic gluconeogenesis and sparking fatal lactic acidosis."),

            ("What instruction is essential for a patient taking oral alendronate (Fosamax) for osteoporosis?",
             "Take first thing in the morning with a full glass of plain water and remain upright (sitting or standing) for at least 30 minutes",
             ["Take at bedtime with milk and lie down immediately", "Crush the tablet and dissolve it in orange juice", "Take with a heavy meal high in calcium"],
             "Bisphosphonates cause severe chemical esophagitis; swallowing with water and remaining upright prevents pill lodgement in the esophagus."),

            ("Why must systemic corticosteroid therapy (such as prednisone) be tapered gradually rather than stopped abruptly?",
             "To allow the suppressed hypothalamic-pituitary-adrenal (HPA) axis time to recover and prevent acute adrenal crisis",
             ["To prevent immediate rebound hypertension and stroke", "To avoid irreversible liver failure", "To prevent sudden drug-induced hypercalcemia"],
             "Exogenous steroids suppress endogenous ACTH; abrupt cessation leaves the atrophied adrenal cortex unable to produce vital cortisol."),

            ("What is the primary clinical indication for administering intravenous magnesium sulfate in obstetrics?",
             "Prevention and control of eclamptic seizures in severe preeclampsia",
             ["Induction of uterine contractions during post-term labor", "Treatment of postpartum hemorrhage", "Accelerating fetal lung surfactant production"],
             "Magnesium sulfate acts as a central nervous system depressant and smooth muscle relaxant, elevating the seizure threshold in preeclampsia."),

            ("What is the clinical hallmark sign of acute magnesium sulfate toxicity in a pregnant client?",
             "Loss of deep tendon reflexes followed by respiratory depression",
             ["Hyperreflexia with clonus and muscle tremors", "Sudden hypertensive spike above 200 mmHg", "Excessive urinary output exceeding 100 mL/hr"],
             "Magnesium blocks acetylcholine release at the neuromuscular junction; hyporeflexia precedes life-threatening respiratory arrest."),

            ("What black box warning is associated with fluoroquinolone antibiotics such as ciprofloxacin and levofloxacin?",
             "Increased risk of tendinitis and tendon rupture (most commonly the Achilles tendon)",
             ["Severe irreversible aplastic anemia", "Malignant hyperthermia upon surgical exposure", "Sudden acute congestive heart failure"],
             "Fluoroquinolones disrupt tenocyte collagen metabolism, predisposing patients (especially the elderly and athletes) to Achilles tendon rupture."),

            ("Why is the antibiotic tetracycline contraindicated in children under 8 years of age and pregnant women?",
             "It binds to calcium in developing teeth and bones, causing permanent tooth discoloration and enamel hypoplasia",
             ["It causes immediate complete destruction of the auditory nerve", "It triggers severe juvenile rheumatoid arthritis", "It causes premature fusion of the cranial sutures"],
             "Tetracyclines chelate divalent cations; deposition in active calcification sites causes permanent brown-gray teeth staining."),

            ("What serious adverse reaction can occur if intravenous vancomycin is infused too rapidly (under 60 minutes)?",
             "Vancomycin Flushing Syndrome ('Red Man Syndrome') mediated by non-immunologic histamine release",
             ["Type I anaphylactic IgE-mediated bronchospasm", "Immediate acute tubular necrosis within minutes", "Severe hyperkalemic cardiac arrest"],
             "Rapid infusion triggers direct degranulation of mast cells, causing erythema, flushing, and hypotension over the face, neck, and upper torso."),

            ("What is the primary clinical rationale for measuring serum trough levels of vancomycin immediately before the next dose?",
             "To ensure therapeutic efficacy while minimizing the risk of nephrotoxicity and ototoxicity",
             ["To confirm the patient is not allergic to the drug", "To measure hepatic drug metabolism rates", "To calculate total daily urinary volume"],
             "Trough levels reflect minimum steady-state concentration; monitoring ensures levels are adequate for bacterial kill without accumulating toxically."),

            ("Which class of medications is recognized as first-line therapy for the management of panic disorder and generalized anxiety disorder?",
             "Selective Serotonin Reuptake Inhibitors (SSRIs)",
             ["Long-term daily high-dose barbiturates", "First-generation typical antipsychotics", "Centrally acting alpha-2 antagonists"],
             "SSRIs and SNRIs are first-line for anxiety disorders due to their proven long-term efficacy and absence of physical dependence."),

            ("What is the primary physiological mechanism by which sublingual nitroglycerin relieves acute anginal chest pain?",
             "Promotes systemic venous dilation, reducing cardiac preload, ventricular wall tension, and myocardial oxygen demand",
             ["Directly constricts peripheral arterioles to elevate blood pressure", "Increases heart rate to improve coronary blood flow velocity", "Suppresses the sinoatrial node to produce bradycardia"],
             "Nitroglycerin is converted to nitric oxide in vascular smooth muscle, primarily dilating venous capacitance beds to reduce preload."),

            ("What instruction should the nurse provide regarding the administration of sublingual nitroglycerin for acute chest pain?",
             "Place one tablet under the tongue; if pain is not relieved after 5 minutes, call 911 and take a second dose",
             ["Swallow the tablet whole with a large glass of cold milk", "Chew three tablets simultaneously at the onset of chest discomfort", "Wait 30 minutes after the first dose before contacting emergency medical services"],
             "Current guidelines advise calling 911 if pain persists 5 minutes after the first dose, as this may represent acute myocardial infarction."),

            ("Why is the concurrent administration of sildenafil (Viagra) and nitroglycerin strictly contraindicated?",
             "Combined cGMP-mediated vasodilation can cause catastrophic, refractory hypotension and cardiovascular collapse",
             ["Sildenafil completely neutralizes the anti-ischemic effects of nitroglycerin", "The combination causes severe hyperthermia and rhabdomyolysis", "The combination triggers acute hepatic failure"],
             "PDE-5 inhibitors block cGMP breakdown while nitrates stimulate cGMP synthesis; their synergistic action precipitates profound fatal shock.")
        ]
    }

print("Loaded data_health.py successfully.")

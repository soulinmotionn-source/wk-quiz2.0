"""
make_health_bank.py
Generates the 6 health and clinical question banks:
- nursing.json (150)
- nclex.json (150)
- medical.json (150)
- anatomy-physiology.json (160)
- pharmacology.json (160)
- diseases-disorders.json (160)
Total: 930 questions.
"""

import os
import json
from .utils import QuestionRegistry, rotate_options, slugify
from .medical_group import generate_medical_group
from .gen_medical import generate_medical_json

QUESTIONS_DIR = os.path.abspath('src/data/questions')
os.makedirs(QUESTIONS_DIR, exist_ok=True)

diffs = ['easy', 'medium', 'hard']

def run_health_generation(registry):
    print("--- Generating Health & Medical Bank ---")
    
    # 1. Nursing (150)
    nursing_q = generate_medical_group(registry)['nursing']
    with open(os.path.join(QUESTIONS_DIR, 'nursing.json'), 'w', encoding='utf-8') as f:
        json.dump(nursing_q, f, indent=2)
    print(f"Saved nursing.json ({len(nursing_q)} questions)")

    # 2. Medical (150)
    medical_q = generate_medical_json(registry)
    with open(os.path.join(QUESTIONS_DIR, 'medical.json'), 'w', encoding='utf-8') as f:
        json.dump(medical_q, f, indent=2)
    print(f"Saved medical.json ({len(medical_q)} questions)")

if __name__ == '__main__':
    reg = QuestionRegistry()
    run_health_generation(reg)

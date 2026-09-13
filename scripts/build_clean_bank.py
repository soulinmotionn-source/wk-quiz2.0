"""
build_clean_bank.py
High-integrity Question Bank Generator for WKQuiz.com
Generates 5,000 completely distinct, canonically categorized, realistic questions.

Rules:
1. Pure question text only: NO category prefixes ("In clinical medicine,", "In world history:", etc.)
2. NO trailing reference numbers ("(Ref #34)", "(Scenario #1)", etc.)
3. Strict uniqueness: Exactly 5,000 unique question texts across the entire database.
4. Correct 0-based answer indexing with balanced option rotation.
5. 100% strict subcategory compliance matching scripts/validateQuestions.js.
"""

import os
import sys
import json
import re

# Ensure scripts directory is in python path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
sys.path.insert(0, BASE_DIR)

from generators.utils import slugify, rotate_options, QuestionRegistry
from generators import (
    math_logic,
    iq_grammar,
    trivia_civics,
    medical_group,
    gen_medical,
    data_health,
    data_anatomy,
    data_pharm,
    gen_health_civics,
    data_civics_driving,
    data_stem_tech,
    data_stem_part1,
    data_stem_part2,
    data_stem_part3,
    data_culture_part1,
    data_culture_part2,
    data_culture_part3,
)

QUESTIONS_DIR = os.path.join(PROJECT_ROOT, 'src', 'data', 'questions')
os.makedirs(QUESTIONS_DIR, exist_ok=True)

registry = QuestionRegistry()

DIFFS = ['easy', 'medium', 'hard']

def build_q(category: str, subcategory: str, difficulty: str, q_text: str, correct: str, distractors: list, explanation: str, index: int) -> dict:
    target_idx = (index - 1) % 4
    opts = rotate_options(correct, distractors, target_idx)
    q_id = f"{slugify(category)}-{slugify(subcategory)}-{index:04d}"
    
    item = {
        "id": q_id,
        "category": category,
        "subcategory": subcategory,
        "difficulty": difficulty,
        "question": q_text.strip(),
        "options": opts,
        "correctAnswer": target_idx,
        "explanation": explanation.strip(),
        "tags": [slugify(category), slugify(subcategory), difficulty],
        "active": True
    }
    return registry.validate_and_register(item)

def build_from_dict(category: str, items_dict: dict) -> list:
    questions = []
    idx = 1
    for subcat, items in items_dict.items():
        for item in items:
            diff = DIFFS[(idx - 1) % 3]
            q = build_q(
                category=category,
                subcategory=subcat,
                difficulty=diff,
                q_text=item[0],
                correct=item[1],
                distractors=item[2],
                explanation=item[3],
                index=idx
            )
            questions.append(q)
            idx += 1
    return questions

def main():
    print("=" * 60)
    print("       BUILDING WKQUIZ 5,000 CLEAN QUESTION BANK")
    print("=" * 60)

    category_builders = {
        # 1-4: Direct generator functions using build_q
        'Mathematics': lambda: math_logic.generate_math_questions(build_q),
        'IQ & Logic': lambda: iq_grammar.generate_iq_questions(build_q),
        'English & Grammar': lambda: iq_grammar.generate_grammar_questions(build_q),
        'Geography': lambda: trivia_civics.generate_geography_questions(build_q),

        # 5-6: Custom medical registry functions
        'Nursing': lambda: medical_group.generate_medical_group(registry)['nursing'],
        'Medical': lambda: gen_medical.generate_medical_json(registry),

        # 7-10: Health & Biological Sciences
        'NCLEX': lambda: build_from_dict('NCLEX', data_health.get_nclex_items()),
        'Anatomy & Physiology': lambda: build_from_dict('Anatomy & Physiology', data_anatomy.get_anatomy_items()),
        'Pharmacology': lambda: build_from_dict('Pharmacology', data_pharm.get_pharmacology_items()),
        'Diseases & Disorders': lambda: build_from_dict('Diseases & Disorders', gen_health_civics.get_diseases_items()),

        # 11-15: History, Civics, Driving & GK
        'History': lambda: build_from_dict('History', data_civics_driving.get_history_items()),
        'USA Tests': lambda: build_from_dict('USA Tests', data_civics_driving.get_usa_tests_items()),
        'DMV Test': lambda: build_from_dict('DMV Test', data_civics_driving.get_dmv_test_items()),
        'License Plate Quiz': lambda: build_from_dict('License Plate Quiz', data_civics_driving.get_license_plate_items()),
        'General Knowledge': lambda: build_from_dict('General Knowledge', data_civics_driving.get_general_knowledge_items()),

        # 16-24: STEM & Technical Trades
        'Science': lambda: build_from_dict('Science', data_stem_tech.get_science_items()),
        'Engineering': lambda: build_from_dict('Engineering', data_stem_part1.get_engineering_items()),
        'Electrical': lambda: build_from_dict('Electrical', data_stem_part1.get_electrical_items()),
        'Electrical Symbols': lambda: build_from_dict('Electrical Symbols', data_stem_part1.get_electrical_symbols_items()),
        'Electronics': lambda: build_from_dict('Electronics', data_stem_part2.get_electronics_items()),
        'HVAC': lambda: build_from_dict('HVAC', data_stem_part2.get_hvac_items()),
        'Automotive': lambda: build_from_dict('Automotive', data_stem_part2.get_automotive_items()),
        'Technology': lambda: build_from_dict('Technology', data_stem_part3.get_technology_items()),
        'Computers': lambda: build_from_dict('Computers', data_stem_part3.get_computers_items()),

        # 25-33: Culture, Media, Arts & Life Wisdom
        'Entertainment': lambda: build_from_dict('Entertainment', data_culture_part1.get_entertainment_items()),
        'Movies': lambda: build_from_dict('Movies', data_culture_part1.get_movies_items()),
        'TV Shows': lambda: build_from_dict('TV Shows', data_culture_part1.get_tv_shows_items()),
        'Drama': lambda: build_from_dict('Drama', data_culture_part2.get_drama_items()),
        'Celebrity': lambda: build_from_dict('Celebrity', data_culture_part2.get_celebrity_items()),
        'Music': lambda: build_from_dict('Music', data_culture_part2.get_music_items()),
        'Cartoon Characters': lambda: build_from_dict('Cartoon Characters', data_culture_part3.get_cartoon_items()),
        'Relationships': lambda: build_from_dict('Relationships', data_culture_part3.get_relationships_items()),
        'Wisdom': lambda: build_from_dict('Wisdom', data_culture_part3.get_wisdom_items()),
    }

    total_saved = 0
    categories_written = 0

    for category, builder_fn in category_builders.items():
        print(f"\nProcessing [{category}]...")
        questions = builder_fn()
        count = len(questions)
        total_saved += count
        categories_written += 1

        slug = slugify(category)
        file_path = os.path.join(QUESTIONS_DIR, f"{slug}.json")
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(questions, f, indent=2, ensure_ascii=False)
        print(f"  -> Saved {count} questions to {os.path.basename(file_path)}")

    print("\n" + "=" * 60)
    print(f"SUCCESS: Generated {total_saved} questions across {categories_written} categories!")
    print(f"Registry verified {len(registry.seen_questions)} unique question texts.")
    print("=" * 60)

if __name__ == '__main__':
    main()

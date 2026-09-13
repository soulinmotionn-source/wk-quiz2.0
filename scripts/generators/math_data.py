"""
math_data.py
Exports:
- generate_math_questions
- generate_iq_questions
- generate_grammar_questions
"""

from .math_logic import generate_math_questions
from .iq_grammar import generate_iq_questions, generate_grammar_questions

def get_math_logic_questions(build_q_fn):
    return {
        "mathematics": generate_math_questions(build_q_fn),
        "iq-logic": generate_iq_questions(build_q_fn),
        "english-grammar": generate_grammar_questions(build_q_fn)
    }

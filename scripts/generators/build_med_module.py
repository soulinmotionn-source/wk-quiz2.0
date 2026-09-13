"""
build_med_module.py
Writes scripts/generators/med_data.py with authentic, direct medical questions.
"""

import os

header = '''"""
med_data.py
Generates 930 clinical & healthcare questions:
- Nursing (150)
- NCLEX (150)
- Medical (150)
- Anatomy & Physiology (160)
- Pharmacology (160)
- Diseases & Disorders (160)
"""

from .medical_group import generate_medical_group
'''

with open('scripts/generators/med_data.py', 'w', encoding='utf-8') as f:
    f.write(header)

print("Started med_data.py")

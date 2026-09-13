import re

with open('scripts/generators/iq_grammar.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    # Pattern: ("Question", "Correct", "Dist1", "Dist2", "Dist3"], "Exp")
    # Needs to become: ("Question", "Correct", ["Dist1", "Dist2", "Dist3"], "Exp")
    # Specifically: , "Correct", "Dist1" -> , "Correct", ["Dist1"
    m = re.search(r'(\(\s*".*?",\s*".*?",\s*)(".*?",\s*".*?",\s*".*?"\s*\]\s*,\s*".*?"\s*\)\s*,?\s*$)', line)
    if m:
        fixed_line = line[:m.start()] + m.group(1) + '[' + m.group(2)
        new_lines.append(fixed_line)
    else:
        new_lines.append(line)

with open('scripts/generators/iq_grammar.py', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Fixed bracket syntax in iq_grammar.py")

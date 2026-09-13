import re
import sys

filename = sys.argv[1] if len(sys.argv) > 1 else 'scripts/generators/gen_medical.py'
with open(filename, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
fixed_count = 0
for line in lines:
    m = re.search(r'(\(\s*"[^"]*?",\s*"[^"]*?",\s*)("[^"]*?",\s*"[^"]*?",\s*"[^"]*?"\s*\]\s*,\s*"[^"]*?"\s*\)\s*,?\s*$)', line)
    if m:
        new_lines.append(line[:m.start()] + m.group(1) + '[' + m.group(2))
        fixed_count += 1
    else:
        new_lines.append(line)

with open(filename, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Fixed {fixed_count} bracket lines in {filename}")

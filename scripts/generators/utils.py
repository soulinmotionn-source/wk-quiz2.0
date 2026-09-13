import re

def slugify(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def rotate_options(correct: str, distractors: list, target_index: int) -> list:
    res = [None] * 4
    res[target_index] = correct
    d_idx = 0
    for i in range(4):
        if i != target_index:
            res[i] = distractors[d_idx]
            d_idx += 1
    return res

class QuestionRegistry:
    def __init__(self):
        self.seen_ids = set()
        self.seen_questions = set()
        self.forbidden_patterns = [
            re.compile(r'\(Ref\s*#?\d+\)', re.IGNORECASE),
            re.compile(r'\(Scenario\s*#?\d+\)', re.IGNORECASE),
            re.compile(r'\(Item\s*#?\d+\)', re.IGNORECASE),
            re.compile(r'^In\s+(?:clinical\s+)?(?:medicine|nursing|human\s+anatomy|anatomy\s+and\s+physiology|pharmacology|pathology|world\s+and\s+american\s+history|fundamental\s+engineering|electrical\s+schematic\s+diagrams|electronics|hvac|modern\s+software|computer\s+architecture|automotive|healthy\s+relationship)\s*(?:,|:)', re.IGNORECASE),
            re.compile(r'^Regarding\s+(?:cinema|television|life\s+wisdom|theater|celebrity|music)\s*(?:,|:)', re.IGNORECASE),
            re.compile(r'^(?:General\s+knowledge\s+challenge|World\s+geography\s+quiz|Scientific\s+concepts|Electrical\s+theory|Logic\s+and\s+analytical|Mathematical\s+problem\s+solving|English\s+grammar\s+and\s+usage|US\s+Civics|DMV\s+driving|US\s+state\s+license|Pop\s+culture|Animation\s+and\s+cartoon)\s*(?:,|:)', re.IGNORECASE)
        ]

    def validate_and_register(self, q_item: dict):
        q_id = q_item['id']
        if q_id in self.seen_ids:
            raise ValueError(f"Duplicate ID detected: {q_id}")
        self.seen_ids.add(q_id)

        q_text = q_item['question'].strip()
        for pat in self.forbidden_patterns:
            if pat.search(q_text):
                raise ValueError(f"Question contains forbidden pattern '{pat.pattern}': {q_text}")

        norm_text = q_text.lower()
        if norm_text in self.seen_questions:
            raise ValueError(f"Exact duplicate question text detected: {q_text}")
        self.seen_questions.add(norm_text)
        
        # Verify 4 options, all unique
        opts = q_item['options']
        if len(opts) != 4:
            raise ValueError(f"Question {q_id} must have exactly 4 options. Found {len(opts)}")
        if len(set(opts)) != 4:
            raise ValueError(f"Question {q_id} contains duplicate options: {opts}")
            
        return q_item

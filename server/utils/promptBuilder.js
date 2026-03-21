export const buildNotesPrompt = ({
  topic,
  classLevel,
  examType,
  revisionMode,
  includeDiagram,
  includeChart
}) => {
  return `
You are a STRICT JSON generator for an exam preparation system.

⚠️ VERY IMPORTANT:
- Output MUST be valid JSON
- Your response will be parsed using JSON.parse()
- INVALID JSON will cause system failure
- Use ONLY double quotes "
- NO comments, NO trailing commas
- Escape line breaks using \\n
- Do NOT use emojis inside text values

TASK:
Convert the given topic into exam-focused notes.

INPUT:
Topic: ${topic}
Class Level: ${classLevel || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

GLOBAL CONTENT RULES:
- Use clear, simple, exam-oriented language
- Notes MUST be Markdown formatted
- Headings and bullet points only

REVISION MODE RULES (CRITICAL):
- If REVISION MODE is ON:
  - Notes must be VERY SHORT
  - Only bullet points
  - One-line answers only
  - Definitions, formulas, keywords
  - No paragraphs
  - No explanations
  - Content must feel like:
    - last-day revision
    - 5-minute exam cheat sheet
  - revisionPoints MUST summarize ALL important facts

- If REVISION MODE is OFF:
  - Notes must be DETAILED but exam-focused
  - Each topic should include:
    - definition
    - short explanation
    - examples (if applicable)
  - Paragraph length: max 2–4 lines
  - No storytelling, no extra theory

IMPORTANCE RULES:
- Divide sub-topics into THREE categories:
  - ⭐ Very Important Topics
  - ⭐⭐ Important Topics
  - ⭐⭐⭐ Frequently Asked Topics
- All three categories MUST be present
- Base importance on exam frequency and weightage

DIAGRAM RULES:
- If INCLUDE DIAGRAM is YES:
  - diagram.data MUST be a SINGLE STRING
  - Valid Mermaid syntax only
  - Must start with: graph TD
  - Wrap EVERY node label in square brackets [ ]
  - Do NOT use special characters inside labels
- If INCLUDE DIAGRAM is NO:
  - diagram.data MUST be ""

CHART RULES (RECHARTS):
- If INCLUDE CHARTS is YES:
  - charts array MUST NOT be empty
  - Generate at least ONE chart
  - Choose chart based on topic type:
    - THEORY topic → bar or pie (importance / weightage)
    - PROCESS topic → bar or line (steps / stages)
  - Use numeric values ONLY
  - Labels must be short and exam-oriented
- If INCLUDE CHARTS is NO:
  - charts MUST be []

CHART TYPES ALLOWED:
- bar
- line
- pie

CHART OBJECT FORMAT:
{
  "type": "bar | line | pie",
  "title": "string",
  "data": [
    { "name": "string", "value": 10 }
  ]
}

STRICT JSON FORMAT (DO NOT CHANGE):

{
  "subTopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "importance": "⭐ | ⭐⭐ | ⭐⭐⭐",
  "notes": "string",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": ""
  },
  "diagram": {
    "type": "flowchart | graph | process",
    "data": ""
  },
  "charts": []
}

RETURN ONLY VALID JSON.
`;
};

export const buildInterviewPrompt = ({
  role,
  experience,
  topics,
  includeAnswers,
  mixedDifficulty,
}) => {
  return `
You are a STRICT JSON generator for an AI interview preparation system.

⚠️ VERY IMPORTANT:
- Output MUST be valid JSON
- Your response will be parsed using JSON.parse()
- INVALID JSON will cause system failure
- Use ONLY double quotes "
- NO comments, NO trailing commas
- Escape line breaks using \\n
- Do NOT use emojis inside text values

TASK:
Generate interview questions based on the given input.

INPUT:
Role: ${role}
Experience: ${experience || "Not specified"}
Topics: ${topics || "General"}
Include Answers: ${includeAnswers ? "YES" : "NO"}
Mixed Difficulty: ${mixedDifficulty ? "YES" : "NO"}

GLOBAL RULES:
- Questions must be practical and commonly asked in real interviews
- Keep language clear and concise
- Avoid overly theoretical or irrelevant questions
- Focus on real-world understanding

DIFFICULTY RULES:
- If MIXED DIFFICULTY is YES:
  - Include Easy, Medium, and Hard questions
- If MIXED DIFFICULTY is NO:
  - Keep difficulty consistent with experience level

ANSWER RULES:
- If INCLUDE ANSWERS is YES:
  - Provide short, clear, interview-ready answers
  - Max 3–4 lines per answer
- If INCLUDE ANSWERS is NO:
  - "answer" MUST be ""

QUESTION TYPES:
- Include a mix of:
  - Conceptual questions
  - Practical/scenario-based questions
  - Coding or problem-solving questions (if applicable)

STRICT JSON FORMAT (DO NOT CHANGE):

{
  "questions": [
    {
      "id": 1,
      "question": "string",
      "answer": "string",
      "difficulty": "Easy | Medium | Hard",
      "type": "Conceptual | Practical | Coding"
    }
  ]
}

RULES:
- Generate EXACTLY 20 questions
- IDs must start from 1 and increment
- difficulty must match exactly: Easy, Medium, or Hard
- type must match exactly: Conceptual, Practical, or Coding
- Do NOT add extra fields
- Do NOT wrap JSON in markdown

RETURN ONLY VALID JSON.
`;
};

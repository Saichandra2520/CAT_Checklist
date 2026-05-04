import { syllabus } from "@/lib/data/syllabus";
import { TopicContent } from "@/types";

const verbalSummary = (topic: string) =>
  `${topic} in CAT VARC is tested as a decision skill, not a memory skill. The examiner gives dense language, distractor options, and close answer choices that appear valid unless you track meaning sentence by sentence. Start by identifying the author goal, then map support statements, qualifiers, and contrast words such as however, yet, and although. In question solving, remove options that introduce outside information, exaggerate certainty, or confuse example with conclusion. Build a habit of proving every final answer directly from the text or from a necessary inference based on the text. Practice under time pressure by first solving with annotation, then solving without annotation, and compare accuracy. Over a few weeks, shift from slow accuracy-first reading to faster passage navigation. This topic becomes high scoring when you combine process discipline, option elimination, and post-test error logging to identify repeated interpretation mistakes.`;

const dilrSummary = (topic: string) =>
  `${topic} in DILR rewards structured setup more than raw speed. Before solving, list entities, variables, and constraints in a clean table or grid. Convert every statement into a precise condition, then immediately mark fixed values, mutual exclusions, and ranking relationships. Avoid jumping into calculation until the data model is stable. In CAT, traps come from hidden assumptions, mixed units, and partial information that tempts premature conclusions. Use mini-checkpoints: after each clue, ask what is forced, what is possible, and what is impossible. If progress stalls for more than two minutes, reframe the set using another representation such as case-splitting or ratio normalization. During mocks, prioritize solvable sets first and return to heavy sets later. Long-term improvement comes from maintaining a solved-set journal where you track set type, key breakthrough moment, and the exact mistake pattern you made.`;

const qaSummary = (topic: string) =>
  `${topic} in CAT QA is best learned from first principles and algebraic representation. Instead of memorizing isolated tricks, define variables, translate language into equations, and simplify step by step. Most CAT questions combine two ideas, so conceptual clarity matters more than formula recall alone. Start each problem by identifying what is known, what is unknown, and which constraints link them. Prefer estimation and option elimination when the numbers are ugly, but confirm with exact math before locking the answer. Build speed by practicing standard patterns repeatedly and then mixing them with medium-difficulty variations. After each mock, classify errors into concept gap, setup error, arithmetic slip, or time panic; then revise accordingly. Consistency in this topic comes from deliberate practice: 10 to 15 focused questions daily, short revision notes, and weekly mixed tests that include both familiar and unfamiliar question frames.`;

const commonTraps = [
  "Choosing an option that sounds familiar without validating the exact condition in the question.",
  "Ignoring boundary cases such as zero, equality, or negative values where allowed.",
  "Rushing calculations and carrying forward an early arithmetic or interpretation error.",
  "Treating examples in the stem as universal rules instead of context-specific clues."
];

const quickTips = [
  "Spend first 20 seconds deciding approach before solving.",
  "Eliminate impossible options early to reduce cognitive load.",
  "Mark uncertain questions for second pass instead of forcing a guess.",
  "Log every mistake with root cause the same day."
];

const qaFormulas = [
  { label: "Percent Change", formula: "New Value = Old Value x (1 +/- r/100)", example: "If price rises by 20%, multiply by 1.2." },
  { label: "Average", formula: "Average = Sum of terms / Number of terms", example: "If average of 5 numbers is 12, total is 60." },
  { label: "Time-Work", formula: "Work = Rate x Time", example: "If A does work in 10 days, rate = 1/10." }
];

const makeQuestions = (topic: string, isQa: boolean) => {
  if (isQa) {
    return [
      {
        qText: `${topic}: If a value increases by 25% and then decreases by 20%, what is the net percentage change?`,
        options: ["No change", "5% increase", "5% decrease", "10% increase"],
        answer: "No change",
        explanation: "Assume base 100. Increase 25% gives 125. Decrease 20% gives 100. Final equals initial, so net change is 0%."
      },
      {
        qText: `${topic}: A quantity is divided in the ratio 3:5. If the larger part is 40, find the smaller part.`,
        options: ["15", "24", "30", "32"],
        answer: "24",
        explanation: "Ratio parts total 8. One part = 40/5 = 8. Smaller part = 3 x 8 = 24."
      },
      {
        qText: `${topic}: Solve quickly using options: (48 x 52) - (50 x 50).`,
        options: ["-4", "0", "-16", "16"],
        answer: "-4",
        explanation: "Use identity (a-b)(a+b)=a^2-b^2. 48 x 52 = 50^2 - 2^2 = 2500 - 4 = 2496. Then 2496 - 2500 = -4."
      }
    ];
  }
  return [
    {
      qText: `${topic}: Which option best captures the central claim in the given passage fragment?`,
      options: ["A narrow factual statement", "A qualified argument with evidence", "An unrelated opinion", "A rhetorical aside"],
      answer: "A qualified argument with evidence",
      explanation: "CAT verbal options often include extreme or irrelevant alternatives. The correct option preserves scope and the author logic."
    },
    {
      qText: `${topic}: Identify the option that introduces an assumption not supported by the text/data.`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      answer: "Option C",
      explanation: "Option C adds new information beyond the premises. Unsupported additions are common CAT traps."
    },
    {
      qText: `${topic}: In a timed set, what is the strongest first move?`,
      options: ["Start solving randomly", "Build a structure and list constraints", "Skip reading clues", "Guess and move on"],
      answer: "Build a structure and list constraints",
      explanation: "Structured setup reduces rework and helps identify forced deductions earlier in the set."
    }
  ];
};

export const topicContent: Record<string, TopicContent> = syllabus.reduce((acc, item, index) => {
  const isQa = item.section === "QA";
  const isDilr = item.section === "DILR";
  acc[item.id] = {
    id: item.id,
    conceptSummary: isQa ? qaSummary(item.topic) : isDilr ? dilrSummary(item.topic) : verbalSummary(item.topic),
    keyFormulas: isQa ? qaFormulas : undefined,
    commonTraps,
    sampleQuestions: makeQuestions(item.topic, isQa),
    quickTips,
    studyOrder: index + 1
  };
  return acc;
}, {} as Record<string, TopicContent>);

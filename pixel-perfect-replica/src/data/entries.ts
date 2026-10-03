export interface Entry {
  wingId: string;
  number: number;
  total: number;
  fact: string;
  expansion: string;
}

export const entries: Entry[] = [
  {
    wingId: "the-human-mind",
    number: 1,
    total: 100,
    fact:
      "Your brain generates enough electrical impulses every day to power a small light bulb — and most of that energy is spent not on thinking, but on predicting what will happen next.",
    expansion:
      "The brain's prediction engine runs on more power than most people realise. It is not a recorder. It is a forecast machine.",
  },
  {
    wingId: "the-human-mind",
    number: 2,
    total: 100,
    fact:
      "Every time you recall a memory, you are not replaying it — you are reconstructing it. Each reconstruction subtly rewrites the original. The memory you trust most has changed the most.",
    expansion:
      "Memory reconsolidation means every act of remembering is also an act of editing. The most-recalled memories are the least accurate.",
  },
  {
    wingId: "the-human-mind",
    number: 3,
    total: 100,
    fact:
      "Your brain replays the 3 seconds before a car crash in slow motion — because it floods itself with norepinephrine to extract maximum survival data from the event.",
    expansion:
      "This is tachypsychia — time distortion under extreme stress. The brain does not panic. It enters emergency data-collection mode.",
  },
];

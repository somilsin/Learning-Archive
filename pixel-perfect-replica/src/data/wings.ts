export type WingStatus = "open" | "queued" | "archived";

export interface Wing {
  id: string;
  roman: string;
  title: string;
  status: WingStatus;
  entry: number;
  total: number;
  description: string;
}

export const wings: Wing[] = [
  {
    id: "the-human-mind",
    roman: "I",
    title: "The Human Mind",
    status: "open",
    entry: 3,
    total: 100,
    description:
      "Cognitive anomalies, memory distortions, perception failures, and the machinery of consciousness. The most unsettling exhibit in the archive — because it is about you.",
  },
  {
    id: "deep-ocean-trenches",
    roman: "II",
    title: "Deep Ocean Trenches",
    status: "queued",
    entry: 0,
    total: 100,
    description:
      "Hadal zones, bioluminescent phenomena, pressure physics, and creatures that have never seen light. The least-explored terrain on the planet.",
  },
  {
    id: "bronze-age-collapse",
    roman: "III",
    title: "The Bronze Age Collapse",
    status: "queued",
    entry: 0,
    total: 100,
    description:
      "Around 1200 BC, multiple advanced civilisations collapsed simultaneously. The cause remains unresolved. This wing documents what disappeared and what we still do not understand.",
  },
  {
    id: "pre-flood-records",
    roman: "IV",
    title: "Ancient Civilisations: Pre-Flood Records",
    status: "queued",
    entry: 0,
    total: 100,
    description:
      "Geological, mythological, and archaeological evidence for civilisations predating the accepted timeline. Not speculation — documented anomalies.",
  },
  {
    id: "physical-extremes",
    roman: "V",
    title: "The Universe's Physical Extremes",
    status: "queued",
    entry: 0,
    total: 100,
    description:
      "Neutron stars, rogue planets, magnetars, the cosmic web, and the physical limits of reality. Where the laws of physics begin to fail.",
  },
  {
    id: "plagues-and-pandemics",
    roman: "VI",
    title: "Historical Plagues and Pandemics",
    status: "queued",
    entry: 0,
    total: 100,
    description:
      "The Antonine Plague, Black Death, Plague of Justinian, 1918 influenza, and what the historical record reveals about civilisational collapse via contagion.",
  },
];

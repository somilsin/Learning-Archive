export interface Wing {
  id: number;
  roman: string;
  name: string;
  bgType: string;
  accentColor: string;
  pexelsQuery: string;
  audioDesc: string;
}

export interface SlideExpansionContent {
  label: string;
  title: string;
  para1: string;
  para2: string;
}

export interface Source {
  label: string;
  detail: string;
}

export interface PostOutput {
  reelText: string;
  slides: {
    slide3: SlideExpansionContent;
    slide4: SlideExpansionContent;
    slide5: SlideExpansionContent;
    slide6: { sources: Source[] };
  };
  caption: string;
  pexelsQuery: string;
  capCutBrief: string;
}

export type GenerationStatus = "idle" | "loading" | "done" | "error";

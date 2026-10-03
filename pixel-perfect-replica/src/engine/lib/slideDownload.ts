import type { RefObject } from "react";

async function captureSlide(element: HTMLElement, filename: string): Promise<void> {
  const html2canvas = (await import("html2canvas")).default;
  await document.fonts.ready;
  const canvas = await html2canvas(element, {
    width: 1080,
    height: 1080,
    scale: 1,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png", 1.0);
  link.click();
}

export async function downloadSlide(
  ref: RefObject<HTMLElement | null>,
  filename: string
): Promise<void> {
  if (!ref.current) return;
  await captureSlide(ref.current, filename);
}

export async function downloadAllSlides(
  refs: RefObject<HTMLElement | null>[],
  entryNum: number,
  wingRoman: string
): Promise<void> {
  for (let i = 0; i < refs.length; i++) {
    if (!refs[i].current) continue;
    const name = `archive-wing${wingRoman}-entry${String(entryNum).padStart(3, "0")}-slide${i + 1}.png`;
    await captureSlide(refs[i].current!, name);
    await new Promise<void>((r) => setTimeout(r, 350));
  }
}

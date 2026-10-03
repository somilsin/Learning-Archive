export function buildCalendarLink(
  entryNum: number,
  wingName: string,
  caption: string
): string {
  // 19:00 IST = UTC+5:30, so 13:30 UTC
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setUTCHours(13, 30, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (date: Date) =>
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00Z`;
  const end = new Date(d.getTime() + 30 * 60 * 1000);
  const text = encodeURIComponent(
    `POST ENTRY ${String(entryNum).padStart(3, "0")} — ${wingName}`
  );
  const details = encodeURIComponent(caption.slice(0, 200));
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&dates=${fmt(d)}/${fmt(end)}`;
}

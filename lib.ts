export const EVENT = {
  iso: "2026-11-29T20:30:00+03:30", // یکشنبه ۸ آذر ۱۴۰۵ ساعت ۲۰:۳۰ (وقت ایران)
  title: "WATCH ISLAND | Grand Opening Ceremony",
  address: "فلکه زیباشهر، جنب بانک مسکن، پاساژ لیام، طبقه اول",
};
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(EVENT.address + " پاساژ لیام");
export const fa = (n: number) => n.toLocaleString("fa-IR", { minimumIntegerDigits: 2, useGrouping: false });

export function downloadIcs() {
  const d = new Date(EVENT.iso), e = new Date(d.getTime() + 3 * 3600e3);
  const f = (x: Date) => x.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//WatchIsland//Invite//FA", "BEGIN:VEVENT",
    `UID:watch-island-opening@invite`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(d)}`, `DTEND:${f(e)}`,
    "SUMMARY:افتتاحیه رسمی ساعت‌فروشی جزیره (WATCH ISLAND)", `LOCATION:${EVENT.address}`,
    "BEGIN:VALARM", "TRIGGER:-PT2H", "ACTION:DISPLAY", "DESCRIPTION:افتتاحیه WATCH ISLAND", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  a.download = "watch-island-opening.ics"; a.click(); URL.revokeObjectURL(a.href);
}

let ctx: AudioContext | null = null, master: GainNode | null = null;
export function setAmbient(on: boolean) {
  if (!ctx) {
    ctx = new AudioContext(); master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    [110, 164.81, 220, 277.18].forEach((fr, i) => {
      const o = ctx!.createOscillator(), g = ctx!.createGain(), l = ctx!.createOscillator(), lg = ctx!.createGain();
      o.type = "sine"; o.frequency.value = fr; g.gain.value = 0.05 / (i + 1);
      l.frequency.value = 0.05 + i * 0.03; lg.gain.value = g.gain.value * 0.6; l.connect(lg); lg.connect(g.gain);
      o.connect(g); g.connect(master!); o.start(); l.start();
    });
  }
  ctx.resume(); master!.gain.cancelScheduledValues(ctx.currentTime);
  master!.gain.linearRampToValueAtTime(on ? 0.6 : 0, ctx.currentTime + 2);
}

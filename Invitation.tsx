"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { CalendarPlus, Copy, Check, MapPin, Navigation, Share2, Volume2, VolumeX } from "lucide-react";
import { EVENT, MAP_URL, downloadIcs, fa, setAmbient } from "./lib";

const ease = [0.22, 1, 0.36, 1] as const;
const Logo = ({ w = 360, className = "" }: { w?: number; className?: string }) => (
  <Image src="/logo.webp" alt="WATCH ISLAND" width={w} height={Math.round(w * 0.91)} priority className={`logo h-auto ${className}`} style={{ width: w, maxWidth: "70vw" }} />
);
const Reveal = ({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1.1, delay: d, ease }}>{children}</motion.div>
);
const Btn = ({ children, onClick, href, solid }: { children: React.ReactNode; onClick?: () => void; href?: string; solid?: boolean }) => {
  const c = `inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm transition duration-500 ${solid ? "border-ivory bg-ivory text-ink hover:bg-silver" : "border-silver/40 text-ivory hover:border-ivory hover:bg-white/5"}`;
  return href ? <a className={c} href={href} target="_blank" rel="noopener noreferrer">{children}</a> : <button className={c} onClick={onClick}>{children}</button>;
};

function Intro({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.section exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }} transition={{ duration: 1.1, ease }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink px-6">
      <motion.div className="absolute h-px w-[60vw] max-w-xl bg-silver" initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }} transition={{ duration: 2.2, times: [0, .6, 1] }} />
      <motion.div className="absolute inset-5 border border-silver/30 md:inset-10" initial={{ clipPath: "inset(50% 50% 50% 50%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)" }} transition={{ duration: 2, delay: 1.2, ease }} />
      <motion.div initial={{ opacity: 0, filter: "blur(14px) brightness(2)" }} animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }} transition={{ duration: 2.2, delay: 2.2, ease }}>
        <Logo w={340} />
      </motion.div>
      <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 3.4 }}>
        <p className="caps silver-text text-lg">Watch Island</p>
        <p className="caps mt-3 text-[11px] text-silver">Grand Opening</p>
      </motion.div>
      <motion.div className="mt-12" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 4.1 }}>
        <Btn onClick={onEnter}>ورود به مراسم افتتاحیه</Btn>
      </motion.div>
    </motion.section>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  return (
    <section ref={ref} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(191,193,196,.16),transparent_60%)]" />
      <motion.div style={{ y }} className="relative mb-14 flex h-[360px] w-[250px] items-center justify-center rounded-t-full border border-silver/40 bg-gradient-to-b from-white/10 to-transparent shadow-[0_0_90px_rgba(191,193,196,.12)] md:h-[460px] md:w-[320px]">
        <div className="absolute inset-3 rounded-t-full border border-silver/15" />
        <Logo w={200} />
      </motion.div>
      <Reveal><p className="caps silver-text text-xs md:text-sm">A New Chapter Begins</p></Reveal>
      <Reveal d={.2}><h2 className="mt-5 text-2xl font-light md:text-3xl">افتتاحیه رسمی فروشگاه ساعت جزیره</h2></Reveal>
      <Reveal d={.4} className="mt-10 max-w-md space-y-4 text-base font-light leading-9 text-ivory/85">
        <p>با افتخار از شما دعوت می‌کنیم تا در آغاز فصلی تازه از مسیر WATCH ISLAND، در کنار ما باشید.</p>
        <p>حضور ارزشمند شما، شکوه‌بخش این آغاز خواهد بود.</p>
      </Reveal>
    </section>
  );
}

function Countdown() {
  const [t, setT] = useState<number | null>(null);
  useEffect(() => { const u = () => setT(new Date(EVENT.iso).getTime() - Date.now()); u(); const i = setInterval(u, 1000); return () => clearInterval(i); }, []);
  if (t === null) return <div className="h-16" />;
  if (t <= 0) return <p className="silver-text text-xl">مراسم آغاز شده است</p>;
  const s = Math.floor(t / 1000), parts = [["روز", Math.floor(s / 86400)], ["ساعت", Math.floor(s / 3600) % 24], ["دقیقه", Math.floor(s / 60) % 60], ["ثانیه", s % 60]] as const;
  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {parts.map(([l, v]) => (<div key={l} className="min-w-[56px]"><div className="text-3xl font-light tabular-nums md:text-4xl">{fa(v)}</div><div className="mt-1 text-[11px] text-silver">{l}</div></div>))}
    </div>
  );
}

function ClockFace() {
  return (
    <svg viewBox="0 0 200 200" className="mx-auto w-64 md:w-80" aria-hidden>
      <defs><radialGradient id="g" cx="50%" cy="35%"><stop offset="0" stopColor="#292929" /><stop offset="1" stopColor="#080808" /></radialGradient></defs>
      <circle cx="100" cy="100" r="96" fill="url(#g)" stroke="#BFC1C4" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#BFC1C4" strokeOpacity=".3" />
      {Array.from({ length: 60 }, (_, i) => (<line key={i} x1="100" y1={i % 5 ? 12 : 8} x2="100" y2={i % 5 ? 15 : 17} stroke="#BFC1C4" strokeWidth={i % 5 ? .6 : 1.5} transform={`rotate(${i * 6} 100 100)`} />))}
      <motion.line x1="100" y1="100" x2="100" y2="48" stroke="#F5F5F2" strokeWidth="3" strokeLinecap="round" initial={{ rotate: 0 }} whileInView={{ rotate: 255 }} viewport={{ once: true }} transition={{ duration: 2.4, ease }} style={{ originX: "100px", originY: "100px" }} />
      <motion.line x1="100" y1="100" x2="100" y2="26" stroke="#BFC1C4" strokeWidth="1.8" strokeLinecap="round" initial={{ rotate: 0 }} whileInView={{ rotate: 180 }} viewport={{ once: true }} transition={{ duration: 2.4, ease }} style={{ originX: "100px", originY: "100px" }} />
      <circle cx="100" cy="100" r="4" fill="#F5F5F2" />
    </svg>
  );
}

function Details() {
  return (
    <section className="relative px-6 py-28 text-center">
      <Reveal><ClockFace /></Reveal>
      <Reveal d={.2} className="mt-12"><p className="caps text-xs text-silver">Sunday</p><p className="caps silver-text mt-3 text-2xl md:text-4xl">08 Azar 1405</p></Reveal>
      <Reveal d={.3} className="mt-6"><p className="en text-6xl font-light md:text-8xl">20:30</p></Reveal>
      <Reveal d={.4}><p className="mt-6 text-lg">یکشنبه ۸ آذر ۱۴۰۵ — ساعت ۲۰:۳۰</p><p className="caps mt-4 text-[11px] text-silver">Grand Opening Ceremony</p></Reveal>
      <Reveal d={.5} className="mt-12"><div className="hair mx-auto mb-10 max-w-xs" /><Countdown /></Reveal>
      <Reveal d={.6} className="mt-10"><Btn onClick={downloadIcs}><CalendarPlus size={16} /> افزودن به تقویم</Btn></Reveal>
    </section>
  );
}

function Find() {
  const [ok, setOk] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(EVENT.address); setOk(true); setTimeout(() => setOk(false), 2000); } catch {} };
  return (
    <section className="px-6 py-28 text-center">
      <Reveal><p className="caps silver-text text-sm">Find Us</p><MapPin className="mx-auto mt-6 text-silver" strokeWidth={1} size={34} /></Reveal>
      <Reveal d={.2}><p className="mx-auto mt-8 max-w-sm text-lg font-light leading-10">فلکه زیباشهر، جنب بانک مسکن<br />پاساژ لیام، طبقه اول</p></Reveal>
      <Reveal d={.4} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Btn href={MAP_URL} solid><Navigation size={16} /> مشاهده موقعیت روی نقشه</Btn>
        <Btn onClick={copy}>{ok ? <Check size={16} /> : <Copy size={16} />} {ok ? "کپی شد" : "کپی آدرس"}</Btn>
      </Reveal>
    </section>
  );
}

function Closing() {
  const [msg, setMsg] = useState("");
  const share = async () => {
    const data = { title: EVENT.title, text: "دعوت به افتتاحیه رسمی ساعت‌فروشی جزیره", url: location.href };
    try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(location.href); setMsg("لینک دعوت کپی شد"); setTimeout(() => setMsg(""), 2500); } } catch {}
  };
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <motion.div className="pointer-events-none absolute left-1/2 top-1/3 h-px w-[80vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-silver to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 2.4, ease }} />
      <Reveal><Logo w={260} /></Reveal>
      <Reveal d={.2}><p className="caps silver-text mt-10 text-xs">A Moment to Remember</p></Reveal>
      <Reveal d={.4}><p className="mt-6 text-lg font-light">آغاز یک مسیر تازه، در کنار شما</p><p className="mt-4 text-ivory/80">منتظر دیدار شما هستیم.</p></Reveal>
      <Reveal d={.6}><p className="caps mt-10 text-sm">Watch Island</p></Reveal>
      <Reveal d={.7} className="mt-10"><Btn onClick={share}><Share2 size={16} /> اشتراک‌گذاری دعوت</Btn><p className="mt-3 h-5 text-xs text-silver" aria-live="polite">{msg}</p></Reveal>
    </section>
  );
}

export default function Invitation() {
  const [entered, setEntered] = useState(false), [sound, setSound] = useState(false);
  useEffect(() => { document.body.style.overflow = entered ? "" : "hidden"; }, [entered]);
  const toggle = () => { const n = !sound; setSound(n); setAmbient(n); };
  return (
    <main>
      <AnimatePresence>{!entered && <Intro key="intro" onEnter={() => { setEntered(true); setSound(true); setAmbient(true); }} />}</AnimatePresence>
      {entered && (<>
        <button onClick={toggle} aria-label={sound ? "خاموش کردن موسیقی" : "روشن کردن موسیقی"} className="fixed bottom-5 left-5 z-40 rounded-full border border-silver/40 bg-ink/60 p-3 backdrop-blur">
          {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        <Hero /><Details /><Find /><Closing />
      </>)}
    </main>
  );
}

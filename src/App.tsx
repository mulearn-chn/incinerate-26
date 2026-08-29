import { useEffect, useState, useRef } from "react";
import Loader from "./Loader";

const navItems = ["About", "Timeline", "Phases", "Guidelines", "Prize Pool", "Partners", "FAQs"];

const emberStyles = [
  { left: "9%",  top: "54%", width: 3, height: 72,  delay: "-1.4s",  duration: "8.6s",  rotate: -32 },
  { left: "20%", top: "19%", width: 3, height: 82,  delay: "-5.2s",  duration: "10s",   rotate: -23 },
  { left: "38%", top: "3%",  width: 3, height: 48,  delay: "-7.1s",  duration: "9.4s",  rotate: -10 },
  { left: "83%", top: "15%", width: 2, height: 42,  delay: "-2.8s",  duration: "8.2s",  rotate:  25 },
  { left: "78%", top: "31%", width: 2, height: 36,  delay: "-6.3s",  duration: "8.9s",  rotate:  34 },
  { left: "6%",  top: "73%", width: 4, height: 28,  delay: "-4.9s",  duration: "7.8s",  rotate: -19 },
  { left: "91%", top: "69%", width: 3, height: 32,  delay: "-1.1s",  duration: "9.8s",  rotate:  15 },
  { left: "51%", top: "61%", width: 2, height: 38,  delay: "-8.7s",  duration: "10.4s", rotate:  -6 },
  { left: "64%", top: "11%", width: 2, height: 55,  delay: "-3.5s",  duration: "9.1s",  rotate:  18 },
  { left: "27%", top: "42%", width: 3, height: 44,  delay: "-6.8s",  duration: "8.4s",  rotate: -28 },
  { left: "93%", top: "40%", width: 2, height: 30,  delay: "-2.1s",  duration: "9.6s",  rotate:  40 },
  { left: "2%",  top: "33%", width: 2, height: 60,  delay: "-9.2s",  duration: "11s",   rotate: -15 },
];
function Orb({
  variant = 1,
  style = {},
}: {
  variant?: 1 | 2 | 3;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={`orb orb-${variant}`}
      style={style}
    />
  );
}

function CountdownCircle({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: 28 }}>
      <div className="countdown-disc">
        
           <div className="glass-overlay" />
        <span className="countdown-num">{value}</span>
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  );
}

function SeparatorDots() {
  return (
    <div className="sep-dots">
      <span className="sep-dot" />
      <span className="sep-dot" />
    </div>
  );
}

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: "00", hours: "00", minutes: "00" };
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const pad = (n: number) => String(n).padStart(2, "0");
    return { days: pad(d), hours: pad(h), minutes: pad(m) };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const target = new Date("2026-10-04T00:00:00+05:30");
  console.log(target);
  console.log(new Date());
  console.log(target.getTime()-Date.now());
  const { days, hours, minutes } = useCountdown(target);
  const planetRef = useRef<HTMLImageElement>(null);
  const [showLoader, setShowLoader] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is INCINERATE?",
      answer: "INCINERATE is a flagship entrepreneurship initiative jointly organized by µLearn CHN, µLearn PRN and µLearn JUKC designed to empower innovators, builders, and aspiring founders to transform ideas into tangible solutions."
    },
    {
      question: "Who can participate?",
      answer: "Aspiring founders, developers, designers, and students who want to turn their creative ideas into working prototypes are welcome to participate."
    },
    {
      question: "What support is provided during the Build Phase?",
      answer: "Throughout the Build Phase, participants are supported through expert-led workshops, mentorship sessions, doubt-clearing discussions, and entrepreneurial acceleration programs that help refine ideas, strengthen execution, and accelerate product development."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const animate = (now: number) => {
      const t = (now - start) / 1000;
      if (planetRef.current) {
        const drift = Math.sin(t * 0.15) * 5;
        planetRef.current.style.transform = `translateY(${drift}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      <main className="incinerate-shell">

      {/* ── Starfield / fire BG ── */}
      <div className="layer-bg" />
{Array.from({ length: 90 }).map((_, i) => (

<span
key={i}
className="fire-particle"
style={{

left:`${Math.random()*100}%`,
top:`${Math.random()*100}%`,

animationDelay:`-${Math.random()*10}s`,

animationDuration:`${5+Math.random()*8}s`,

transform:`scale(${.4+Math.random()*1.8})`

}}

 />

))}
      {/* ── Dark vignette overlay ── */}
      <div className="layer-vignette" />

      {/* ── Planet ── */}
      <div className="layer-fire-glow" />
      <div className="planet-wrap">
        <img
          ref={planetRef}
          src="/images/image 118.png"
          alt=""
          aria-hidden="true"
          className="planet-img"
        />
      </div>

      {/* ── Planet top glow ── */}
      <div className="planet-glow" />

      {/* ── Embers ── */}
      {emberStyles.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: e.left, top: e.top,
            width: e.width, height: e.height,
            animationDelay: e.delay, animationDuration: e.duration,
            transform: `rotate(${e.rotate}deg)`,
          }}
        />
      ))}

      {/* ════════ NAVBAR ════════ */}
      <header className="nav-bar">
        <a href="#" aria-label="Incinerate home" className="nav-logo-link">
          <img src="/images/Group 1171275091.png" alt="Incinerate" className="nav-logo" />
        </a>

        <nav className="nav-links">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="nav-link">
              {item}
            </a>
          ))}
        </nav>

        <a href="#ignite" className="btn-ignite">
          Ignite Project
          <span className="btn-arrow">↗</span>
        </a>
      </header>

      {/* ════════ HERO ════════ */}
      <section className="hero-section">

        {/* µLearn CHN × µLearn PRN */}
        <div className="collab-row">
       

          <img
            src="/images/logos x.png"
            alt="×"
            className="collab-x"
          />

         
          </div>
       

        {/* INCINERATE title + orbs */}
        <div className="title-wrap">
          {/* Orb 1 – large, upper-left near the I */}
          <Orb style={{ width: 102, height: 102, left: -38, top: -76 }} />
          {/* Orb 2 – medium, right side near A */}
          <Orb style={{ width: 68, height: 68, right: 82, top: 51 }} />
          {/* Orb 3 – small, lower-left */}
          <Orb style={{ width: 45, height: 45, left: 123, top: 136 }} />

          <img
            src="/images/Group 1171275092.png"
            alt="INCINERATE"
            className="hero-title-img"
          />
        </div>

        {/* Tagline */}
        <p className="tagline">
          <span className="accent">BURN</span>
          {" THE PLAYBOOK, "}
          <span className="accent">BUILD</span>
          {" THE FUTURE"}
        </p>

        {/* Subtitle */}
        <p className="subtitle">
          A pitching arena where bold ideas are tested, challenged and turned into impact.
        </p>

        {/* Date / Venue */}
        <div className="date-row">
          <div className="date-box">
            <span className="date-label">ON 4TH OCT</span>
            <span className="date-value">2026</span>
          </div>
          <div className="date-divider" />
          <div className="date-box2">
            <span className="date-label">AT JAIN UNIVERSITY</span>
            <span className="date-value">KOCHI</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="countdown-row">
          <CountdownCircle value={days}    label="Days"    />
          <SeparatorDots />
          <CountdownCircle value={hours}   label="Hours"   />
          <SeparatorDots />
          <CountdownCircle value={minutes} label="Minutes" />
        </div>

        {/* CTA */}
        <a href="#ignite" id="ignite" className="btn-cta">
          Ignite Project
          <span className="btn-arrow">↗</span>
        </a>

      </section>

      {/* ════════ ABOUT SECTION ════════ */}
      <section id="about" className="section-container">
        <h2 className="section-title">About Incinerate</h2>
        <div className="glass-card">
          <p className="about-text">
            INCINERATE is a flagship entrepreneurship initiative jointly organized by µLearn CHN, µLearn PRN and µLearn JUKC designed to empower innovators, builders, and aspiring founders to transform ideas into tangible solutions. Built around the philosophy of learning through execution, the program provides participants with a structured platform to validate ideas, collaborate with peers, and develop working prototypes while receiving continuous guidance from mentors and industry experts.
          </p>
          <p className="about-text">
            More than a challenge, INCINERATE is the beginning of an entrepreneurial journey. Throughout the Build Phase, participants are supported through expert-led workshops, mentorship sessions, doubt-clearing discussions, and entrepreneurial acceleration programs that help refine ideas, strengthen execution, and accelerate product development. These initiatives provide practical exposure to innovation, product thinking, and entrepreneurship while fostering a culture of collaboration and continuous learning.
          </p>
        </div>
      </section>

      {/* ════════ FAQs SECTION ════════ */}
      <section id="faqs" className="section-container">
        <h2 className="section-title">FAQs</h2>
        <div className="glass-card">
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? "faq-item-active" : ""}`}
              >
                <button 
                  className="faq-question" 
                  onClick={() => toggleFaq(index)}
                  aria-expanded={activeFaq === index}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">+</span>
                </button>
                {activeFaq === index && (
                  <p className="faq-answer">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
    </>
  );
}
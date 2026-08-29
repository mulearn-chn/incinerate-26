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

  const timelinePhases = [
    {
      phase: "Phase 0",
      title: "Registration, Submission & Shortlisting",
      date: "August 31 – September 13",
      desc: "Register, submit your idea, and compete for a spot among the top 40 teams.",
      steps: [
        { num: "01", title: "Register & Submit", desc: "Register and submit your idea." },
        { num: "02", title: "Evaluate", desc: "Ideas assessed for feasibility, originality & impact." },
        { num: "03", title: "Shortlist", desc: "Top 40 teams advance." },
        { num: "04", title: "Refund", desc: "Non-shortlisted teams receive a 70% refund." }
      ]
    },
    {
      phase: "Phase 1",
      title: "Online Pitching & Shortlisting",
      date: "September 15 – September 19",
      desc: "Pitch your solution and compete for the top 20.",
      steps: [
        { num: "01", title: "Online Pitch", desc: "Present your solution in 5 minutes." },
        { num: "02", title: "Expert Q&A", desc: "Answer questions and discuss your idea for 5 minutes." },
        { num: "03", title: "Shortlist", desc: "Top 20 teams advance." },
        { num: "04", title: "Refund", desc: "Non-shortlisted teams receive a 50% refund." }
      ]
    },
    {
      phase: "Phase 2",
      title: "Build Phase & Final Shortlisting",
      date: "September 20 – October 4",
      desc: "Build, refine, and validate your product with expert guidance.",
      steps: [
        { num: "01", title: "Build", desc: "Develop and test your product." },
        { num: "02", title: "Mentorship", desc: "Learn through expert sessions and workshops." },
        { num: "03", title: "Refine", desc: "Improve your product and final pitch." },
        { num: "04", title: "Shortlist", desc: "Top 10 teams advance." }
      ]
    },
    {
      phase: "Phase 3",
      title: "Final Presentation & Community Integration",
      date: "Final Event: October 10",
      desc: "Showcase your product and take the next step.",
      steps: [
        { num: "01", title: "Final Presentation", desc: "Showcase your product." },
        { num: "02", title: "Judges' Q&A", desc: "Answer the judges' questions." },
        { num: "03", title: "Winners & Recognition", desc: "Get recognised for your innovation." },
        { num: "04", title: "Market Support", desc: "Receive support to take your product forward." }
      ]
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

      {/* ════════ TIMELINE & PHASES SECTION ════════ */}
      <section id="timeline" className="section-container">
        <span id="phases" style={{ position: "absolute", top: "-100px" }}></span>
        <h2 className="section-title">Timeline & Phases</h2>
        <div className="glass-card">
          <div className="timeline-track">
            {timelinePhases.map((phase, idx) => (
              <div key={idx} className="timeline-phase">
                <span className="timeline-dot"></span>
                <div className="phase-header">
                  <span className="phase-number">{phase.phase}</span>
                  <h3 className="phase-title">{phase.title}</h3>
                  <span className="phase-date">{phase.date}</span>
                </div>
                <p className="phase-desc">{phase.desc}</p>
                <div className="phase-steps-grid">
                  {phase.steps.map((step, sIdx) => (
                    <div key={sIdx} className="step-card">
                      <span className="step-num">{step.num}</span>
                      <div className="step-content">
                        <h4 className="step-title">{step.title}</h4>
                        <p className="step-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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

      {/* ════════ FOOTER ════════ */}
      <footer className="incinerate-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/images/Group 1171275091.png" alt="Incinerate" className="footer-logo" />
            <p className="footer-tagline" style={{ marginBottom: '16px' }}>
              Burn the playbook, build the future. A flagship entrepreneurship initiative jointly organized by µLearn CHN, µLearn PRN and µLearn JUKC.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <a href="https://maps.app.goo.gl/MQ3vBqkb3Lnk6AyC8" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                📍 Jain University Kochi Location
              </a>
              <a href="https://drive.google.com/file/d/1W1UkCtEoayHHbXGOjv-mCMaO9lsDfr4p/view?usp=drivesdk" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#ff7c25' }}>
                📄 Brochure ↗
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">
              <span>📞</span> Connect with Us
            </h4>
            <div className="contact-table-container">
              <table className="contact-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Nithin Jayakumar</strong></td>
                    <td><a href="tel:+919037195527" className="contact-link-table">+91 9037195527</a></td>
                    <td><a href="mailto:nithinjayakumar2205@gmail.com" className="contact-link-table">nithinjayakumar2205@gmail.com</a></td>
                  </tr>
                  <tr>
                    <td><strong>Sundara Siva Sreerag</strong></td>
                    <td><a href="tel:+918137934994" className="contact-link-table">+91 8137934994</a></td>
                    <td><a href="mailto:remasundhar0@gmail.com" className="contact-link-table">remasundhar0@gmail.com</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="footer-col" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
            <h4 className="footer-col-title">Follow Us</h4>
            <div className="social-grid">
              <div className="social-item">
                <span className="social-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                <a href="mailto:incinerate.mulearn@gmail.com" className="footer-link">incinerate.mulearn@gmail.com</a>
              </div>
              <div className="social-item">
                <span className="social-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </span>
                <a href="https://www.linkedin.com/company/mulearn-chn/" target="_blank" rel="noopener noreferrer" className="footer-link">mulearn-chn</a>
              </div>
              <div className="social-item">
                <span className="social-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </span>
                <a href="https://www.linkedin.com/company/mulearn-prn/" target="_blank" rel="noopener noreferrer" className="footer-link">mulearn-prn</a>
              </div>
              <div className="social-item">
                <span className="social-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </span>
                <a href="https://www.instagram.com/incinerate.26?igsi=aHRib295cTJyM2Zr" target="_blank" rel="noopener noreferrer" className="footer-link">@incinerate.26</a>
              </div>
              <div className="social-item">
                <span className="social-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </span>
                <a href="https://www.instagram.com/mulearn.chn?igsi=NHplanhpY3Nndm1i" target="_blank" rel="noopener noreferrer" className="footer-link">@mulearn.chn</a>
              </div>
              <div className="social-item">
                <span className="social-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </span>
                <a href="https://www.instagram.com/mulearn.prn?igsi=MWJvc2p2dW1yMzhsNg==" target="_blank" rel="noopener noreferrer" className="footer-link">@mulearn.prn</a>
              </div>
              <div className="social-item">
                <span className="social-icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </span>
                <a href="https://www.instagram.com/mulearn.jukc?igsi=eG1pdmxiYXg4aTZk" target="_blank" rel="noopener noreferrer" className="footer-link">@mulearn.jukc</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} INCINERATE. All rights reserved.
          </p>
          <span className="footer-orgs">
            µLearn CHN &times; µLearn PRN &times; µLearn JUKC
          </span>
        </div>
      </footer>

    </main>
    </>
  );
}
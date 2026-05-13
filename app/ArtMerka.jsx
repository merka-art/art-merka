"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";


// ============================================================
// ART MERKA — Luxury Digital Art Museum & Gallery
// "Louvre Meets Tomorrow" — Ultra-Premium Landing Page
// Stack: React, Tailwind (via CDN classes), Framer Motion
// ============================================================

// ─── EXTERNALIZED MOCK DATASET ───────────────────────────────
// Replace image URLs and metadata with your own gallery assets.
const classicalGalleryData = [
  {
    id: 1,
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    era: "Dutch Golden Age, c. 1665",
    appraisal: "$842,000,000",
    curatorialScore: 98.4,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
  },
  {
    id: 2,
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    era: "Italian Renaissance, c. 1484–1486",
    appraisal: "$2,100,000,000",
    curatorialScore: 99.1,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1200px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
  },
  {
    id: 3,
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    era: "Post-Impressionism, 1889",
    appraisal: "$1,650,000,000",
    curatorialScore: 97.8,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  },
  {
    id: 4,
    title: "Las Meninas",
    artist: "Diego Velázquez",
    era: "Spanish Baroque, 1656",
    appraisal: "$3,400,000,000",
    curatorialScore: 99.7,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Las_Meninas_01.jpg/800px-Las_Meninas_01.jpg",
  },
  {
    id: 5,
    title: "The Creation of Adam",
    artist: "Michelangelo",
    era: "High Renaissance, c. 1508–1512",
    appraisal: "$12,000,000,000",
    curatorialScore: 100.0,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1200px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
  },
  {
    id: 6,
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    era: "Edo Period, c. 1831",
    appraisal: "$920,000,000",
    curatorialScore: 96.3,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg",
  },
];

// ─── REACT COMPONENT ─────────────────────────────────────────
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ── Utility: fade-in variant ──
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.9, ease: "easeOut" },
  }),
};

// ── Scroll-triggered reveal wrapper ──
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

// ── Inline SVG Logo Monogram ──
function LogoMark() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer frame */}
      <rect x="1.5" y="1.5" width="45" height="45" rx="1" stroke="#D4AF37" strokeWidth="1.2" fill="none" />
      <rect x="4" y="4" width="40" height="40" rx="0.5" stroke="#D4AF37" strokeWidth="0.4" strokeOpacity="0.4" fill="none" />
      {/* Corner ornaments */}
      <path d="M1.5 9 L1.5 1.5 L9 1.5" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
      <path d="M39 1.5 L46.5 1.5 L46.5 9" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
      <path d="M1.5 39 L1.5 46.5 L9 46.5" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
      <path d="M39 46.5 L46.5 46.5 L46.5 39" stroke="#D4AF37" strokeWidth="1.8" fill="none" />
      {/* Stylized 'M' monogram */}
      <path d="M12 34 L12 14 L24 28 L36 14 L36 34" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ── Navigation ──
function Navigation({ onJoin }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled
          ? "rgba(5,5,5,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.15)" : "none",
        transition: "background 0.5s ease, border 0.5s ease",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <LogoMark />
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", fontSize: "1.15rem", letterSpacing: "0.18em", color: "#F5F5F0", fontWeight: 600 }}>
            ART MERKA
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "0.6rem", letterSpacing: "0.35em", color: "#D4AF37", marginTop: "-2px", textTransform: "uppercase" }}>
            Digital Fine Art Museum
          </div>
        </div>
      </div>

      {/* Right CTA */}
      <button
        onClick={onJoin}
        style={{
          background: "transparent",
          border: "1px solid #D4AF37",
          color: "#D4AF37",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.78rem",
          letterSpacing: "0.22em",
          padding: "10px 28px",
          cursor: "pointer",
          textTransform: "uppercase",
          transition: "all 0.35s ease",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "#D4AF37";
          e.currentTarget.style.color = "#050505";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#D4AF37";
        }}
      >
        Join Waitlist
      </button>
    </motion.nav>
  );
}

// ── Waitlist Form (reusable) ──
function WaitlistForm({ variant = "hero" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1400));
    setStatus("success");
    setMsg("You're on the list. We'll be in touch shortly.");
    setEmail("");
  };

  const isHero = variant === "hero";

  return (
    <div style={{ width: "100%" }}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              border: "1px solid #D4AF37",
              padding: "18px 28px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(212,175,55,0.07)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#D4AF37" strokeWidth="1.2" />
              <path d="M5.5 10.5L8.5 13.5L14.5 7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#D4AF37", fontSize: "0.95rem", letterSpacing: "0.05em" }}>
              {msg}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={{ display: "flex", gap: "0", maxWidth: "520px" }}>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                placeholder="Your private email address"
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${status === "error" ? "#c0392b" : "rgba(212,175,55,0.4)"}`,
                  borderRight: "none",
                  color: "#F5F5F0",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.92rem",
                  padding: isHero ? "16px 20px" : "14px 18px",
                  outline: "none",
                  letterSpacing: "0.04em",
                  transition: "border 0.3s",
                }}
                onFocus={e => e.target.style.borderColor = "#D4AF37"}
                onBlur={e => { if (status !== "error") e.target.style.borderColor = "rgba(212,175,55,0.4)"; }}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                style={{
                  background: "#D4AF37",
                  border: "1px solid #D4AF37",
                  color: "#050505",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.22em",
                  padding: isHero ? "16px 28px" : "14px 24px",
                  cursor: status === "loading" ? "wait" : "pointer",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                  transition: "all 0.3s ease",
                  opacity: status === "loading" ? 0.7 : 1,
                }}
                onMouseEnter={e => { if (status !== "loading") { e.currentTarget.style.background = "#c9a227"; } }}
                onMouseLeave={e => { e.currentTarget.style.background = "#D4AF37"; }}
              >
                {status === "loading" ? "Processing..." : "Request Private Access"}
              </button>
            </div>
            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ color: "#e74c3c", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem", marginTop: "8px", letterSpacing: "0.04em" }}
                >
                  {msg}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Hero Section ──
function HeroSection({ waitlistRef }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "72px",
        position: "relative",
        overflow: "hidden",
        background: "#050505",
      }}
    >
      {/* Ambient grain texture overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
        opacity: 0.6,
        pointerEvents: "none",
      }} />

      {/* Gold radial glow */}
      <div style={{
        position: "absolute", top: "20%", right: "10%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
        zIndex: 1, pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "1360px", margin: "0 auto",
        padding: "clamp(4rem,8vh,8rem) clamp(1.5rem,5vw,4rem)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(3rem, 6vw, 6rem)",
        alignItems: "center",
        zIndex: 2, position: "relative",
        width: "100%",
      }}>
        {/* Left: Value Proposition */}
        <div>
          {/* Eyebrow */}
          <motion.div
            variants={fadeIn} initial="hidden" animate="visible" custom={0}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}
          >
            <div style={{ width: "36px", height: "1px", background: "#D4AF37" }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem",
              letterSpacing: "0.35em", color: "#D4AF37", textTransform: "uppercase"
            }}>
              Private Collector Preview
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: "clamp(2.6rem, 5vw, 4.4rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#F5F5F0",
              margin: "0 0 12px",
              letterSpacing: "-0.01em",
            }}
          >
            Art Merka:
            <br />
            <em style={{ fontStyle: "italic", color: "#D4AF37" }}>The AI-Automated</em>
            <br />
            Future of Classical
            <br />
            Fine Art
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.1rem",
              color: "rgba(245,245,240,0.55)",
              lineHeight: 1.8,
              margin: "24px 0 36px",
              letterSpacing: "0.02em",
              maxWidth: "480px",
            }}
          >
            Where centuries of classical mastery meet autonomous intelligence. 
            A private digital museum for discerning collectors — curated, 
            preserved, and authenticated by advanced AI.
          </motion.p>

          {/* Waitlist Form */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <WaitlistForm variant="hero" />
          </motion.div>

          {/* Counter */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={4}
            style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "18px" }}
          >
            <div style={{ display: "flex", gap: "3px" }}>
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: i < 3 ? "#D4AF37" : "rgba(212,175,55,0.25)"
                }} />
              ))}
            </div>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem",
              color: "rgba(245,245,240,0.45)", letterSpacing: "0.08em"
            }}>
              Exclusive Access Limited to{" "}
              <span style={{ color: "#D4AF37", fontWeight: 600 }}>500 Collectors</span>
            </span>
          </motion.div>
        </div>

        {/* Right: Featured Canvas */}
        <motion.div
          variants={fadeIn} initial="hidden" animate="visible" custom={1}
          style={{ position: "relative" }}
        >
          {/* Frame border ornament */}
          <div style={{
            position: "absolute", inset: "-14px",
            border: "1px solid rgba(212,175,55,0.25)",
            pointerEvents: "none", zIndex: 2,
          }} />
          <div style={{
            position: "absolute", inset: "-8px",
            border: "1px solid rgba(212,175,55,0.12)",
            pointerEvents: "none", zIndex: 2,
          }} />

          {/* Corner marks */}
          {[["0","0","L","T"], ["auto","0","R","T"], ["0","auto","L","B"], ["auto","auto","R","B"]].map(([r,b,h,v]) => (
            <svg key={`${h}${v}`} width="24" height="24" viewBox="0 0 24 24" fill="none"
              style={{ position: "absolute", top: v==="T"?"-20px":"auto", bottom: v==="B"?"-20px":"auto", left: h==="L"?"-20px":"auto", right: h==="R"?"-20px":"auto", zIndex: 3 }}>
              <path d={h==="L"&&v==="T" ? "M0 12 L0 0 L12 0" : h==="R"&&v==="T" ? "M12 0 L24 0 L24 12" : h==="L"&&v==="B" ? "M0 12 L0 24 L12 24" : "M12 24 L24 24 L24 12"} stroke="#D4AF37" strokeWidth="1.5" fill="none" />
            </svg>
          ))}

          {/* Canvas image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden", position: "relative", aspectRatio: "3/4" }}
          >
            <motion.img
              src={classicalGalleryData[1].image}
              alt={classicalGalleryData[1].title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Label */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 100%)",
              padding: "40px 24px 20px",
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.25em", color: "#D4AF37", textTransform: "uppercase", margin: 0 }}>
                Featured Masterwork
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#F5F5F0", margin: "4px 0 0" }}>
                {classicalGalleryData[1].title} — {classicalGalleryData[1].artist}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── AI Engine Section ──
function AIEngineSection() {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M4 4h10v10H4zM18 4h10v10H18zM4 18h10v10H4zM18 18h10v10H18z" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="2.5" fill="#D4AF37" opacity="0.6" />
        </svg>
      ),
      label: "Autonomous Preservation",
      description: "Proprietary AI algorithms continuously optimize ultra-high-fidelity digital scans of physical classical masterpieces — capturing brushstroke depth, pigment chemistry, and canvas texture at resolutions impossible for the human eye.",
      stat: "847M pixels per scan",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4 L28 10 L28 22 L16 28 L4 22 L4 10 Z" stroke="#D4AF37" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M16 4 L16 28M4 10 L28 22M28 10 L4 22" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.4" />
        </svg>
      ),
      label: "Intelligent Provenance",
      description: "Each artwork is anchored to an immutable blockchain ledger. Automated verification engines run continuous lineage audits — tracing ownership chains, exhibition history, and restoration events across centuries of art history.",
      stat: "100% Chain Verified",
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 8 C6 8 10 6 16 6 C22 6 26 8 26 8" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="5" y="8" width="22" height="16" rx="1" stroke="#D4AF37" strokeWidth="1.2" />
          <path d="M10 16 L13 19 L22 12" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "Curated Exhibitions",
      description: "Adaptive AI analyzes your collecting history, aesthetic preferences, and regional art traditions to construct personalized virtual gallery spaces — assembling masterworks from across eras into resonant, coherent narratives.",
      stat: "12,400+ Works Catalogued",
    },
  ];

  return (
    <section style={{ background: "#050505", padding: "clamp(5rem,12vh,10rem) clamp(1.5rem,5vw,4rem)", position: "relative" }}>
      {/* Section divider */}
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        <Reveal className="" delay={0}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "64px" }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3))" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.68rem", letterSpacing: "0.38em", color: "#D4AF37", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              The Intelligence Layer
            </span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(212,175,55,0.3))" }} />
          </div>
        </Reveal>

        <Reveal delay={0}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3.4rem)",
            fontWeight: 300,
            color: "#F5F5F0",
            textAlign: "center",
            marginBottom: "16px",
            letterSpacing: "-0.01em",
          }}>
            The AI Curation &<em style={{ fontStyle: "italic", color: "#D4AF37" }}> Automation Engine</em>
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.05rem",
            color: "rgba(245,245,240,0.45)",
            textAlign: "center",
            maxWidth: "580px",
            margin: "0 auto 72px",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
          }}>
            Three autonomous systems working in concert to redefine how fine art is preserved, authenticated, and experienced.
          </p>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2px",
        }}>
          {features.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.5}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "#1A1A1A",
                  padding: "48px 40px",
                  position: "relative",
                  cursor: "default",
                  overflow: "hidden",
                }}
              >
                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, #D4AF37, transparent)" }} />

                {/* Number */}
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3.5rem",
                  fontWeight: 300,
                  color: "rgba(212,175,55,0.08)",
                  position: "absolute",
                  top: "20px", right: "24px",
                  lineHeight: 1,
                  userSelect: "none",
                }}>
                  0{i + 1}
                </div>

                <div style={{ marginBottom: "24px" }}>{f.icon}</div>

                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.35rem",
                  fontWeight: 500,
                  color: "#F5F5F0",
                  margin: "0 0 16px",
                  letterSpacing: "0.02em",
                }}>
                  {f.label}
                </h3>

                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.95rem",
                  color: "rgba(245,245,240,0.5)",
                  lineHeight: 1.85,
                  margin: "0 0 28px",
                }}>
                  {f.description}
                </p>

                <div style={{
                  borderTop: "1px solid rgba(212,175,55,0.15)",
                  paddingTop: "20px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.22em",
                  color: "#D4AF37",
                  textTransform: "uppercase",
                }}>
                  {f.stat}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Gallery Card ──
function GalleryCard({ work, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={index * 0.3}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#1A1A1A",
          cursor: "pointer",
          aspectRatio: "3/4",
        }}
      >
        {/* Image */}
        <motion.img
          src={work.image}
          alt={work.title}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Always-visible gradient + title */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.3) 60%, transparent 100%)",
          padding: "60px 22px 22px",
        }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "#F5F5F0", margin: 0 }}>{work.title}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "rgba(245,245,240,0.5)", margin: "4px 0 0", letterSpacing: "0.05em" }}>{work.artist}</p>
        </div>

        {/* Hover overlay: AI telemetry */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                position: "absolute", inset: 0,
                background: "rgba(5,5,5,0.88)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "32px 28px",
                backdropFilter: "blur(4px)",
              }}
            >
              {/* Top accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(to right, #D4AF37, transparent)" }} />

              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.62rem", letterSpacing: "0.32em", color: "#D4AF37", textTransform: "uppercase", marginBottom: "20px" }}>
                AI Telemetry Report
              </div>

              {[
                { label: "Artist", value: work.artist },
                { label: "Historical Era", value: work.era },
                { label: "AI Value Appraisal", value: work.appraisal },
                { label: "Curatorial Score", value: `${work.curatorialScore} / 100` },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  style={{ marginBottom: "18px" }}
                >
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(245,245,240,0.4)", textTransform: "uppercase", marginBottom: "4px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: item.label === "AI Value Appraisal" ? "1.2rem" : "0.97rem", color: item.label === "AI Value Appraisal" ? "#D4AF37" : "#F5F5F0", fontWeight: item.label === "AI Value Appraisal" ? 600 : 300 }}>
                    {item.value}
                  </div>
                </motion.div>
              ))}

              {/* Curatorial score bar */}
              <div style={{ marginTop: "4px" }}>
                <div style={{ height: "2px", background: "rgba(212,175,55,0.15)", position: "relative" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${work.curatorialScore}%` }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "#D4AF37" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  );
}

// ── Gallery Grid Section ──
function GallerySection() {
  return (
    <section style={{ background: "#050505", padding: "clamp(5rem,12vh,10rem) clamp(1.5rem,5vw,4rem)" }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "1px", background: "#D4AF37" }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.68rem", letterSpacing: "0.38em", color: "#D4AF37", textTransform: "uppercase" }}>
                The Collection
              </span>
              <div style={{ width: "28px", height: "1px", background: "#D4AF37" }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              fontWeight: 300,
              color: "#F5F5F0",
              margin: "0 0 16px",
              letterSpacing: "-0.01em",
            }}>
              Classical Masterpiece <em style={{ fontStyle: "italic", color: "#D4AF37" }}>Gallery</em>
            </h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              color: "rgba(245,245,240,0.45)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.8,
            }}>
              Hover each work to reveal live AI curatorial data and algorithmic valuations.
            </p>
          </div>
        </Reveal>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2px",
        }}>
          {classicalGalleryData.map((work, i) => (
            <GalleryCard key={work.id} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Conversion / Waitlist Footer Zone ──
function ConversionSection({ sectionRef }) {
  return (
    <section
      ref={sectionRef}
      style={{
        background: "#050505",
        padding: "clamp(5rem,12vh,10rem) clamp(1.5rem,5vw,4rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large ambient glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "700px", height: "400px",
        background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "760px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{
            border: "1px solid rgba(212,175,55,0.2)",
            padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem)",
            background: "#0E0E0E",
            position: "relative",
            textAlign: "center",
          }}>
            {/* Corner ornaments */}
            {["tl","tr","bl","br"].map(pos => (
              <svg key={pos} width="20" height="20" viewBox="0 0 20 20" fill="none"
                style={{
                  position: "absolute",
                  top: pos.startsWith("t") ? "-1px" : "auto",
                  bottom: pos.startsWith("b") ? "-1px" : "auto",
                  left: pos.endsWith("l") ? "-1px" : "auto",
                  right: pos.endsWith("r") ? "-1px" : "auto",
                }}>
                <path
                  d={
                    pos === "tl" ? "M0 8 L0 0 L8 0" :
                    pos === "tr" ? "M12 0 L20 0 L20 8" :
                    pos === "bl" ? "M0 12 L0 20 L8 20" :
                    "M12 20 L20 20 L20 12"
                  }
                  stroke="#D4AF37" strokeWidth="1.5" fill="none"
                />
              </svg>
            ))}

            {/* Eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{ width: "20px", height: "1px", background: "#D4AF37" }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.38em", color: "#D4AF37", textTransform: "uppercase" }}>
                Collector Waitlist
              </span>
              <div style={{ width: "20px", height: "1px", background: "#D4AF37" }} />
            </div>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
              fontWeight: 300,
              color: "#F5F5F0",
              margin: "0 0 16px",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}>
              Secure Your Position
              <br />
              <em style={{ fontStyle: "italic", color: "#D4AF37" }}>Among the First 500</em>
            </h2>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem",
              color: "rgba(245,245,240,0.45)",
              lineHeight: 1.9,
              margin: "0 auto 40px",
              maxWidth: "480px",
            }}>
              Charter members receive lifetime priority access, a bespoke curatorial report on 
              their first acquisition, and an invitation to Art Merka's inaugural private digital opening.
            </p>

            <div style={{ maxWidth: "520px", margin: "0 auto 24px" }}>
              <WaitlistForm variant="footer" />
            </div>

            {/* Trust signals */}
            <div style={{ display: "flex", justifyContent: "center", gap: "36px", flexWrap: "wrap", marginTop: "28px" }}>
              {["No Obligation", "Invite Only", "SSL Encrypted"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5.5" stroke="#D4AF37" strokeWidth="0.8" />
                    <path d="M3.5 6L5 7.5L8.5 4" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(245,245,240,0.35)", textTransform: "uppercase" }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer style={{
      background: "#050505",
      borderTop: "1px solid rgba(212,175,55,0.1)",
      padding: "40px clamp(1.5rem,5vw,4rem)",
    }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <LogoMark />
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", letterSpacing: "0.2em", color: "#F5F5F0" }}>ART MERKA</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "#D4AF37" }}>Digital Fine Art Museum</div>
          </div>
        </div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", color: "rgba(245,245,240,0.25)", letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} Art Merka. All Rights Reserved. Private & Confidential.
        </p>
      </div>
    </footer>
  );
}

// ── Root App ──
export default function ArtMerka() {
  const waitlistRef = useRef(null);
  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* Google Fonts — Cormorant Garamond */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050505; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        ::selection { background: rgba(212,175,55,0.25); color: #F5F5F0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); }
        input::placeholder { color: rgba(245,245,240,0.25); }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navigation onJoin={scrollToWaitlist} />
      <HeroSection waitlistRef={waitlistRef} />
      <AIEngineSection />
      <GallerySection />
      <ConversionSection sectionRef={waitlistRef} />
      <Footer />
    </>
  );
}

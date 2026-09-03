import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Video,
  Image as ImageIcon,
  Search,
  Lightbulb,
  Settings,
  RefreshCcw,
  ChevronUp,
  ChevronDown,
  Compass,
  Rocket,
  Users,
  Bot,
  MessageSquare,
  Book,
  Presentation,
  CheckCircle,
  Handshake,
  Sparkles,
} from "lucide-react";
import "./index.css";
import "./App.css";
import AssessmentOverlay from "./Assessment";
import PhiloneosHeader from "./PhiloneosHeader";

// Slide2 ("Idea Lifecycle"), Slide4 & Slide5 are temporarily hidden from the UI.
// The Slide components are intentionally kept below.
const SHOW_EXTRA_SLIDES = false;
const allSlides = [Slide1, Slide3, Slide4, Slide5];
// The deck renders straight off this list, so a hidden slide can never leave a
// blank screen behind — there is simply no index for it.
const slides = SHOW_EXTRA_SLIDES ? allSlides : allSlides.slice(0, 2);
const getIsMobile = () =>
  typeof window !== "undefined" && window.innerWidth <= 768;
const getScale = () => {
  if (typeof window === "undefined") return 1;
  const scaleX = window.innerWidth / 1920;
  const scaleY = window.innerHeight / 1080;
  return Math.min(scaleX, scaleY);
};

const ResponsiveWrapper = ({ children }) => {
  // Computed synchronously from the initial render (rather than only
  // inside a useEffect, which fires after the first paint) so mobile
  // doesn't briefly flash the unscaled 1920x1080 desktop layout before
  // correcting itself a frame later.
  const [scale, setScale] = useState(getScale);
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        const scaleX = width / 1920;
        const scaleY = window.innerHeight / 1080;
        setScale(Math.min(scaleX, scaleY));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <div className="mobile-wrapper">{children}</div>;
  }

  return (
    <div
      className="desktop-wrapper"
      style={{
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  // Clamped so a stale index (e.g. left over from a hot reload after a slide
  // was hidden) still resolves to a real slide instead of empty white space.
  const activeSlide = Math.min(currentSlide, slides.length - 1);
  const ActiveSlide = slides[activeSlide];

  // Page navigation logic (commented out for future use while other pages are hidden)
  const nextSlide = () => {
    // setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    // setCurrentSlide((prev) =>
    //   Math.max(Math.min(prev, slides.length - 1) - 1, 0),
    // );
  };

  useEffect(() => {
    // const handleKeyDown = (e) => {
    //   if (e.key === "ArrowRight" || e.key === "Space") nextSlide();
    //   if (e.key === "ArrowLeft") prevSlide();
    // };
    // window.addEventListener("keydown", handleKeyDown);
    // return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleGoHome = () => {
    setCurrentSlide(0);
    setIsAssessmentOpen(false);
  };

  return (
    <ResponsiveWrapper>
      <div
        className="w-full h-full relative app-container"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Philoneos nav bar (shared with the assessment overlay) */}
        <PhiloneosHeader
          onLogoClick={handleGoHome}
          onAction={() => setIsAssessmentOpen(true)}
        />

        {/* Main Content Area */}
        <main
          className="main-content-area"
          style={{
            flex: 1,
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="slide-absolute-container"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <ActiveSlide
                onOpenAssessment={() => setIsAssessmentOpen(true)}
                onExplore={nextSlide}
              />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer Navigation */}
        <footer
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            zIndex: 50,
            display: "none", // Temporarily hidden (was "flex")
            gap: 0,
          }}
        >
          <button
            onClick={prevSlide}
            disabled={activeSlide === 0}
            className="nav-button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={activeSlide === slides.length - 1}
            className="nav-button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </footer>

        <AnimatePresence>
          {isAssessmentOpen && (
            <AssessmentOverlay
              onClose={() => setIsAssessmentOpen(false)}
              onLogoClick={handleGoHome}
            />
          )}
        </AnimatePresence>
      </div>
    </ResponsiveWrapper>
  );
}

function Slide1({ onExplore }) {
  const [activeOverlaySlide, setActiveOverlaySlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const overlaySlides = [
    {
      label: "01",
      headline:
        "Knowledge and training gaps remain the biggest barriers to AI-driven value.",
      body: "According to McKinsey's State of AI Trust 2026, nearly 60% of organisations say knowledge and training gaps are the biggest barriers standing between them and real AI-driven value. That percentage was roughly 50% just a year ago, highlighting that while AI tools continue to evolve rapidly, organisational readiness is struggling to keep pace.",
    },
    {
      label: "02",
      headline:
        "The difference isn't the AI tool. It's how the tool gets used.",
      body: "Most organisations today have access to broadly similar AI technologies. What separates businesses creating real impact is not the tool itself, but the depth of understanding behind how that tool is applied to solve meaningful business challenges.",
    },
    {
      label: "03",
      headline: "Business outcomes should guide AI adoption.",
      body: "According to Gartner, many AI initiatives fail not because the technology doesn't work, but because they are never tied to the business capabilities that drive value. AI creates measurable impact when implementation is aligned with strategic business outcomes from the very beginning.",
    },
  ];

  // Fixed first section of the hero panel - these three never cycle, unlike
  // the insight carousel below them.
  const journeyStages = [
    {
      label: "01",
      title: "Discover",
      Icon: Compass,
      points: ["Idea submission & Selection", "Team Formation"],
    },
    {
      label: "02",
      title: "Implement & Test",
      Icon: Rocket,
      points: ["Implement Solution", "Iterate & Fine Tune"],
    },
    {
      label: "03",
      title: "Demo",
      Icon: Presentation,
      points: ["Share Results & Learning", "Biggest Personal Takeaway"],
    },
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setTimeout(() => {
      setActiveOverlaySlide((prev) => (prev + 1) % overlaySlides.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [isHovered, activeOverlaySlide, overlaySlides.length]);

  const bubbleVariants = {
    animate: (i) => ({
      y: ["110vh", "-20vh"],
      x: [`${i * 15 + 10}vw`, `${i * 15 + Math.random() * 10}vw`],
      transition: {
        duration: Math.random() * 15 + 25,
        repeat: Infinity,
        ease: "linear",
        delay: Math.random() * -20,
      },
    }),
  };

  return (
    <div
      className="slide-absolute-container"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Vertical seam between left content panel and right video */}
      <motion.div
        className="slide1-divider"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{
          position: "absolute",
          left: "46%",
          top: "64px",
          bottom: 0,
          width: "1px",
          background: "#111111",
          transformOrigin: "top",
          zIndex: 10,
        }}
      />

      {/* Ambient Bubbles */}
      <div
        className="slide1-bubbles"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: "54%",
          bottom: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={bubbleVariants}
            initial={{ y: "110vh" }}
            animate="animate"
            style={{
              position: "absolute",
              width: `${Math.random() * 120 + 100}px`,
              height: `${Math.random() * 120 + 100}px`,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.01) 100%)",
              filter: "blur(8px)",
            }}
          />
        ))}
      </div>

      {/* Left Content Area (46%) — single editorial column, vertically centered */}
      <div
        className="slide1-left-panel"
        style={{
          width: "46%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 60px 40px 80px",
          zIndex: 3,
          overflow: "hidden",
        }}
      >
        {/* Background Video — Philoneos ambient particles (Restricted strictly to the top hero section) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "48%",
            pointerEvents: "none",
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/philoneos-hero-bg.mp4"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.85,
            }}
          />
          {/* Smooth fade to pure white at the bottom of the first section */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "60%",
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 75%, #FFFFFF 100%)",
            }}
          />
        </div>

        {/* Vertically Centered Content Wrapper */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            margin: "auto 0",
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.h1
            className="slide1-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            style={{
              position: "relative",
              zIndex: 2,
              fontSize: "79px",
              lineHeight: 1.1,
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#111111",
              marginBottom: "16px",
              letterSpacing: "-0.04em",
            }}
          >
            Create <span style={{ color: "var(--accent-purple)" }}>Value</span>{" "}
            With AI
          </motion.h1>

          <motion.div
            className="slide1-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            whileHover={{ y: -2 }}
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "max-content",
              marginBottom: "28px",
              fontSize: "22px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              lineHeight: 1.2,
              padding: "6px 0",
              background: "transparent",
              cursor: "pointer",
              userSelect: "none",
              transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Philoneos brand name */}
            <motion.span
              whileHover={{ color: "#FF3F50", scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              style={{
                letterSpacing: "-0.02em",
                color: "#111111",
                transition: "color 200ms ease",
              }}
            >
              Philoneos
            </motion.span>

            {/* Interactive Handshake icon */}
            <motion.div
              whileHover={{ scale: 1.3, rotate: [0, -15, 15, -10, 0] }}
              animate={{ scale: [1, 1.15, 1], y: [0, -2, 0] }}
              transition={{
                animate: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                whileHover: { duration: 0.4 },
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 2px",
              }}
            >
              <Handshake
                size={24}
                color="#FF3F50"
                strokeWidth={2}
                style={{ flexShrink: 0 }}
              />
            </motion.div>

            {/* ScaleTech brand name */}
            <motion.span
              whileHover={{ color: "#25ADD0", scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              style={{
                letterSpacing: "-0.02em",
                color: "#111111",
                transition: "color 200ms ease",
              }}
            >
              ScaleTech
            </motion.span>

            {/* Interactive Emoji Group */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginLeft: "4px",
              }}
            >
              <motion.span
                whileHover={{ scale: 1.35, rotate: [0, -12, 12, 0] }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://emoji.slack-edge.com/TBGLX779R/everythings_fine_parrot/acf4d3783f4a3726.gif"
                  alt="Everything's fine parrot"
                  style={{
                    width: "22px",
                    height: "22px",
                    objectFit: "contain",
                  }}
                />
              </motion.span>

              <motion.span
                whileHover={{ y: -5, scale: 1.35, rotate: 15 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                style={{
                  display: "inline-flex",
                  fontSize: "20px",
                  lineHeight: 1,
                }}
              >
                🚀
              </motion.span>

              <motion.span
                whileHover={{ scale: 1.35, rotate: -18 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                style={{
                  display: "inline-flex",
                  fontSize: "20px",
                  lineHeight: 1,
                }}
              >
                🎉
              </motion.span>
            </div>
          </motion.div>

          {/* Horizontal divider line */}
          <motion.div
            className="slide1-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
            style={{
              width: "calc(100% + 140px)",
              height: "1px",
              background: "#111111",
              transformOrigin: "left",
              marginTop: "120px",
              marginLeft: "-80px",
              zIndex: 4,
            }}
          />
          <div
            style={{
              width: "100%",
              marginTop: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* CHALLENGE - Coral Red */}
            <motion.div
              className="slide1-vision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.95,
              }}
              style={{
                background: "transparent",
                marginLeft: "-20px",
                padding: "0 32px 0 18px",
                borderLeft: "2px solid #FF3F50",
                maxWidth: "580px",
                marginBottom: "16px",
              }}
            >
              <div
                className="heading-text"
                style={{ marginBottom: "8px", color: "#FF3F50" }}
              >
                CHALLENGE
              </div>
              <p className="content-detail-para">
                Build smallest ever use case you can think of with AI that can
                be tested immediately.
              </p>
            </motion.div>

            {/* SCOPE - Cyan / ScaleTech Blue */}
            <motion.div
              className="slide1-vision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.0,
              }}
              style={{
                background: "transparent",
                marginLeft: "-20px",
                padding: "0 32px 0 18px",
                borderLeft: "2px solid #25ADD0",
                maxWidth: "580px",
                marginBottom: "16px",
              }}
            >
              <div
                className="heading-text"
                style={{ marginBottom: "8px", color: "#25ADD0" }}
              >
                SCOPE
              </div>
              <p className="content-detail-para">
                #Organisation <br />
                #Customer <br />
                #New-possibilities
              </p>
            </motion.div>

            {/* TIMELINE - Warm Amber Gold */}
            <motion.div
              className="slide1-vision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.05,
              }}
              style={{
                background: "transparent",
                marginLeft: "-20px",
                padding: "0 32px 0 18px",
                borderLeft: "2px solid #F5A623",
                maxWidth: "580px",
                marginBottom: "16px",
              }}
            >
              <div
                className="heading-text"
                style={{ marginBottom: "8px", color: "#F5A623" }}
              >
                TIMELINE
              </div>
              <p className="content-detail-para">4-6 weeks</p>
            </motion.div>

            {/* REWARD - Emerald Green */}
            <motion.div
              className="slide1-vision"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 1.1,
              }}
              style={{
                background: "transparent",
                marginLeft: "-20px",
                padding: "0 32px 0 18px",
                borderLeft: "2px solid #10B981",
                maxWidth: "580px",
              }}
            >
              <div
                className="heading-text"
                style={{ marginBottom: "8px", color: "#10B981" }}
              >
                REWARD
              </div>
              <p className="content-detail-para">#TBD</p>
            </motion.div>
          </div>
        </div>

        {/* Assessment details & Start Survey button */}
        {/* <motion.div
          className="slide1-assessment"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "17px",
              fontWeight: 500,
              color: "#111111",
              marginBottom: "24px",
              lineHeight: 1.4,
            }}
          >
            Discover and create an impact with Your idea, Let's reinvent
            tradition with AI
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            <motion.button
              onClick={onExplore}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                height: "52px",
                padding: "18px 32px",
                borderRadius: "0px",
                background: "#FF3F50",
                color: "white",
                fontSize: "18px",
                fontWeight: 600,
                border: "1px solid #FF3F50",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(255, 63, 80, 0.25)",
                transition: "all 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e53a48";
                e.currentTarget.style.borderColor = "#e53a48";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FF3F50";
                e.currentTarget.style.borderColor = "#FF3F50";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              aria-label="Let's Explore"
            >
              Let's Explore <ArrowRight size={20} />
            </motion.button>
            <span
              style={{ fontSize: "14px", color: "#777777", fontWeight: 500 }}
            >
              Estimated time: 3–5 Minutes
            </span>
          </div>
        </motion.div> */}
      </div>

      {/* Right Media Area (54%) — clean full-height canvas, edge-to-edge, no dividers over it */}
      <div
        className="slide1-right-panel"
        style={{
          width: "54%",
          position: "absolute",
          right: 0,
          top: "64px",
          bottom: 0,
          zIndex: 2,
        }}
      >
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Dark Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to right, rgba(10,10,15,0.82) 0%, rgba(10,10,15,0.55) 50%, rgba(10,10,15,0.25) 100%)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Carousel Container */}
        <div
          className="slide1-carousel-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "90px 90px 90px 70px",
            zIndex: 2,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Section 1: the challenge journey. Static by design - it animates
              in once and then holds, so only the carousel below rotates. */}
          <div
            className="slide1-journey-grid"
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "40px",
              paddingBottom: "40px",
              borderBottom: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            {journeyStages.map((stage, i) => (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.35 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -4,
                  borderColor: "rgba(255,63,80,0.85)",
                  backgroundColor: "rgba(255,63,80,0.10)",
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "18px 18px 20px",
                  border: "1px solid rgba(255,255,255,0.16)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <stage.Icon size={20} strokeWidth={1.5} color="#ffffff" />
                  <span
                    style={{
                      fontFamily: "GT America Mono, monospace",
                      fontSize: "12px",
                      letterSpacing: "2px",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {stage.label}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#FF3F50",
                  }}
                >
                  {stage.title}
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {stage.points.map((point) => (
                    <li
                      key={point}
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "flex-start",
                        fontSize: "13px",
                        lineHeight: 1.45,
                        color: "rgba(255,255,255,0.78)",
                      }}
                    >
                      <span
                        style={{
                          marginTop: "6px",
                          minWidth: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#FF3F50",
                        }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Section 2: the rotating insight carousel, unchanged */}
          <div
            style={{ maxWidth: "520px", position: "relative", height: "250px" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOverlaySlide}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <div
                  style={{
                    fontFamily: "GT America Mono, monospace",
                    fontSize: "14px",
                    letterSpacing: "2px",
                    color: "#FF3F50",
                    marginBottom: "24px",
                  }}
                >
                  {overlaySlides[activeOverlaySlide].label}
                </div>

                <h2
                  className="slide1-carousel-headline"
                  style={{
                    fontFamily: "GT America Bold, sans-serif",
                    fontSize: "30px",
                    color: "white",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    maxWidth: "480px",
                    marginBottom: "24px",
                    fontWeight: "bold",
                    textTransform: "initial",
                  }}
                >
                  {overlaySlides[activeOverlaySlide].headline}
                </h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.15,
                    duration: 0.5,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  style={{
                    fontFamily: "GT America Regular, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.6,
                    maxWidth: "470px",
                  }}
                >
                  {overlaySlides[activeOverlaySlide].body}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Indicator */}
        <div
          className="slide1-carousel-indicator"
          style={{
            position: "absolute",
            bottom: "40px",
            left: "70px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
            fontFamily: "GT America Mono, monospace",
            fontSize: "18px",
            fontWeight: "bold",
            letterSpacing: "2px",
            zIndex: 2,
          }}
        >
          {overlaySlides.map((slide, index) => (
            <React.Fragment key={slide.label}>
              <motion.span
                role="button"
                tabIndex={0}
                aria-label={`Show insight ${slide.label}`}
                aria-current={activeOverlaySlide === index}
                onClick={() => setActiveOverlaySlide(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveOverlaySlide(index);
                  }
                }}
                animate={{
                  color:
                    activeOverlaySlide === index
                      ? "#FF3F50"
                      : "rgba(255,255,255,0.7)",
                }}
                whileHover={{ color: "#FF3F50", y: -2 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.3 }}
                style={{
                  cursor: "pointer",
                  padding: "4px 6px",
                  userSelect: "none",
                  outline: "none",
                }}
              >
                {slide.label}
              </motion.span>
              {index < overlaySlides.length - 1 && (
                <span style={{ color: "rgba(255,255,255,0.7)" }}>—</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slide2() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Main Content Container */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 80px 40px 80px",
          zIndex: 3,
        }}
      >
        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ marginBottom: "60px" }}
        >
          <div className="text-small-label" style={{ marginBottom: "16px" }}>
            OUR FRAMEWORK
          </div>
          <h1
            style={{
              fontSize: "72px",
              lineHeight: 0.9,
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#111111",
              maxWidth: "520px",
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            IDEA
            <br />
            LIFECYCLE
          </h1>
        </motion.div>

        {/* Bottom Section (Cards + Feedback on left, Video on right) */}
        <div style={{ display: "flex", gap: "60px" }}>
          {/* Left Side (60%) */}
          <div
            style={{
              flex: "0 0 calc(60% - 30px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Lifecycle Area */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {/* Top Stages */}
              <div
                style={{ display: "flex", gap: "30px", position: "relative" }}
              >
                {/* Stage 01 */}
                <motion.div
                  variants={itemVariants}
                  style={{
                    flex: 1,
                    position: "relative",
                    border: "1px solid #111111",
                    borderRadius: "0px",
                    background: "#ffffff",
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-23px",
                      transform: "translateY(-50%)",
                      zIndex: 2,
                    }}
                  >
                    <ArrowRight size={16} strokeWidth={1} color="#111111" />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-32px",
                      left: "50%",
                      width: "1px",
                      height: "16px",
                      borderLeft: "1px dashed #111111",
                      zIndex: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "-1px",
                        top: "-6px",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <ChevronUp size={16} strokeWidth={2} color="#111111" />
                    </div>
                  </div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: "1px solid #111111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <Search size={24} strokeWidth={1} color="#111111" />
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111111",
                      marginBottom: "8px",
                    }}
                  >
                    01
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#111111",
                      marginBottom: "12px",
                    }}
                  >
                    Value Discovery
                  </h3>
                  <p className="text-card-desc">
                    Identify{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      business needs
                    </span>
                    ,{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      pain points
                    </span>
                    , and{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      opportunities
                    </span>
                    .
                  </p>
                </motion.div>

                {/* Stage 02 */}
                <motion.div
                  variants={itemVariants}
                  style={{
                    flex: 1,
                    position: "relative",
                    border: "1px solid #111111",
                    borderRadius: "0px",
                    background: "#ffffff",
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-23px",
                      transform: "translateY(-50%)",
                      zIndex: 2,
                    }}
                  >
                    <ArrowRight size={16} strokeWidth={1} color="#111111" />
                  </div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: "1px solid #111111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <Lightbulb size={24} strokeWidth={1} color="#111111" />
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111111",
                      marginBottom: "8px",
                    }}
                  >
                    02
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#111111",
                      marginBottom: "12px",
                    }}
                  >
                    Opportunity Identification
                  </h3>
                  <p className="text-card-desc">
                    Translate{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      insights
                    </span>{" "}
                    into{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      actionable opportunities
                    </span>{" "}
                    and{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      use cases
                    </span>
                    .
                  </p>
                </motion.div>

                {/* Stage 03 */}
                <motion.div
                  variants={itemVariants}
                  style={{
                    flex: 1,
                    position: "relative",
                    border: "1px solid #111111",
                    borderRadius: "0px",
                    background: "#ffffff",
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-32px",
                      left: "50%",
                      width: "1px",
                      height: "16px",
                      borderLeft: "1px dashed #111111",
                      zIndex: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "-1px",
                        bottom: "-4px",
                        transform: "translate(-50%, 50%)",
                      }}
                    >
                      <ChevronDown size={16} strokeWidth={2} color="#111111" />
                    </div>
                  </div>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      border: "1px solid #111111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <Settings size={24} strokeWidth={1} color="#111111" />
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111111",
                      marginBottom: "8px",
                    }}
                  >
                    03
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#111111",
                      marginBottom: "12px",
                    }}
                  >
                    Implementation
                  </h3>
                  <p className="text-card-desc">
                    Execute solutions using{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      AI
                    </span>
                    ,{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      automation
                    </span>
                    , or{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      product development
                    </span>
                    .
                  </p>
                </motion.div>
              </div>

              {/* Feedback Loop Component */}
              <motion.div
                variants={itemVariants}
                style={{
                  position: "relative",
                  width: "100%",
                  marginTop: "40px",
                }}
              >
                {/* Feedback Box */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    background: "#ffffff",
                    border: "1px solid #111111",
                    borderRadius: "0px",
                    padding: "32px 40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  <RefreshCcw
                    size={28}
                    strokeWidth={1}
                    color="#111111"
                    style={{ marginBottom: "12px" }}
                  />
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#111111",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "8px",
                    }}
                  >
                    Agile Feedback Loop
                  </div>
                  <div className="text-card-desc">
                    Continuously optimize based on{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      real-time feedback
                    </span>{" "}
                    and{" "}
                    <span
                      style={{ color: "var(--accent-purple)", fontWeight: 700 }}
                    >
                      outcomes
                    </span>
                    .
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side (Video) */}
          <div style={{ flex: 1, display: "flex" }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                border: "2px solid #ffffff",
                backgroundColor: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <video
                src="/Infinity-vertical-scaled-1.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide3({ onOpenAssessment }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const ghostNumberVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "160px 80px 60px 80px",
          zIndex: 3,
        }}
      >
        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ marginBottom: "100px" }}
        >
          <div className="text-small-label" style={{ marginBottom: "16px" }}>
            INNOVATION PATHWAY
          </div>
          <h1
            style={{
              fontSize: "72px",
              lineHeight: 0.9,
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#111111",
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            CHALLENGE
            <br />
            JOURNEY
          </h1>
        </motion.div>

        {/* Pathway Area */}
        <div style={{ position: "relative", flex: 1 }}>
          {/* Ghost Background Typography */}
          <div
            style={{
              position: "absolute",
              top: "-85px",
              left: "-10px",
              right: "60px",
              display: "flex",
              justifyContent: "space-between",
              zIndex: -2,
              pointerEvents: "none",
              color: "#F2F2F2",
              fontSize: "76px",
              fontWeight: 900,
              letterSpacing: "0.04em",
              whiteSpace: "nowrap",
            }}
          >
            <div>DISCOVER</div>
            <div>IDENTIFY</div>
            <div>IMPLEMENT</div>
          </div>

          {/* Continuous Timeline Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            style={{
              position: "absolute",
              top: "15px",
              left: "0",
              right: "0",
              height: "2px",
              background: "#111111",
              transformOrigin: "left",
              zIndex: 0,
            }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            style={{
              display: "flex",
              gap: "60px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Column 01 */}
            <div
              style={{
                flex: 1,
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <motion.div
                variants={ghostNumberVariants}
                style={{
                  position: "absolute",
                  top: "100px",
                  right: "0px",
                  fontSize: "320px",
                  fontWeight: 900,
                  color: "#f7f7f7",
                  lineHeight: 0.8,
                  zIndex: -1,
                  pointerEvents: "none",
                }}
              >
                01
              </motion.div>

              {/* Node */}
              <div
                style={{
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "60px",
                }}
              >
                <motion.div
                  initial={{
                    backgroundColor: "#ffffff",
                    borderColor: "#111111",
                  }}
                  whileInView={{
                    backgroundColor: "#FF3F50",
                    borderColor: "#FF3F50",
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "2px solid #111111",
                    zIndex: 2,
                  }}
                />
              </div>

              <motion.div variants={itemVariants}>
                <Compass size={32} strokeWidth={1} color="#111111" />
              </motion.div>

              <motion.h2
                variants={itemVariants}
                style={{
                  fontSize: "34px",
                  fontWeight: 700,
                  color: "#FF3F50",
                  marginTop: "24px",
                  marginBottom: "16px",
                  lineHeight: 1.1,
                }}
              >
                Discover
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="text-subheading"
                style={{ marginBottom: "32px" }}
              >
                Building the right Idea
              </motion.div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {[
                  "Submit your idea",
                  "Evaluations by Steering Committee",
                  "Idea Approvals",
                  "Identify team formations",
                ].map((text, i) => (
                  <motion.li
                    variants={itemVariants}
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        marginTop: "8px",
                        minWidth: "6px",
                        height: "6px",
                        background: "#FF3F50",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span className="text-body">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 02 */}
            <div
              style={{
                flex: 1,
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <motion.div
                variants={ghostNumberVariants}
                style={{
                  position: "absolute",
                  top: "100px",
                  right: "0px",
                  fontSize: "320px",
                  fontWeight: 900,
                  color: "#f7f7f7",
                  lineHeight: 0.8,
                  zIndex: -1,
                  pointerEvents: "none",
                }}
              >
                02
              </motion.div>

              {/* Node */}
              <div
                style={{
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "60px",
                }}
              >
                <motion.div
                  initial={{
                    backgroundColor: "#ffffff",
                    borderColor: "#111111",
                  }}
                  whileInView={{
                    backgroundColor: "#FF3F50",
                    borderColor: "#FF3F50",
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "2px solid #111111",
                    zIndex: 2,
                  }}
                />
              </div>

              <motion.div variants={itemVariants}>
                <Search size={32} strokeWidth={1} color="#111111" />
              </motion.div>

              <motion.h2
                variants={itemVariants}
                style={{
                  fontSize: "34px",
                  fontWeight: 700,
                  color: "#FF3F50",
                  marginTop: "24px",
                  marginBottom: "16px",
                  lineHeight: 1.1,
                }}
              >
                Identify
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="text-subheading"
                style={{ marginBottom: "32px" }}
              >
                Learning through experimentation
              </motion.div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {[
                  "Hands-on POC AI workshops",
                  "AI Agent Creation Labs",
                  "Use case brainstorming",
                  "Prompt engineering & workflow design",
                  "Scaletech Plus Philoneos Team collaboration",
                ].map((text, i) => (
                  <motion.li
                    variants={itemVariants}
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        marginTop: "8px",
                        minWidth: "6px",
                        height: "6px",
                        background: "#FF3F50",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span className="text-body">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 03 */}
            <div
              style={{
                flex: 1,
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <motion.div
                variants={ghostNumberVariants}
                style={{
                  position: "absolute",
                  top: "100px",
                  right: "0",
                  fontSize: "320px",
                  fontWeight: 900,
                  color: "#f7f7f7",
                  lineHeight: 0.8,
                  zIndex: -1,
                  pointerEvents: "none",
                }}
              >
                03
              </motion.div>

              {/* Node */}
              <div
                style={{
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "60px",
                }}
              >
                <motion.div
                  initial={{
                    backgroundColor: "#ffffff",
                    borderColor: "#111111",
                  }}
                  whileInView={{
                    backgroundColor: "#FF3F50",
                    borderColor: "#FF3F50",
                  }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "2px solid #111111",
                    zIndex: 2,
                  }}
                />
              </div>

              <motion.div variants={itemVariants}>
                <Rocket size={32} strokeWidth={1} color="#111111" />
              </motion.div>

              <motion.h2
                variants={itemVariants}
                style={{
                  fontSize: "34px",
                  fontWeight: 700,
                  color: "#FF3F50",
                  marginTop: "24px",
                  marginBottom: "16px",
                  lineHeight: 1.1,
                }}
              >
                Implement
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="text-subheading"
                style={{ marginBottom: "32px" }}
              >
                Turning ideas into real impact
              </motion.div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {[
                  "Build practical AI solutions",
                  "Live demonstrations",
                  "Real business use cases",
                  "Peer reviews & knowledge sharing",
                  "Continuous mentoring & guidance",
                ].map((text, i) => (
                  <motion.li
                    variants={itemVariants}
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        marginTop: "8px",
                        minWidth: "6px",
                        height: "6px",
                        background: "#FF3F50",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span className="text-body">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom-right CTA. Absolutely placed rather than in flow: the pathway
          columns above already run down to y=980 of the 1080px stage, so an
          in-flow button would be pushed past the bottom edge and clipped.
          This keeps every existing element at exactly the same position. */}
      <motion.div
        className="slide3-cta"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
        style={{
          position: "absolute",
          right: "80px",
          bottom: "28px",
          zIndex: 5,
        }}
      >
        <button
          onClick={onOpenAssessment}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            height: "48px",
            padding: "0 28px",
            borderRadius: "0px",
            background: "#FF3F50",
            color: "white",
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "inherit",
            border: "1px solid #FF3F50",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(255, 63, 80, 0.22)",
            transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e53a48";
            e.currentTarget.style.borderColor = "#e53a48";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 8px 24px rgba(255, 63, 80, 0.22)";
          }}
          aria-label="Submit your Idea"
        >
          Submit your Idea <ArrowRight size={18} />
        </button>
      </motion.div>
    </div>
  );
}

function Slide4() {
  const activities = [
    {
      title: "Community Events",
      desc: "Host workshops, expert talks, panels, and collaborative discussions.",
      Icon: Users,
    },
    {
      title: "AI Agent Creation",
      desc: "Guide learners in designing and building AI agents for practical scenarios.",
      Icon: Bot,
    },
    {
      title: "AI Use Case",
      desc: "Brainstorm and validate AI opportunities for real business challenges.",
      Icon: Lightbulb,
    },
    {
      title: "Mentorship",
      desc: "Support learners through office hours, implementation guidance, and peer learning.",
      Icon: MessageSquare,
    },
    {
      title: "Community Knowledge",
      desc: "Curate articles, AI updates, Slack discussions, and learning resources.",
      Icon: Book,
    },
    {
      title: "Live Demonstrations",
      desc: "Showcase practical AI implementations and real-world success stories.",
      Icon: Presentation,
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "140px 80px 40px 80px",
          zIndex: 3,
        }}
      >
        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ marginBottom: "24px" }}
        >
          <div className="text-small-label" style={{ marginBottom: "16px" }}>
            COMMUNITY ACTIVITIES
          </div>
          <h1
            style={{
              fontSize: "56px",
              lineHeight: 0.9,
              fontWeight: 900,
              textTransform: "uppercase",
              color: "#111111",
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            BRINGING PATHWAY
            <br />
            TO LIFE
          </h1>
        </motion.div>

        {/* Content Area */}
        <div style={{ display: "flex", flex: 1, gap: "40px", minHeight: 0 }}>
          {/* Left Grid (60%) */}
          <div
            style={{
              flex: "0 0 60%",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
            }}
          >
            {activities.map((act, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.4 + i * 0.1,
                }}
                style={{
                  border: "1px solid #111111",
                  borderRadius: "0px",
                  padding: "24px",
                  background: "#ffffff",
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ marginBottom: "16px", color: "#111111" }}>
                  <act.Icon size={28} strokeWidth={1} color="currentColor" />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#111111",
                    marginBottom: "12px",
                    lineHeight: 1.1,
                  }}
                >
                  {act.title}
                </h3>
                <div
                  style={{
                    width: "24px",
                    height: "1px",
                    background: "#FF3F50",
                    marginBottom: "12px",
                  }}
                />
                <p className="text-card-desc" style={{ paddingRight: "12px" }}>
                  {act.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Video (40%) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            style={{
              flex: 1,
              position: "relative",
              borderRadius: "0px",
              overflow: "hidden",
              background: "#f5f5f5",
              border: "1px solid #111111",
            }}
          >
            <video
              src="/Leading-With-Ai.mp4?v=2"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Slide5() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          padding: "180px 80px 40px 80px",
          zIndex: 3,
          gap: "80px",
        }}
      >
        {/* Left Side (Fixed Width) */}
        <div
          style={{
            flex: "0 0 600px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            paddingRight: "0px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <h1
              style={{
                fontSize: "56px",
                lineHeight: 0.9,
                fontWeight: 900,
                textTransform: "uppercase",
                color: "#111111",
                letterSpacing: "-0.04em",
                margin: 0,
                marginBottom: "60px",
              }}
            >
              WE WILL DELIVER
              <br />
              IMPACT.
            </h1>
          </motion.div>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {[
              "help every participant understand AI",
              "provide practical experimentation",
              "share real business use cases",
              "build an AI community",
              "help ambassadors contribute back",
            ].map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <div style={{ marginTop: "6px" }}>
                  <ArrowRight size={16} color="var(--accent-purple)" />
                </div>
                <span className="text-body">{text}</span>
              </motion.li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "60px",
              paddingTop: "40px",
              borderTop: "1px solid #e5e5e5",
            }}
          >
            <div className="text-small-label" style={{ marginBottom: "16px" }}>
              THE JOURNEY
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{ fontWeight: 600, fontSize: "18px", color: "#111111" }}
              >
                Understanding
              </span>
              <ArrowRight size={16} color="var(--accent-purple)" />
              <span
                style={{ fontWeight: 600, fontSize: "18px", color: "#111111" }}
              >
                Experimentation
              </span>
              <ArrowRight size={16} color="var(--accent-purple)" />
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "var(--accent-purple)",
                }}
              >
                Community Impact
              </span>
            </div>
          </div>
        </div>

        {/* Right Side (600px) - Purple Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{
            width: "600px",
            flex: "0 0 600px",
            alignSelf: "flex-start",
            backgroundColor: "var(--accent-purple)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px",
            borderRadius: "0px",
          }}
        >
          {/* Photograph Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ width: "100%" }}
          >
            <img
              src="/graduation.jfif"
              alt="Graduation"
              style={{
                width: "100%",
                height: "auto",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                display: "block",
              }}
            />
          </motion.div>

          {/* Photo Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            style={{ textAlign: "center", marginTop: "32px" }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 900,
                color: "#ffffff",
                marginBottom: "4px",
              }}
            >
              Rakesh Gondaliya
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              Co-Founder &amp; CTO at ScaleTech Solutions
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "8px",
              }}
            >
              Professional Master's in SET
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.85)",
                marginBottom: "4px",
              }}
            >
              Tomorrow University of Applied Sciences
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Graduated June 2026
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

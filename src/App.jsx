import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Video, Image as ImageIcon, Search, Lightbulb, Settings, RefreshCcw, ChevronUp, ChevronDown, Compass, Rocket, Users, Bot, MessageSquare, Book, Presentation
} from 'lucide-react';
import './index.css';
import './App.css';

const slides = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];
const ResponsiveWrapper = ({ children }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Calculate scale based on the master 1920x1080 design canvas
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      // Use Math.min to ensure it perfectly fits within the screen without clipping
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize(); // Initial call on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        width: '1920px',
        height: '1080px',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        position: 'relative',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 0 40px rgba(0,0,0,0.05)' // Subtle shadow for letterboxed states
      }}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ResponsiveWrapper>
      <div className="w-full h-full relative" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <header style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '92px', padding: '0 80px 18px 80px', zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'flex-end', gap: '56px' }}
          >
            <img 
              src="/tou-logo.svg" 
              alt="Tomorrow University Logo" 
              style={{ height: '62px', objectFit: 'contain', cursor: 'pointer' }}
              onClick={() => setCurrentSlide(0)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '14px', fontWeight: 600, color: '#111111', letterSpacing: '0.05em' }}
          >
            {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </motion.div>
        </header>

        {/* Main Content Area */}
        <main style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            >
              {currentSlide === 0 && <Slide1 />}
              {currentSlide === 1 && <Slide2 />}
              {currentSlide === 2 && <Slide3 />}
              {currentSlide === 3 && <Slide4 />}
              {currentSlide === 4 && <Slide5 />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer Navigation */}
        <footer style={{ position: 'absolute', bottom: 40, right: 60, zIndex: 50, display: 'flex', gap: 0 }}>
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="nav-button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="nav-button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </footer>
      </div>
    </ResponsiveWrapper>
  );
}

function Slide1() {
  const [activeOverlaySlide, setActiveOverlaySlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const overlaySlides = [
    {
      label: '01',
      headline: 'Knowledge and training gaps remain the biggest barriers to AI-driven value.',
      body: "According to McKinsey's State of AI Trust 2026, nearly 60% of organisations say knowledge and training gaps are the biggest barriers standing between them and real AI-driven value. That percentage was roughly 50% just a year ago, highlighting that while AI tools continue to evolve rapidly, organisational readiness is struggling to keep pace.",
    },
    {
      label: '02',
      headline: "The difference isn't the AI tool. It's how the tool gets used.",
      body: "Most organisations today have access to broadly similar AI technologies. What separates businesses creating real impact is not the tool itself, but the depth of understanding behind how that tool is applied to solve meaningful business challenges.",
    },
    {
      label: '03',
      headline: 'Business outcomes should guide AI adoption.',
      body: "According to Gartner, many AI initiatives fail not because the technology doesn't work, but because they are never tied to the business capabilities that drive value. AI creates measurable impact when implementation is aligned with strategic business outcomes from the very beginning.",
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveOverlaySlide((prev) => (prev + 1) % overlaySlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, overlaySlides.length]);

  const bubbleVariants = {
    animate: (i) => ({
      y: ['110vh', '-20vh'],
      x: [
        `${(i * 15) + 10}vw`,
        `${(i * 15) + Math.random() * 10}vw`
      ],
      transition: {
        duration: Math.random() * 15 + 25,
        repeat: Infinity,
        ease: 'linear',
        delay: Math.random() * -20
      }
    })
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', background: '#ffffff', overflow: 'hidden' }}>

      {/* Divider 01 — thin black line below the header, spanning the content column only (never over the video) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ position: 'absolute', top: '92px', left: 0, width: '46%', height: '1px', background: '#111111', transformOrigin: 'left', zIndex: 10 }}
      />

      {/* Divider 02 — thin black vertical seam between content and video */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{ position: 'absolute', left: '46%', top: '92px', bottom: 0, width: '1px', background: '#111111', transformOrigin: 'top', zIndex: 10 }}
      />

      {/* Ambient Bubbles */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: '54%', bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={bubbleVariants}
            initial={{ y: '110vh' }}
            animate="animate"
            style={{
              position: 'absolute',
              width: `${Math.random() * 120 + 100}px`,
              height: `${Math.random() * 120 + 100}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.01) 100%)',
              filter: 'blur(8px)',
            }}
          />
        ))}
      </div>

      {/* Left Content Area (46%) — single editorial column, vertically centred below the header */}
      <div style={{ width: '46%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '92px 60px 40px 80px', zIndex: 3 }}>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="text-small-label"
          style={{ marginTop: '32px', marginBottom: '48px' }}
        >
          Alumni Ambassador Programme
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          style={{ fontSize: '79px', lineHeight: 1.1, fontWeight: 900, textTransform: 'uppercase', color: '#111111', marginBottom: '16px', letterSpacing: '-0.04em' }}
        >
          Realise <span style={{ color: 'var(--accent-purple)' }}>Value</span> With AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          style={{ maxWidth: '580px', marginBottom: '64px', fontSize: '20px', color: '#2F2F2F', fontWeight: 500 }}
        >
          AI & Technology Pathway
        </motion.p>

        {/* Horizontal divider above Our Vision — full width, extending out of padding */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          style={{ width: 'calc(100% + 140px)', height: '1px', background: '#111111', transformOrigin: 'left', marginTop: '0px', marginLeft: '-80px' }}
        />

        {/* Our Vision — editorial callout: a single thin red accent line hanging in the margin; text sits on the column grid, aligned with the statement above */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
          style={{
            background: 'transparent',
            marginTop: '30px',
            marginLeft: '-20px',
            padding: '0 32px 0 18px',
            borderLeft: '2px solid var(--accent-purple)',
            maxWidth: '580px'
          }}
        >
          <div className="text-small-label">
            VISION
          </div>
          <p className="text-body">
            To enable learners to explore, experiment, implement AI integrated solution that create meaningful value for their organisations.
          </p>
        </motion.div>
      </div>

      {/* Right Media Area (54%) — clean full-height canvas, edge-to-edge, no dividers over it */}
      <div style={{ width: '54%', position: 'absolute', right: 0, top: '92px', bottom: 0, zIndex: 2 }}>
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Dark Gradient Overlay */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to right, rgba(10,10,15,0.82) 0%, rgba(10,10,15,0.55) 50%, rgba(10,10,15,0.25) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Carousel Container */}
        <div 
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '90px 90px 90px 70px',
            zIndex: 2
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ maxWidth: '520px', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOverlaySlide}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <div style={{ 
                  fontFamily: 'GT America Mono, monospace', 
                  fontSize: '14px', 
                  letterSpacing: '2px', 
                  color: '#6F3FF5', 
                  marginBottom: '24px' 
                }}>
                  {overlaySlides[activeOverlaySlide].label}
                </div>
                
                <h2 style={{ 
                  fontFamily: 'GT America Bold, sans-serif', 
                  fontSize: '30px', 
                  color: 'white', 
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  maxWidth: '480px',
                  marginBottom: '24px',
                  fontWeight: 'bold',
                  textTransform: 'initial'
                }}>
                  {overlaySlides[activeOverlaySlide].headline}
                </h2>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  style={{ 
                    fontFamily: 'GT America Regular, sans-serif', 
                    fontSize: '14px', 
                    color: 'rgba(255,255,255,0.88)', 
                    lineHeight: 1.6,
                    maxWidth: '470px'
                  }}
                >
                  {overlaySlides[activeOverlaySlide].body}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '70px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          fontFamily: 'GT America Mono, monospace',
          fontSize: '18px',
          fontWeight: 'bold',
          letterSpacing: '2px',
          zIndex: 2
        }}>
          {overlaySlides.map((slide, index) => (
            <React.Fragment key={slide.label}>
              <motion.span
                animate={{ color: activeOverlaySlide === index ? '#6F3FF5' : 'rgba(255,255,255,0.7)' }}
                transition={{ duration: 0.3 }}
              >
                {slide.label}
              </motion.span>
              {index < overlaySlides.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>—</span>
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
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', background: '#ffffff', overflow: 'hidden' }}>

      {/* Horizontal Divider (animates in) */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ position: 'absolute', top: '120px', left: 0, right: 0, height: '1px', background: '#111111', transformOrigin: 'left', zIndex: 10 }}
      />

      {/* Main Content Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 80px 40px 80px', zIndex: 3 }}>

        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ marginBottom: '60px' }}
        >
          <div className="text-small-label" style={{ marginBottom: '16px' }}>
            OUR FRAMEWORK
          </div>
          <h1 style={{ fontSize: '72px', lineHeight: 0.9, fontWeight: 900, textTransform: 'uppercase', color: '#111111', maxWidth: '520px', letterSpacing: '-0.04em', margin: 0 }}>
            AI VALUE<br />DELIVERY<br />LIFECYCLE
          </h1>
        </motion.div>

        {/* Bottom Section (Cards + Feedback on left, Video on right) */}
        <div style={{ display: 'flex', gap: '60px' }}>
          
          {/* Left Side (60%) */}
          <div style={{ flex: '0 0 calc(60% - 30px)', display: 'flex', flexDirection: 'column' }}>
            {/* Lifecycle Area */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
          {/* Top Stages */}
          <div style={{ display: 'flex', gap: '30px', position: 'relative' }}>

            {/* Stage 01 */}
            <motion.div variants={itemVariants} style={{ flex: 1, position: 'relative', border: '1px solid #111111', borderRadius: '0px', background: '#ffffff', padding: '32px 28px', display: 'flex', flexDirection: 'column', zIndex: 1 }}>
              <div style={{ position: 'absolute', top: '50%', right: '-23px', transform: 'translateY(-50%)', zIndex: 2 }}>
                <ArrowRight size={16} strokeWidth={1} color="#111111" />
              </div>
              <div style={{ position: 'absolute', bottom: '-32px', left: '50%', width: '1px', height: '16px', borderLeft: '1px dashed #111111', zIndex: 0 }}>
                <div style={{ position: 'absolute', left: '-1px', top: '-6px', transform: 'translateX(-50%)' }}>
                  <ChevronUp size={16} strokeWidth={2} color="#111111" />
                </div>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #111111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Search size={24} strokeWidth={1} color="#111111" />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '8px' }}>01</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '12px' }}>Value Discovery</h3>
              <p className="text-card-desc">
                Identify <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>business needs</span>, <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>pain points</span>, and <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>opportunities</span>.
              </p>
            </motion.div>

            {/* Stage 02 */}
            <motion.div variants={itemVariants} style={{ flex: 1, position: 'relative', border: '1px solid #111111', borderRadius: '0px', background: '#ffffff', padding: '32px 28px', display: 'flex', flexDirection: 'column', zIndex: 1 }}>
              <div style={{ position: 'absolute', top: '50%', right: '-23px', transform: 'translateY(-50%)', zIndex: 2 }}>
                <ArrowRight size={16} strokeWidth={1} color="#111111" />
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #111111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Lightbulb size={24} strokeWidth={1} color="#111111" />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '8px' }}>02</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '12px' }}>Opportunity Identification</h3>
              <p className="text-card-desc">
                Translate <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>insights</span> into <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>actionable opportunities</span> and <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>use cases</span>.
              </p>
            </motion.div>

            {/* Stage 03 */}
            <motion.div variants={itemVariants} style={{ flex: 1, position: 'relative', border: '1px solid #111111', borderRadius: '0px', background: '#ffffff', padding: '32px 28px', display: 'flex', flexDirection: 'column', zIndex: 1 }}>
              <div style={{ position: 'absolute', bottom: '-32px', left: '50%', width: '1px', height: '16px', borderLeft: '1px dashed #111111', zIndex: 0 }}>
                <div style={{ position: 'absolute', left: '-1px', bottom: '-4px', transform: 'translate(-50%, 50%)' }}>
                  <ChevronDown size={16} strokeWidth={2} color="#111111" />
                </div>
              </div>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid #111111', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Settings size={24} strokeWidth={1} color="#111111" />
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '8px' }}>03</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111111', marginBottom: '12px' }}>Implementation</h3>
              <p className="text-card-desc">
                Execute solutions using <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>AI</span>, <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>automation</span>, or <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>product development</span>.
              </p>
            </motion.div>
          </div>

          {/* Feedback Loop Component */}
          <motion.div variants={itemVariants} style={{ position: 'relative', width: '100%', marginTop: '40px' }}>

            {/* Feedback Box */}
            <div style={{ position: 'relative', width: '100%', background: '#ffffff', border: '1px solid #111111', borderRadius: '0px', padding: '32px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
              <RefreshCcw size={28} strokeWidth={1} color="#111111" style={{ marginBottom: '12px' }} />
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#111111', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Agile Feedback Loop
              </div>
              <div className="text-card-desc">
                Continuously optimize based on <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>real-time feedback</span> and <span style={{ color: 'var(--accent-purple)', fontWeight: 700 }}>outcomes</span>.
              </div>
            </div>
          </motion.div>

            </motion.div>
          </div>

          {/* Right Side (Video) */}
          <div style={{ flex: 1, display: 'flex' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ 
                width: '100%', 
                height: '100%',
                borderRadius: '4px', 
                overflow: 'hidden', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                border: '2px solid #ffffff',
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <video
                src="/Infinity-vertical-scaled-1.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </motion.div>
          </div>

        </div>
      </div>

    </div>
  );
}

function Slide3() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const ghostNumberVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', background: '#ffffff', overflow: 'hidden' }}>

      {/* Horizontal Divider (animates in) */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ position: 'absolute', top: '120px', left: 0, right: 0, height: '1px', background: '#111111', transformOrigin: 'left', zIndex: 10 }}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '160px 80px 60px 80px', zIndex: 3 }}>

        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ marginBottom: '100px' }}
        >
          <div className="text-small-label" style={{ marginBottom: '16px' }}>
            ToU PATHWAY
          </div>
          <h1 style={{ fontSize: '72px', lineHeight: 0.9, fontWeight: 900, textTransform: 'uppercase', color: '#111111', letterSpacing: '-0.04em', margin: 0 }}>
            COMMUNITY<br />JOURNEY
          </h1>
        </motion.div>

        {/* Pathway Area */}
        <div style={{ position: 'relative', flex: 1 }}>

          {/* Ghost Background Typography */}
          <div style={{ position: 'absolute', top: '-85px', left: '-10px', right: '60px', display: 'flex', justifyContent: 'space-between', zIndex: -2, pointerEvents: 'none', color: '#F2F2F2', fontSize: '76px', fontWeight: 900, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
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
            style={{ position: 'absolute', top: '15px', left: '0', right: '0', height: '2px', background: '#111111', transformOrigin: 'left', zIndex: 0 }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            style={{ display: 'flex', gap: '60px', position: 'relative', zIndex: 1 }}
          >
            {/* Column 01 */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>

              <motion.div variants={ghostNumberVariants} style={{ position: 'absolute', top: '100px', right: '0px', fontSize: '320px', fontWeight: 900, color: '#f7f7f7', lineHeight: 0.8, zIndex: -1, pointerEvents: 'none' }}>
                01
              </motion.div>

              {/* Node */}
              <div style={{ height: '32px', display: 'flex', alignItems: 'center', marginBottom: '60px' }}>
                <motion.div
                  initial={{ backgroundColor: '#ffffff', borderColor: '#111111' }}
                  whileInView={{ backgroundColor: '#6E1EEF', borderColor: '#6E1EEF' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #111111', zIndex: 2 }}
                />
              </div>

              <motion.div variants={itemVariants}>
                <Compass size={32} strokeWidth={1} color="#111111" />
              </motion.div>

              <motion.h2 variants={itemVariants} style={{ fontSize: '34px', fontWeight: 700, color: '#6E1EEF', marginTop: '24px', marginBottom: '16px', lineHeight: 1.1 }}>
                Awareness
              </motion.h2>

              <motion.div variants={itemVariants} className="text-subheading" style={{ marginBottom: '32px' }}>
                Building the right AI mindset
              </motion.div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  "AI trends & emerging technologies",
                  "Practical AI awareness sessions",
                  "Industry insights & expert talks",
                  "Understanding opportunities and limitations"
                ].map((text, i) => (
                  <motion.li variants={itemVariants} key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ marginTop: '8px', minWidth: '6px', height: '6px', background: '#6E1EEF', borderRadius: '50%' }}></div>
                    <span className="text-body">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 02 */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>

              <motion.div variants={ghostNumberVariants} style={{ position: 'absolute', top: '100px', right: '0px', fontSize: '320px', fontWeight: 900, color: '#f7f7f7', lineHeight: 0.8, zIndex: -1, pointerEvents: 'none' }}>
                02
              </motion.div>

              {/* Node */}
              <div style={{ height: '32px', display: 'flex', alignItems: 'center', marginBottom: '60px' }}>
                <motion.div
                  initial={{ backgroundColor: '#ffffff', borderColor: '#111111' }}
                  whileInView={{ backgroundColor: '#6E1EEF', borderColor: '#6E1EEF' }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                  style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #111111', zIndex: 2 }}
                />
              </div>

              <motion.div variants={itemVariants}>
                <Search size={32} strokeWidth={1} color="#111111" />
              </motion.div>

              <motion.h2 variants={itemVariants} style={{ fontSize: '34px', fontWeight: 700, color: '#6E1EEF', marginTop: '24px', marginBottom: '16px', lineHeight: 1.1 }}>
                Exploration
              </motion.h2>

              <motion.div variants={itemVariants} className="text-subheading" style={{ marginBottom: '32px' }}>
                Learning through experimentation
              </motion.div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  "Hands-on AI workshops",
                  "AI Agent Creation Labs",
                  "Use case brainstorming",
                  "Prompt engineering & workflow design",
                  "Community collaboration"
                ].map((text, i) => (
                  <motion.li variants={itemVariants} key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ marginTop: '8px', minWidth: '6px', height: '6px', background: '#6E1EEF', borderRadius: '50%' }}></div>
                    <span className="text-body">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 03 */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>

              <motion.div variants={ghostNumberVariants} style={{ position: 'absolute', top: '100px', right: '0', fontSize: '320px', fontWeight: 900, color: '#f7f7f7', lineHeight: 0.8, zIndex: -1, pointerEvents: 'none' }}>
                03
              </motion.div>

              {/* Node */}
              <div style={{ height: '32px', display: 'flex', alignItems: 'center', marginBottom: '60px' }}>
                <motion.div
                  initial={{ backgroundColor: '#ffffff', borderColor: '#111111' }}
                  whileInView={{ backgroundColor: '#6E1EEF', borderColor: '#6E1EEF' }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                  style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #111111', zIndex: 2 }}
                />
              </div>

              <motion.div variants={itemVariants}>
                <Rocket size={32} strokeWidth={1} color="#111111" />
              </motion.div>

              <motion.h2 variants={itemVariants} style={{ fontSize: '34px', fontWeight: 700, color: '#6E1EEF', marginTop: '24px', marginBottom: '16px', lineHeight: 1.1 }}>
                Implementation
              </motion.h2>

              <motion.div variants={itemVariants} className="text-subheading" style={{ marginBottom: '32px' }}>
                Turning ideas into real impact
              </motion.div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  "Build practical AI solutions",
                  "Live demonstrations",
                  "Real business use cases",
                  "Peer reviews & knowledge sharing",
                  "Continuous mentoring & guidance"
                ].map((text, i) => (
                  <motion.li variants={itemVariants} key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ marginTop: '8px', minWidth: '6px', height: '6px', background: '#6E1EEF', borderRadius: '50%' }}></div>
                    <span className="text-body">{text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Slide4() {
  const activities = [
    { title: "Community Events", desc: "Host workshops, expert talks, panels, and collaborative discussions.", Icon: Users },
    { title: "AI Agent Creation", desc: "Guide learners in designing and building AI agents for practical scenarios.", Icon: Bot },
    { title: "AI Use Case", desc: "Brainstorm and validate AI opportunities for real business challenges.", Icon: Lightbulb },
    { title: "Mentorship", desc: "Support learners through office hours, implementation guidance, and peer learning.", Icon: MessageSquare },
    { title: "Community Knowledge", desc: "Curate articles, AI updates, Slack discussions, and learning resources.", Icon: Book },
    { title: "Live Demonstrations", desc: "Showcase practical AI implementations and real-world success stories.", Icon: Presentation }
  ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', background: '#ffffff', overflow: 'hidden' }}>

      {/* Horizontal Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ position: 'absolute', top: '120px', left: 0, right: 0, height: '1px', background: '#111111', transformOrigin: 'left', zIndex: 10 }}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '140px 80px 40px 80px', zIndex: 3 }}>

        {/* Title Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ marginBottom: '24px' }}
        >
          <div className="text-small-label" style={{ marginBottom: '16px' }}>
            COMMUNITY ACTIVITIES
          </div>
          <h1 style={{ fontSize: '56px', lineHeight: 0.9, fontWeight: 900, textTransform: 'uppercase', color: '#111111', letterSpacing: '-0.04em', margin: 0 }}>
            BRINGING PATHWAY<br />TO LIFE
          </h1>
        </motion.div>

        {/* Content Area */}
        <div style={{ display: 'flex', flex: 1, gap: '40px', minHeight: 0 }}>

          {/* Left Grid (60%) */}
          <div style={{ flex: '0 0 60%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {activities.map((act, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 + (i * 0.1) }}
                style={{ border: '1px solid #111111', borderRadius: '0px', padding: '24px', background: '#ffffff', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ marginBottom: '16px', color: '#111111' }}>
                  <act.Icon size={28} strokeWidth={1} color="currentColor" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111111', marginBottom: '12px', lineHeight: 1.1 }}>
                  {act.title}
                </h3>
                <div style={{ width: '24px', height: '1px', background: '#6E1EEF', marginBottom: '12px' }} />
                <p className="text-card-desc" style={{ paddingRight: '12px' }}>
                  {act.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Video (40%) */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 }} style={{ flex: 1, position: 'relative', borderRadius: '0px', overflow: 'hidden', background: '#f5f5f5', border: '1px solid #111111' }}>
            <video src="/Leading-With-Ai.mp4?v=2" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function Slide5() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', background: '#ffffff', overflow: 'hidden' }}>

      {/* Horizontal Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        style={{ position: 'absolute', top: '120px', left: 0, right: 0, height: '1px', background: '#111111', transformOrigin: 'left', zIndex: 10 }}
      />

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '180px 80px 40px 80px', zIndex: 3, gap: '80px' }}>

        {/* Left Side (Fixed Width) */}
        <div style={{ flex: '0 0 600px', display: 'flex', flexDirection: 'column', height: '100%', paddingRight: '0px' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <h1 style={{ fontSize: '56px', lineHeight: 0.9, fontWeight: 900, textTransform: 'uppercase', color: '#111111', letterSpacing: '-0.04em', margin: 0, marginBottom: '60px' }}>
              WE WILL DELIVER<br />IMPACT.
            </h1>
          </motion.div>

          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              "help every participant understand AI",
              "provide practical experimentation",
              "share real business use cases",
              "build an AI community",
              "help ambassadors contribute back"
            ].map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}
              >
                <div style={{ marginTop: '6px' }}>
                  <ArrowRight size={16} color="var(--accent-purple)" />
                </div>
                <span className="text-body">{text}</span>
              </motion.li>
            ))}
          </ul>

          <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #e5e5e5' }}>
            <div className="text-small-label" style={{ marginBottom: '16px' }}>
              THE JOURNEY
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, fontSize: '18px', color: '#111111' }}>Understanding</span>
              <ArrowRight size={16} color="var(--accent-purple)" />
              <span style={{ fontWeight: 600, fontSize: '18px', color: '#111111' }}>Experimentation</span>
              <ArrowRight size={16} color="var(--accent-purple)" />
              <span style={{ fontWeight: 600, fontSize: '18px', color: 'var(--accent-purple)' }}>Community Impact</span>
            </div>
          </div>

        </div>

        {/* Right Side (600px) - Purple Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          style={{ width: '600px', flex: '0 0 600px', alignSelf: 'flex-start', backgroundColor: 'var(--accent-purple)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px', borderRadius: '0px' }}
        >
          {/* Photograph Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ width: '100%' }}
          >
            <img src="/graduation.jfif" alt="Graduation" style={{ width: '100%', height: 'auto', border: '1px solid rgba(255, 255, 255, 0.4)', display: 'block' }} />
          </motion.div>

          {/* Photo Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            style={{ textAlign: 'center', marginTop: '32px' }}
          >
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', marginBottom: '4px' }}>
              Rakesh Gondaliya
            </div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: '#ffffff', marginBottom: '16px' }}>
              Co-Founder &amp; CTO at ScaleTech Solutions
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
              Professional Master's in SET
            </div>
            <div style={{ fontSize: '15px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '4px' }}>
              Tomorrow University of Applied Sciences
            </div>
            <div style={{ fontSize: '14px', fontWeight: 400, color: 'rgba(255, 255, 255, 0.7)' }}>
              Graduated June 2026
            </div>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}

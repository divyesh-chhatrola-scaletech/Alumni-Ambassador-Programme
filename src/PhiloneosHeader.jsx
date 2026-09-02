import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * The Philoneos nav bar. Shared by the slide deck and the assessment
 * overlay so the same bar sits on every page.
 *
 * onLogoClick / onAction - what the logo and the ScaleTech mark do; on the
 *   deck they jump home / open the assessment, in the assessment both return
 *   to the deck.
 * inFlow - render as a flex child (assessment) instead of absolutely
 *   positioned over the stage (deck).
 */
export default function PhiloneosHeader({
  onLogoClick,
  onAction,
  inFlow = false,
}) {
  const [labelHovered, setLabelHovered] = useState(false);
  const [markHovered, setMarkHovered] = useState(false);

  return (
    <header
      className="app-header"
      style={{
        // On the slide deck the bar floats above the stage; inside the
        // assessment it is a flex child, so it must not be taken out of flow.
        position: inFlow ? "relative" : "absolute",
        ...(inFlow ? {} : { top: 0, left: 0, right: 0 }),
        height: "64px",
        flexShrink: 0,
        padding: "0 0 0 80px",
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #111111",
      }}
    >
      {/* Logo Section with Vertical Seam Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="philoneos-logo-wrapper"
        onClick={onLogoClick}
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          paddingRight: "60px",
          borderRight: "1px solid #111111",
          cursor: "pointer",
        }}
      >
        <img
          src="/philoneos-logo.svg"
          alt="Philoneos Logo"
          className="philoneos-logo-img"
          style={{
            height: "24px",
            objectFit: "contain",
            cursor: "pointer",
          }}
          onClick={onLogoClick}
        />
      </motion.div>

      {/* Center Text: Intrapreneurship Challenge.
          The centering track spans the full bar and centers with flexbox
          rather than translateX(-50%): framer-motion owns `transform` on the
          animated child, so a percentage shift there gets overwritten and the
          label drifts right. pointer-events stay off the track so it cannot
          swallow clicks meant for the logos on either side. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setLabelHovered(true)}
          onMouseLeave={() => setLabelHovered(false)}
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          <motion.span
            animate={{
              color: labelHovered ? "#FF3F50" : "#111111",
              letterSpacing: labelHovered ? "2px" : "1.2px",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              userSelect: "none",
              cursor: "default",
            }}
          >
            Intrapreneurship Challenge
          </motion.span>

          {/* Coral rule that sweeps out from the left on hover. Absolute, so
              it never adds height and never nudges the text off center. */}
          <motion.span
            animate={{ scaleX: labelHovered ? 1 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: "-10px",
              height: "2px",
              background: "#FF3F50",
              transformOrigin: "left center",
            }}
          />
        </motion.div>
      </div>

      {/* Right Action: ScaleTech mark */}
      <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
        <motion.img
          src="/scaletech-logo.svg"
          alt="ScaleTech Logo"
          className="philoneos-logo-img"
          animate={{ scale: markHovered ? 1.06 : 1, opacity: markHovered ? 1 : 0.85 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            height: "40px",
            objectFit: "contain",
            padding: "0 20px",
          }}
        />
      </div>
    </header>
  );
}

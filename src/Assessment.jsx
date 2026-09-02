import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { submitAssessment } from "./excelStore";
import PhiloneosHeader from "./PhiloneosHeader";

const questions = [
  // {
  //   id: 1,
  //   type: 'single',
  //   question: 'What best describes your current role and the work you are primarily responsible for?',
  //   options: [
  //     'Founder / Entrepreneur',
  //     'Business or Functional Leader',
  //     'Manager',
  //     'Professional',
  //     'Consultant',
  //     'Student or Learner',
  //     'Other',
  //   ],
  // },
  // {
  //   id: 2,
  //   type: 'single',
  //   question: 'Which area best reflects your current professional focus?',
  //   options: [
  //     'Technology & AI',
  //     'Business & Strategy',
  //     'Innovation & Transformation',
  //     'Leadership & People',
  //     'Marketing & Sales',
  //     'Operations',
  //     'Product & Service',
  //     'Other',
  //   ],
  // },
  // {
  //   id: 3,
  //   type: 'multiple',
  //   maxSelect: 3,
  //   subtitle: 'Select up to 3 options',
  //   question: 'How would you describe your current relationship with AI?',
  //   options: [
  //     'I am curious and exploring what is possible',
  //     'I use AI occasionally in my day-to-day work',
  //     'I use AI regularly in my work',
  //     'I experiment with AI for specific business or professional needs',
  //     'AI is already part of initiatives within my organisation',
  //     'I am actively working on AI implementation',
  //     'Not yet explored',
  //   ],
  // },
  // {
  //   id: 4,
  //   type: 'single',
  //   question:
  //     'How familiar are you with the concept of Agentic AI (AI systems that can plan, make decisions, use tools, and perform tasks with some degree of autonomy)?',
  //   options: [
  //     'I’ve never heard of it',
  //     'I’ve heard of it but don’t understand it well',
  //     'I have a basic understanding',
  //     'I understand it well',
  //     'I have hands-on experience with it',
  //   ],
  // },
  {
    id: 1,
    type: "long-text",
    question:
      " Please provide a problem statement that you are trying to solve with your use case.",
    placeholder:
      "Tell us about the problems or tasks you would like to solve...",
  },
  {
    id: 2,
    type: "long-text",
    question: "How your idea will help users?",
    placeholder: "Tell us about the the idea and how it will help users...",
  },
  // {
  //   id: 6,
  //   type: 'single',
  //   question: 'How are you most interested in using Agentic AI?',
  //   options: [
  //     'For personal/individual use – to improve my own productivity, learning, research, creativity, etc.',
  //     'For a small team – to support collaboration and automate tasks within a team',
  //     'For organizational/company workflows – to integrate AI agents into processes used by multiple people',
  //     'Both personal use and company/team workflows',
  //     'I’m not sure yet – I’d like to explore the possibilities',
  //     'Other',
  //   ],
  // },
  {
    id: 3,
    type: "single",
    question: "This idea is targeted for",
    options: [
      "Philoneos organization",
      "Philoneos customers",
      "New Philoneos Sales Funnel",
      "Other",
    ],
  },
  // {
  //   id: 7,
  //   type: 'multiple',
  //   maxSelect: 3,
  //   subtitle: 'Select up to 3 options',
  //   question: 'Where would you most like to create more time, capacity or opportunity?',
  //   options: [
  //     'Focusing on higher-value work',
  //     'Spending more time with customers, members or users',
  //     'Supporting and developing people',
  //     'Working on strategy and important decisions',
  //     'Creating or improving products/services',
  //     'Exploring new ideas and opportunities',
  //     'Improving how the organisation operates',
  //     'I am not sure yet',
  //   ],
  // },
  {
    id: 4,
    type: "long-text",
    question: "What are the success metrics of your idea?",
    placeholder: "Tell us about the success metrics of your idea...",
  },
  // {
  //   id: 9,
  //   type: "long-text",
  //   question: "What is your adoption strategy on post development?",
  //   placeholder: "Tell us about the success metrics of your idea...",
  // },
  // {
  //   id: 8,
  //   type: 'multiple',
  //   maxSelect: 3,
  //   subtitle: 'Select up to 3 options',
  //   question: 'What usually gets in the way when you want to improve something in your work or organisation?',
  //   options: [
  //     'Not knowing where to start',
  //     'Finding the right approach',
  //     'Lack of time',
  //     'Lack of skills or expertise',
  //     'Getting others on board',
  //     'Cost or resources',
  //     'Data, privacy or security concerns',
  //     'Not seeing a clear enough benefit',
  //   ],
  // },
  // {
  //   id: 9,
  //   type: 'single',
  //   question: 'How are you currently addressing these areas?',
  //   options: [
  //     "We haven't addressed them yet",
  //     'We are discussing possible improvements',
  //     'We are already trying different approaches',
  //     'We have introduced changes and are seeing results',
  //     'We are continuously improving them',
  //     'Not applicable',
  //   ],
  // },
  // {
  //   id: 10,
  //   type: 'multiple',
  //   maxSelect: 3,
  //   subtitle: 'Select up to 3 options',
  //   question: 'What do you hope to gain from participating in the Agentic AI Circle?',
  //   options: [
  //     'Practical AI skills',
  //     'Knowledge about emerging AI technologies',
  //     'Experience building AI projects',
  //     'A portfolio/project to showcase',
  //     'Skills useful for my studies',
  //     'Skills useful for my future career',
  //     'Entrepreneurship/startup ideas',
  //     'Collaboration with other students',
  //     'Networking with AI professionals',
  //     'Understanding the risks and responsible use of AI',
  //     'Other',
  //   ],
  // },
  // {
  //   id: 11,
  //   type: 'long-text',
  //   question: 'If you could choose one thing for the Agentic AI Circle help you build, what would it be?',
  //   placeholder: 'Tell us about the biggest challenge or opportunity you would like to improve...',
  // },
];

/**
 * Animated success mark for the thank-you screen: the ring draws itself,
 * the tick follows, two halo rings keep pulsing, and the whole thing
 * lifts and brightens on hover.
 */
function SuccessMark() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "104px", height: "104px", position: "relative" }}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ scale: hovered ? 1.07 : 1, y: hovered ? -3 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0, cursor: "pointer" }}
      >
        {/* soft coral glow, brighter under the cursor */}
        <div
          style={{
            position: "absolute",
            inset: "-16px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,63,80,0.38) 0%, rgba(255,63,80,0) 70%)",
            opacity: hovered ? 1 : 0.55,
            transition: "opacity 300ms ease",
          }}
        />

        {/* two rings breathing outwards, offset so one is always mid-flight */}
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            initial={{ scale: 0.65, opacity: 0.5 }}
            animate={{ scale: 1.55, opacity: 0 }}
            transition={{
              duration: 2.8,
              delay: i * 1.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid rgba(255,63,80,0.7)",
            }}
          />
        ))}

        <svg
          viewBox="0 0 104 104"
          width="104"
          height="104"
          fill="none"
          style={{ position: "relative", display: "block" }}
        >
          <circle cx="52" cy="52" r="37" fill="rgba(255,63,80,0.12)" />
          <motion.circle
            cx="52"
            cy="52"
            r="37"
            stroke="#FF3F50"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.95,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ rotate: -90, transformOrigin: "52px 52px" }}
          />
          <motion.path
            d="M36 53.5 L47 64.5 L69 40.5"
            stroke="#ffffff"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function AssessmentOverlay({ onClose, onLogoClick }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [otherAnswers, setOtherAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = questions.length;
  const contactStep = totalQuestions + 1;
  const thankYouStep = totalQuestions + 2;

  const isOtherOpt = (item) =>
    item === "Other" || (typeof item === "string" && item.startsWith("Other"));

  // Disable Next button logic
  let nextDisabled = false;
  if (currentStep > 0 && currentStep <= totalQuestions) {
    const q = questions[currentStep - 1];
    if (q.type === "single") {
      const selected = selectedOptions[q.id];
      if (!selected) {
        nextDisabled = true;
      } else if (isOtherOpt(selected)) {
        if (!otherAnswers[q.id] || !otherAnswers[q.id].trim()) {
          nextDisabled = true;
        }
      }
    } else if (q.type === "multiple") {
      const selectedList = Array.isArray(selectedOptions[q.id])
        ? selectedOptions[q.id]
        : [];
      if (selectedList.length === 0) {
        nextDisabled = true;
      } else if (selectedList.some(isOtherOpt)) {
        if (!otherAnswers[q.id] || !otherAnswers[q.id].trim()) {
          nextDisabled = true;
        }
      }
    } else if (q.type === "long-text") {
      if (!answers[q.id] || !answers[q.id].trim()) nextDisabled = true;
    }
  }

  const isValidUrl = (urlStr) => {
    if (!urlStr || !urlStr.trim()) return true;
    const trimmed = urlStr.trim();
    try {
      const withProtocol = /^https?:\/\//i.test(trimmed)
        ? trimmed
        : `https://${trimmed}`;
      const parsed = new URL(withProtocol);
      return (
        parsed.hostname.includes(".") &&
        parsed.hostname.split(".").every((part) => part.length > 0)
      );
    } catch {
      return false;
    }
  };

  if (currentStep === contactStep) {
    if (!contactInfo.name.trim() || !contactInfo.email.trim())
      nextDisabled = true;
    if (contactInfo.linkedin.trim() && !isValidUrl(contactInfo.linkedin))
      nextDisabled = true;
  }

  const isButtonDisabled = nextDisabled || isSubmitting;

  // Handle Enter key for proceeding if not disabled
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "Enter" &&
        !isButtonDisabled &&
        currentStep > 0 &&
        currentStep <= contactStep
      ) {
        const q = questions[currentStep - 1];
        if (q && q.type === "long-text" && !e.metaKey && !e.ctrlKey) return;

        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isButtonDisabled, currentStep, contactInfo]);

  const handleNext = async () => {
    if (isButtonDisabled) return;

    if (currentStep === contactStep) {
      setIsSubmitting(true);
      try {
        await submitAssessment(answers, contactInfo, questions);
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onClose();
    } else if (currentStep > 1 && currentStep !== thankYouStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSelectOption = (questionId, opt, type, maxSelect = 3) => {
    if (type === "multiple") {
      const currentSelected = Array.isArray(selectedOptions[questionId])
        ? selectedOptions[questionId]
        : [];
      let newSelected;
      if (currentSelected.includes(opt)) {
        newSelected = currentSelected.filter((item) => item !== opt);
      } else {
        if (currentSelected.length >= maxSelect) {
          return;
        }
        newSelected = [...currentSelected, opt];
      }
      setSelectedOptions((prev) => ({ ...prev, [questionId]: newSelected }));

      const text = (otherAnswers[questionId] || "").trim();
      const formattedAnswers = newSelected.map((item) => {
        if (isOtherOpt(item)) return text ? `Other: ${text}` : "Other";
        return item;
      });
      setAnswers((prev) => ({ ...prev, [questionId]: formattedAnswers }));
    } else {
      setSelectedOptions((prev) => ({ ...prev, [questionId]: opt }));
      if (isOtherOpt(opt)) {
        const text = (otherAnswers[questionId] || "").trim();
        setAnswers((prev) => ({
          ...prev,
          [questionId]: text ? `Other: ${text}` : "",
        }));
      } else {
        setAnswers((prev) => ({ ...prev, [questionId]: opt }));
      }
    }
  };

  const handleOtherTextChange = (questionId, text, type) => {
    setOtherAnswers((prev) => ({ ...prev, [questionId]: text }));
    const trimmedText = text.trim();

    if (type === "multiple") {
      const currentSelected = Array.isArray(selectedOptions[questionId])
        ? selectedOptions[questionId]
        : [];
      const formattedAnswers = currentSelected.map((item) => {
        if (isOtherOpt(item))
          return trimmedText ? `Other: ${trimmedText}` : "Other";
        return item;
      });
      setAnswers((prev) => ({ ...prev, [questionId]: formattedAnswers }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: trimmedText ? `Other: ${trimmedText}` : "",
      }));
    }
  };

  const handleTextChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const buttonVariants = {
    hover: {
      backgroundColor: "#E62D3E",
      y: -2,
      boxShadow: "0 10px 30px rgba(255,63,80,0.18)",
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: -30,
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        fontFamily: "GT America Regular, sans-serif",
      }}
    >
      {/* Same nav bar as the deck, so it is present on every page. Both the
          logo and the ScaleTech block return to the presentation. */}
      <PhiloneosHeader
        inFlow
        onLogoClick={onLogoClick || onClose}
        onAction={onClose}
      />

      {/* Thank-you background: the philoneos.com/impulse hero film, with a
          scrim so the copy on top stays readable. Mounted only on the final
          step, so the questions never pay for the download. */}
      {currentStep === thankYouStep && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundColor: "#111111",
            overflow: "hidden",
          }}
        >
          <video
            src="/philoneos-impulse-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(10,10,10,0.86) 0%, rgba(10,10,10,0.66) 50%, rgba(10,10,10,0.42) 100%)",
            }}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main
        className="assessment-main"
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:
            currentStep === thankYouStep ? "center" : "flex-start",
          padding: "40px 60px 24px 60px",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Mobile-only hint that the options list scrolls further down */}
        {currentStep > 0 && currentStep <= totalQuestions && (
          <div className="assessment-scroll-hint" aria-hidden="true" />
        )}

        <AnimatePresence mode="wait">
          {/* STEPS 1-11: Questions */}
          {currentStep > 0 && currentStep <= totalQuestions && (
            <motion.div
              key={`q-${currentStep}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                maxWidth: "960px",
                width: "100%",
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                className="assessment-question-title"
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#111111",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  marginBottom: questions[currentStep - 1].subtitle
                    ? "8px"
                    : "32px",
                  flexShrink: 0,
                }}
              >
                {questions[currentStep - 1].question}
              </h2>

              {questions[currentStep - 1].subtitle && (
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#777777",
                    marginBottom: "24px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span>{questions[currentStep - 1].subtitle}</span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#666666",
                      fontWeight: 500,
                      backgroundColor: "#FFF1F2",
                      padding: "2px 10px",
                      borderRadius: "12px",
                      border: "1px solid #FFDCE0",
                    }}
                  >
                    {
                      (selectedOptions[questions[currentStep - 1].id] || [])
                        .length
                    }{" "}
                    / {questions[currentStep - 1].maxSelect || 3} selected
                  </span>
                </div>
              )}

              {(questions[currentStep - 1].type === "single" ||
                questions[currentStep - 1].type === "multiple") && (
                <div
                  className={`assessment-scroll-area ${
                    questions[currentStep - 1].options.length > 8
                      ? "assessment-options-grid"
                      : "assessment-options-list"
                  }`}
                  style={{
                    display:
                      questions[currentStep - 1].options.length > 8
                        ? "grid"
                        : "flex",
                    flexDirection:
                      questions[currentStep - 1].options.length > 8
                        ? "row"
                        : "column",
                    gap: "16px",
                    overflowY: "auto",
                    flexShrink: 1,
                    minHeight: 0,
                    paddingRight: "8px",
                    paddingBottom: "16px",
                  }}
                >
                  {questions[currentStep - 1].options.map((opt, idx) => {
                    const currentQ = questions[currentStep - 1];
                    const qId = currentQ.id;
                    const isMultiple = currentQ.type === "multiple";
                    const maxSelect = currentQ.maxSelect || 3;

                    const isSelected = isMultiple
                      ? Array.isArray(selectedOptions[qId]) &&
                        selectedOptions[qId].includes(opt)
                      : selectedOptions[qId] === opt;

                    const isOther = isOtherOpt(opt);
                    const currentCount = Array.isArray(selectedOptions[qId])
                      ? selectedOptions[qId].length
                      : 0;
                    const isMaxReached =
                      isMultiple && !isSelected && currentCount >= maxSelect;

                    return (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          width: "100%",
                          gridColumn: isOther ? "1 / -1" : "auto",
                        }}
                      >
                        <motion.button
                          className="assessment-option-btn"
                          onClick={() =>
                            handleSelectOption(
                              qId,
                              opt,
                              currentQ.type,
                              maxSelect,
                            )
                          }
                          whileHover={
                            !isMaxReached
                              ? {
                                  backgroundColor: isSelected
                                    ? "#FFEDEF"
                                    : "#FFFBF5",
                                  boxShadow: isSelected
                                    ? "inset 0 0 0 1px #FF3F50"
                                    : "inset 0 0 0 1px #FFC4CB",
                                }
                              : {}
                          }
                          whileTap={!isMaxReached ? { scale: 0.998 } : {}}
                          style={{
                            textAlign: "left",
                            width: "100%",
                            boxSizing: "border-box",
                            padding: "24px 32px",
                            backgroundColor: isSelected ? "#FFEDEF" : "#ffffff",
                            border: "1px solid #EAEAEA",
                            boxShadow: isSelected
                              ? "inset 0 0 0 1px #FF3F50"
                              : "none",
                            borderRadius: "0px",
                            fontSize: "18px",
                            fontWeight: "normal",
                            color: isSelected
                              ? "#FF3F50"
                              : isMaxReached
                                ? "#999999"
                                : "#2F2F2F",
                            cursor: isMaxReached ? "not-allowed" : "pointer",
                            opacity: isMaxReached ? 0.65 : 1,
                            transition:
                              "background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          {opt}
                          {isSelected && (
                            <CheckCircle size={20} color="#FF3F50" />
                          )}
                        </motion.button>

                        <AnimatePresence>
                          {isOther && isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              style={{ overflow: "hidden" }}
                            >
                              <input
                                type="text"
                                autoFocus
                                placeholder="Please specify your answer..."
                                value={otherAnswers[qId] || ""}
                                onChange={(e) =>
                                  handleOtherTextChange(
                                    qId,
                                    e.target.value,
                                    currentQ.type,
                                  )
                                }
                                style={{
                                  width: "100%",
                                  height: "56px",
                                  padding: "0 24px",
                                  backgroundColor: "#FAFAFA",
                                  border: "2px solid #FF3F50",
                                  borderRadius: "0px",
                                  fontSize: "18px",
                                  fontFamily: "inherit",
                                  color: "#111111",
                                  outline: "none",
                                  boxShadow: "0 0 0 4px rgba(255,63,80,0.1)",
                                }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}

              {questions[currentStep - 1].type === "long-text" && (
                <textarea
                  value={answers[questions[currentStep - 1].id] || ""}
                  onChange={(e) =>
                    handleTextChange(
                      questions[currentStep - 1].id,
                      e.target.value,
                    )
                  }
                  placeholder={questions[currentStep - 1].placeholder}
                  style={{
                    width: "100%",
                    flex: 1,
                    minHeight: "120px",
                    maxHeight: "300px",
                    padding: "24px",
                    backgroundColor: "#FAFAFA",
                    border: "1px solid #EAEAEA",
                    borderRadius: "0px",
                    fontSize: "18px",
                    fontFamily: "inherit",
                    color: "#111111",
                    resize: "none",
                    outline: "none",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#FF3F50";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 4px rgba(255,63,80,0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#EAEAEA";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              )}
            </motion.div>
          )}

          {/* STEP 12: Contact Details */}
          {currentStep === contactStep && (
            <motion.div
              key="contact"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                maxWidth: "960px",
                width: "100%",
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "#111111",
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  marginBottom: "16px",
                  flexShrink: 0,
                }}
              >
                Welcome to challenge
              </h2>

              <div
                className="assessment-scroll-area"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  overflowY: "auto",
                  flexShrink: 1,
                  minHeight: 0,
                  paddingRight: "8px",
                  paddingBottom: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111111",
                      marginBottom: "8px",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) =>
                      setContactInfo((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111111",
                      marginBottom: "8px",
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) =>
                      setContactInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111111",
                      marginBottom: "8px",
                    }}
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+49 98765 43210"
                    value={contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#111111",
                      marginBottom: "8px",
                    }}
                  >
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={contactInfo.linkedin}
                    onChange={(e) =>
                      setContactInfo((prev) => ({
                        ...prev,
                        linkedin: e.target.value,
                      }))
                    }
                    style={{
                      ...inputStyle,
                      borderColor:
                        contactInfo.linkedin.trim() !== "" &&
                        !isValidUrl(contactInfo.linkedin)
                          ? "#E53E3E"
                          : "#EAEAEA",
                    }}
                    onFocus={handleInputFocus}
                    onBlur={(e) => {
                      if (
                        contactInfo.linkedin.trim() !== "" &&
                        !isValidUrl(contactInfo.linkedin)
                      ) {
                        e.currentTarget.style.borderColor = "#E53E3E";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 4px rgba(229,62,62,0.1)";
                      } else {
                        handleInputBlur(e);
                      }
                    }}
                  />
                  {contactInfo.linkedin.trim() !== "" &&
                    !isValidUrl(contactInfo.linkedin) && (
                      <div
                        style={{
                          color: "#E53E3E",
                          fontSize: "13px",
                          marginTop: "6px",
                          fontWeight: 500,
                        }}
                      >
                        Please enter a valid link (e.g.
                        https://linkedin.com/in/username)
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 13: Thank You Screen */}
          {currentStep === thankYouStep && (
            <motion.div
              key="thankyou"
              className="assessment-thankyou"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                width: "100%",
                maxWidth: "1640px",
                flex: 1,
                minHeight: 0,
                display: "flex",
                alignItems: "center",
                gap: "72px",
                textAlign: "left",
              }}
            >
              {/* Left: confirmation, the impulse copy, and the way back */}
              <div
                style={{
                  flex: "1 1 54%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ marginBottom: "32px" }}>
                  <SuccessMark />
                </div>

                <p
                  className="assessment-thankyou-impulse"
                  style={{
                    fontSize: "19px",
                    fontWeight: 500,
                    color: "#ffffff",
                    lineHeight: 1.6,
                    maxWidth: "640px",
                    marginBottom: "36px",
                    paddingLeft: "20px",
                    borderLeft: "2px solid #FF3F50",
                  }}
                >
                  FOMO (Fear of Missing Out) is the fear of missing out on
                  something. Our insights will provide you with much-needed
                  shifts in perspective that will finally shake you and your
                  organization awake.
                </p>

                <motion.button
                  onClick={onLogoClick || onClose}
                  whileHover={{ y: -2 }}
                  style={{
                    backgroundColor: "#FF3F50",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "0px",
                    height: "52px",
                    padding: "0 32px",
                    fontSize: "18px",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    boxShadow: "0 8px 24px rgba(255, 63, 80, 0.22)",
                    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 16px 40px rgba(255, 63, 80, 0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(255, 63, 80, 0.22)";
                  }}
                >
                  Back to Home
                </motion.button>
              </div>

              {/* Right: the impulse headline, as it reads on philoneos.com */}
              <div
                className="assessment-thankyou-right"
                style={{
                  flex: "1 1 46%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <h2
                  className="assessment-thankyou-headline"
                  style={{
                    fontSize: "96px",
                    lineHeight: 0.95,
                    fontWeight: 900,
                    color: "#ffffff",
                    textTransform: "uppercase",
                    letterSpacing: "-0.03em",
                    textAlign: "right",
                    margin: 0,
                  }}
                >
                  Your
                  <br />
                  FOMO Ends
                  <br />
                  With Us
                </h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Navigation */}
      {currentStep > 0 && currentStep < thankYouStep && (
        <footer
          className="assessment-footer"
          style={{
            height: "80px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 60px",
            borderTop: "1px solid #EAEAEA",
            boxShadow: "0 -8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <button
            onClick={handleBack}
            aria-label="Back"
            className="assessment-nav-btn"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              background: "transparent",
              border: "1px solid #EAEAEA",
              borderRadius: "0px",
              color: "#555555",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <ArrowLeft size={20} className="assessment-nav-btn-icon" />
          </button>

          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#111111",
              whiteSpace: "nowrap",
            }}
          >
            {currentStep <= totalQuestions
              ? `${String(currentStep).padStart(2, "0")} / ${String(totalQuestions).padStart(2, "0")}`
              : "Contact Details"}
          </div>

          <motion.button
            onClick={handleNext}
            disabled={isButtonDisabled}
            variants={!isButtonDisabled ? buttonVariants : {}}
            whileHover={!isButtonDisabled ? "hover" : ""}
            aria-label={currentStep === contactStep ? "Finish" : "Next"}
            className={`assessment-nav-btn ${currentStep === contactStep ? "assessment-submit-btn" : ""}`}
            style={{
              backgroundColor: isButtonDisabled ? "#EAEAEA" : "#FF3F50",
              color: isButtonDisabled ? "#A0A0A0" : "#ffffff",
              border: "none",
              borderRadius: "0px",
              width: currentStep === contactStep ? "auto" : "52px",
              height: "52px",
              padding: currentStep === contactStep ? "0 24px" : 0,
              cursor: isButtonDisabled ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "background-color 0.3s ease, color 0.3s ease",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            {isSubmitting ? (
              <>
                {currentStep === contactStep && <span>Submitting...</span>}
                <Loader2
                  size={20}
                  className="spin-icon assessment-nav-btn-icon"
                />
              </>
            ) : currentStep === contactStep ? (
              <>
                <span>Submit</span>
                <CheckCircle size={20} className="assessment-nav-btn-icon" />
              </>
            ) : (
              <ArrowRight size={20} className="assessment-nav-btn-icon" />
            )}
          </motion.button>
        </footer>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: "56px",
  padding: "0 20px",
  backgroundColor: "#FAFAFA",
  border: "1px solid #EAEAEA",
  borderRadius: "0px",
  fontSize: "18px",
  fontFamily: "inherit",
  color: "#111111",
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const handleInputFocus = (e) => {
  e.currentTarget.style.borderColor = "#FF3F50";
  e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255,63,80,0.1)";
};

const handleInputBlur = (e) => {
  e.currentTarget.style.borderColor = "#EAEAEA";
  e.currentTarget.style.boxShadow = "none";
};

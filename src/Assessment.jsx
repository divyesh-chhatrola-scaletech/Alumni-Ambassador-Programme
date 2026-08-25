import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { submitAssessment } from './excelStore';

const questions = [
  {
    id: 1,
    type: 'single',
    question: "What best describes your current role and the work you are primarily responsible for?",
    options: [
      "Founder / Entrepreneur",
      "Business or Functional Leader",
      "Manager",
      "Professional",
      "Consultant",
      "Student or Learner",
      "Other"
    ]
  },
  {
    id: 2,
    type: 'single',
    question: "Which area best reflects your current professional focus?",
    options: [
      "Technology & AI",
      "Business & Strategy",
      "Innovation & Transformation",
      "Leadership & People",
      "Marketing & Sales",
      "Operations",
      "Product & Service",
      "Other"
    ]
  },
  {
    id: 3,
    type: 'multiple',
    maxSelect: 3,
    subtitle: "Select up to 3 options",
    question: "How would you describe your current relationship with AI?",
    options: [
      "I am curious and exploring what is possible",
      "I use AI occasionally in my day-to-day work",
      "I use AI regularly in my work",
      "I experiment with AI for specific business or professional needs",
      "AI is already part of initiatives within my organisation",
      "I am actively working on AI implementation",
      "Not yet explored"
    ]
  },
  {
    id: 4,
    type: 'single',
    question: "How familiar are you with the concept of Agentic AI (AI systems that can plan, make decisions, use tools, and perform tasks with some degree of autonomy)?",
    options: [
      "I’ve never heard of it",
      "I’ve heard of it but don’t understand it well",
      "I have a basic understanding",
      "I understand it well",
      "I have hands-on experience with it"
    ]
  },
  {
    id: 5,
    type: 'long-text',
    question: "What kinds of problems or tasks would you most like to use Agentic AI to solve?",
    placeholder: "Tell us about the problems or tasks you would like to solve..."
  },
  {
    id: 6,
    type: 'single',
    question: "How are you most interested in using Agentic AI?",
    options: [
      "For personal/individual use – to improve my own productivity, learning, research, creativity, etc.",
      "For a small team – to support collaboration and automate tasks within a team",
      "For organizational/company workflows – to integrate AI agents into processes used by multiple people",
      "Both personal use and company/team workflows",
      "I’m not sure yet – I’d like to explore the possibilities",
      "Other"
    ]
  },
  {
    id: 7,
    type: 'multiple',
    maxSelect: 3,
    subtitle: "Select up to 3 options",
    question: "Where would you most like to create more time, capacity or opportunity?",
    options: [
      "Focusing on higher-value work",
      "Spending more time with customers, members or users",
      "Supporting and developing people",
      "Working on strategy and important decisions",
      "Creating or improving products/services",
      "Exploring new ideas and opportunities",
      "Improving how the organisation operates",
      "I am not sure yet"
    ]
  },
  {
    id: 8,
    type: 'multiple',
    maxSelect: 3,
    subtitle: "Select up to 3 options",
    question: "What usually gets in the way when you want to improve something in your work or organisation?",
    options: [
      "Not knowing where to start",
      "Finding the right approach",
      "Lack of time",
      "Lack of skills or expertise",
      "Getting others on board",
      "Cost or resources",
      "Data, privacy or security concerns",
      "Not seeing a clear enough benefit"
    ]
  },
  {
    id: 9,
    type: 'single',
    question: "How are you currently addressing these areas?",
    options: [
      "We haven't addressed them yet",
      "We are discussing possible improvements",
      "We are already trying different approaches",
      "We have introduced changes and are seeing results",
      "We are continuously improving them",
      "Not applicable"
    ]
  },
  {
    id: 10,
    type: 'multiple',
    maxSelect: 3,
    subtitle: "Select up to 3 options",
    question: "What do you hope to gain from participating in the Agentic AI Circle?",
    options: [
      "Practical AI skills",
      "Knowledge about emerging AI technologies",
      "Experience building AI projects",
      "A portfolio/project to showcase",
      "Skills useful for my studies",
      "Skills useful for my future career",
      "Entrepreneurship/startup ideas",
      "Collaboration with other students",
      "Networking with AI professionals",
      "Understanding the risks and responsible use of AI",
      "Other"
    ]
  },
  {
    id: 11,
    type: 'long-text',
    question: "If you could choose one thing for the Agentic AI Circle help you build, what would it be?",
    placeholder: "Tell us about the biggest challenge or opportunity you would like to improve..."
  }
];

export default function AssessmentOverlay({ onClose }) {
  const [currentStep, setCurrentStep] = useState(1); 
  
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [otherAnswers, setOtherAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', company: '', linkedin: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalQuestions = questions.length;
  const contactStep = totalQuestions + 1;
  const thankYouStep = totalQuestions + 2;

  // Calculate progress for questions
  let progress = 0;
  if (currentStep > 0 && currentStep <= totalQuestions) {
    progress = (currentStep / totalQuestions) * 100;
  } else if (currentStep > totalQuestions) {
    progress = 100;
  }

  const isOtherOpt = (item) => item === 'Other' || (typeof item === 'string' && item.startsWith('Other'));

  // Disable Next button logic
  let nextDisabled = false;
  if (currentStep > 0 && currentStep <= totalQuestions) {
    const q = questions[currentStep - 1];
    if (q.type === 'single') {
      const selected = selectedOptions[q.id];
      if (!selected) {
        nextDisabled = true;
      } else if (isOtherOpt(selected)) {
        if (!otherAnswers[q.id] || !otherAnswers[q.id].trim()) {
          nextDisabled = true;
        }
      }
    } else if (q.type === 'multiple') {
      const selectedList = Array.isArray(selectedOptions[q.id]) ? selectedOptions[q.id] : [];
      if (selectedList.length === 0) {
        nextDisabled = true;
      } else if (selectedList.some(isOtherOpt)) {
        if (!otherAnswers[q.id] || !otherAnswers[q.id].trim()) {
          nextDisabled = true;
        }
      }
    } else if (q.type === 'long-text') {
      if (!answers[q.id] || !answers[q.id].trim()) nextDisabled = true;
    }
  }

  const isValidUrl = (urlStr) => {
    if (!urlStr || !urlStr.trim()) return true;
    const trimmed = urlStr.trim();
    try {
      const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      const parsed = new URL(withProtocol);
      return parsed.hostname.includes('.') && parsed.hostname.split('.').every(part => part.length > 0);
    } catch {
      return false;
    }
  };

  if (currentStep === contactStep) {
    if (!contactInfo.name.trim() || !contactInfo.email.trim()) nextDisabled = true;
    if (contactInfo.linkedin.trim() && !isValidUrl(contactInfo.linkedin)) nextDisabled = true;
  }

  const isButtonDisabled = nextDisabled || isSubmitting;

  // Handle Enter key for proceeding if not disabled
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !isButtonDisabled && currentStep > 0 && currentStep <= contactStep) {
        const q = questions[currentStep - 1];
        if (q && q.type === 'long-text' && !e.metaKey && !e.ctrlKey) return;
        
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      setCurrentStep(prev => prev + 1);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      onClose();
    } else if (currentStep > 1 && currentStep !== thankYouStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSelectOption = (questionId, opt, type, maxSelect = 3) => {
    if (type === 'multiple') {
      const currentSelected = Array.isArray(selectedOptions[questionId]) ? selectedOptions[questionId] : [];
      let newSelected;
      if (currentSelected.includes(opt)) {
        newSelected = currentSelected.filter(item => item !== opt);
      } else {
        if (currentSelected.length >= maxSelect) {
          return;
        }
        newSelected = [...currentSelected, opt];
      }
      setSelectedOptions(prev => ({ ...prev, [questionId]: newSelected }));

      const text = (otherAnswers[questionId] || '').trim();
      const formattedAnswers = newSelected.map(item => {
        if (isOtherOpt(item)) return text ? `Other: ${text}` : 'Other';
        return item;
      });
      setAnswers(prev => ({ ...prev, [questionId]: formattedAnswers }));
    } else {
      setSelectedOptions(prev => ({ ...prev, [questionId]: opt }));
      if (isOtherOpt(opt)) {
        const text = (otherAnswers[questionId] || '').trim();
        setAnswers(prev => ({ ...prev, [questionId]: text ? `Other: ${text}` : '' }));
      } else {
        setAnswers(prev => ({ ...prev, [questionId]: opt }));
      }
    }
  };

  const handleOtherTextChange = (questionId, text, type) => {
    setOtherAnswers(prev => ({ ...prev, [questionId]: text }));
    const trimmedText = text.trim();

    if (type === 'multiple') {
      const currentSelected = Array.isArray(selectedOptions[questionId]) ? selectedOptions[questionId] : [];
      const formattedAnswers = currentSelected.map(item => {
        if (isOtherOpt(item)) return trimmedText ? `Other: ${trimmedText}` : 'Other';
        return item;
      });
      setAnswers(prev => ({ ...prev, [questionId]: formattedAnswers }));
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: trimmedText ? `Other: ${trimmedText}` : '' }));
    }
  };

  const handleTextChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const buttonVariants = {
    hover: { 
      backgroundColor: '#5A2EF5', 
      y: -2,
      boxShadow: '0 10px 30px rgba(108,59,255,0.18)',
      transition: { duration: 0.25, ease: 'easeOut' }
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, x: -30, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: '#ffffff',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'GT America Regular, sans-serif'
    }}>
      {/* Header / Progress Bar */}
      <header style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 60px',
        justifyContent: 'center',
        borderBottom: currentStep > 0 && currentStep < thankYouStep ? '1px solid #EAEAEA' : 'none'
      }}>
        {currentStep > 0 && currentStep < thankYouStep && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%', maxWidth: '500px' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#111111', whiteSpace: 'nowrap' }}>
              {currentStep <= totalQuestions ? 'Question' : 'Contact Details'}
            </div>
            
            <div style={{ flex: 1, height: '4px', backgroundColor: '#F2F2F2', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ height: '100%', backgroundColor: '#6C3BFF' }}
              />
            </div>
            
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#111111', width: '40px', textAlign: 'right' }}>
              {Math.round(progress)}%
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: currentStep === thankYouStep ? 'center' : 'flex-start',
        padding: '60px 60px 40px 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <AnimatePresence mode="wait">
          {/* STEPS 1-11: Questions */}
          {currentStep > 0 && currentStep <= totalQuestions && (
            <motion.div key={`q-${currentStep}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ maxWidth: '960px', width: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111111', lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: questions[currentStep - 1].subtitle ? '8px' : '32px', flexShrink: 0 }}>
                {questions[currentStep - 1].question}
              </h2>

              {questions[currentStep - 1].subtitle && (
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#777777', marginBottom: '24px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>{questions[currentStep - 1].subtitle}</span>
                  <span style={{ fontSize: '13px', color: '#666666', fontWeight: 500, backgroundColor: '#F5F3FF', padding: '2px 10px', borderRadius: '12px', border: '1px solid #EAE6FF' }}>
                    {(selectedOptions[questions[currentStep - 1].id] || []).length} / {questions[currentStep - 1].maxSelect || 3} selected
                  </span>
                </div>
              )}
              
              {(questions[currentStep - 1].type === 'single' || questions[currentStep - 1].type === 'multiple') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flexShrink: 1, minHeight: 0, paddingRight: '8px', paddingBottom: '16px' }}>
                  {questions[currentStep - 1].options.map((opt, idx) => {
                    const currentQ = questions[currentStep - 1];
                    const qId = currentQ.id;
                    const isMultiple = currentQ.type === 'multiple';
                    const maxSelect = currentQ.maxSelect || 3;
                    
                    const isSelected = isMultiple
                      ? Array.isArray(selectedOptions[qId]) && selectedOptions[qId].includes(opt)
                      : selectedOptions[qId] === opt;
                      
                    const isOther = isOtherOpt(opt);
                    const currentCount = Array.isArray(selectedOptions[qId]) ? selectedOptions[qId].length : 0;
                    const isMaxReached = isMultiple && !isSelected && currentCount >= maxSelect;

                    return (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                        <motion.button
                          onClick={() => handleSelectOption(qId, opt, currentQ.type, maxSelect)}
                          whileHover={!isMaxReached ? {
                            backgroundColor: isSelected ? '#F4F0FF' : '#FAF8FF',
                            boxShadow: isSelected
                              ? 'inset 0 0 0 1px #6C3BFF'
                              : 'inset 0 0 0 1px #CFC2FF'
                          } : {}}
                          whileTap={!isMaxReached ? { scale: 0.998 } : {}}
                          style={{
                            textAlign: 'left',
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '24px 32px',
                            backgroundColor: isSelected ? '#F4F0FF' : '#ffffff',
                            border: '1px solid #EAEAEA',
                            boxShadow: isSelected ? 'inset 0 0 0 1px #6C3BFF' : 'none',
                            borderRadius: '0px',
                            fontSize: '18px',
                            fontWeight: 'normal',
                            color: isSelected ? '#6C3BFF' : (isMaxReached ? '#999999' : '#2F2F2F'),
                            cursor: isMaxReached ? 'not-allowed' : 'pointer',
                            opacity: isMaxReached ? 0.65 : 1,
                            transition: 'background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          {opt}
                          {isSelected && <CheckCircle size={20} color="#6C3BFF" />}
                        </motion.button>

                        <AnimatePresence>
                          {isOther && isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                              style={{ overflow: 'hidden' }}
                            >
                              <input
                                type="text"
                                autoFocus
                                placeholder="Please specify your answer..."
                                value={otherAnswers[qId] || ''}
                                onChange={(e) => handleOtherTextChange(qId, e.target.value, currentQ.type)}
                                style={{
                                  width: '100%',
                                  height: '56px',
                                  padding: '0 24px',
                                  backgroundColor: '#FAFAFA',
                                  border: '2px solid #6C3BFF',
                                  borderRadius: '0px',
                                  fontSize: '18px',
                                  fontFamily: 'inherit',
                                  color: '#111111',
                                  outline: 'none',
                                  boxShadow: '0 0 0 4px rgba(108,59,255,0.1)'
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

              {questions[currentStep - 1].type === 'long-text' && (
                <textarea
                  value={answers[questions[currentStep - 1].id] || ''}
                  onChange={(e) => handleTextChange(questions[currentStep - 1].id, e.target.value)}
                  placeholder={questions[currentStep - 1].placeholder}
                  style={{
                    width: '100%',
                    height: '240px',
                    padding: '24px',
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #EAEAEA',
                    borderRadius: '0px',
                    fontSize: '18px',
                    fontFamily: 'inherit',
                    color: '#111111',
                    resize: 'none',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6C3BFF';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(108,59,255,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#EAEAEA';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              )}
            </motion.div>
          )}

          {/* STEP 12: Contact Details */}
          {currentStep === contactStep && (
            <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ maxWidth: '960px', width: '100%', maxHeight: '100%', overflowY: 'auto', paddingRight: '8px', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#111111', lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: '16px' }}>
                Almost done
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '8px' }}>Full Name *</label>
                  <input 
                    type="text" 
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo(prev => ({...prev, name: e.target.value}))}
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '8px' }}>Email *</label>
                  <input 
                    type="email" 
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo(prev => ({...prev, email: e.target.value}))}
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '8px' }}>Company / Organisation (Optional)</label>
                  <input 
                    type="text" 
                    value={contactInfo.company}
                    onChange={(e) => setContactInfo(prev => ({...prev, company: e.target.value}))}
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#111111', marginBottom: '8px' }}>LinkedIn Profile (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://linkedin.com/in/..."
                    value={contactInfo.linkedin}
                    onChange={(e) => setContactInfo(prev => ({...prev, linkedin: e.target.value}))}
                    style={{
                      ...inputStyle,
                      borderColor: (contactInfo.linkedin.trim() !== '' && !isValidUrl(contactInfo.linkedin)) ? '#E53E3E' : '#EAEAEA'
                    }}
                    onFocus={handleInputFocus}
                    onBlur={(e) => {
                      if (contactInfo.linkedin.trim() !== '' && !isValidUrl(contactInfo.linkedin)) {
                        e.currentTarget.style.borderColor = '#E53E3E';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229,62,62,0.1)';
                      } else {
                        handleInputBlur(e);
                      }
                    }}
                  />
                  {contactInfo.linkedin.trim() !== '' && !isValidUrl(contactInfo.linkedin) && (
                    <div style={{ color: '#E53E3E', fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>
                      Please enter a valid link (e.g. https://linkedin.com/in/username)
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 13: Thank You Screen */}
          {currentStep === thankYouStep && (
            <motion.div key="thankyou" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ maxWidth: '960px', textAlign: 'center', maxHeight: '100%', overflowY: 'auto', paddingRight: '8px', paddingBottom: '16px' }}>
               <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200, damping: 20 }}
                style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}
              >
                <CheckCircle size={80} color="#6C3BFF" strokeWidth={1.5} />
              </motion.div>
              
              <h1 style={{ fontSize: '42px', fontWeight: 900, color: '#111111', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px' }}>
                Thank You!
              </h1>
              <p style={{ fontSize: '20px', fontWeight: 500, color: '#2F2F2F', marginBottom: '24px' }}>
                Your AI Value Assessment has been successfully submitted.
              </p>
              <p style={{ fontSize: '18px', color: '#555555', marginBottom: '48px', lineHeight: 1.6 }}>
                Our team will review your responses and identify potential AI opportunities relevant to your role and organisation.<br/><br/>
                You'll hear from us soon with personalised recommendations.
              </p>

              <motion.button
                onClick={onClose}
                variants={buttonVariants}
                whileHover="hover"
                style={{
                  backgroundColor: '#6C3BFF', color: '#ffffff',
                  border: 'none', borderRadius: '0px',
                  height: '52px', padding: '0 32px',
                  fontSize: '18px', fontWeight: 600,
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center'
                }}
              >
                Return to Presentation
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer / Navigation */}
      {currentStep > 0 && currentStep < thankYouStep && (
        <footer style={{
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 60px',
          borderTop: '1px solid #EAEAEA'
        }}>
          <button 
            onClick={handleBack}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'transparent', border: 'none',
              fontSize: '16px', fontWeight: 600, color: '#555555',
              cursor: 'pointer', padding: '12px'
            }}
          >
            <ArrowLeft size={18} /> Back
          </button>

          <motion.button
            onClick={handleNext}
            disabled={isButtonDisabled}
            variants={!isButtonDisabled ? buttonVariants : {}}
            whileHover={!isButtonDisabled ? "hover" : ""}
            style={{
              backgroundColor: isButtonDisabled ? '#EAEAEA' : '#6C3BFF', 
              color: isButtonDisabled ? '#A0A0A0' : '#ffffff',
              border: 'none', borderRadius: '0px',
              height: '52px', padding: '0 32px',
              fontSize: '18px', fontWeight: 600,
              cursor: isButtonDisabled ? 'not-allowed' : 'pointer', 
              display: 'flex', alignItems: 'center', gap: '12px',
              transition: 'background-color 0.3s ease, color 0.3s ease'
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="spin-icon" /> Submitting...
              </>
            ) : (
              <>
                {currentStep === contactStep ? 'Finish' : 'Next'} {currentStep !== contactStep && <ArrowRight size={20} />}
              </>
            )}
          </motion.button>
        </footer>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  height: '56px',
  padding: '0 20px',
  backgroundColor: '#FAFAFA',
  border: '1px solid #EAEAEA',
  borderRadius: '0px',
  fontSize: '18px',
  fontFamily: 'inherit',
  color: '#111111',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
};

const handleInputFocus = (e) => {
  e.currentTarget.style.borderColor = '#6C3BFF';
  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(108,59,255,0.1)';
};

const handleInputBlur = (e) => {
  e.currentTarget.style.borderColor = '#EAEAEA';
  e.currentTarget.style.boxShadow = 'none';
};

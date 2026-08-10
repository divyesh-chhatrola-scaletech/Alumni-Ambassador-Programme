import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const questions = [
  {
    id: 1,
    type: 'single',
    question: "What best describes your current role and the work you are primarily responsible for?",
    options: ["Founder / Entrepreneur", "Business or Functional Leader", "Manager", "Professional", "Consultant", "Student or Learner", "Other"]
  },
  {
    id: 2,
    type: 'single',
    question: "Which area best reflects your current professional focus?",
    options: ["Technology & AI", "Business & Strategy", "Innovation & Transformation", "Leadership & People", "Marketing & Sales", "Operations", "Product & Service", "Other"]
  },
  {
    id: 3,
    type: 'single',
    question: "How would you describe your current relationship with AI?",
    options: ["I am curious and exploring what is possible", "I use AI occasionally in my day-to-day work", "I use AI regularly in my work", "I experiment with AI for specific business or professional needs", "AI is already part of initiatives within my organisation", "I am actively working on AI implementation", "Not yet explored"]
  },
  {
    id: 4,
    type: 'single',
    question: "Where do you currently see the most room for improvement in your work or organisation?",
    options: ["My own productivity and workload", "Team collaboration and ways of working", "Operations and processes", "Customer, member or user experience", "Products or services", "Decision-making and analysis", "Knowledge and information", "Innovation and new opportunities", "I am not sure yet", "Other"]
  },
  {
    id: 5,
    type: 'single',
    question: "Where would you most like to create more time, capacity or opportunity?",
    options: ["Focusing on higher-value work", "Spending more time with customers, members or users", "Supporting and developing people", "Working on strategy and important decisions", "Creating or improving products/services", "Exploring new ideas and opportunities", "Improving how the organisation operates", "I am not sure yet", "Other"]
  },
  {
    id: 6,
    type: 'single',
    question: "What usually gets in the way when you want to improve something in your work or organisation?",
    options: ["Not knowing where to start", "Finding the right approach", "Lack of time", "Lack of skills or expertise", "Getting others on board", "Cost or resources", "Data, privacy or security concerns", "Not seeing a clear enough benefit", "Nothing significant at the moment", "Other"]
  },
  {
    id: 7,
    type: 'single',
    question: "How are you currently addressing these areas?",
    options: ["We haven't addressed them yet", "We are discussing possible improvements", "We are already trying different approaches", "We have introduced changes and are seeing results", "We are continuously improving them", "Not applicable"]
  },
  {
    id: 8,
    type: 'single',
    question: "When you think about AI specifically, which statement is closest to where you are today?",
    options: ["I am mainly trying to understand what is possible", "I am curious about where it could be relevant to my work", "I have some ideas I would like to explore", "I am already experimenting with specific applications", "I am looking at concrete opportunities within my organisation", "We are already implementing AI in some areas", "I am not actively thinking about AI at the moment"]
  },
  {
    id: 9,
    type: 'long-text',
    question: "Looking at your work today, what is one thing you would like to make easier, better, faster or different?",
    placeholder: "Tell us about the biggest challenge or opportunity you would like to improve..."
  },
  {
    id: 10,
    type: 'long-text',
    question: "If you could change one thing about the way you or your organisation works over the next 12 months, what would you want to achieve?",
    placeholder: "Describe your ideal outcome or business goal..."
  }
];

export default function AssessmentOverlay({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0); 
  // 0: Intro, 1-10: Questions, 11: Contact, 12: Thank You
  
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', company: '', linkedin: '' });

  // Calculate progress for steps 1 to 10
  const totalQuestions = questions.length;
  let progress = 0;
  if (currentStep > 0 && currentStep <= totalQuestions) {
    progress = (currentStep / totalQuestions) * 100;
  } else if (currentStep > totalQuestions) {
    progress = 100;
  }

  // Disable Next button logic
  let nextDisabled = false;
  if (currentStep > 0 && currentStep <= totalQuestions) {
    const q = questions[currentStep - 1];
    if (q.type === 'single' && !answers[q.id]) nextDisabled = true;
    if (q.type === 'long-text' && (!answers[q.id] || answers[q.id].trim() === '')) nextDisabled = true;
  }
  if (currentStep === 11) {
    if (!contactInfo.name.trim() || !contactInfo.email.trim()) nextDisabled = true;
  }

  // Handle Enter key for proceeding if not disabled (and not in long text where enter is newline)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !nextDisabled && currentStep > 0 && currentStep <= 11) {
        const q = questions[currentStep - 1];
        // Allow newline in textarea instead of submitting, unless they use ctrl/cmd+enter
        if (q && q.type === 'long-text' && !e.metaKey && !e.ctrlKey) return;
        
        // Prevent default form submission behaviour
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextDisabled, currentStep, contactInfo]);

  const handleNext = () => {
    if (!nextDisabled) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0 && currentStep !== 12) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const setAnswer = (questionId, value) => {
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
      zIndex: 100, // Ensure it's over everything in App
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
        justifyContent: 'space-between',
        borderBottom: currentStep > 0 && currentStep < 12 ? '1px solid #EAEAEA' : 'none'
      }}>
        {currentStep > 0 && currentStep < 12 && (
          <>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#111111' }}>
              {currentStep <= totalQuestions ? `Question ${currentStep} of ${totalQuestions}` : (currentStep === 11 ? 'Contact Details' : '')}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, maxWidth: '400px', marginLeft: 'auto' }}>
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
          </>
        )}
      </header>

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <AnimatePresence mode="wait">
          
          {/* STEP 0: Intro */}
          {currentStep === 0 && (
            <motion.div key="intro" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ maxWidth: '960px', textAlign: 'center', maxHeight: '100%', overflowY: 'auto', paddingRight: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#6C3BFF', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Assessment
              </div>
              <h1 style={{ fontSize: '64px', fontWeight: 900, color: '#111111', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '24px' }}>
                Realise Value with AI
              </h1>
              <p style={{ fontSize: '24px', fontWeight: 500, color: '#2F2F2F', marginBottom: '16px' }}>
                Discover where AI can create the greatest value for you and your organisation.
              </p>
              <p style={{ fontSize: '18px', color: '#555555', marginBottom: '48px', lineHeight: 1.6 }}>
                This assessment takes approximately 3–5 minutes and will help identify opportunities for productivity, innovation and AI implementation.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
                <motion.button
                  onClick={handleNext}
                  variants={buttonVariants}
                  whileHover="hover"
                  style={{
                    backgroundColor: '#6C3BFF', color: '#ffffff',
                    border: 'none', borderRadius: '0px',
                    height: '52px', padding: '0 32px',
                    fontSize: '18px', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px'
                  }}
                >
                  Start Assessment <ArrowRight size={20} />
                </motion.button>
                <div style={{ fontSize: '14px', color: '#777777', fontWeight: 500 }}>
                  Estimated time: 3–5 Minutes
                </div>
              </div>
            </motion.div>
          )}

          {/* STEPS 1-10: Questions */}
          {currentStep > 0 && currentStep <= totalQuestions && (
            <motion.div key={`q-${currentStep}`} variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ maxWidth: '960px', width: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#111111', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '48px', flexShrink: 0 }}>
                {questions[currentStep - 1].question}
              </h2>
              
              {questions[currentStep - 1].type === 'single' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flexShrink: 1, minHeight: 0, paddingRight: '8px', paddingBottom: '16px' }}>
                  {questions[currentStep - 1].options.map((opt, idx) => {
                    const isSelected = answers[questions[currentStep - 1].id] === opt;
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => setAnswer(questions[currentStep - 1].id, opt)}
                        whileHover={{ scale: 1.01, backgroundColor: isSelected ? '#F5F3FF' : '#FAFAFA' }}
                        whileTap={{ scale: 0.99 }}
                        style={{
                          textAlign: 'left',
                          width: '100%',
                          padding: '24px 32px',
                          backgroundColor: isSelected ? '#F5F3FF' : '#ffffff',
                          border: isSelected ? '2px solid #6C3BFF' : '1px solid #EAEAEA',
                          borderRadius: '0px',
                          fontSize: '18px',
                          fontWeight: 'normal',
                          color: isSelected ? '#6C3BFF' : '#2F2F2F',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        {opt}
                        {isSelected && <CheckCircle size={20} color="#6C3BFF" />}
                      </motion.button>
                    )
                  })}
                </div>
              )}

              {questions[currentStep - 1].type === 'long-text' && (
                <textarea
                  value={answers[questions[currentStep - 1].id] || ''}
                  onChange={(e) => setAnswer(questions[currentStep - 1].id, e.target.value)}
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

          {/* STEP 11: Contact Details */}
          {currentStep === 11 && (
            <motion.div key="contact" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ maxWidth: '960px', width: '100%', maxHeight: '100%', overflowY: 'auto', paddingRight: '8px', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#111111', lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '16px' }}>
                Almost done
              </h2>
              <p style={{ fontSize: '18px', color: '#555555', marginBottom: '48px' }}>
                Where should we send your personalised AI opportunity summary?
              </p>

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
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 12: Thank You Screen */}
          {currentStep === 12 && (
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
      {currentStep > 0 && currentStep < 12 && (
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
            disabled={nextDisabled}
            variants={!nextDisabled ? buttonVariants : {}}
            whileHover={!nextDisabled ? "hover" : ""}
            style={{
              backgroundColor: nextDisabled ? '#EAEAEA' : '#6C3BFF', 
              color: nextDisabled ? '#A0A0A0' : '#ffffff',
              border: 'none', borderRadius: '0px',
              height: '52px', padding: '0 32px',
              fontSize: '18px', fontWeight: 600,
              cursor: nextDisabled ? 'not-allowed' : 'pointer', 
              display: 'flex', alignItems: 'center', gap: '12px',
              transition: 'background-color 0.3s ease, color 0.3s ease'
            }}
          >
            {currentStep === 11 ? 'Finish' : 'Next'} {currentStep !== 11 && <ArrowRight size={20} />}
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

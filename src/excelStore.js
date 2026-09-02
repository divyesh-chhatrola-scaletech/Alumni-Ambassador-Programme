const GOOGLE_SCRIPT_URL = 'https';

export async function submitAssessment(answers, contactInfo, questions) {
  try {
    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('PASTE_YOUR')) {
      throw new Error('Google Apps Script URL is not configured.');
    }

    /**
     * Prepare answers
     */
    const formattedAnswers = questions.map(function (question) {
      let rawVal = answers[question.id] ?? '';
      let formattedValue = Array.isArray(rawVal) ? rawVal.join(', ') : rawVal;

      return {
        questionId: question.id,
        question: question.question,
        value: formattedValue,
      };
    });

    /**
     * Submission data
     */
    const submission = {
      submittedAt: new Date().toISOString(),
      name: contactInfo?.name?.trim() || '',
      email: contactInfo?.email?.trim() || '',
      phone: contactInfo?.phone?.trim() || '',
      linkedin: contactInfo?.linkedin?.trim() || '',
      answers: formattedAnswers,
    };

    console.log('Submitting assessment:', submission);

    /**
     * Send to Google Apps Script
     */
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = await response.json();

    console.log('Google Apps Script response:', result);

    if (!result.success) {
      throw new Error(result.message || 'Failed to save submission.');
    }

    return {
      success: true,
      message: 'Assessment submitted successfully.',
    };
  } catch (error) {
    console.error('Assessment submission failed:', error);

    return {
      success: false,
      message:
        error.message ||
        'Something went wrong while submitting the assessment.',
    };
  }
}

export async function saveSubmissionToExcelStore(
  answers,
  contactInfo,
  questions,
) {
  return await submitAssessment(answers, contactInfo, questions);
}

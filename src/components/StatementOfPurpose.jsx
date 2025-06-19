import React, { useState, useEffect } from "react";
import SuccessPopup from './Popup';

const StatementOfPurpose = ({ formData, setFormData, nextStep }) => {
  const questions = [
    {
      id: "q1",
      text: "1. Tell me about a time you were asked to do something you had never done before. How did you react? What did you learn?",
    },
    {
      id: "q2",
      text: "2. Tell me about the last time something significant didn’t go according to plan at work. What was your role? What was the outcome?",
    },
    {
      id: "q3",
      text: "3. What are the three things that are most important to you in a job?",
    },
  ];

  const wordLimit = 300;

  const [answers, setAnswers] = useState(formData.statementOfPurpose || {
    q1: "",
    q2: "",
    q3: "",
  });

  const [isValid, setIsValid] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // ✅ Popup state

  const wordCount = (text) =>
    (text || "").trim().split(/\s+/).filter(Boolean).length;

  useEffect(() => {
    const allAnswered = questions.every(
      (q) =>
        answers[q.id] &&
        wordCount(answers[q.id]) > 0 &&
        wordCount(answers[q.id]) <= wordLimit
    );
    setIsValid(allAnswered);
  }, [answers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (wordCount(value) <= wordLimit) {
      setAnswers({ ...answers, [name]: value });
    }
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      statementOfPurpose: {
        q1: answers.q1,
        q2: answers.q2,
        q3: [answers.q3],
      },
    });
    setShowPopup(true); // ✅ Show popup
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    nextStep(); // ✅ Move to InterviewAvailability step
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-32 px-8">
        <p className="text-sm text-blue-600 mb-6">
          Please answer all the following questions. Each answer must be under 300 words.
        </p>

        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id}>
              <label className="block font-medium mb-1">{q.text}</label>
              <textarea
                name={q.id}
                value={answers[q.id] || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded resize-none h-40"
                placeholder="Write your answer here..."
              />
              <div className="text-sm text-gray-500 mt-1">
                {wordCount(answers[q.id])} / {wordLimit} words
              </div>
            </div>
          ))}
        </div>

        <div className="text-right mt-6">
          <button
            onClick={handleNext}
            disabled={!isValid}
            className={`px-6 py-2 rounded text-white ${isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            NEXT
          </button>
        </div>
      </div>

      {/* ✅ Success Popup */}
      {showPopup && (
        <SuccessPopup
          message="Statement of Purpose submitted!"
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
};

export default StatementOfPurpose;

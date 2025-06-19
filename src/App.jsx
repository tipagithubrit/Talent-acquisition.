import React, { useState } from 'react';
import BasicDetails from './components/BasicDetails';
import DocumentCollection from './components/DocumentCollection';
import StatementOfPurpose from './components/StatementOfPurpose';
import InterviewAvailability from './components/InterviewAvailability';
import Sidebar from './components/Sidebar';
import ProgressBar from './components/ProgressBar'; // ✅ import it

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    basicDetails: {},
    documents: {},
    sop: {},
    interviewAvailability: {},
  });

  const resetToFirstStep = () => {
    setFormData({
      basicDetails: {},
      documents: {},
      sop: {},
      interviewAvailability: {},
    });
    setStep(0);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <BasicDetails
            formData={formData}
            setFormData={(data) => setFormData((prev) => ({ ...prev, basicDetails: data }))}
            nextStep={() => setStep(1)}
          />
        );
      case 1:
        return (
          <DocumentCollection
            formData={formData}
            setFormData={(data) => setFormData((prev) => ({ ...prev, documents: data }))}
            nextStep={() => setStep(2)}
          />
        );
      case 2:
        return (
          <StatementOfPurpose
            formData={formData}
            setFormData={(data) => setFormData((prev) => ({ ...prev, sop: data }))}
            nextStep={() => setStep(3)}
          />
        );
      case 3:
        return (
          <InterviewAvailability
            formData={formData}
            setFormData={(data) => setFormData((prev) => ({ ...prev, interviewAvailability: data }))}
            resetToFirstStep={resetToFirstStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar step={step} setStep={setStep} />
      <div className="flex-1">
        <ProgressBar step={step} /> 
        <main className="w-3/4 p-6 pt-[100px]">{renderStep()}</main>
      </div>
    </div>
  );
};

export default App;

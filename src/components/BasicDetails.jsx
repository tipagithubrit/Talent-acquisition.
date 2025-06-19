import React, { useState, useEffect } from 'react';
import { submitApplication } from '../utils/api';
import SuccessPopup from './Popup';

const BasicDetails = ({ formData, setFormData, nextStep }) => {
  const [name, setName] = useState(formData.basicDetails.name || '');
  const [email, setEmail] = useState(formData.basicDetails.email || '');
  const [dob, setDob] = useState(formData.basicDetails.dateOfBirth || '');
  const [contact, setContact] = useState(formData.basicDetails.mobileNumber || '');
  const [isValid, setIsValid] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const validContact = /^\d{10}$/.test(contact);
    setIsValid(name && validEmail && dob && validContact);
  }, [name, email, dob, contact]);

  const handleNext = async () => {
    const basicDetails = {
      name,
      email,
      mobileNumber: contact,
      dateOfBirth: dob,
    };

    const payload = {
      basicDetails,
      documents: {
        class10Marksheet: '',
        class12Marksheet: '',
        graduationMarksheet: '',
        postGraduationMarksheet: '',
        resume: '',
        recommendationLetter: '',
        salarySlips: '',
        others: '',
      },
      statementOfPurpose: {
        q1: '',
        q2: '',
        q3: [''],
      },
      interviewAvailability: {
        email: '',
        location: '',
        interviewDate: '',
        interviewTime: '',
        timeZone: '',
        interviewMedium: '',
      },
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await submitApplication(payload);
      console.log('Submitted successfully:', response);
      setFormData({ ...formData, basicDetails });
      setShowPopup(true); // ✅ Show popup on success
    } catch (err) {
      console.error('Submission failed:', err.response?.data || err.message);
      alert('Error submitting application.');
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    nextStep(); // ✅ Proceed to next step only after popup is closed
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="h-28" />
      <div className="bg-white p-8 rounded-xl shadow max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Name of the Enquiry Form</h2>
        <p className="text-sm text-blue-600 mb-6">
          Provide the following information to process your application
        </p>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">1. Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">2. Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Example - user@gmail.com"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">3. Date of Birth <span className="text-red-500">*</span></label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">4. Contact No <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              maxLength={10}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your 10 digit contact no"
            />
          </div>
        </div>

        <div className="text-right mt-6">
          <button
            onClick={handleNext}
            disabled={!isValid}
            className={`px-6 py-2 rounded-md text-white font-medium ${isValid
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            NEXT
          </button>
        </div>
      </div>


      {showPopup && (
        <SuccessPopup message="Basic Details Submitted Successfully!" onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default BasicDetails;

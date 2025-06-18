import React, { useState } from "react";
import { submitApplication } from "../utils/api";

const InterviewAvailability = ({ formData, setFormData, resetToFirstStep }) => {
  const [form, setForm] = useState({
    email: "",
    location: "",
    interviewDate: "",
    interviewTime: "",
    timeZone: "",
    interviewMedium: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const finalData = {
      ...formData,
      interviewAvailability: {
        ...form
      },
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await submitApplication(finalData);
      console.log("✅ Submitted:", response);
      alert("🎉 Your application has been submitted successfully!");

      setFormData({}); // Clear all form data
      resetToFirstStep(); // Go to first page
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-white py-4 px-8 shadow fixed top-0 left-0 w-full z-10">
        <h1 className="text-xl font-semibold mb-2">Interview Availability</h1>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 text-blue-600 font-medium">
            <div className="w-4 h-4 rounded-full bg-blue-600" />
            <span>Form Selection</span>
          </div>
          <div className="w-4 h-0.5 bg-gray-300 flex-grow" />
          <div className="text-gray-400">Set up</div>
          <div className="w-4 h-0.5 bg-gray-300 flex-grow" />
          <div className="text-gray-400">Form Creation</div>
          <div className="w-4 h-0.5 bg-gray-300 flex-grow" />
          <div className="text-gray-400">Review</div>
        </div>
      </div>

      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold mb-1">Interview Form</h2>
            <p className="text-sm text-blue-500 mb-6">Provide your availability</p>

            <div className="space-y-6">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border p-2 rounded"
              />

              <input
                type="date"
                name="interviewDate"
                value={form.interviewDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="time"
                name="interviewTime"
                value={form.interviewTime}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <select
                name="timeZone"
                value={form.timeZone}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Time Zone</option>
                <option>GMT +5:30 (India Standard Time)</option>
                <option>GMT +1:00 (UK)</option>
                <option>GMT -5:00 (US Eastern)</option>
              </select>

              <select
                name="interviewMedium"
                value={form.interviewMedium}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Interview Medium</option>
                <option>Google Meet</option>
                <option>Zoom</option>
                <option>Phone Call</option>
                <option>In-person</option>
              </select>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewAvailability;

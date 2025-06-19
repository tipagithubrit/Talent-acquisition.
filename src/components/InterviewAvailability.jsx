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
        ...form,
      },
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await submitApplication(finalData);
      console.log("Submitted:", response);
      alert("Your application has been submitted successfully!");

      setFormData({});
      resetToFirstStep();
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 p-8 overflow-auto">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold mb-1">Interview Form</h2>
          <p className="text-sm text-blue-500 mb-6">Provide your availability</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">1. Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">2. Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">3. Interview Date</label>
              <input
                type="date"
                name="interviewDate"
                value={form.interviewDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">4. Interview Time</label>
              <input
                type="time"
                name="interviewTime"
                value={form.interviewTime}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">5. Time Zone</label>
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">6. Interview Medium</label>
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
  );
};

export default InterviewAvailability;

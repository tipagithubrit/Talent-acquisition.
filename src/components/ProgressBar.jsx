import React from "react";

const ProgressBar = ({ step }) => {
  const steps = ["Form Selection", "Set up", "Form Creation", "Review"];

  return (
    <div className="bg-white py-4 px-8 shadow fixed top-0 left-0 w-full z-10">
      <h1 className="text-xl font-semibold mb-2">
        {steps[step] || "Talent Acquisition Form"}
      </h1>
      <div className="flex items-center space-x-8">
        {steps.map((label, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex items-center space-x-2 ${
                step >= index ? "text-blue-600 font-medium" : "text-gray-400"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full ${
                  step >= index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
              <span>{label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-4 h-0.5 ${
                  step > index ? "bg-blue-600" : "bg-gray-300"
                } flex-grow`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

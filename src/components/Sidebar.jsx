import React from 'react';

const Sidebar = ({ step, setStep }) => {
  const menuItems = [
    {
      label: 'New Form',
      description: 'Start creating a new Form with the wide options of fields.',
      clickable: false,
    },
    {
      label: 'Details Collection',
      description: 'Collect candidate information like education, work experience, and contact.',
      clickable: true,
    },
    {
      label: 'Document Collection',
      description: 'Upload required documents like ID, resume, etc.',
      clickable: true,
    },
    {
      label: 'Statement of Purpose',
      description: 'Answer key questions for SOP.',
      clickable: true,
    },
    {
      label: 'Interview Availability',
      description: 'Provide availability and time slot preferences.',
      clickable: true,
    },
  ];

  return (
    <aside className="w-1/4 p-6 bg-white shadow-md pt-[100px]">
      <h2 className="font-semibold text-lg mb-4">Explore the following Templates:</h2>
      <div className="space-y-4">
        {menuItems.map((item, index) => {
          const isStep = item.clickable;
          const stepIndex = index - 1;
          return (
            <div
              key={index}
              onClick={isStep ? () => setStep(stepIndex) : undefined}
              className={`
                p-4 border rounded-lg shadow-sm transition-all duration-200
                ${isStep ? 'cursor-pointer hover:shadow-md' : 'bg-gray-50 cursor-default'}
                ${step === stepIndex && isStep ? 'bg-blue-100 border-blue-500' : 'bg-white'}
              `}
            >
              <h3 className="font-medium text-gray-800">{item.label}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;

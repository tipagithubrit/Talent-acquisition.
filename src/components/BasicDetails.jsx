// import React, { useState, useEffect } from 'react';
// import { submitApplication } from '../utils/api';


// const BasicDetails = ({ formData, setFormData, nextStep }) => {
//   const [name, setName] = useState(formData.basicDetails.name || '');
//   const [email, setEmail] = useState(formData.basicDetails.email || '');
//   const [dob, setDob] = useState(formData.basicDetails.dob || '');
//   const [contact, setContact] = useState(formData.basicDetails.contact || '');
//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     const validEmail = /\S+@\S+\.\S+/.test(email);
//     const validContact = /^\d{10}$/.test(contact);
//     setIsValid(name && validEmail && dob && validContact);
//   }, [name, email, dob, contact]);

//   // const handleNext = () => {
//   //   setFormData({
//   //     ...formData,
//   //     basicDetails: { name, email, dob, contact }
//   //   });
//   //   nextStep();
//   // };
//   const handleNext = async () => {
//     const payload = {
//       basicDetails: {
//         name,
//         email,
//         mobileNumber: contact,
//         dateOfBirth: dob,
//       },
//       documents: {
//         class10Marksheet: '',
//         class12Marksheet: '',
//         graduationMarksheet: '',
//         postGraduationMarksheet: '',
//         resume: '',
//         recommendationLetter: '',
//         salarySlips: '',
//         others: '',
//       },
//       statementOfPurpose: {
//         q1: '',
//         q2: '',
//       },
//       interviewAvailability: '',
//     };

//     try {
//       const response = await submitApplication(payload);
//       console.log('✅ Submitted successfully:', response);

//       setFormData({
//         ...formData,
//         basicDetails: payload.basicDetails,
//       });

//       nextStep();
//     } catch (err) {
//       console.error('❌ Submission failed:', err.response?.data || err.message);
//       alert('Error submitting application.');
//     }
//   };



//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       {/* Top Progress Bar */}
//       <div className="bg-white py-4 px-8 shadow fixed top-0 left-0 w-full z-10">
//         <h1 className="text-xl font-semibold mb-2">Details Collection </h1>
//         <div className="flex items-center space-x-8">
//           <div className="flex items-center space-x-2 text-blue-600 font-medium">
//             <div className="w-4 h-4 rounded-full bg-blue-600" />
//             <span>Form Selection</span>
//           </div>
//           <div className="w-4 h-0.5 bg-gray-300 flex-grow" />
//           <div className="text-gray-400">Set up</div>
//           <div className="w-4 h-0.5 bg-gray-300 flex-grow" />
//           <div className="text-gray-400">Form Creation</div>
//           <div className="w-4 h-0.5 bg-gray-300 flex-grow" />
//           <div className="text-gray-400">Review</div>
//         </div>
//       </div>

//       {/* Spacer to offset fixed header */}
//       <div className="h-28" />

//       {/* Form Content */}
//       <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
//         <h2 className="text-xl font-semibold mb-2">Name of the Enquiry Form</h2>
//         <p className="text-sm text-blue-600 mb-6">
//           Provide the following information to process your application
//         </p>

//         <div className="space-y-4">
//           <div>
//             <label className="block font-medium">1. Name*</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//               placeholder="Enter your name"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">2. Email*</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//               placeholder="Example - user@gmail.com"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">3. Date of Birth</label>
//             <input
//               type="date"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">4. Contact No</label>
//             <input
//               type="text"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//               placeholder="Enter your 10 digit contact no"
//             />
//           </div>
//         </div>

//         <div className="text-right mt-6">
//           <button
//             onClick={handleNext}
//             disabled={!isValid}
//             className={`px-6 py-2 rounded text-white ${isValid
//               ? 'bg-blue-600 hover:bg-blue-700'
//               : 'bg-gray-400 cursor-not-allowed'
//               }`}
//           >
//             NEXT
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BasicDetails;



import React, { useState, useEffect } from 'react';
import { submitApplication } from '../utils/api';



const BasicDetails = ({ formData, setFormData, nextStep }) => {
  const [name, setName] = useState(formData.basicDetails.name || '');
  const [email, setEmail] = useState(formData.basicDetails.email || '');
  const [dob, setDob] = useState(formData.basicDetails.dateOfBirth || '');
  const [contact, setContact] = useState(formData.basicDetails.mobileNumber || '');
  const [isValid, setIsValid] = useState(false);

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
        q3: [''], // Must be an array
      },
      interviewAvailability: {
        email: '',
        location: '',
        interviewDate: '',
        interviewTime: '',
        timeZone: '',
        interviewMedium: '',
      },
      submittedAt: new Date().toISOString(), // Required by API
    };

    try {
      const response = await submitApplication(payload);
      console.log(' Submitted successfully:', response);

      setFormData({
        ...formData,
        basicDetails,
      });

      nextStep();
    } catch (err) {
      console.error(' Submission failed:', err.response?.data || err.message);
      alert('Error submitting application.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-white py-4 px-8 shadow fixed top-0 left-0 w-full z-10">
        <h1 className="text-xl font-semibold mb-2">Details Collection </h1>
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

      <div className="h-28" />

      <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Name of the Enquiry Form</h2>
        <p className="text-sm text-blue-600 mb-6">
          Provide the following information to process your application
        </p>

        <div className="space-y-4">
          <div>
            <label className="block font-medium">1. Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block font-medium">2. Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Example - user@gmail.com"
            />
          </div>

          <div>
            <label className="block font-medium">3. Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium">4. Contact No</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter your 10 digit contact no"
            />
          </div>
        </div>

        <div className="text-right mt-6">
          <button
            onClick={handleNext}
            disabled={!isValid}
            className={`px-6 py-2 rounded text-white ${isValid
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;

import React, { useState, useEffect } from "react";

const DocumentCollection = ({ formData, setFormData, nextStep }) => {
  const [docs, setDocs] = useState(formData.documents || {});
  const [isValid, setIsValid] = useState(false);
  const [uploadingField, setUploadingField] = useState("");

  // Define required fields only
  const requiredFields = [
    "10th Marksheet",
    "12th Marksheet",
    "Graduation",
    "Post Graduation",
    "Offer Letter",
    "Bank Statement"
  ];

  // All file fields (include optional ones too)
  const allFileFields = [
    "10th Marksheet",
    "12th Marksheet",
    "Graduation",
    "Post Graduation",
    "Offer Letter",
    "Salary Slips",
    "Bank Statement",
    "Increment Letter (if any)",
    "Other (if any)"
  ];

  useEffect(() => {
    const allRequiredUploaded = requiredFields.every(
      (field) => docs[field] && docs[field].url
    );
    setIsValid(allRequiredUploaded);
  }, [docs]);

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    setUploadingField(name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://assessments-xhy0.onrender.com/upload-file", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setDocs((prev) => ({
          ...prev,
          [name]: {
            url: result.url,
            fileId: result.fileId,
          },
        }));
      } else {
        alert(`Upload failed for ${name}: ${result.message}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert(`Error uploading ${name}`);
    } finally {
      setUploadingField("");
    }
  };

  const handleNext = () => {
    setFormData({
      ...formData,
      documents: docs
    });
    nextStep();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="h-28" />
      
      <div className="bg-white p-8 shadow-sm w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">Upload Your Documents</h2>
        <p className="text-sm text-blue-600 mb-6">Only specific documents are mandatory</p>

        <div className="space-y-6">
          {allFileFields.map((field, index) => (
            <div key={index}>
              <label className="block font-medium mb-1">
                {index + 1}. {field} {requiredFields.includes(field) && <span className="text-red-500">*</span>}
              </label>
              <input
                type="file"
                name={field}
                onChange={handleFileChange}
                className="w-full border px-3 py-2 rounded bg-white"
              />
              {uploadingField === field && <p className="text-sm text-gray-500">Uploading...</p>}
              {docs[field]?.url && (
                <p className="text-sm text-green-600">Uploaded ✅</p>
              )}
            </div>
          ))}
        </div>

        <div className="text-right mt-8">
          <button
            onClick={handleNext}
            disabled={!isValid}
            className={`px-6 py-2 rounded text-white transition ${isValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCollection;

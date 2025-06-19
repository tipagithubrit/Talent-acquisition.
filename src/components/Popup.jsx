const SuccessPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm w-full">
        <p className="text-green-600 font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;

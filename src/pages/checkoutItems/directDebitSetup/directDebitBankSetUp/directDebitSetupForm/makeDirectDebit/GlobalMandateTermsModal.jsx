export const GlobalMandateTermsModal = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Global Mandate Terms</h2>
        <p className="mb-4">
          By setting up a direct debit, you agree to our Global Standing Mandate
          Terms.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

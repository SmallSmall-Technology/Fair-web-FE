export const DebitDirectMandateTermsModal = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">
          Direct Debit Mandate Terms
        </h2>
        <p className="mb-4">
          By setting up a direct debit, you agree to our Direct Debit Mandate
          Terms and Conditions. Please ensure you have read and understood all
          obligations before proceeding.
        </p>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

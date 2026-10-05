function InfoModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
        <p className="text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;

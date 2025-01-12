const Confirmation = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-4 sm:p-8 border w-72 sm:w-96 rounded-lg bg-blue-100 shadow-xl">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900">{message}!</h3>
  
            <div className="flex justify-center mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 cursor-pointer bg-blue-400 text-black text-sm md:text-base font-medium rounded-md shadow-sm hover:bg-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Confirmation;
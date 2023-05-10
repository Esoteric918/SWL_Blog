import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  const cleanup = () => {
    document.removeEventListener("keydown", handleKeyDown);
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return cleanup;
  });

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  if (!isOpen) return null;


  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        ></span>

        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mt-3 sm:mt-5">
              <div className="mt-2">{children}</div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-gray-200 text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
};

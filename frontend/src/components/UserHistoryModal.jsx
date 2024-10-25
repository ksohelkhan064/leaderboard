import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md  max-h-[70vh] flex flex-col relative overflow-hidden">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {children}
        </div>

        
        <div className="flex justify-start mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
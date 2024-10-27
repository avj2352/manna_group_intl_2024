import React, { ReactNode } from 'react';

interface ICommonAppDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const CommonAppDialog: React.FC<ICommonAppDialogProps> = ({ title, open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-lg">
        <div className="flex justify-between">
            <h3 className="text-xl font-bold text-brand-base">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 transition duration-150 ease-in-out hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default CommonAppDialog;
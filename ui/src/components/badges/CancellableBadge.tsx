import { useState, FC } from 'react';
import { X } from 'lucide-react';

type ICancelableBadgeProps = {
  text: string,
  color?: 'primary' | 'secondary' | undefined,
  meta?: unknown | undefined,
  onCancel: (data: unknown) => void,
}

const CancelableBadge: FC<ICancelableBadgeProps> = ({ text, color = 'blue', meta, onCancel }) => {
  const [isVisible, setIsVisible] = useState(true);

  //..evt handlers
  const handleCancel = () => {
    setIsVisible(false);  
    if (!Boolean(meta)) return;
    onCancel(meta);
  };

  if (!isVisible) return null;

  return (
    <span className={`m-2 border border-secondary inline-flex items-center px-2 
      py-1 rounded-full text-xs font-bold bg-secondary text-gray-700 shadow-md`}>
      {text}
      <button
        onClick={handleCancel}
        className={`ml-1 text-${color}-400 hover:text-${color}-600 focus:outline-none`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
};

export default CancelableBadge;

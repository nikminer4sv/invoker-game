import React from 'react';
import SpellIcon from './SpellIcon';

interface InvokeButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  combinationLength: number;
  pressed?: boolean;
}

const InvokeButton: React.FC<InvokeButtonProps> = ({ onClick, isDisabled, pressed }) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        w-16 h-16 rounded-full 
        transition-all duration-200 transform hover:scale-105
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        flex items-center justify-center
        bg-black/30
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        shadow-lg hover:shadow-xl
        ${pressed ? 'orb-press' : ''}
      `}
    >
      <span className="flex items-center justify-center w-16 h-16 rounded-full overflow-hidden">
        <SpellIcon icon="/images/spells/Invoke_icon.webp" size="xxl" />
      </span>
    </button>
  );
};

export default InvokeButton; 
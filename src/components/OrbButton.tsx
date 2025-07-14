import React from 'react';
import { Orb } from '../types/game';
import SpellIcon from './SpellIcon';

interface OrbButtonProps {
   orb: Orb;
   onClick: (orb: Orb) => void;
   isActive: boolean;
   isDisabled: boolean;
   pressed?: boolean;
}

const orbIcons: Record<Orb, string> = {
   Q: '/images/spells/Quas_icon.webp',
   W: '/images/spells/Wex_icon.webp',
   E: '/images/spells/Exort_icon.webp',
};

const OrbButton: React.FC<OrbButtonProps> = ({ orb, onClick, isActive, isDisabled, pressed }) => {
   const getOrbColor = (orb: Orb) => {
      switch (orb) {
         case 'Q':
            return 'bg-blue-500 hover:bg-blue-600 border-blue-400';
         case 'W':
            return 'bg-purple-500 hover:bg-purple-600 border-purple-400';
         case 'E':
            return 'bg-orange-500 hover:bg-orange-600 border-orange-400';
         default:
            return 'bg-gray-500 hover:bg-gray-600 border-gray-400';
      }
   };

   return (
      <button
         onClick={() => onClick(orb)}
         disabled={isDisabled}
         className={`
        w-16 h-16 rounded-full
        transition-all duration-200 transform hover:scale-105
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        flex items-center justify-center
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        shadow-lg hover:shadow-xl
        ${pressed ? 'orb-press' : ''}
      `}
      >
         <span className={`border-2 rounded-full bg-black/30 flex ${getOrbColor(orb)} items-center justify-center w-16 h-16 overflow-hidden`}>
            <SpellIcon icon={orbIcons[orb]} size="xxl" />
         </span>
      </button>
   );
};

export default OrbButton; 
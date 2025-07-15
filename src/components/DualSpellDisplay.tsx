import React from 'react';
import { Spell } from '../types/game';
import SpellIcon from './SpellIcon';

const orbIcons: Record<string, string> = {
   Q: '/images/spells/Quas_icon.webp',
   W: '/images/spells/Wex_icon.webp',
   E: '/images/spells/Exort_icon.webp',
};

interface DualSpellDisplayProps {
   currentSpell: Spell | null;
   nextSpell: Spell | null;
   userCombination: string[];
}

const DualSpellDisplay: React.FC<DualSpellDisplayProps> = ({ currentSpell, nextSpell, userCombination }) => {
   if (!currentSpell) {
      return (
         <div className="text-center p-8">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-white mb-2">Invoker Game</h2>
            <p className="text-gray-300">Press Start to begin casting spells!</p>
         </div>
      );
   }

   // Показываем всегда 3 слота, даже если комбинация пустая
   const displayOrbs = Array.from({ length: 3 }).map((_, index) => {
      const orb = userCombination[userCombination.length - 3 + index];
      return (
         <span
            key={index}
            className={`w-10 h-10 rounded-full flex items-center justify-center bg-black/30 border-2 overflow-hidden ${orb === 'Q' ? 'border-blue-400' :
               orb === 'W' ? 'border-purple-400' :
                  orb === 'E' ? 'border-orange-400' : 'border-gray-600'
               }`}
         >
            {orb ? <SpellIcon icon={orbIcons[orb]} className="w-8 h-8" /> : '?'}
         </span>
      );
   });

   return (
      <div className="text-center p-6 bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col items-center justify-center relative">
         {/* Следующее заклинание (слева, внутри рамки) */}
         {nextSpell && (
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
               <div className="flex flex-col justify-center items-center">
                  <h2 className="text-xl font-bold text-white mb-2">Next spell</h2>
                  <SpellIcon icon={nextSpell.icon} size="xxl" className="w-24 h-24" />
               </div>
            </div>
         )}

         {/* Текущее заклинание (по центру) */}
         <div className="flex flex-col items-center justify-center">
            <div className="mb-6 flex justify-center items-center w-full">
               <SpellIcon icon={currentSpell.icon} size="xl" className="w-24 h-24 md:w-32 md:h-32" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{currentSpell.name}</h2>
            <div className="flex justify-center gap-2 mb-2">
               {displayOrbs}
            </div>
         </div>
      </div>
   );
};

export default DualSpellDisplay; 
import React from 'react';
import { SPELLS } from '../data/spells';
import SpellIcon from './SpellIcon';

const orbIcons: Record<string, string> = {
   Q: '/images/spells/Quas_icon.webp',
   W: '/images/spells/Wex_icon.webp',
   E: '/images/spells/Exort_icon.webp',
};

const SpellsList: React.FC = () => {
   return (
      <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 h-full flex flex-col max-h-[59vh]">
         <h3 className="text-xl font-bold text-white mb-3 text-center">All Spells</h3>
         <div className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
            {SPELLS.map((spell, index) => (
               <div key={index} className="bg-gray-700 rounded-lg p-2 border border-gray-600 flex items-center gap-3" style={{width: "250px"}}>
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12">
                     <SpellIcon icon={spell.icon} size="xl" className="h-12 w-12" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                     <span className="font-bold text-white text-sm leading-tight truncate">{spell.name}</span>
                     <div className="flex gap-1 my-1">
                        {spell.combination.map((orb, orbIndex) => (
                           <span
                              key={orbIndex}
                              className={`w-6 h-6 rounded-full flex items-center justify-center bg-black/30 border-2 overflow-hidden ${orb === 'Q' ? 'border-blue-400' :
                                 orb === 'W' ? 'border-purple-400' :
                                    'border-orange-400'
                                 }`}
                           >
                              <SpellIcon icon={orbIcons[orb]} size="sm" className="w-5 h-5" />
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default SpellsList; 
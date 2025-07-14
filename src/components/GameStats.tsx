import React from 'react';

interface GameStatsProps {
   score: number;
   timeElapsed: number;
   isPlaying: boolean;
   gameMode: 'classic' | 'timed';
   onStart: () => void;
   onStop: () => void;
}

const GameStats: React.FC<GameStatsProps> = ({ score, timeElapsed, isPlaying, gameMode, onStart, onStop }) => {
   const formatTime = (seconds: number): string => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
   };
   const formatTimed = (seconds: number): string => {
      const remain = Math.max(0, 60 - seconds);
      const mins = Math.floor(remain / 60);
      const secs = remain % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
   };

   return (
      <div className="flex items-center bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700 gap-6 min-w-[600px]">
         <div>
            {!isPlaying ? (
               <button
                  onClick={onStart}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg text-base transition-colors duration-200 shadow-lg hover:shadow-xl"
               >
                  Start Game
               </button>
            ) : (
               <button
                  onClick={onStop}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-base transition-colors duration-200 shadow-lg hover:shadow-xl"
               >
                  Stop Game
               </button>
            )}
         </div>
         <div className="flex-1 flex justify-evenly items-center gap-6">
            <div className="text-center">
               <div className="text-2xl font-bold text-green-400">{score}</div>
               <div className="text-sm text-gray-400">Spells Cast</div>
            </div>

            <div className="text-center">
               <div className="text-2xl font-bold text-blue-400">
                  {gameMode === 'timed'
                     ? (isPlaying ? formatTimed(timeElapsed) : '01:00')
                     : (isPlaying ? formatTime(timeElapsed) : '00:00')}
               </div>
               <div className="text-sm text-gray-400">Time</div>
            </div>

            {gameMode === 'classic' && (
               <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                     {score > 0 && timeElapsed > 0 ? Math.round((score / timeElapsed) * 60) : 0}
                  </div>
                  <div className="text-sm text-gray-400">Spells/Min</div>
               </div>
            )}
         </div>
      </div>
   );
};

export default GameStats; 
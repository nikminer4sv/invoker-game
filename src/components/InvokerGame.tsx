import React, { useState, useEffect } from 'react';
import { GameState, Orb, Spell } from '../types/game';
import { getRandomSpell } from '../data/spells';
import OrbButton from './OrbButton';
import SpellDisplay from './SpellDisplay';
import InvokeButton from './InvokeButton';
import GameStats from './GameStats';
import SpellsList from './SpellsList';

const GAME_MODES = {
   CLASSIC: 'classic',
   TIMED: 'timed',
} as const;
type GameMode = typeof GAME_MODES[keyof typeof GAME_MODES];

const formatTime = (seconds: number, mode: GameMode) => {
   if (mode === GAME_MODES.TIMED) {
      const remain = Math.max(0, 60 - seconds);
      const mins = Math.floor(remain / 60);
      const secs = remain % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
   } else {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
   }
};

const InvokerGame: React.FC = () => {
   const [gameMode, setGameMode] = useState<GameMode>(GAME_MODES.CLASSIC);
   const [gameState, setGameState] = useState<GameState>({
      isPlaying: false,
      currentSpell: null,
      userCombination: [],
      score: 0,
      timeElapsed: 0,
   });
   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
   const [pressedOrb, setPressedOrb] = useState<Orb | null>(null);
   const [pressedInvoke, setPressedInvoke] = useState(false);
   const [timedResult, setTimedResult] = useState<number | null>(null);

   useEffect(() => {
      if (gameState.isPlaying && gameMode === GAME_MODES.TIMED) {
         if (gameState.timeElapsed >= 60) {
            setGameState(prev => ({ ...prev, isPlaying: false }));
            setTimedResult(gameState.score);
            if (timer) clearInterval(timer);
            return;
         }
         const interval = setInterval(() => {
            setGameState(prev => ({
               ...prev,
               timeElapsed: prev.timeElapsed + 1
            }));
         }, 1000);
         setTimer(interval);
         return () => clearInterval(interval);
      } else if (gameState.isPlaying && gameMode === GAME_MODES.CLASSIC) {
         const interval = setInterval(() => {
            setGameState(prev => ({
               ...prev,
               timeElapsed: prev.timeElapsed + 1
            }));
         }, 1000);
         setTimer(interval);
         return () => clearInterval(interval);
      } else {
         if (timer) {
            clearInterval(timer);
            setTimer(null);
         }
      }
   }, [gameState.isPlaying, gameMode, gameState.timeElapsed]);

   useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
         if (!gameState.isPlaying) return;
         if (gameMode === GAME_MODES.TIMED && gameState.timeElapsed >= 60) return;
         const key = event.key.toLowerCase();
         const code = event.code.toLowerCase();
         if (key === 'q' || key === 'й' || code === 'keyq') {
            handleOrbPress('Q');
         } else if (key === 'w' || key === 'ц' || code === 'keyw') {
            handleOrbPress('W');
         } else if (key === 'e' || key === 'у' || code === 'keye') {
            handleOrbPress('E');
         } else if (key === 'r' || key === 'к' || code === 'keyr') {
            setPressedInvoke(true);
            handleInvoke();
            setTimeout(() => setPressedInvoke(false), 180);
         }
      };
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
   }, [gameState.isPlaying, gameState.userCombination, gameMode, gameState.timeElapsed]);

   const startGame = () => {
      setTimedResult(null);
      setGameState({
         isPlaying: true,
         currentSpell: getRandomSpell(),
         userCombination: [],
         score: 0,
         timeElapsed: 0,
      });
   };

   const stopGame = () => {
      setGameState(prev => ({
         ...prev,
         isPlaying: false,
         currentSpell: null,
         userCombination: [],
      }));
   };

   const handleOrbPress = (orb: Orb) => {
      setPressedOrb(orb);
      setTimeout(() => setPressedOrb(null), 180);
      handleOrbClick(orb);
   };

   const handleOrbClick = (orb: Orb) => {
      if (!gameState.isPlaying) return;
      if (gameMode === GAME_MODES.TIMED && gameState.timeElapsed >= 60) return;
      setGameState(prev => {
         let newCombination: Orb[];
         if (prev.userCombination.length >= 3) {
            newCombination = [...prev.userCombination.slice(1), orb];
         } else {
            newCombination = [...prev.userCombination, orb];
         }
         return {
            ...prev,
            userCombination: newCombination,
         };
      });
   };

   const handleInvoke = () => {
      if (!gameState.isPlaying || gameState.userCombination.length !== 3 || !gameState.currentSpell) return;
      if (gameMode === GAME_MODES.TIMED && gameState.timeElapsed >= 60) return;
      const isCorrect = JSON.stringify(gameState.userCombination) === JSON.stringify(gameState.currentSpell.combination);
      if (isCorrect) {
         setGameState(prev => ({
            ...prev,
            score: prev.score + 1,
            currentSpell: getRandomSpell(prev.currentSpell || undefined),
            userCombination: [],
         }));
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
         <div className="max-w-7xl mx-auto flex flex-col h-full">
            <div className="text-center mb-8">
               <h1 className="text-5xl font-bold text-white mb-2">Invoker Game</h1>
               <p className="text-gray-300">Master the art of spell casting!</p>
            </div>
            {/* Верхний ряд: режимы слева, игра по центру, список справа */}
            <div className="relative w-full h-[calc(100vh-180px)]">
               {/* Режимы игры слева */}
               <div className="absolute left-0 top-0 h-full flex flex-col items-start w-[220px] z-0">
                  <button
                     className={`flex items-center gap-2 w-[300px] h-14 px-6 py-2 rounded-lg font-bold text-lg transition-colors duration-200 shadow-md mb-2
                        ${gameMode === GAME_MODES.CLASSIC ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-700'}`}
                     onClick={() => setGameMode(GAME_MODES.CLASSIC)}
                     disabled={gameState.isPlaying}
                  >
                     <span className="text-2xl">🕹️</span>
                     <span>Classic</span>
                  </button>
                  <button
                     className={`flex items-center gap-2 w-[300px] h-14 px-6 py-2 rounded-lg font-bold text-lg transition-colors duration-200 shadow-md
                        ${gameMode === GAME_MODES.TIMED ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-700'}`}
                     onClick={() => setGameMode(GAME_MODES.TIMED)}
                     disabled={gameState.isPlaying}
                  >
                     <span className="text-2xl">⏱️</span>
                     <span>Timed</span>
                  </button>
               </div>
               {/* Игра по центру */}
               <div className="absolute left-1/2 top-0 transform -translate-x-1/2 z-10 w-[600px] flex flex-col items-center">
                  <div className="mb-6 w-full flex justify-center">
                     <GameStats
                        score={gameState.score}
                        timeElapsed={gameState.timeElapsed}
                        isPlaying={gameState.isPlaying}
                        gameMode={gameMode}
                        onStart={startGame}
                        onStop={stopGame}
                     />
                  </div>
                  {/* Timed mode result */}
                  {timedResult !== null && gameMode === GAME_MODES.TIMED && !gameState.isPlaying && (
                     <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-white mb-2">Time's up!</div>
                        <div className="text-xl text-gray-300">You cast {timedResult} spells in 1 minute.</div>
                     </div>
                  )}
                  <div className="mb-8 w-full">
                     <SpellDisplay
                        spell={gameState.currentSpell}
                        userCombination={gameState.userCombination}
                     />
                  </div>
                  <div className="flex justify-center gap-4 mb-6">
                     <OrbButton
                        orb="Q"
                        onClick={handleOrbPress}
                        isActive={gameState.userCombination.includes('Q')}
                        isDisabled={!gameState.isPlaying || (gameMode === GAME_MODES.TIMED && gameState.timeElapsed >= 60)}
                        pressed={pressedOrb === 'Q'}
                     />
                     <OrbButton
                        orb="W"
                        onClick={handleOrbPress}
                        isActive={gameState.userCombination.includes('W')}
                        isDisabled={!gameState.isPlaying || (gameMode === GAME_MODES.TIMED && gameState.timeElapsed >= 60)}
                        pressed={pressedOrb === 'W'}
                     />
                     <OrbButton
                        orb="E"
                        onClick={handleOrbPress}
                        isActive={gameState.userCombination.includes('E')}
                        isDisabled={!gameState.isPlaying || (gameMode === GAME_MODES.TIMED && gameState.timeElapsed >= 60)}
                        pressed={pressedOrb === 'E'}
                     />
                  </div>
                  <div className="flex justify-center gap-4 mb-6">
                     <InvokeButton
                        onClick={() => {
                           setPressedInvoke(true);
                           handleInvoke();
                           setTimeout(() => setPressedInvoke(false), 180);
                        }}
                        isDisabled={!gameState.isPlaying || gameState.userCombination.length !== 3 || (gameMode === GAME_MODES.TIMED && gameState.timeElapsed >= 60)}
                        combinationLength={gameState.userCombination.length}
                        pressed={pressedInvoke}
                     />
                  </div>
                  <div className="text-center text-gray-400 text-sm">
                     <p>Use Q, W, E keys or click orb buttons to cast orbs</p>
                     <p>Press R or click Invoke to cast the spell</p>
                  </div>
               </div>
               {/* Список способностей справа */}
               <div className="absolute right-0 top-0 h-full flex flex-col items-end w-[440px] pr-4 z-0">
                  <SpellsList />
               </div>
            </div>
         </div>
      </div>
   );
};

export default InvokerGame; 
export type Orb = 'Q' | 'W' | 'E';

export interface Spell {
  name: string;
  combination: Orb[];
  icon: string;
  description: string;
}

export interface GameState {
  isPlaying: boolean;
  currentSpell: Spell | null;
  userCombination: Orb[];
  score: number;
  timeElapsed: number;
}

export interface TimerState {
  isRunning: boolean;
  startTime: number | null;
  elapsed: number;
} 
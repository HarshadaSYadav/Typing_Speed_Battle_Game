import { create } from 'zustand';

interface GameState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  words: string[];
  currentWordIndex: number;
  typedWord: string;
  isGameStarted: boolean;
  startTime: number | null;
  timeLeft: number;
  wpm: number;
  accuracy: number;
  correctWords: number;
  totalTyped: number;
  gameResults: GameResult[];
  setWords: (words: string[]) => void;
  startGame: () => void;
  endGame: () => void;
  updateTypedWord: (word: string) => void;
  nextWord: () => void;
  updateTimer: () => void;
  addGameResult: (result: GameResult) => void;
}

interface GameResult {
  wpm: number;
  accuracy: number;
  timestamp: number;
}

export const useGameStore = create<GameState>((set, get) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  words: [],
  currentWordIndex: 0,
  typedWord: '',
  isGameStarted: false,
  startTime: null,
  timeLeft: 60,
  wpm: 0,
  accuracy: 0,
  correctWords: 0,
  totalTyped: 0,
  gameResults: [],
  setWords: (words) => set({ words }),
  startGame: () => {
    set({ 
      isGameStarted: true, 
      startTime: Date.now(),
      timeLeft: 60,
      correctWords: 0,
      totalTyped: 0
    });
    
    // Start the timer
    const timer = setInterval(() => {
      const state = get();
      if (state.timeLeft > 0) {
        state.updateTimer();
      } else {
        clearInterval(timer);
        state.endGame();
      }
    }, 1000);
  },
  endGame: () => {
    const state = get();
    const result = {
      wpm: state.wpm,
      accuracy: state.accuracy,
      timestamp: Date.now()
    };
    set({ 
      isGameStarted: false,
      timeLeft: 60,
      startTime: null
    });
    state.addGameResult(result);
  },
  updateTypedWord: (word) => set({ typedWord: word }),
  nextWord: () => set((state) => ({ 
    currentWordIndex: state.currentWordIndex + 1,
    correctWords: state.correctWords + 1,
    totalTyped: state.totalTyped + 1,
    wpm: Math.round((state.correctWords + 1) * (60 / (60 - state.timeLeft))),
    accuracy: Math.round(((state.correctWords + 1) / (state.totalTyped + 1)) * 100)
  })),
  updateTimer: () => set((state) => ({ 
    timeLeft: state.timeLeft - 1,
    wpm: Math.round(state.correctWords * (60 / (60 - state.timeLeft + 1)))
  })),
  addGameResult: (result) => set((state) => ({
    gameResults: [...state.gameResults, result].sort((a, b) => b.wpm - a.wpm).slice(0, 10)
  }))
}));
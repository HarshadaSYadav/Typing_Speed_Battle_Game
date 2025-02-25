import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
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
  gameEnded: false,
  setWords: (words) => set({ words }),
  startGame: () => {
    const shuffledWords = [...get().words].sort(() => Math.random() - 0.5);
    set({ 
      isGameStarted: true, 
      startTime: Date.now(),
      timeLeft: 60,
      correctWords: 0,
      totalTyped: 0,
      currentWordIndex: 0,
      words: shuffledWords,
      gameEnded: false
    });
    
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
      startTime: null,
      gameEnded: true
    });
    state.addGameResult(result);
  },
  resetGame: () => {
    const shuffledWords = [...get().words].sort(() => Math.random() - 0.5);
    set({
      currentWordIndex: 0,
      typedWord: '',
      wpm: 0,
      accuracy: 0,
      words: shuffledWords,
      gameEnded: false
    });
  },
  updateTypedWord: (word) => set({ typedWord: word }),
  nextWord: (isCorrect = true) => set((state) => {
    const newTotalTyped = state.totalTyped + 1;
    const newCorrectWords = isCorrect ? state.correctWords + 1 : state.correctWords;
    
    return { 
      currentWordIndex: state.currentWordIndex + 1,
      correctWords: newCorrectWords,
      totalTyped: newTotalTyped,
      wpm: Math.round(newCorrectWords * (60 / (60 - state.timeLeft))),
      accuracy: Math.round((newCorrectWords / newTotalTyped) * 100)
    };
  }),
  updateTimer: () => set((state) => ({ 
    timeLeft: state.timeLeft - 1,
    wpm: Math.round(state.correctWords * (60 / (60 - state.timeLeft + 1)))
  })),
  addGameResult: (result) => set((state) => ({
    gameResults: [...state.gameResults, result].sort((a, b) => b.wpm - a.wpm).slice(0, 10)
  }))
}));
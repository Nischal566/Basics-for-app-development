import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProgressData {
  completedWeeks: number[];
  startDate: string;
  lastUpdated: string;
}

interface ProgressContextType {
  progress: ProgressData;
  toggleWeekCompletion: (weekNumber: number) => void;
  isWeekCompleted: (weekNumber: number) => boolean;
  getProgressPercentage: () => number;
  getCompletedCount: () => number;
  getTotalWeeks: () => number;
  getMonthProgress: (month: number) => { completed: number; total: number; percentage: number };
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'app_dev_roadmap_progress';
const TOTAL_WEEKS = 16;

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>({
    completedWeeks: [],
    startDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleWeekCompletion = (weekNumber: number) => {
    setProgress((prev) => ({
      ...prev,
      completedWeeks: prev.completedWeeks.includes(weekNumber)
        ? prev.completedWeeks.filter((w) => w !== weekNumber)
        : [...prev.completedWeeks, weekNumber],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const isWeekCompleted = (weekNumber: number) => {
    return progress.completedWeeks.includes(weekNumber);
  };

  const getCompletedCount = () => {
    return progress.completedWeeks.length;
  };

  const getTotalWeeks = () => {
    return TOTAL_WEEKS;
  };

  const getProgressPercentage = () => {
    return Math.round((getCompletedCount() / getTotalWeeks()) * 100);
  };

  const getMonthProgress = (month: number) => {
    const monthWeeks = {
      1: [1, 2, 3, 4],
      2: [5, 6, 7, 8],
      3: [9, 10, 11, 12],
      4: [13, 14, 15, 16],
    };

    const weeks = monthWeeks[month as keyof typeof monthWeeks] || [];
    const completed = weeks.filter((w) => isWeekCompleted(w)).length;

    return {
      completed,
      total: weeks.length,
      percentage: Math.round((completed / weeks.length) * 100),
    };
  };

  const resetProgress = () => {
    setProgress({
      completedWeeks: [],
      startDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    });
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        toggleWeekCompletion,
        isWeekCompleted,
        getProgressPercentage,
        getCompletedCount,
        getTotalWeeks,
        getMonthProgress,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}

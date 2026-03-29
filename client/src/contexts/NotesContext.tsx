import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WeekNote {
  weekNumber: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotesData {
  notes: WeekNote[];
}

interface NotesContextType {
  notes: WeekNote[];
  getWeekNote: (weekNumber: number) => WeekNote | undefined;
  saveNote: (weekNumber: number, title: string, content: string) => void;
  deleteNote: (weekNumber: number) => void;
  getAllNotes: () => WeekNote[];
  getNotesByMonth: (month: number) => WeekNote[];
  exportNotesAsText: () => string;
  clearAllNotes: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const NOTES_STORAGE_KEY = 'app_dev_roadmap_notes';

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<WeekNote[]>([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(NOTES_STORAGE_KEY);
    if (stored) {
      try {
        const data: NotesData = JSON.parse(stored);
        setNotes(data.notes || []);
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify({ notes }));
  }, [notes]);

  const getWeekNote = (weekNumber: number) => {
    return notes.find((note) => note.weekNumber === weekNumber);
  };

  const saveNote = (weekNumber: number, title: string, content: string) => {
    const now = new Date().toISOString();
    const existingNote = notes.find((note) => note.weekNumber === weekNumber);

    if (existingNote) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.weekNumber === weekNumber
            ? { ...note, title, content, updatedAt: now }
            : note
        )
      );
    } else {
      // Create new note
      const newNote: WeekNote = {
        weekNumber,
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };
      setNotes([...notes, newNote]);
    }
  };

  const deleteNote = (weekNumber: number) => {
    setNotes(notes.filter((note) => note.weekNumber !== weekNumber));
  };

  const getAllNotes = () => {
    return notes.sort((a, b) => a.weekNumber - b.weekNumber);
  };

  const getNotesByMonth = (month: number) => {
    const monthWeeks = {
      1: [1, 2, 3, 4],
      2: [5, 6, 7, 8],
      3: [9, 10, 11, 12],
      4: [13, 14, 15, 16],
    };

    const weeks = monthWeeks[month as keyof typeof monthWeeks] || [];
    return notes
      .filter((note) => weeks.includes(note.weekNumber))
      .sort((a, b) => a.weekNumber - b.weekNumber);
  };

  const exportNotesAsText = () => {
    const sortedNotes = getAllNotes();
    let text = 'App Development Roadmap - Learning Notes\n';
    text += `Exported: ${new Date().toLocaleString()}\n`;
    text += '='.repeat(60) + '\n\n';

    sortedNotes.forEach((note) => {
      text += `Week ${note.weekNumber}: ${note.title}\n`;
      text += '-'.repeat(40) + '\n';
      text += `Created: ${new Date(note.createdAt).toLocaleString()}\n`;
      text += `Last Updated: ${new Date(note.updatedAt).toLocaleString()}\n\n`;
      text += note.content + '\n\n';
      text += '='.repeat(60) + '\n\n';
    });

    return text;
  };

  const clearAllNotes = () => {
    if (confirm('Are you sure you want to delete all notes? This cannot be undone.')) {
      setNotes([]);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        getWeekNote,
        saveNote,
        deleteNote,
        getAllNotes,
        getNotesByMonth,
        exportNotesAsText,
        clearAllNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
}

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { NotesContextType, Note } from '../types';
import { notesApi, ApiError } from '../services/api';
import { useAuth } from './AuthContext';

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

interface NotesProviderProps {
  children: ReactNode;
}

// Helper function to build tree structure
const buildNoteTree = (notes: Note[]): Note[] => {
  const noteMap = new Map<number, Note>();
  const rootNotes: Note[] = [];

  // Initialize all notes with empty children array
  notes.forEach(note => {
    noteMap.set(note.id, { ...note, children: [] });
  });

  // Build tree structure
  notes.forEach(note => {
    const noteWithChildren = noteMap.get(note.id)!;
    if (note.parent === 0) {
      rootNotes.push(noteWithChildren);
    } else {
      const parent = noteMap.get(note.parent);
      if (parent) {
        parent.children!.push(noteWithChildren);
      }
    }
  });

  return rootNotes;
};

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const loadNotes = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const notesData = await notesApi.getNotes(token);
      const treeNotes = buildNoteTree(notesData);
      setNotes(treeNotes);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to load notes');
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const createNote = async (title: string, content: string, parent?: number) => {
    if (!token) throw new Error('No authentication token');
    
    setError(null);
    try {
      await notesApi.createNote(token, { title, content, parent });
      await loadNotes(); // Refresh notes list
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to create note');
      }
      throw err;
    }
  };

  const updateNote = async (id: number, title: string, content: string) => {
    if (!token) throw new Error('No authentication token');
    
    setError(null);
    try {
      await notesApi.updateNote(token, id, { title, content });
      await loadNotes(); // Refresh notes list
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to update note');
      }
      throw err;
    }
  };

  const deleteNote = async (id: number) => {
    if (!token) throw new Error('No authentication token');
    
    setError(null);
    try {
      await notesApi.deleteNote(token, id);
      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }
      await loadNotes(); // Refresh notes list
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to delete note');
      }
      throw err;
    }
  };

  const selectNote = (note: Note | null) => {
    setSelectedNote(note);
  };

  const value: NotesContextType = {
    notes,
    selectedNote,
    createNote,
    updateNote,
    deleteNote,
    selectNote,
    loadNotes,
    isLoading,
    error,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};
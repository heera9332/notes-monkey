import React from 'react';
import { Plus, LogOut, User, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotes } from '../contexts/NotesContext';
import NoteTree from './NoteTree';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { notes, createNote, isLoading, error } = useNotes();

  const handleCreateNote = async () => {
    try {
      await createNote('Untitled', '');
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  return (
    <div className="w-80 bg-white border-r border-saffron-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-saffron-200 bg-gradient-to-r from-saffron-50 to-forest-50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-gray-900">Notes</h1>
          <button
            onClick={handleCreateNote}
            className="p-2 text-saffron-600 hover:text-saffron-900 hover:bg-saffron-100 rounded-lg transition-colors"
            title="New note"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span className="truncate">{user?.displayName || user?.username}</span>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        {!isLoading && !error && notes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No notes yet</p>
            <button
              onClick={handleCreateNote}
              className="mt-2 text-saffron-600 hover:text-saffron-700 text-sm font-medium"
            >
              Create your first note
            </button>
          </div>
        )}

        {!isLoading && notes.length > 0 && (
          <NoteTree notes={notes} />
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-saffron-200 bg-gradient-to-r from-saffron-50 to-forest-50">
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
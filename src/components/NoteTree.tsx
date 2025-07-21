import React, { useState } from 'react';
import { Note } from '../types';
import { ChevronRight, ChevronDown, File, Plus, MoreHorizontal, Trash2, Edit3 } from 'lucide-react';
import { useNotes } from '../contexts/NotesContext';

interface NoteTreeProps {
  notes: Note[];
  level?: number;
}

interface NoteItemProps {
  note: Note;
  level: number;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, level }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title.rendered);
  const { selectedNote, selectNote, createNote, updateNote, deleteNote } = useNotes();

  const hasChildren = note.children && note.children.length > 0;
  const isSelected = selectedNote?.id === note.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleSelect = () => {
    selectNote(note);
    setShowMenu(false);
  };

  const handleAddChild = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await createNote('Untitled', '', note.id);
    } catch (error) {
      console.error('Failed to create child note:', error);
    }
    setShowMenu(false);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSaveEdit = async () => {
    if (editTitle.trim()) {
      try {
        await updateNote(note.id, editTitle, note.content.rendered);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update note:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(note.title.rendered);
    setIsEditing(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note and all its children?')) {
      try {
        await deleteNote(note.id);
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
    setShowMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className="select-none">
      <div
        className={`group flex items-center py-1 px-2 rounded-lg hover:bg-saffron-50 cursor-pointer transition-colors relative ${
          isSelected ? 'bg-gradient-to-r from-saffron-100 to-forest-100 text-saffron-700' : 'text-gray-700'
        }`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
        onClick={handleSelect}
      >
        <button
          onClick={handleToggle}
          className="flex items-center justify-center w-4 h-4 mr-1 hover:bg-saffron-200 rounded transition-colors"
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )
          ) : null}
        </button>

        <File className="h-4 w-4 mr-2 flex-shrink-0" />

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-white border border-saffron-300 rounded px-1 py-0 text-sm focus:outline-none focus:ring-1 focus:ring-saffron-500"
            autoFocus
          />
        ) : (
          <span className="flex-1 text-sm truncate">{note.title.rendered}</span>
        )}

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-saffron-200 rounded transition-all"
          >
            <MoreHorizontal className="h-3 w-3" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-saffron-200 py-1 z-10 min-w-[120px]">
              <button
                onClick={handleAddChild}
                className="flex items-center w-full px-3 py-1 text-sm text-gray-700 hover:bg-saffron-50"
              >
                <Plus className="h-3 w-3 mr-2" />
                Add child
              </button>
              <button
                onClick={handleEdit}
                className="flex items-center w-full px-3 py-1 text-sm text-gray-700 hover:bg-saffron-50"
              >
                <Edit3 className="h-3 w-3 mr-2" />
                Rename
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center w-full px-3 py-1 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3 mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <NoteTree notes={note.children!} level={level + 1} />
      )}
    </div>
  );
};

const NoteTree: React.FC<NoteTreeProps> = ({ notes, level = 0 }) => {
  return (
    <div className="space-y-0">
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} level={level} />
      ))}
    </div>
  );
};

export default NoteTree;
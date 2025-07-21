import React, { useEffect, useState, useMemo } from 'react';
// import { BlockNoteView } from '@blocknote/mantine';
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { useNotes } from '../contexts/NotesContext';
import { Save, Edit3 } from 'lucide-react';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/react/style.css';

const NoteEditor: React.FC = () => {
  const { selectedNote, updateNote } = useNotes();
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Create BlockNote editor instance
  const editor = useMemo(() => {
    return BlockNoteEditor.create();
  }, []);

  // Update title and content when selected note changes
  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title.rendered);
      
      // Parse HTML content to BlockNote blocks
      if (selectedNote.content.rendered) {
        try {
          const htmlContent = selectedNote.content.rendered;
          // For now, we'll use a simple text block
          // In a real implementation, you'd want to parse HTML properly
          const blocks: PartialBlock[] = [
            {
              type: 'paragraph',
              content: htmlContent.replace(/<[^>]*>/g, ''), // Strip HTML tags for now
            },
          ];
          editor.replaceBlocks(editor.document, blocks);
        } catch (error) {
          console.error('Failed to parse note content:', error);
        }
      } else {
        // Clear editor for empty note
        editor.replaceBlocks(editor.document, []);
      }
    }
  }, [selectedNote, editor]);

  const handleSave = async () => {
    if (!selectedNote || isSaving) return;

    setIsSaving(true);
    try {
      // Get content from BlockNote editor as HTML
      const contentHtml = await editor.blocksToHTMLLossy(editor.document);
      
      await updateNote(selectedNote.id, title, contentHtml);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save when title changes (with debounce)
  useEffect(() => {
    if (!selectedNote || !title) return;
    
    const timeoutId = setTimeout(() => {
      if (title !== selectedNote.title.rendered) {
        handleSave();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [title, selectedNote]);

  if (!selectedNote) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-gray-500">
          <Edit3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">Select a note to start editing</p>
          <p className="text-sm mt-2">Choose a note from the sidebar or create a new one</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-saffron-200 p-6 pb-4 bg-gradient-to-r from-saffron-50 to-forest-50">
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold text-gray-900 bg-transparent border-none outline-none placeholder-gray-400 flex-1"
            placeholder="Untitled"
          />
          <div className="flex items-center space-x-2">
            {isSaving && <Save className="h-4 w-4 text-saffron-500 animate-pulse" />}
            {lastSaved && !isSaving && (
              <span className="text-xs text-gray-500">
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          <BlockNoteView
            editor={editor}
            onChange={() => {
              // Auto-save content changes (with debounce)
              const timeoutId = setTimeout(handleSave, 2000);
              return () => clearTimeout(timeoutId);
            }}
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
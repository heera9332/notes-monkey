import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotesProvider, useNotes } from './contexts/NotesContext';
import AuthContainer from './components/AuthContainer';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor'; 

const AppContent: React.FC = () => {
  const { user, token } = useAuth();
  const { loadNotes } = useNotes();

  useEffect(() => {
    if (user && token) {
      loadNotes();
    }
  }, [user, token, loadNotes]);

  if (!user || !token) {
    return <AuthContainer />;
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-saffron-50 to-forest-50">
      <Sidebar />
      <NoteEditor />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotesProvider>
        <AppContent />
      </NotesProvider>
    </AuthProvider>
  );
};

export default App;
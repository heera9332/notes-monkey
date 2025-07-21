export interface User {
  id: number;
  email: string;
  username: string;
  displayName: string;
}

export interface Note {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  parent: number;
  author: number;
  status: string;
  date: string;
  children?: Note[];
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

export interface NotesContextType {
  notes: Note[];
  selectedNote: Note | null;
  createNote: (title: string, content: string, parent?: number) => Promise<void>;
  updateNote: (id: number, title: string, content: string) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  selectNote: (note: Note | null) => void;
  loadNotes: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  parent?: number;
}
export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}
import { useCallback, useEffect, useState } from "react";

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  pinned?: boolean;
};

const STORAGE_KEY = "pnm.notes.v1";

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function sortNotes(a: Note, b: Note) {
  // Pinned first, then by updatedAt desc
  if ((a.pinned ? 1 : 0) !== (b.pinned ? 1 : 0)) {
    return a.pinned ? -1 : 1;
  }
  return b.updatedAt - a.updatedAt;
}

// PUBLIC_INTERFACE
export function useLocalNotes() {
  /** Manages notes in localStorage with CRUD and pinning, sorted by recency. */
  const [notes, setNotes] = useState<Note[]>([]);

  // Load from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Note[];
        setNotes(parsed.sort(sortNotes));
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  const addNote = useCallback(() => {
    const now = Date.now();
    const n: Note = {
      id: generateId(),
      title: "",
      content: "",
      createdAt: now,
      updatedAt: now,
      pinned: false,
    };
    setNotes((prev) => [n, ...prev].sort(sortNotes));
    return n;
  }, []);

  const updateNote = useCallback((id: string, patch: Partial<Note>) => {
    setNotes((prev) =>
      prev
        .map((n) =>
          n.id === id
            ? { ...n, ...patch, updatedAt: patch.updatedAt ?? Date.now() }
            : n
        )
        .sort(sortNotes)
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const togglePin = useCallback((id: string) => {
    setNotes((prev) =>
      prev
        .map((n) => (n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n))
        .sort(sortNotes)
    );
  }, []);

  const clearAll = useCallback(() => {
    if (confirm("This will delete all notes. Continue?")) {
      setNotes([]);
    }
  }, []);

  const importSample = useCallback(() => {
    const now = Date.now();
    const samples: Note[] = [
      {
        id: generateId(),
        title: "Welcome to Personal Notes",
        content:
          "This app uses localStorage to persist your notes. Use the search bar to filter by title or content.",
        createdAt: now - 100000,
        updatedAt: now - 100000,
        pinned: true,
      },
      {
        id: generateId(),
        title: "Ocean Professional Theme",
        content:
          "Primary: #2563EB, Secondary/Success: #F59E0B, Error: #EF4444. Clean, minimalist layout with subtle shadows.",
        createdAt: now - 80000,
        updatedAt: now - 80000,
        pinned: false,
      },
    ];
    setNotes((prev) => [...samples, ...prev].sort(sortNotes));
  }, []);

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    clearAll,
    importSample,
  };
}

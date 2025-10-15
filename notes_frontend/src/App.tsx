import React, { useCallback, useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import Editor from "./components/Editor";
import EmptyState from "./components/EmptyState";
import { useLocalNotes, Note } from "./hooks/useLocalNotes";
import { debounce } from "./utils/format";

const MOBILE_BREAKPOINT = 860;

// PUBLIC_INTERFACE
export default function App(): JSX.Element {
  /** This is the main application shell for the Notes Manager UI (Ocean Professional theme). */

  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    clearAll,
    importSample,
  } = useLocalNotes();

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  // Responsive sidebar: collapse on small screens
  useEffect(() => {
    const onResize = () => {
      setShowSidebar(window.innerWidth >= MOBILE_BREAKPOINT);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Derived filtered notes with simple search
  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    );
  }, [notes, query]);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  // Handlers
  const handleNew = useCallback(() => {
    const created = addNote();
    setSelectedId(created.id);
  }, [addNote]);

  const handleSave = useCallback(
    (patch: Partial<Note>) => {
      if (!selectedId) return;
      updateNote(selectedId, patch);
    },
    [selectedId, updateNote]
  );

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    deleteNote(selectedId);
    setSelectedId(null);
  }, [selectedId, deleteNote]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleTogglePin = useCallback(
    (id: string) => {
      togglePin(id);
    },
    [togglePin]
  );

  const debouncedSetQuery = useMemo(() => debounce(setQuery, 200), []);

  // Keyboard accessibility
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedId(null);
      } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        // Cmd/Ctrl+Enter to save current editor state handled by Editor fields
        // This block reserved for future global save behavior if needed
      } else if (e.key === "Enter" && e.shiftKey) {
        // Shift+Enter -> new note
        e.preventDefault();
        handleNew();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNew]);

  const isEmpty = notes.length === 0;
  const noResults = !isEmpty && filteredNotes.length === 0;

  return (
    <div className="app-root">
      <Sidebar
        visible={showSidebar}
        onNew={handleNew}
        onClearAll={clearAll}
        onImportSample={importSample}
        onToggleSidebar={() => setShowSidebar((s) => !s)}
      />
      <main className="main-panel">
        <Header
          onMenuToggle={() => setShowSidebar((s) => !s)}
          onNew={handleNew}
          onSearch={debouncedSetQuery}
        />

        <div className="content-split">
          <section className="list-pane" aria-label="Notes list">
            {isEmpty ? (
              <EmptyState
                title="No notes yet"
                description="Create your first note to get started."
                ctaLabel="New note"
                onCta={handleNew}
              />
            ) : noResults ? (
              <EmptyState
                title="No matches"
                description="Try a different search keyword."
              />
            ) : (
              <NoteList
                notes={filteredNotes}
                selectedId={selectedId}
                onSelect={handleSelect}
                onTogglePin={handleTogglePin}
              />
            )}
          </section>

          <section className="editor-pane" aria-label="Editor">
            {selectedNote ? (
              <Editor
                note={selectedNote}
                onChange={handleSave}
                onDelete={handleDelete}
                onClose={() => setSelectedId(null)}
              />
            ) : (
              <div className="editor-empty">
                <p className="muted">
                  Select a note from the list or create a new one.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { Note } from "../hooks/useLocalNotes";

type Props = {
  note: Note;
  onChange: ((...args: [Partial<Note>]) => void);
  onDelete: () => void;
  onClose: () => void;
};

// PUBLIC_INTERFACE
export default function Editor({ note, onChange, onDelete, onClose }: Props): JSX.Element {
  /** Editor pane for title and content. Auto-saves with debounced updates. */
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id]);

  // Debounced save
  useEffect(() => {
    const handle = setTimeout(() => {
      onChange({ title, content });
    }, 200);
    return () => clearTimeout(handle);
  }, [title, content, onChange]);

  // Keyboard support: Cmd/Ctrl+Enter to blur/save, Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Enter" && (e.ctrlKey || e.metaKey))) {
        titleRef.current?.blur();
        contentRef.current?.blur();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="editor">
      <div className="editor-controls">
        <button className="icon-btn" onClick={onClose} title="Close editor" aria-label="Close">
          ←
        </button>
        <div className="spacer" />
        <button className="btn danger" onClick={onDelete} title="Delete note">
          Delete
        </button>
      </div>
      <input
        ref={titleRef}
        className="editor-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        aria-label="Note title"
      />
      <textarea
        ref={contentRef}
        className="editor-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note..."
        aria-label="Note content"
      />
    </div>
  );
}

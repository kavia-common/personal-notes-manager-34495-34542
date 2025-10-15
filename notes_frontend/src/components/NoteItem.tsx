import React from "react";
import { Note } from "../hooks/useLocalNotes";
import { formatDateTime, snippet } from "../utils/format";

type Props = {
  note: Note;
  active: boolean;
  onClick: () => void;
  onTogglePin: () => void;
};

// PUBLIC_INTERFACE
export default function NoteItem({ note, active, onClick, onTogglePin }: Props): JSX.Element {
  /** A single note row in the list with title, snippet, updated time, and pin toggle. */
  return (
    <button
      className={`note-item ${active ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <div className="note-item-head">
        <h3 className="note-title">{note.title || "Untitled"}</h3>
        <button
          className={`pin-btn ${note.pinned ? "pinned" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
          aria-label={note.pinned ? "Unpin note" : "Pin note"}
          title={note.pinned ? "Unpin" : "Pin"}
        >
          {note.pinned ? "★" : "☆"}
        </button>
      </div>
      <p className="note-preview">{snippet(note.content, 120)}</p>
      <div className="note-meta">
        <span className="muted tiny">Updated {formatDateTime(note.updatedAt)}</span>
      </div>
    </button>
  );
}

import React from "react";
import { Note } from "../hooks/useLocalNotes";
import NoteItem from "./NoteItem";

type Props = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onTogglePin: (id: string) => void;
};

// PUBLIC_INTERFACE
export default function NoteList({
  notes,
  selectedId,
  onSelect,
  onTogglePin,
}: Props): JSX.Element {
  /** Scrollable note list with selection and pin actions. */
  const pinned = notes.filter((n) => n.pinned);
  const others = notes.filter((n) => !n.pinned);

  const renderSection = (items: Note[]) =>
    items.map((n) => (
      <NoteItem
        key={n.id}
        note={n}
        active={selectedId === n.id}
        onClick={() => onSelect(n.id)}
        onTogglePin={() => onTogglePin(n.id)}
      />
    ));

  return (
    <div className="note-list">
      {pinned.length > 0 && (
        <>
          <div className="list-section-label">Pinned</div>
          {renderSection(pinned)}
          <div className="list-divider" />
        </>
      )}
      {renderSection(others)}
    </div>
  );
}

import React, { useRef } from "react";

type Props = {
  onMenuToggle: () => void;
  onNew: () => void;
  onSearch: ((...args: [string]) => void);
};

// PUBLIC_INTERFACE
export default function Header({ onMenuToggle, onNew, onSearch }: Props): JSX.Element {
  /** Top header with menu toggle, search field, and new note action. */
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="header">
      <div className="left">
        <button
          className="icon-btn"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
          title="Toggle menu"
        >
          ☰
        </button>
        <h1 className="title">Personal Notes</h1>
      </div>
      <div className="center">
        <input
          ref={inputRef}
          className="search"
          placeholder="Search notes (title or content)…"
          aria-label="Search notes"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="right">
        <button className="btn primary" onClick={onNew} title="Create a new note">
          + New
        </button>
      </div>
    </header>
  );
}

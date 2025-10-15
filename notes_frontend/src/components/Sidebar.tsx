import React from "react";

type Props = {
  visible: boolean;
  onNew: () => void;
  onClearAll: () => void;
  onImportSample: () => void;
  onToggleSidebar: () => void;
};

// PUBLIC_INTERFACE
export default function Sidebar({
  visible,
  onNew,
  onClearAll,
  onImportSample,
  onToggleSidebar,
}: Props): JSX.Element {
  /** Sidebar navigation and actions (Ocean Professional). */
  return (
    <aside className={`sidebar ${visible ? "show" : "hide"}`} aria-label="Sidebar">
      <div className="brand">
        <button
          className="sidebar-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          ☰
        </button>
        <span className="brand-title">Notes</span>
      </div>
      <div className="sidebar-actions">
        <button className="btn primary" onClick={onNew}>
          + New Note
        </button>
        <button className="btn secondary" onClick={onImportSample}>
          Import Sample
        </button>
        <button className="btn danger" onClick={onClearAll}>
          Clear All
        </button>
      </div>
      <div className="sidebar-footer">
        <p className="muted small">Ocean Professional</p>
        <p className="muted tiny">Blue & amber accents</p>
      </div>
    </aside>
  );
}

import React from "react";

type Props = {
  title: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
};

// PUBLIC_INTERFACE
export default function EmptyState({ title, description, ctaLabel, onCta }: Props): JSX.Element {
  /** Friendly empty state used for no notes and no search results. */
  return (
    <div className="empty-state">
      <div className="empty-graphic">📝</div>
      <h3>{title}</h3>
      {description && <p className="muted">{description}</p>}
      {ctaLabel && onCta && (
        <button className="btn primary" onClick={onCta} style={{ marginTop: 8 }}>
          {ctaLabel}
        </button>
      )}
    </div>
  );
}

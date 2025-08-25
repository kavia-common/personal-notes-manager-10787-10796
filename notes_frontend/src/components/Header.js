import React from 'react';
import './Header.css';

// PUBLIC_INTERFACE
function Header({ onAddNote, onSearch }) {
  /**
   * Renders the application header.
   * @param {function} onAddNote - Callback function to add a new note.
   * @param {function} onSearch - Callback function to handle search input.
   */
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-title">Notes</h1>
        <div className="header-actions">
          <input
            type="search"
            className="search-bar"
            placeholder="Search notes..."
            onChange={(e) => onSearch(e.target.value)}
          />
          <button className="add-note-btn" onClick={onAddNote}>
            + Add Note
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

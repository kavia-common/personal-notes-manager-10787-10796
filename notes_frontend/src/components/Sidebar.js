import React from 'react';
import './Sidebar.css';

// PUBLIC_INTERFACE
function Sidebar({ notes, activeNote, setActiveNote, onDeleteNote }) {
  /**
   * Renders the sidebar with a list of notes.
   * @param {array} notes - The array of note objects.
   * @param {string} activeNote - The ID of the currently active note.
   * @param {function} setActiveNote - Callback to set the active note.
   * @param {function} onDeleteNote - Callback to delete a note.
   */

  const sortedNotes = [...notes].sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="sidebar">
      {sortedNotes.map((note) => (
        <div
          key={note.id}
          className={`sidebar-note ${note.id === activeNote ? 'active' : ''}`}
          onClick={() => setActiveNote(note.id)}
        >
          <div className="sidebar-note-title">
            <strong>{note.title || 'Untitled Note'}</strong>
          </div>
          <p className="sidebar-note-preview">
            {note.content && note.content.substr(0, 100) + '...'}
          </p>
          <small className="sidebar-note-meta">
            Last modified{' '}
            {new Date(note.lastModified).toLocaleDateString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </small>
          <button
            className="delete-note-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;

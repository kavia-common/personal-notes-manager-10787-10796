import React from 'react';
import './NoteEditor.css';

// PUBLIC_INTERFACE
function NoteEditor({ activeNote, onUpdateNote }) {
  /**
   * Renders the note editing interface.
   * @param {object} activeNote - The note object to be edited.
   * @param {function} onUpdateNote - Callback to update the note.
   */

  if (!activeNote) {
    return <div className="no-active-note">Select a note to view or edit</div>;
  }

  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  return (
    <div className="note-editor">
      <input
        className="note-title-input"
        type="text"
        placeholder="Note Title"
        value={activeNote.title}
        onChange={(e) => onEditField('title', e.target.value)}
        autoFocus
      />
      <textarea
        className="note-content-textarea"
        placeholder="Write your note here..."
        value={activeNote.content}
        onChange={(e) => onEditField('content', e.target.value)}
      ></textarea>
    </div>
  );
}

export default NoteEditor;

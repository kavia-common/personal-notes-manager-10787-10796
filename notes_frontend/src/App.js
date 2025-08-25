import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // State for all notes, loaded from localStorage or initialized as empty array
  const [notes, setNotes] = useState(() => {
    try {
      const localData = localStorage.getItem('notes');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse notes from localStorage", error);
      return [];
    }
  });

  const [activeNote, setActiveNote] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Persist notes to localStorage whenever they change
  useEffect(() => {
    // Backend integration placeholder: save notes to the database here
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // PUBLIC_INTERFACE
  const onAddNote = () => {
    /**
     * Creates a new note and sets it as the active note.
     */
    const newNote = {
      id: uuidv4(),
      title: 'Untitled Note',
      content: '',
      lastModified: Date.now(),
    };
    // Backend integration placeholder: API call to create a new note
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  // PUBLIC_INTERFACE
  const onDeleteNote = (idToDelete) => {
    /**
     * Deletes a note with the given ID.
     * @param {string} idToDelete - The ID of the note to delete.
     */
    // Backend integration placeholder: API call to delete the note
    const filteredNotes = notes.filter((note) => note.id !== idToDelete);
    setNotes(filteredNotes);
    if (activeNote === idToDelete) {
      setActiveNote(filteredNotes.length > 0 ? filteredNotes[0].id : false);
    }
  };

  // PUBLIC_INTERFACE
  const onUpdateNote = (updatedNote) => {
    /**
     * Updates an existing note.
     * @param {object} updatedNote - The updated note object.
     */
    // Backend integration placeholder: API call to update the note
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header 
        className="app-header" 
        onAddNote={onAddNote} 
        onSearch={setSearchTerm} 
      />
      <Sidebar
        className="app-sidebar"
        notes={filteredNotes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        onDeleteNote={onDeleteNote}
      />
      <main className="app-main">
        <NoteEditor activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
      </main>
    </div>
  );
}

export default App;

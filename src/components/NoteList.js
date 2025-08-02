import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import useNoteService from '../services/NoteService';
import { useApi } from "../context/ApiContext";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [editedNote, setEditedNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const { getAllNotes, saveNote, deleteNoteById } = useNoteService();
  const { env } = useApi();

  useEffect(() => {
    fetchNotes();
  }, [env]);

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      const data = response.data;
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleEditNote = (note) => {
    setEditedNote(note);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  const handleSearch = () => {
    const filtered = notes.filter(note => {
      return note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             note.content.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredNotes(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredNotes(notes);
  };

  const handleSaveNote = async () => {
    try {
      const updatedNote = { ...editedNote, title: editedTitle, content: editedContent };
      await saveNote(updatedNote);
      fetchNotes();
      setEditedNote(null);
      setEditedTitle('');
      setEditedContent('');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNoteById(id);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleSaveNewNote = async () => {
    try {
      const newNote = { title: newNoteTitle, content: newNoteContent };
      await saveNote(newNote);
      fetchNotes();
      setNewNoteTitle('');
      setNewNoteContent('');
    } catch (error) {
      console.error('Error saving new note:', error);
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title> Notes APP </title>
      </Helmet>
      <h2 className="my-4">Notes</h2>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
          <button className="btn btn-secondary" type="button" onClick={clearSearch}>Clear</button>
        </div>
      </div>
      <ul className="list-group">
        {Array.isArray(notes) && notes.map(note => (
          <li key={note.id} className="list-group-item">
            {editedNote === note ? (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  className="form-control mb-2"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button className="btn btn-primary mr-2" onClick={handleSaveNote}>Save</button>
                <button className="btn btn-secondary" onClick={() => setEditedNote(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{note.title}</strong>: 
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: note.content }} />
                <button className="btn btn-warning mr-2" onClick={() => handleEditNote(note)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <h2 className="my-4">Add New Note</h2>
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          value={newNoteTitle}
          placeholder="Enter title"
          onChange={(e) => setNewNoteTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          value={newNoteContent}
          placeholder="Enter content"
          onChange={(e) => setNewNoteContent(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleSaveNewNote}>Save</button>
      </div>
    </div>
  );
}

export default NoteList;

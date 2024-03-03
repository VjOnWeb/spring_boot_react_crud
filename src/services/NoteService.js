import axios from 'axios';

const REST_API_NOTES_URL = "http://localhost:9898/api/notes";

const NoteService = {
    getAllNotes: () => axios.get(`${REST_API_NOTES_URL}`),
  
    createNote: (note) => axios.post(`${REST_API_NOTES_URL}/save`, note, {
        headers: {
            'Content-Type': 'application/json'
        }
    }),

    deleteNoteById: (id) => axios.delete(`${REST_API_NOTES_URL}/${id}`)
};

export default NoteService;

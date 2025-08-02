import axiosWithAuth from "../axiosWithAuth";
import { useApi } from "../context/ApiContext";

const useNoteService = () => {
  const { getBaseUrl } = useApi();

  const getAllNotes = () =>
    axiosWithAuth.get(`${getBaseUrl()}/api/notes`);

  const saveNote = (note) =>
    axiosWithAuth.post(`${getBaseUrl()}/api/notes/save`, note, {
      headers: { 'Content-Type': 'application/json' }
    });

  const deleteNoteById = (id) =>
    axiosWithAuth.delete(`${getBaseUrl()}/api/notes/${id}`);

  return { getAllNotes, saveNote, deleteNoteById };
};

export default useNoteService;

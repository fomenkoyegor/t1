import {state} from "../store/state";
import {Note} from "../models/Note";
import {parseDate} from "../helpers";



export const joinCategory = (note) => ({...note, category: state.categories.find(cat => cat.id === note.categoryId)});

export const joinNotes = (cat) => ({
    ...cat,
    active: state.notes.filter(note => note.categoryId === cat.id && !note.archived).length,
    archived: state.notes.filter(note => note.categoryId === cat.id && note.archived).length
});

export const archivedNotes = (note) => state.isArchivedNotes ? note.archived : note;


export const deleteNote = id => state.notes = state.notes.filter(note => note.id !== +id);

export const findNote = id => state.notes.find(note => note.id === +id);

export const updateNote = note => state.notes = state.notes.map(n => n.id === +note.id ? note : n);

export const updateNoteForm = (note, {name, content,categoryId}) => {
    updateNote({
        ...note,
        name,
        content,
        isEdit: false,
        dates: parseDate(content),
        categoryId,
        updated: Date.now()
    });
};

export const archivedNote = id => {
    const note = findNote(id);
    updateNote({...note, archived: !note.archived});
}

export const editNote = id => {
    const note = findNote(id);
    updateNote({...note, isEdit: !note.isEdit});
}

export const createNote = (name, content, categoryId) => state.notes = [...state.notes, Note(name,content,categoryId)];

export const archivedChange = () => state.isArchivedNotes = !state.isArchivedNotes;
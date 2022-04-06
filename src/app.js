import {state} from './store/state';
import {CategoryTable} from "./components/CategoryTable";
import {CategoriesList} from "./components/CategoriesList";
import {NoteBlock} from "./components/NoteBlock";
import {
    archivedNote,
    archivedNotes,
    deleteNote,
    findNote,
    joinCategory,
    joinNotes,
    editNote,
    archivedChange,
    createNote,
    updateNoteForm
} from "./functions";


const notesTable = document.querySelector('#notes>tbody');
const noteCategoryTable = document.querySelector('#note-category tbody');
const archivedChangeBtn = document.querySelector('.archived-change');
const categoriseList = document.querySelector('.categories-list');
const createNoteForm = document.querySelector('.create-note-form');
const createNoteBtn = document.querySelector('.create-note-btn');


const render = () => {
    const {notes, categories, isArchivedNotes} = state;
    notesTable.innerHTML =
        notes
            .filter(archivedNotes)
            .map(joinCategory)
            .map(note => NoteBlock(note, categories, isArchivedNotes))
            .join('');

    noteCategoryTable.innerHTML =
        categories
            .map(joinNotes)
            .map(CategoryTable)
            .join('');

    categoriseList.innerHTML = CategoriesList(categories)
}


render()

notesTable.addEventListener('submit', e => {
    e.preventDefault()
    if (e.target.matches('.edit-note-form')) {
        const noteId = +e.target.dataset.id;
        const note = findNote(noteId);
        const {name, content, categoryId} = e.target.elements;
        updateNoteForm(note, {
            name: name.value,
            content: content.value,
            categoryId: +categoryId.value
        });
        render();
    }
})

notesTable.addEventListener('click', e => {
    if (e.target.matches('.del-note')) {
        const noteId = e.target.dataset.id;
        deleteNote(noteId);
        render();
    }
    if (e.target.matches('.archived-note')) {
        const noteId = e.target.dataset.id;
        archivedNote(noteId);
        render();
    }
    if (e.target.matches('.edit-note')) {
        const noteId = e.target.dataset.id;
        editNote(noteId);
        render();
    }
    if (e.target.matches('.cancel-note')) {
        const noteId = e.target.dataset.id;
        editNote(noteId);
        render();
    }
});


archivedChangeBtn.addEventListener('click', () => {
    archivedChange();
    render();
});

createNoteBtn.addEventListener('click', () => {
    createNoteForm.classList.toggle('hidden');
});

createNoteForm.addEventListener('submit', e => {
    e.preventDefault();
    const {name, content, categoryId} = e.target.elements;
    createNote(name.value, content.value, +categoryId.value);
    render();
    e.target.reset();
    e.target.classList.toggle('hidden');
});





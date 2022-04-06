import {log} from './helpers';

const notesTable = document.querySelector('#notes>tbody');
const noteCategoryTable = document.querySelector('#note-category tbody');
const archivedChangeBtn = document.querySelector('.archived-change');
const categorieslist = document.querySelector('.categories-list');
const createNoteForm = document.querySelector('.create-note-form');
const createNoteBtn = document.querySelector('.create-note-btn');


const state = {
    categories: [],
    notes: [],
    isArchivedNotes: false
}

const uuid = () => Math.floor(Math.random() * 999999) + Date.now();
const formatDate = d => {
    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    return new Intl.DateTimeFormat('en-AU', options).format(new Date(d))
}
const parseDate = str => str.match(/\d{1,2}[-.\/]?\d{1,2}[.,\/]\d{1,2}[.,\/]\d{1,4}/g) || [];

const Category = (id, name, icon) => ({id, name, icon});

const Note = (name, content, categoryId) => {
    const icons = {
        edit: 'ads_click',
        delete: 'dangerous',
        archived: 'backup',
        success: 'check',
        cancel: 'close'
    };
    return {
        id: uuid(),
        created: Date.now(),
        updated: Date.now(),
        name,
        content,
        dates: parseDate(content),
        categoryId,
        isEdit: false,
        archived: false,
        icons,
    }
};


state.categories.push(Category(1, 'Task', 'shopping_cart'));
state.categories.push(Category(2, 'Random Thought', 'settings_accessibility'));
state.categories.push(Category(3, 'Idea', 'model_training'));
state.categories.push(Category(4, 'Quote', 'more_horiz'));

state.notes.push(Note('Shopping list', 'Your task is to create a notes app in JS as a web app. Users can add, edit and remove notes.', 1));
state.notes.push(Note('list', 'Notes in the table should also display a list of dates mentioned in this note as a separate column. For example, for a note “I’m gonna have a dentist appointment on the 03/05/2021, I moved it from 05/05/2021” the dates column is “30/05/2021, 05/05/2021”', 2));
state.notes.push(Note('lolo', 'List of notes is displayed in a form of table (HTML representation may vary: table, divs etc). The columns 12.12.22   05.04.08 are time of creation, note content, note category. Categories are predefined: “Task”, “Random Thought”, “Idea”', 3));
state.notes.push(Note('lol', 'Notes in the table should also display a list of dates mentioned in this note as a separate column. For example, for a note “I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021” the dates column is “3/5/2021, 5/5/2021”', 4));
state.notes.push(Note('react', 'Users can archive notes. Archived notes are not shown in the notes list. Users can view archived notes and un archive them.', 1));
state.notes.push(Note('vue', 'There should also be a summary table which counts notes by categories: separately for active and archived. The table is updated whenever users perform some action on notes. The summary table is shown on the same page as the notes table.', 2));
state.notes.push(Note('angular', 'There is no need to implement data storage. Simply create a JS variable which stores the data and pre populate it with 7 notes so that they are shown when the page is reloaded.', 3));
state.notes.push(Note('laravel', 'The goal of the task is to let you get better acquainted with the JavaScript language and browser DOM API. If you don’t know some of the APIs needed for the task, you might use these resources as references:', 4));


const renderNoteCard = note => (`
    <tr data-id="${note.id}" class="${note.archived && !state.isArchivedNotes ? 'archived' : ''}">
      <td>
          <i class="material-icons left">${note.category.icon}</i>
          ${note.name}
      </td>
      <td>${formatDate(note.created)}</td>
      <td>
         ${note.category.name}
      </td>
      <td>${note.content}</td>
      <td>${note.dates.join(' ')}</td>
      <td>
         <i class="material-icons edit-note" data-id="${note.id}">${note.icons['edit']}</i>
         <i class="material-icons archived-note" data-id="${note.id}">${note.icons['archived']}</i>
         <i class="material-icons del-note" data-id="${note.id}">${note.icons['delete']}</i>
      </td>
    </tr>
`);

const renderEditNoteForm = note => {
    return (`
        <tr>
          <td>
            <form class="edit-note-form" data-id="${note.id}">
              <div>
                <input type="text" name="name" value="${note.name}" required>      
              </div>
              <div>
                <textarea name="content" id="content-${note.id}" cols="30" rows="10" required>${note.content}</textarea>
              </div>
              <div>
                 <select name="categoryId" required>
                    <option value="${note.categoryId}">${note.category.name}</option>
                    ${renderCategoriesList()}
                 </select>  
              </div>
              
              <div>
              <button type="submit">
                <i class="material-icons">${note.icons.success}</i>
              </button>
              <button>
               <i class="material-icons cancel-note" data-id="${note.id}">${note.icons.cancel}</i>
               </button>
              </div>
            </form>
          </td>
        </tr>
    `);
};

const renderNote = note => {
    return note.isEdit ? renderEditNoteForm(note) : renderNoteCard(note);
};
const joinCategory = note => ({...note, category: state.categories.find(cat => cat.id === note.categoryId)});

const renderCategoryTable = cat => {
    return `
        <tr>
           <td>
             <i class="material-icons left">${cat.icon}</i>
             ${cat.name}
           </td>
           <td>${cat.active}</td>
           <td>${cat.archived}</td>
        </tr>
    `
};

const joinNotes = cat => ({
    ...cat,
    active: state.notes.filter(note => note.categoryId === cat.id && !note.archived).length,
    archived: state.notes.filter(note => note.categoryId === cat.id && note.archived).length
})

const archivedNotes = note => {
    if (state.isArchivedNotes) {
        return note.archived
    } else {
        return note;
    }
}

const renderCategoriesList = () => {
    return state.categories.map(c => (`<option value="${c.id}">${c.name}</option>`)).join('')
}

const render = () => {
    notesTable.innerHTML = state.notes
        .filter(archivedNotes)
        .map(joinCategory)
        .map(renderNote)
        .join('');

    noteCategoryTable.innerHTML = state.categories
        .map(joinNotes)
        .map(renderCategoryTable)
        .join('');

    categorieslist.innerHTML = renderCategoriesList()
}

const deleteNote = id => {
    log(id)
    const {notes} = state;
    state.notes = notes.filter(note => note.id !== +id);
}

const findNote = id => {
    return state.notes.find(note => note.id === +id);
}

const updateNote = note => {
    const {notes} = state;
    state.notes = notes.map(n => n.id === +note.id ? note : n);
}

const archivedNote = id => {
    const note = findNote(id);
    updateNote({...note, archived: !note.archived});
}

const editNote = id => {
    const note = findNote(id);
    updateNote({...note, isEdit: !note.isEdit});
}

const createNote = note => {
    const {notes} = state;
    state.notes = [...notes, note];
}

const archivedChange = () => {
    state.isArchivedNotes = !state.isArchivedNotes;
}

render()

notesTable.addEventListener('submit', e => {
    e.preventDefault()
    if (e.target.matches('.edit-note-form')) {
        const noteId = +e.target.dataset.id;
        const note = findNote(noteId);
        const {name, content, categoryId} = e.target.elements;
        updateNote({
            ...note,
            name: name.value,
            content: content.value,
            isEdit: false,
            dates: parseDate(content.value),
            categoryId: +categoryId.value,
            updated: Date.now()
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
})

createNoteForm.addEventListener('submit', e => {
    e.preventDefault();
    const {name, content, categoryId} = e.target.elements;
    const note = Note(name.value, content.value, +categoryId.value);
    createNote(note);
    render();
    e.target.reset();
    e.target.classList.toggle('hidden');
})
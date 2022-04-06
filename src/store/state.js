import { Category } from "../models/Category";
import { Note } from "../models/Note";

const state = {
    categories: [],
    notes: [],
    isArchivedNotes: false
}

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

export {state};


import {EditNoteForm} from "./EditNoteForm";
import {NoteCard} from "./NoteCard";

export const NoteBlock = (note,categories,isArchivedNotes) =>
    note.isEdit ? EditNoteForm(note, categories) : NoteCard(note, isArchivedNotes);
;
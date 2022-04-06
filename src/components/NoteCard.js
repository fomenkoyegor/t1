import { formatDate } from "../helpers";

export const NoteCard = (note, isArchivedNotes) => (`
    <tr data-id="${note.id}" class="${note.archived && !isArchivedNotes ? 'archived' : ''}">
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
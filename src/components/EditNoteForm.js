import { CategoriesList } from "./CategoriesList";

export const EditNoteForm = (note, categories) => (`
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
                    ${ CategoriesList(categories) }
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
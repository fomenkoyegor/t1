export const CategoryTable = category => {
    return `
        <tr>
           <td>
             <i class="material-icons left">${category.icon}</i>
             ${category.name}
           </td>
           <td>${category.active}</td>
           <td>${category.archived}</td>
        </tr>
    `
};
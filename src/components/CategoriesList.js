export const CategoriesList = (categories) => categories
    .map(c => (`
            <option value="${c.id}">${c.name}</option>
    `))
    .join('');
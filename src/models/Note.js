import {uuid, parseDate } from "../helpers";

export const Note = (name, content, categoryId) => {
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
const { log } = console;
const uuid = () => Math.floor(Math.random() * 999999) + Date.now();
const formatDate = d => {
    const options = {month: 'long', day: 'numeric', year: 'numeric'};
    return new Intl.DateTimeFormat('en-AU', options).format(new Date(d))
}
const parseDate = str => str.match(/\d{1,2}[-.\/]?\d{1,2}[.,\/]\d{1,2}[.,\/]\d{1,4}/g) || [];

export {
    log,
    uuid,
    formatDate,
    parseDate
};

/**
 * Format a timestamp with to give an output of dd/mm/yy hh:mm:ss 
 * @param {*} timestamp timestamp
 * @returns returns a date equivalent of the original timestamp with the format dd/mm/yyyy hh:mm:ss
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.getDate().toString().padStart(2, '0') + '/' +
    (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
    date.getFullYear() + ' ' +
    date.getHours().toString().padStart(2, '0') + ':' +
    date.getMinutes().toString().padStart(2, '0') + ':' +
    date.getSeconds().toString().padStart(2, '0');
}

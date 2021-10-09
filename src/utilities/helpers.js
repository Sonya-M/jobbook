
/**
 * @param {Date} date 
 * @returns {string} date string in the format "dd. mm. yyyy"
 */
export function formatDate(date) {
  // let d = date.getDate();
  // if (d < 10) d = "0" + d;
  // let m = date.getMonth() + 1;
  // if (m < 10) m = "0" + m;
  // let y = date.getFullYear();
  // return d + ". " + m + ". " + y + ".";
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' })
    .format(date);
}

export function shortFormattedDate(date) {
  let d = date.getDate();
  if (d < 10) d = "0" + d;
  let m = date.getMonth() + 1;
  if (m < 10) m = "0" + m;
  let y = date.getFullYear();
  return d + "/" + m + "/" + y % 100;
  // return date.toLocaleDateString()
}

export function formatDateForHtmlInput(date) {
  let d = date.getDate();
  if (d < 10) d = "0" + d;
  let m = date.getMonth() + 1;
  if (m < 10) m = "0" + m;
  let y = date.getFullYear();
  return ([y, m, d]).join("-");
}
/**
 * 
 * @param {string} stringToSearch 
 * @param {string} queryString 
 * @returns true if stringToSearch includes all of the words in query string, 
 * in any order (so if one types the surname before the first name,
 * the return val is still true)
 */
export const includesIgnoreCase = (stringToSearch, queryString) => {
  if (queryString.length === 0) return true;
  queryString = (queryString.trim());
  let queries = queryString.split(/\s+/);

  for (let i = 0; i < queries.length; i++) {
    if (i === queries.length - 1) queries[i] = new RegExp("\\b" + queries[i], "i");
    else queries[i] = new RegExp("\\b" + queries[i] + "\\b", "i");
  }
  for (let i = 0; i < queries.length; i++) {
    if (!stringToSearch.match(queries[i])) return false;
  }

  return true;
};


/**
 * Returns a copy of given array, sorted by given property
 * Assumes given property value is a string.
 * Sorting is done alphabetically, case ignored.
 * @param {Array} array array of objects to be sorted
 * @param {string} prop property name
 * @param {boolean} descending sort in descending order,
 */
export function sortByPropWithStrValue(array, prop, descending = false) {
  if (!descending) {
    return [...array].sort((obj1, obj2) => {
      return (obj1[prop].toLowerCase().localeCompare(obj2[prop].toLowerCase()))
    })
  } else {
    return [...array].sort((obj1, obj2) => {
      return (obj2[prop].toLowerCase().localeCompare(obj1[prop].toLowerCase()))
    })
  }
}

/**
* Sorts given array of objects by their date property
* @param {Array} array array of objects to be sorted
* @param {string} datePropName name of the prop with a Date value
* @param {boolean} descending sort in descending order? False by default
* @returns 
*/
export function sortByDate(array, datePropName, descending = false) {
  if (!descending) {
    return [...array].sort((obj1, obj2) => {
      return (new Date(obj1[datePropName]) - new Date(obj2[datePropName]))
    });
  } else {
    return [...array].sort((obj1, obj2) => {
      return (new Date(obj2[datePropName]) - new Date(obj1[datePropName]))
    })
  }
}

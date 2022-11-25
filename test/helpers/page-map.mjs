/**
 * This is a convenience function page for translating between english names
 * for the different pages on the microsite, and their respective URLs.
 */

// The mapping of pages and their URLs.
const pageLinks = {
  home: '/',
  login: '/login',
  calendar: '/calendar',
  manager: '/manager',
  'create new holiday': '/manager/add',
};

/**
 * The default page lookup function that, when provided with the name of a
 * page, will return the URL link to reach that page. If the pge doesn't
 * exist, then an error will be thrown instead.
 *
 * @param {string} inputWord - The name of the page we are looking up.
 * @returns {string} The URL of the page that we have looked up.
 * @throws {Error} Thrown when the page that the user was looking up does
 * not exist within our microsite.
 */
export default (inputWord) => {
  if (Object.prototype.hasOwnProperty.call(pageLinks, inputWord)) {
    return pageLinks[inputWord];
  }
  throw new Error('Unknown page link requested');
};

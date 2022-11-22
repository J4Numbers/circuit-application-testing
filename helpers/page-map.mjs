const pageLinks = {
  'home': '/',
  'login': '/login',
  'calendar': '/calendar',
  'manager': '/manager',
  'create new holiday': '/manager/add',
}

export default function (inputWord) {
  if (Object.prototype.hasOwnProperty.call(pageLinks, inputWord)) {
    return pageLinks[inputWord];
  }
  throw new Error('Unknown page link requested');
};

import { When } from '@cucumber/cucumber';
import {
  attemptCreateNewHoliday,
  attemptLogin,
  getGeneralPageOfApplication, clickLink,
} from '../workers/driver-workers.mjs';
import { generateAccessibilityReport } from '../workers/accessibility.mjs';

When('I click on the calendar link', function () {
  return clickLink(this, 'Calendar view');
});

When('I click on the manager link', function () {
  return clickLink(this, 'Day manager');
});

When('I click on the add new holiday link', function () {
  return clickLink(this, 'Add new holiday');
});

When('I load the {string} page', function (pageName) {
  return getGeneralPageOfApplication(this, pageName);
});

When('I submit a username of {string} and a password of {string}', function (username, password) {
  return attemptLogin(this, username, password);
});

When('I submit a title of {string} and a date of {string} and notes of {string}', function (title, date, notes) {
  return attemptCreateNewHoliday(this, title, date, notes);
});

When('I generate an accessibility report', function () {
  return generateAccessibilityReport(this);
});

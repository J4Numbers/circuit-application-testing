import { Then } from '@cucumber/cucumber';
import {
  testAccessibilityReportContainsNoViolations,
  testCurrentPageIsCalendarManagerPage,
  testCurrentPageIsAddNewHolidayPage,
  testCurrentPageIsCalendarPage,
  testCurrentPageIsHomepage,
  testCurrentPageIsLogInPage,
  testErrorSummaryContainsErrorForField,
  testLinkElementWithTextCount, awaitPageDisplaysErrorCount,
} from '../workers/assertion-workers.mjs';

Then('I am on the home page', function () {
  return testCurrentPageIsHomepage(this);
});

Then('I am on the login page', function () {
  return testCurrentPageIsLogInPage(this);
});

Then('I am on the calendar page', function () {
  return testCurrentPageIsCalendarPage(this);
});

Then('I am on the manager page', function () {
  return testCurrentPageIsCalendarManagerPage(this);
});

Then('I am on the add new holiday page', function () {
  return testCurrentPageIsAddNewHolidayPage(this);
});

Then('I have the option to log in', function () {
  return testLinkElementWithTextCount(this, 'Log in', 1);
});

Then('I have the option to log out', function () {
  return testLinkElementWithTextCount(this, 'Log out', 1);
});

Then('I have the option to visit my calendar view', function () {
  return testLinkElementWithTextCount(this, 'Calendar view', 1);
});

Then('I do not have the option to visit the calendar manager', function () {
  return testLinkElementWithTextCount(this, 'Day manager', 0);
});

Then('I have the option to visit the calendar manager', function () {
  return testLinkElementWithTextCount(this, 'Day manager', 1);
});

Then('{int} error(s) should be shown within an error summary', function (count) {
  return awaitPageDisplaysErrorCount(this, count);
});

Then('an error should be shown for the {string} field of {string}', function (fieldName, errorMessage) {
  return testErrorSummaryContainsErrorForField(this, fieldName, errorMessage);
});

Then('there should be no accessibility violations', function () {
  return testAccessibilityReportContainsNoViolations(this);
});

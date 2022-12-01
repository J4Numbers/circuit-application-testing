import { By, until } from 'selenium-webdriver';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

/**
 * Test whether the current page that the user is looking at is the homepage.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @returns {Promise<Chai.Assertion>} To be returned on completion.
 */
export async function testCurrentPageIsHomepage(world) {
  await world.webdriver.wait(until.elementLocated(By.linkText('Working day calendar')), 5000);
  return chai.expect(world.webdriver.getCurrentUrl()).to.eventually.equal(`${world.appUrl}/`);
}

/**
 * Test whether the current page that the user is looking at is the log in
 * page.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @returns {Promise<Chai.Assertion>} To be returned on completion.
 */
export async function testCurrentPageIsLogInPage(world) {
  await world.webdriver.wait(until.elementLocated(By.name('login-name')), 5000);
  return chai.expect(world.webdriver.getCurrentUrl()).to.eventually.equal(`${world.appUrl}/login`);
}

/**
 * Test whether the current page that the user is looking at is the calendar
 * page.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @returns {Promise<Chai.Assertion>} To be returned on completion.
 */
export async function testCurrentPageIsCalendarPage(world) {
  await world.webdriver.wait(until.elementLocated(By.className('calendar-date')), 5000);
  return chai.expect(world.webdriver.getCurrentUrl()).to.eventually.equal(`${world.appUrl}/calendar`);
}

/**
 * Test whether the current page that the user is looking at is the calendar
 * manager page.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @returns {Promise<Chai.Assertion>} To be returned on completion.
 */
export async function testCurrentPageIsCalendarManagerPage(world) {
  await world.webdriver.wait(until.elementLocated(By.className('calendar-date')), 5000);
  return chai.expect(world.webdriver.getCurrentUrl()).to.eventually.equal(`${world.appUrl}/manager`);
}

/**
 * Test whether the current page that the user is looking at is the holiday
 * creation sub-page of the holiday management section.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @returns {Promise<Chai.Assertion>} To be returned on completion.
 */
export async function testCurrentPageIsAddNewHolidayPage(world) {
  await world.webdriver.wait(until.elementLocated(By.name('holiday-title')), 5000);
  return chai.expect(world.webdriver.getCurrentUrl()).to.eventually.equal(`${world.appUrl}/manager/add`);
}

/**
 * Test whether a link exists within the page with some given text.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @param {string} text - The link text to search for.
 * @param {number} count - The number of elements to look for.
 * @returns {Promise<Chai.Assertion>} - To be returned on completion.
 */
export async function testLinkElementWithTextCount(world, text, count) {
  try {
    await world.webdriver.wait(until.elementLocated(By.linkText(text)), 2000);
  } catch (e) { /* empty */ }
  return chai.expect(world.webdriver.findElements(By.linkText(text)))
    .to.eventually.have.lengthOf(count);
}

/**
 * Test whether an error has been produced on the page which matches the
 * provided details - namely how many errors should be contained within
 * the error summary object.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @param {number} count - The number of errors we are expecting to be
 * displayed within the summary box.
 * @returns {Promise<Chai.Assertion>} - To be returned on completion.
 */
export async function awaitPageDisplaysErrorCount(world, count) {
  await world.webdriver.wait(until.elementLocated(By.className('govuk-error-summary__list')), 5000);
  const errors = await world.webdriver.findElements(By.className('govuk-error-summary__list'));
  chai.expect(errors).to.have.lengthOf(1);
  const errorCount = await errors[0].findElements(By.css('li'));
  return chai.expect(errorCount).to.have.lengthOf(count);
}

/**
 * Test whether an error has been produced on the page which matches the
 * provided details - namely the field that threw the error, and the specific
 * message that was returned.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @param {string} fieldName - The name of the field that we're expecting to
 * have produced an error.
 * @param {string} errorMessage - The error message we're looking out for.
 * @returns {Promise<Chai.Assertion>} - To be returned on completion.
 */
export async function testErrorSummaryContainsErrorForField(world, fieldName, errorMessage) {
  await world.webdriver.wait(until.elementLocated(By.className('govuk-error-summary__list')), 5000);
  const errors = await world.webdriver.findElements(By.className('govuk-error-summary__list'));
  chai.expect(errors).to.have.lengthOf(1);
  const errorToCheck = await errors[0].findElements(By.css(`a[href="#${fieldName}"]`));
  chai.expect(errorToCheck).to.have.lengthOf(1);
  return chai.expect(errorToCheck[0].getText()).to.eventually.equal(errorMessage);
}

/**
 * Test whether a previously generated accessibility report contains any
 * violations that would fail our accessibility testing requirements.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @returns {Promise<Chai.Assertion>} - To be returned on completion.
 */
export async function testAccessibilityReportContainsNoViolations(world) {
  return chai.expect(world.reportResults.violations).to.have.lengthOf(0);
}

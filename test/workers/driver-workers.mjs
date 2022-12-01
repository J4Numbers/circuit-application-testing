import { By, until } from 'selenium-webdriver';
import pageMapper from '../helpers/page-map.mjs';

/**
 * Go to a general page within an application when given the page name that
 * we're looking up.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @param {string} pageName - the name of the page to look up and visit
 * @returns {Promise<void>} To be returned on completion.
 */
export async function getGeneralPageOfApplication(world, pageName) {
  return world.webdriver.get(`${world.appUrl}${pageMapper(pageName)}`);
}

/**
 * Attempt to fill in the login details within the login page and submit
 * them.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @param {string} username - The username we're attempting to log in with.
 * @param {string} password - The password we're attempting to log in with.
 * @returns {Promise<void>} To be returned on completion.
 */
export async function attemptLogin(world, username, password) {
  await world.webdriver.wait(until.elementLocated(By.name('login-name')), 5000);
  const actioner = await world.webdriver.actions();
  return actioner
    .click(world.webdriver.findElement(By.name('login-name')))
    .sendKeys(username)
    .click(world.webdriver.findElement(By.name('login-password')))
    .sendKeys(password)
    .click(world.webdriver.findElement(By.id('login-submit')))
    .perform();
}

/**
 * Attempt to click on a defined link within the page.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @param {string} linkText - The text of the link that we will attempt to
 * click on.
 * @returns {Promise<void>} To be returned on completion.
 */
export async function clickLink(world, linkText) {
  await world.webdriver.wait(until.elementLocated(By.linkText(linkText)), 5000);
  const actioner = await world.webdriver.actions();
  return actioner
    .click(world.webdriver.findElement(By.linkText(linkText)))
    .perform();
}

/**
 * Attempt to fill in the fields to create a new holiday before submitting
 * them to be processed.
 *
 * @param {BrowserWorld} world - The world object that is shared within a
 * scenario.
 * @param {string} title - The title that we're filling in on the form.
 * @param {string} date - The date that we're filling in on the form.
 * @param {string} notes - The notes that we're filling in on the form.
 * @returns {Promise<void>} To be returned on completion.
 */
export async function attemptCreateNewHoliday(world, title, date, notes) {
  const actioner = await world.webdriver.actions();
  return actioner
    .click(world.webdriver.findElement(By.name('holiday-title')))
    .sendKeys(title)
    .click(world.webdriver.findElement(By.name('holiday-date')))
    .sendKeys(date)
    .click(world.webdriver.findElement(By.name('holiday-notes')))
    .sendKeys(notes)
    .click(world.webdriver.findElement(By.id('holiday-submit')))
    .perform();
}

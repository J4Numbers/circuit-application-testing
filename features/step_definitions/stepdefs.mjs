import {
  After, AfterAll, AfterStep,
  Before, BeforeAll,
  Given, setWorldConstructor, Status,
  Then, When
} from "@cucumber/cucumber";
import AxeBuilder from '@axe-core/webdriverjs';
import { createHtmlReport } from "axe-html-reporter";
import { By, until } from "selenium-webdriver";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import BrowserWorld from "../../helpers/browser-world.mjs";

const baseUrl = 'http://circuit-app:8080';
chai.use(chaiAsPromised);

setWorldConstructor(BrowserWorld)

BeforeAll(async function () {});

Before({ timeout: 60 * 1000 }, async function (scenario) {
  await this.init(scenario)
});

Given('I am an anonymous visitor to the site', function () {
});

Given('I have already visited the site as an anonymous user', async function () {
  return await this.webdriver.get(baseUrl);
});

Given('I have already visited the site as a full user', async function () {
  await this.webdriver.get(baseUrl);
  await this.webdriver.get(`${baseUrl}/login`);
  const actioner = await this.webdriver.actions();
  return actioner
    .click(this.webdriver.findElement(By.name("login-name")))
    .sendKeys('administrator')
    .click(this.webdriver.findElement(By.name("login-password")))
    .sendKeys('administrator')
    .click(this.webdriver.findElement(By.id('login-submit')))
    .perform();
});

Given('I am looking at the login page', async function () {
  return await this.webdriver.get(`${baseUrl}/login`);
});

Given('I am looking at the create new holiday page', async function () {
  return await this.webdriver.get(`${baseUrl}/manager/add`);
})

When('I click on the calendar link', async function () {
  const actioner = await this.webdriver.actions();
  return actioner
    .click(this.webdriver.findElement(By.linkText('Calendar view')))
    .perform();
})

When('I load the homepage', async function () {
  return await this.webdriver.get(baseUrl);
});

When('I load the login page', async function () {
  return await this.webdriver.get(`${baseUrl}/login`);
});

When('I load the calendar page', async function () {
  return await this.webdriver.get(`${baseUrl}/calendar`);
});

When('I load the manager page', async function () {
  return await this.webdriver.get(`${baseUrl}/manager`);
});

When('I load the create new holiday page', async function () {
  return await this.webdriver.get(`${baseUrl}/manager/add`);
});

When('I submit a username of {string} and a password of {string}', async function (username, password) {
  const actioner = await this.webdriver.actions();
  return actioner
    .click(this.webdriver.findElement(By.name("login-name")))
    .sendKeys(username)
    .click(this.webdriver.findElement(By.name("login-password")))
    .sendKeys(password)
    .click(this.webdriver.findElement(By.id('login-submit')))
    .perform();
});

When('I submit a title of {string} and a date of {string} and notes of {string}', async function (title, date, notes) {
  const actioner = await this.webdriver.actions();
  return actioner
    .click(this.webdriver.findElement(By.name('holiday-title')))
    .sendKeys(title)
    .click(this.webdriver.findElement(By.name('holiday-date')))
    .sendKeys(date)
    .click(this.webdriver.findElement(By.name('holiday-notes')))
    .sendKeys(notes)
    .click(this.webdriver.findElement(By.id('holiday-submit')))
    .perform();
})

Then('I am on the homepage', async function () {
  await this.webdriver.wait(until.elementLocated(By.linkText('Working day calendar')), 5000);
  return chai.expect(this.webdriver.getCurrentUrl()).to.eventually.equal(`${baseUrl}/`);
});

Then('I am on the login page', async function () {
  await this.webdriver.wait(until.elementLocated(By.name('login-name')), 5000);
  return chai.expect(this.webdriver.getCurrentUrl()).to.eventually.equal(`${baseUrl}/login`);
});

Then('I am on the calendar page', async function () {
  await this.webdriver.wait(until.elementLocated(By.className('calendar-date')), 5000);
  return chai.expect(this.webdriver.getCurrentUrl()).to.eventually.equal(`${baseUrl}/calendar`)
});

Then('I am on the manager page', async function () {
  await this.webdriver.wait(until.elementLocated(By.className('calendar-date')), 5000);
  return chai.expect(this.webdriver.getCurrentUrl()).to.eventually.equal(`${baseUrl}/manager`)
});

Then('I have the option to log in', async function () {
  return chai.expect(this.webdriver.findElements(By.linkText('Log in'))).to.eventually.have.lengthOf(1);
});

Then('I have the option to log out', async function () {
  return chai.expect(this.webdriver.findElements(By.linkText('Log out'))).to.eventually.have.lengthOf(1);
});

Then('I have the option to visit my calendar view', async function () {
  return chai.expect(this.webdriver.findElements(By.linkText('Calendar view'))).to.eventually.have.lengthOf(1);
});

Then('I do not have the option to visit the calendar manager', async function () {
  return chai.expect(this.webdriver.findElements(By.linkText('Day manager'))).to.eventually.have.lengthOf(0);
});

Then('I have the option to visit the calendar manager', async function () {
  return chai.expect(this.webdriver.findElements(By.linkText('Day manager'))).to.eventually.have.lengthOf(1);
});

Then('an error should be shown for the {string} field of {string}', async function (fieldName, errorMessage) {
  const errors = await this.webdriver.findElements(By.className('govuk-error-summary__list'));
  chai.expect(errors).to.have.lengthOf(1)
  const errorToCheck = await errors[0].findElements(By.css(`a[href="#${fieldName}"]`));
  chai.expect(errorToCheck).to.have.lengthOf(1);
  return chai.expect(errorToCheck[0].getText()).to.eventually.equal(errorMessage);
});

Then('there should be no accessibility violations', async function () {
  const results = await new AxeBuilder(this.webdriver).analyze();
  const reportText = createHtmlReport({
    results: {
      violations: results.violations,
    },
    options: {
      doNotCreateReportFile: true,
    },
  });
  this.attach(reportText);
  return chai.expect(results.violations).to.have.lengthOf(0);
});

AfterStep(async function () {
  await new Promise((resolve) => setTimeout(() => resolve(), 1000))
  // let world = this;
  // return this.webdriver.takeScreenshot().then((screenshot, error) => {
  //   if (!error) {
  //     world.attach(screenshot, 'base64:image/png');
  //   }
  // });
});

After(async function (scenario) {
  try {
    if (scenario.result.status === Status.FAILED) {
      const screenshot = await this.webdriver.takeScreenshot()
      await this.attach(screenshot, 'base64:image/png');
    }
  } catch (e) {
    console.log(e);
  }
  return await this.closeDriver();
});

AfterAll(async function () {});

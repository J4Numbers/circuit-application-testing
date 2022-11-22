import { Then } from "@cucumber/cucumber";
import AxeBuilder from '@axe-core/webdriverjs';
import { createHtmlReport } from "axe-html-reporter";
import { By, until } from "selenium-webdriver";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

Then('I am on the home page', async function () {
  await this.webdriver.wait(until.elementLocated(By.linkText('Working day calendar')), 5000);
  return chai.expect(this.webdriver.getCurrentUrl()).to.eventually.equal(`${this.appUrl}/`);
});

Then('I am on the login page', async function () {
  await this.webdriver.wait(until.elementLocated(By.name('login-name')), 5000);
  return chai.expect(this.webdriver.getCurrentUrl()).to.eventually.equal(`${this.appUrl}/login`);
});

Then('I am on the calendar page', async function () {
  await this.webdriver.wait(until.elementLocated(By.className('calendar-date')), 5000);
  return chai.expect(this.webdriver.getCurrentUrl()).to.eventually.equal(`${this.appUrl}/calendar`)
});

Then('I am on the manager page', async function () {
  await this.webdriver.wait(until.elementLocated(By.className('calendar-date')), 5000);
  return chai.expect(this.webdriver.getCurrentUrl()).to.eventually.equal(`${this.appUrl}/manager`)
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

const { BeforeAll, Before, Given, When, Then, After, AfterStep, AfterAll, Status } = require('@cucumber/cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { builder } = require('./selenium-builder')
const { By } = require('selenium-webdriver');

let webDriver;

const baseUrl = 'http://circuit-app:8080';
chai.use(chaiAsPromised);

Before(async function () {
  this.sessionStartTimestamp = new Date();
});

BeforeAll(async function () {
  webDriver = await builder('http://localhost:4444');
});

Given('I am an anonymous visitor to the site', function () {
});

Given('I have already visited the site as an anonymous user', async function () {
  await webDriver.get(baseUrl);
});

Given('I have already visited the site as a full user', async function () {
  await webDriver.get(`${baseUrl}/login`);
  const actioner = await webDriver.actions();
  return actioner
    .click(webDriver.findElement(By.name("login-name")))
    .sendKeys('administrator')
    .click(webDriver.findElement(By.name("login-password")))
    .sendKeys('administrator')
    .click(webDriver.findElement(By.id('login-submit')))
    .perform();
})

When('I load the homepage', async function () {
  await webDriver.get(baseUrl);
});

Then('I can see the homepage', async function () {
  return chai.expect(webDriver.getTitle()).to.eventually.equal('GOV.UK - Working day calendar');
});

Then('I have the option to log in', async function () {
  return chai.expect(webDriver.findElements(By.linkText('Login'))).to.eventually.have.lengthOf(1);
});

Then('I have the option to log out', async function () {
  return chai.expect(webDriver.findElements(By.linkText('Logout'))).to.eventually.have.lengthOf(1);
});

Then('I have the option to visit my calendar view', async function () {
  return chai.expect(webDriver.findElements(By.linkText('Calendar view'))).to.eventually.have.lengthOf(1);
});

Then('I do not have the option to visit the calendar manager', async function () {
  return chai.expect(webDriver.findElements(By.linkText('Day manager'))).to.eventually.have.lengthOf(0);
});

Then('I have the option to visit the calendar manager', async function () {
  return chai.expect(webDriver.findElements(By.linkText('Day manager'))).to.eventually.have.lengthOf(1);
});

AfterStep(async function () {
  let world = this;
  return webDriver.takeScreenshot().then((screenshot, error) => {
    if (!error) {
      world.attach(screenshot, 'base64:image/png');
    }
  });
});

After(async function (scenario) {
  try {
    if (scenario.result.status === Status.FAILED) {
      let world = this;
      const screenshot = await webDriver.takeScreenshot()
      world.attach(screenshot, 'base64:image/png');
    }
  } catch (e) {
    console.log(e);
  } finally {
    // await webDriver.close();
  }
});

AfterAll(async function () {
  return await webDriver.quit();
});

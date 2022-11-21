const { BeforeAll, Before, Given, When, Then, After, AfterStep, AfterAll, Status } = require('@cucumber/cucumber');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { builder } = require('./selenium-builder')
const { By } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const safari = require('selenium-webdriver/safari');
const edge = require('selenium-webdriver/edge');

const baseUrl = 'http://circuit-app:8080';
chai.use(chaiAsPromised);

BeforeAll(async function () {
  // this.webDriver = await builder('http://localhost:4444');
});

Before(async function () {
  this.webDriver = await new webdriver.Builder()
    .forBrowser(webdriver.Browser.FIREFOX)
    .usingServer('http://localhost:4444')
    .setChromeOptions(chrome.Options)
    .setFirefoxOptions(firefox.Options)
    .setSafariOptions(safari.Options)
    .setEdgeOptions(edge.Options)
    .build();
});

Given('I am an anonymous visitor to the site', function () {
});

Given('I have already visited the site as an anonymous user', async function () {
  await this.webDriver.get(baseUrl);
});

Given('I have already visited the site as a full user', async function () {
  await this.webDriver.get(`${baseUrl}/login`);
  const actioner = await this.webDriver.actions();
  return actioner
    .click(this.webDriver.findElement(By.name("login-name")))
    .sendKeys('administrator')
    .click(this.webDriver.findElement(By.name("login-password")))
    .sendKeys('administrator')
    .click(this.webDriver.findElement(By.id('login-submit')))
    .perform();
});

When('I load the homepage', async function () {
  await this.webDriver.get(baseUrl);
});

When('I load the login page', async function () {
  await this.webDriver.get(`${baseUrl}/login`);
});

Then('I am on the homepage', async function () {
  return chai.expect(this.webDriver.getCurrentUrl()).to.eventually.equal(`${baseUrl}/`);
});

Then('I am on the login page', async function () {
  return chai.expect(this.webDriver.getCurrentUrl()).to.eventually.equal(`${baseUrl}/login`);
});

Then('I have the option to log in', async function () {
  return chai.expect(this.webDriver.findElements(By.linkText('Log in'))).to.eventually.have.lengthOf(1);
});

Then('I have the option to log out', async function () {
  return chai.expect(this.webDriver.findElements(By.linkText('Log out'))).to.eventually.have.lengthOf(1);
});

Then('I have the option to visit my calendar view', async function () {
  return chai.expect(this.webDriver.findElements(By.linkText('Calendar view'))).to.eventually.have.lengthOf(1);
});

Then('I do not have the option to visit the calendar manager', async function () {
  return chai.expect(this.webDriver.findElements(By.linkText('Day manager'))).to.eventually.have.lengthOf(0);
});

Then('I have the option to visit the calendar manager', async function () {
  return chai.expect(this.webDriver.findElements(By.linkText('Day manager'))).to.eventually.have.lengthOf(1);
});

AfterStep(async function () {
  // let world = this;
  // return webDriver.takeScreenshot().then((screenshot, error) => {
  //   if (!error) {
  //     world.attach(screenshot, 'base64:image/png');
  //   }
  // });
});

After(async function (scenario) {
  try {
    if (scenario.result.status === Status.FAILED) {
      let world = this;
      const screenshot = await this.webDriver.takeScreenshot()
      world.attach(screenshot, 'base64:image/png');
    }
  } catch (e) {
    console.log(e);
  } finally {
    await this.webDriver.quit();
  }
});

AfterAll(async function () {
  // return await webDriver.quit();
});

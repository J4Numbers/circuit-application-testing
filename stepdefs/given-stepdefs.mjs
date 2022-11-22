import { Given } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import pageMapper from '../helpers/page-map.mjs';

Given('I am an anonymous visitor to the site', function () {
});

Given('I have already visited the site as an anonymous user', async function () {
  return await this.webdriver.get(this.appUrl);
});

Given('I have already visited the site as a full user', async function () {
  await this.webdriver.get(this.appUrl);
  await this.webdriver.get(`${this.appUrl}/login`);
  const actioner = await this.webdriver.actions();
  return actioner
    .click(this.webdriver.findElement(By.name("login-name")))
    .sendKeys('administrator')
    .click(this.webdriver.findElement(By.name("login-password")))
    .sendKeys('administrator')
    .click(this.webdriver.findElement(By.id('login-submit')))
    .perform();
});

Given('I am looking at the {string} page', async function (pageName) {
  return await this.webdriver.get(`${this.appUrl}${pageMapper(pageName)}`);
});

import { When } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import pageMapper from '../helpers/page-map.mjs'

When('I click on the calendar link', async function () {
  const actioner = await this.webdriver.actions();
  return actioner
    .click(this.webdriver.findElement(By.linkText('Calendar view')))
    .perform();
})

When('I load the {string} page', async function (pageName) {
  return await this.webdriver.get(`${this.appUrl}${pageMapper(pageName)}`);
})

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

import { World } from '@cucumber/cucumber';
import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';
import edge from 'selenium-webdriver/edge.js';

/**
 * The BrowserWorld custom world is a working which wraps around a Selenium
 * webdriver that connects to an external Selenium hub. As part of that,
 * it also takes in a locator for a Selenium hub, and a locator for where
 * that Selenium hub can reach out to the webapp we're testing.
 */
export default class BrowserWorld extends World {
  /**
   * The driver behind the actions we are going to be carrying out. Talks to
   * a remote Selenium service which enacts commands as required.
   *
   * @type {webdriver.WebDriver}
   */
  webdriver = null;

  /**
   * A URL to the selenium hub that we're going to be contacting during
   * testing.
   *
   * @type {string}
   */
  seleniumServer = 'http://localhost:4444';

  /**
   * A URL to the application that we're going to be testing from the POV
   * of the Selenium hub.
   *
   * @type {string}
   */
  appUrl = 'http://localhost:8080';

  /**
   * The scenario that is currently being run through the suite
   *
   * @type {ITestCaseHookParameter}
   */
  scenario;

  /**
   * Load in the world with two optional properties to override the location
   * of the Selenium server and the application
   *
   * @param {object} opts - Any parameters that we're loading into the world.
   */
  constructor(opts) {
    super(opts);
    if (Object.prototype.hasOwnProperty.call(opts.parameters, 'seleniumServer')) {
      this.seleniumServer = opts.parameters.seleniumServer;
    }
    if (Object.prototype.hasOwnProperty.call(opts.parameters, 'appUrl')) {
      this.appUrl = opts.parameters.appUrl;
    }
  }

  /**
   * To be called at the start of each scenario so that we can load in a new
   * webdriver for a suite of tests. We explicitly define the external hub
   * server to be used, along with a set of options for potential browsers
   * that we're going to be testing with.
   *
   * @param {ITestCaseHookParameter} scenario - The scenario that has just
   * started.
   * @returns {Promise<void>} On completion of loading up a new webdriver.
   */
  async init(scenario) {
    this.scenario = scenario;
    this.webdriver = await new webdriver.Builder()
      .forBrowser(webdriver.Browser.CHROME)
      .usingServer(this.seleniumServer)
      .setChromeOptions(chrome.Options)
      .setFirefoxOptions(firefox.Options)
      .setEdgeOptions(edge.Options)
      .build();
  }

  /**
   * To be called after each scenario so that we can clean down the webdriver
   * in preparation for a new session.
   *
   * @param {ITestCaseHookParameter} scenario - The scenario that we have
   * currently finished.
   * @returns {Promise<void>} On completion of closing down the webdriver.
   */
  async closeDriver(scenario) {
    delete this.scenario;
    await this.webdriver.quit();
  }
}

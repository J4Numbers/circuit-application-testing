import { World } from '@cucumber/cucumber';
import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';
import edge from 'selenium-webdriver/edge.js';

export default class BrowserWorld extends World {
  webdriver = null;
  seleniumServer;
  appUrl;

  constructor(opts) {
    super(opts);
    if (Object.prototype.hasOwnProperty.call(opts.parameters, 'seleniumServer')) {
      this.seleniumServer = opts.parameters.seleniumServer;
    } else {
      this.seleniumServer = 'http://localhost:4444';
    }
    if (Object.prototype.hasOwnProperty.call(opts.parameters, 'appUrl')) {
      this.appUrl = opts.parameters.appUrl;
    } else {
      this.appUrl = 'http://localhost:8080'
    }
  }

  async init(scenario) {
    this.webdriver = await new webdriver.Builder()
      .forBrowser(webdriver.Browser.CHROME)
      .usingServer(this.seleniumServer)
      .setChromeOptions(chrome.Options)
      .setFirefoxOptions(firefox.Options)
      .setEdgeOptions(edge.Options)
      .build();
  }

  async closeDriver(scenario) {
    await this.webdriver.quit();
  }
}

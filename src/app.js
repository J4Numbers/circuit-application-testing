const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')
const firefox = require('selenium-webdriver/firefox');
const safari = require('selenium-webdriver/safari');
const edge = require('selenium-webdriver/edge');

const fs = require('fs');

const builder = (url) => new webdriver.Builder()
  .forBrowser(webdriver.Browser.FIREFOX)
  .usingServer(url)
  .setChromeOptions(chrome.Options)
  .setFirefoxOptions(firefox.Options)
  .setSafariOptions(safari.Options)
  .setEdgeOptions(edge.Options)
  .build();

const runSelenium = async () => {
  let driver = await builder('http://localhost:4444');
  let sessionTimestamp = new Date();
  try {
    await driver.get('http://circuit-app:8080');
    const screenshot = await driver.takeScreenshot();
    const dataToWrite = screenshot.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(`${sessionTimestamp.toISOString()}-homepage.png`,
      dataToWrite, {encoding: 'base64'});
  } catch (e) {
    console.log(e);
  } finally {
    console.log('Destroying the driver...');
    try {
      await driver.quit();
    } catch (e) {
      console.log(e);
    }
  }
}

runSelenium()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

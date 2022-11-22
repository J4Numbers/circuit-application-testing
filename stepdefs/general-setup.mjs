import {
  Before, After,
  setWorldConstructor, Status,
} from '@cucumber/cucumber';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import BrowserWorld from '../helpers/browser-world.mjs';

chai.use(chaiAsPromised);
setWorldConstructor(BrowserWorld);

Before({ timeout: 60 * 1000 }, async function (scenario) {
  await this.init(scenario);
});

// AfterStep(async function () {
//   await new Promise((resolve) => setTimeout(() => resolve(), 1000))
//   let world = this;
//   return this.webdriver.takeScreenshot().then((screenshot, error) => {
//     if (!error) {
//       world.attach(screenshot, 'base64:image/png');
//     }
//   });
// });

After(async function (scenario) {
  try {
    if (scenario.result.status === Status.FAILED) {
      const screenshot = await this.webdriver.takeScreenshot();
      await this.attach(screenshot, 'base64:image/png');
    }
  } catch (e) {
    this.log(e);
  }
  return this.closeDriver();
});

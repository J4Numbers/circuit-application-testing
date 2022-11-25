import { Status } from '@cucumber/cucumber';

/**
 * Before each scenario, we want to load in a new webdriver to ensure our
 * sessions do not contaminate each other.
 *
 * @param {ITestCaseHookParameter} scenario - The scenario that we have
 * just started.
 * @returns {Promise<void>} On completion of the function.
 */
export async function beforeEachScenario(scenario) {
  await this.init(scenario);
  const caps = await this.webdriver.getCapabilities();
  const keyMap = {};
  for (const key of caps.keys()) {
    keyMap[key] = caps.get(key);
  }
  this.attach(JSON.stringify(keyMap), 'application/json');
}

/**
 * A debug function which exists to take screenshots after each step and
 * hard-debug whether something has gone awry.
 *
 * @returns {Promise<void>} On completion of the function.
 */
export async function afterEachStep() {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  const world = this;
  return this.webdriver.takeScreenshot().then((screenshot, error) => {
    if (!error) {
      world.attach(screenshot, 'base64:image/png');
    }
  });
}

/**
 * After each function, we check whether the scenario was a success, and if it
 * wasn't, we take a screenshot of the last point of failure.
 *
 * Regardless of success, we ensure that the webdriver has been closed safely.
 *
 * @param {ITestCaseHookParameter} scenario - The scenario that has just
 * finished.
 * @returns {Promise<void>} On completion of the function.
 */
export async function afterEachScenario(scenario) {
  try {
    if (scenario.result.status === Status.FAILED) {
      const screenshot = await this.webdriver.takeScreenshot();
      await this.attach(screenshot, 'base64:image/png');
    }
  } catch (e) {
    this.log(e);
  }
  return this.closeDriver(scenario);
}

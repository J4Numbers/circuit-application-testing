import {
  Before, After,
  setWorldConstructor,
} from '@cucumber/cucumber';
import BrowserWorld from '../helpers/browser-world.mjs';
import {
  afterEachScenario,
  // afterEachStep,
  beforeEachScenario,
} from '../workers/general-workers.mjs';

setWorldConstructor(BrowserWorld);

Before({ timeout: 60 * 1000 }, beforeEachScenario);
// AfterStep(afterEachStep);
After(afterEachScenario);

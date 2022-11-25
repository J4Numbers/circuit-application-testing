import { readFileSync } from 'fs';
import { join } from 'path';
import reporter from 'cucumber-html-reporter';

let mode;
switch (process.argv[2]) {
  case 'chrome':
    mode = '.chrome';
    break;
  case 'firefox':
    mode = '.firefox';
    break;
  case 'edge':
    mode = '.edge';
    break;
  default:
    mode = '';
}

const metadata = JSON.parse(
  JSON.parse(
    readFileSync(`outputs/cucumber${mode}.json`).toString(),
  )[0].elements[0].steps[0].embeddings[0].data,
);

// Some options for where we're rendering the report from all of our work.
const options = {
  theme: 'bootstrap',
  brandTitle: `Cucumber report${mode}`,
  metadata,
  columnLayout: 1,
  storeScreenshots: false,
  screenshotsDirectory: 'outputs/screenshots',
  jsonFile: `outputs/cucumber${mode}.json`,
  output: `outputs/cucumber${mode}.html`,
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
};

reporter.generate(options);

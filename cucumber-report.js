import reporter from 'cucumber-html-reporter';

const options = {
  theme: 'bootstrap',
  screenshotsDirectory: 'outputs/screenshots',
  jsonFile: 'outputs/cucumber.json',
  output: 'outputs/cucumber.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
};

reporter.generate(options);

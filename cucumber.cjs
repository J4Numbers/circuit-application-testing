// Some common rules for when we're running cucumber tests.
const commonRules = {
  parallel: 3,
  format: [
    'json:outputs/cucumber.json',
    'progress-bar',
  ],
  formatOptions: {
    snippetInterface: 'synchronous',
  },
  publishQuiet: true,
  worldParameters: {
    defaultTimeout: '15000',
    seleniumServer: 'http://localhost:4444',
    appUrl: 'http://circuit-app:8080',
  },
  tags: '@Regression',
  import: [
    'test/stepdefs/*.mjs',
  ],
};

module.exports = {
  default: {
    ...commonRules,
  },
  chrome: {
    ...commonRules,
    format: [
      'json:outputs/cucumber.chrome.json',
      'progress-bar',
    ],
  },
  firefox: {
    ...commonRules,
    format: [
      'json:outputs/cucumber.firefox.json',
      'progress-bar',
    ],
  },
  edge: {
    ...commonRules,
    format: [
      'json:outputs/cucumber.edge.json',
      'progress-bar',
    ],
  },
};

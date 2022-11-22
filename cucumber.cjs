module.exports = {
  default: {
    parallel: 3,
    format: [
      'json:outputs/cucumber.json',
      'progress-bar',
    ],
    formatOptions: {
      snippetInterface: 'synchronous'
    },
    publishQuiet: true,
    worldParameters: {
      defaultTimeout: '15000',
      seleniumServer: 'http://localhost:4444',
      appUrl: 'http://circuit-app:8080',
    },
    import: [
      'stepdefs/*.mjs'
    ]
  },
};

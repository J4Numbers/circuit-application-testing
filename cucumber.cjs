module.exports = {
  default: {
    parallel: 3,
    format: ['json:outputs/cucumber.json'],
    formatOptions: {
      snippetInterface: 'synchronous'
    },
    worldParameters: {
      defaultTimeout: '15000'
    }
  },
};

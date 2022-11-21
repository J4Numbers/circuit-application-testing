module.exports = {
  default: {
    format: ['html:outputs/cucumber.html'],
    formatOptions: {
      snippetInterface: 'synchronous'
    },
    worldParameters: {
      defaultTimeout: '15000'
    }
  },
};

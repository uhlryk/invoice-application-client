exports.config = {
  allScriptsTimeout: 15000,
  specs: [
    '*_spec.js'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:3010/',
  framework: 'jasmine',
  jasmineNodeOpts:{
    defaultTimeoutInterval:15000
  }
};
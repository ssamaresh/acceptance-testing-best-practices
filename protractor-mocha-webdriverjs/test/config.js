// An example configuration file.
exports.config = {
  
  seleniumAddress: 'http://localhost:4444/wd/hub',

  baseUrl: 'http://localhost:3000',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Framework to use. Jasmine 2 is recommended.
  framework: 'mocha',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['./specs/**/*.js'],

  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
  
};
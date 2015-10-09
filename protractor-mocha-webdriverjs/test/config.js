
exports.config = {
  
  seleniumAddress: 'http://localhost:4444/wd/hub',

  baseUrl: 'http://localhost:3000',

  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'mocha',

  suites: {
    all: ['./specs/**/*.js'],
    home: ['./specs/hooks.spec.js', './specs/home.page.js'],
    settings: ['./specs/hooks.spec.js', './specs/settings/*.js'],
    transactions: ['./specs/hooks.spec.js', './specs/transactions/*.js'],
    dashboard: ['./specs/hooks.spec.js', './specs/dashboard/*.js']
  },

  getPageTimeout: 30000,
  allScriptsTimeout: 30000

};
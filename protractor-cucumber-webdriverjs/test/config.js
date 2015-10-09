
exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',

  baseUrl: 'http://localhost:3000',

  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'cucumber',

   suites: {
    all: ['./features/*.feature'],
    settings: ['./features/accounts.feature'],
    transactions: ['./features/transcations.feature'],
    dashboard: ['./features/reporting.feature']
  },

  cucumberOpts: {
    require: ['./step_definitions/support/hooks.js', './step_definitions/*.steps.js'],
    format: 'pretty'
  }

};
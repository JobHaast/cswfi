// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require('jasmine-spec-reporter');
let server;
/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./src/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--no-sandbox'],
    },
    maxInstances: 4,
    shardTestFiles: true,
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {},
  },

  ngApimockOpts: {
    angularVersion: 2,
    hybrid: false,
  },

  beforeLaunch: () => {
    // Start the API mock server.
    const child_process = require('child_process');
    const path = require('path');
    server = child_process.spawn(
      'node',
      [path.join(__dirname, 'mockserver.js')],
      {
        cwd: __dirname,
        stdio: 'inherit',
      }
    );
    process.on('exit', () => server.kill());
  },

  afterLaunch: () => {
    server.kill();
  },

  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json'),
    });
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: StacktraceOption.PRETTY,
        },
      })
    );
  },
};
// exports.config = {
//   allScriptsTimeout: 11000,
//   specs: [
//     './src/**/*.e2e-spec.ts'
//   ],
//   capabilities: {
//     browserName: 'chrome'
//   },
//   directConnect: true,
//   baseUrl: 'http://localhost:4200/',
//   framework: 'jasmine',
//   jasmineNodeOpts: {
//     showColors: true,
//     defaultTimeoutInterval: 30000,
//     print: function() {}
//   },
//   onPrepare() {
//     require('ts-node').register({
//       project: require('path').join(__dirname, './tsconfig.json')
//     });
//     jasmine.getEnv().addReporter(new SpecReporter({
//       spec: {
//         displayStacktrace: StacktraceOption.PRETTY
//       }
//     }));
//   }
// };

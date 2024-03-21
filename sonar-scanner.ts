/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prefer-top-level-await */
const envName = '.env';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const configDotenv = require('dotenv').config({ path: envName });
const sonarqubeScanner = require('sonarqube-scanner');

// The URL of the SonarQube server. Defaults to http://localhost:9000
const serverUrl = process.env.SONARQUBE_URL || 'http://127.0.0.1:9000';

// The token used to connect to the SonarQube/SonarCloud server. Empty by default.
const token = process.env.SONARQUBE_TOKEN || '';

// projectKey must be unique in a given SonarQube instance
const projectKey = process.env.SONARQUBE_PROJECTKEY || '';

const projectVersion = `${process.env.SONARQUBE_PROJECT_VERSION}`;

const excludedFolders = '**/*.json, src/**/*.spec.ts, src/**/*.test.ts, **@types**, **node_modules**';
const coverageExcludedFolders = '**/*.json, src/**/*.spec.ts, src/**/*.module.ts, src/**/*.test.ts, src/cache/**/*, src/constants/**/*, src/core/**/*, src/filters/**/*, src/helpers/**/*, src/lib/**/*, src/repo/**/*, **@types**, **node_modules**, src/main.ts';

const options = {
  'sonar.projectKey': projectKey,
  'sonar.projectVersion': projectVersion,
  'sonar.sources': 'src',
  'sonar.tests': 'src, test',
  'sonar.inclusions': 'src/**/*.ts', // Entry point of your code
  'sonar.language': 'ts',
  'sonar.test.inclusions': 'src/**/*.spec.ts,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
  'sonar.coverage.reportPaths': 'coverage/lcov.info',
  'sonar.testExecutionReportPaths': 'coverage/unit-test-reporter.xml',
  'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
  'sonar.eslint.reportPaths': '.eslint-report.json',
  'sonar.exclusions': excludedFolders,
  'sonar.coverage.exclusions': coverageExcludedFolders
};

// parameters for sonarqube-scanner
const params = {
  serverUrl,
  token,
  options
};

sonarqubeScanner(
  {
    serverUrl,
    token,
    options
  },
  () => process.exit()
)
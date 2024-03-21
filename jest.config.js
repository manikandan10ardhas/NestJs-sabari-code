module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // roots: ['<rootDir>/src'],
  rootDir: 'src',
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/src/**/?(*.)+(spec|test).+(ts|tsx|js)'],
  // testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/tests/integration/'],
  watchPathIgnorePatterns: ['.*jest-stare.*\\.js'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/../src/core/$1',
    '^@repo/(.*)$': '<rootDir>/../src/repo/$1',
    '^@constants/(.*)$': '<rootDir>/../src/constants/$1',
    '^@filters/(.*)$': '<rootDir>/../src/filters/$1',
    '^@helpers/(.*)$': '<rootDir>/../src/helpers/$1',
    '^@modules/(.*)$': '<rootDir>/../src/modules/$1',
    '^@lib/(.*)$': '<rootDir>/../src/lib/$1'
  },
  coverageDirectory: '../coverage',
  coverageReporters: ['html', 'text', 'lcov', 'cobertura'],
  collectCoverageFrom: [
    "**/modules/**/*.(t|j)s",
    "!**/modules/**/*.module.(t|j)s",
    '!**/modules/**/*.index.(t|j)s',
    '!**/modules/**/*.dto.(t|j)s',
    '!**/node_modules/**',
    '!**/src/**/*.interface.ts',
    '!**/src/**/?(*.)+(spec|test).+(ts|tsx|js)',
    '!**/dist/*',
    '!**/*.d.ts'
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsconfig: 'tsconfig.json'
    }
  },
  testResultsProcessor: 'jest-sonar-reporter',
  reporters: [
    'default',
    [
      'jest-stare',
      {
        resultDir: './jest-stare',
        reportTitle: 'NestJS LP',
        coverageLink: '../coverage/lcov-report/index.html'
      }
    ],
    [
      'jest-junit',
      {
        outputDirectory: 'coverage',
        outputName: 'junit.xml',
        suiteName: 'jest tests'
      }
    ]
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85
    }
  }
};

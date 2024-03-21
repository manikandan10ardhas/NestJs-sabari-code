module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'sonarjs'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true
  },
  ignorePatterns: [
    '.eslintrc.js',
    'projects/**/*',
    'sonar-scanner.ts',
    'node_modules/**/*',
    'test/**/*',
    'sonar.js',
    'sonar-scanner.ts',
    '*.spec.ts'
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        paths: 'src',
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true
      },
      extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/base',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:unicorn/recommended',
        'plugin:prettier/recommended',
        // "plugin:json/recommended",
        'prettier',
        'plugin:sonarjs/recommended'
      ],
      rules: {
        'sort-imports': [
          'error',
          {
            ignoreCase: false,
            ignoreDeclarationSort: true
            // "ignoreMemberSort": false,
            // "memberSyntaxSortOrder": [
            //   "none",
            //   "all",
            //   "multiple",
            //   "single"
            // ],
            // "allowSeparatedGroups": false
          }
        ],
        'import/order': [
          1,
          {
            groups: [
              'external',
              'builtin'
              // "internal",
              // "sibling",
              // "parent",
              // "index"
            ],
            'newlines-between': 'always',
            pathGroupsExcludedImportTypes: ['internal'],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true
            }
          }
        ],
        semi: 'off',
        'prettier/prettier': [
          'warn',
          {
            parser: 'typescript'
          }
        ],
        'no-param-reassign': [
          2,
          {
            props: false
          }
        ],
        'no-console': 0,
        'space-before-function-paren': 0,
        'no-underscore-dangle': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/prefer-module': 0,
        'unicorn/prefer-node-protocol': 0,
        'unicorn/no-null': 0,
        'unicorn/no-array-reduce': 0,
        'unicorn/prefer-object-from-entries': 0,
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              camelCase: true,
              pascalCase: true,
              kebabCase: true
            }
          }
        ],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        // "sonarjs/cognitive-complexity": [
        //     "warn",
        //     25
        // ]
        'sonarjs/cognitive-complexity': 'off'
      }
    }
  ]
};

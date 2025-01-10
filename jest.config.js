module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Mock styles
    '\\.svg$': '<rootDir>/src/__mocks__/svgMock.js', // Mock SVG imports
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}', // Include all source files
    'src/pages/**/*.{js,jsx,ts,tsx}', // Include all source files
    'src/utils/**/*.{js,jsx,ts,tsx}', // Include all source files
    '!src/**/*.d.ts', // Exclude TypeScript declaration files
    '!src/**/index.ts', // Exclude TypeScript declaration files
    '!src/setupTests.ts', // Exclude setup files
    '!src/utils/*.{js,ts}',
    '!src/types/*.{js,ts}',
    '!src/services/*',
    '!src/routes/*',
  ],
  coverageDirectory: 'coverage', // Directory where coverage reports will be saved
};

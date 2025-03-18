import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/*.test.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 路径别名映射
  },
  collectCoverageFrom: ['src/**/*.ts'], // 收集测试覆盖率
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/', '/dist/'],
}

export default config

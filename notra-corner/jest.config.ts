import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
   transformIgnorePatterns: [
    '/node_modules/(?!(synckit|@pkgr)/)', 
  ],
}

export default createJestConfig(config)

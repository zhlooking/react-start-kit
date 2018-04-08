import PromiseAPlusTest from 'promises-aplus-tests'
import Promise from '../src/promise/promise'

describe('Promises/A+ Tests', () => {
  PromiseAPlusTest.mocha(Promise)
})

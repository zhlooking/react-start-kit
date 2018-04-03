import { expect } from 'chai'
import Promise from '../src/promise/promise'

describe('Promise Test', () => {
  it('should return resolved for sync promise resolve', () => {
    const promise = new Promise(resolve => {
      resolve('resolved')
    })

    promise.then((value) => {
      expect(value).to.equal('resolved');
    })
  })

  it('should return rejected for sync promise rejected', () => {
    let promise = new Promise((resolve, reject) => {
      reject('rejected')
    })

    promise.then(() => {}, (reason) => {
      expect(reason).to.equal('rejected')
    })
  })
})

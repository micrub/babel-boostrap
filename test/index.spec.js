import { expect } from 'chai'
import Core from '../src/index'
describe('"Core" module exports', () => {
  it('should an instance of "Object".', () => {
    expect(Core).to.be.instanceOf(Object)
  })
  it('should have constructor named "Function".', () => {
    expect(Core.constructor.name).to.be.eq('Function')
  })
})
describe('`transform-object-rest-spread` babel plugin usage example.', function () {
  let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
  it('should spread rest from destructed object.', function () {
    expect(x).to.be.eq(1)
    expect(y).to.be.eq(2)
    expect(z).to.be.eql({ a: 3, b: 4 })
  })
  let a = 99
  let b = 99
  let j = 9
  let n = { j, x, y, a, b, ...z }
  it('should merge with spread rest object while overriding existing values.', function () {
    let expected = { x: 1, y: 2, a: 3, b: 4, j }
    expect(n).to.be.eql(expected)
  })
  let m = {...z, a: 99, z: 1}
  it('should merge with spread rest object while NOT overriding existing values, in case placed as first property of produced object.', function () {
    let expected = { a: 99, z: 1, b: 4 }
    expect(m).to.be.eql(expected)
  })
})
describe('`Syntax trailing function commas` babel plugin usage example.', function () {
  it('should support trailing function commas', function () {
    function clownPuppiesEverywhere (
      param1,
      param2,
    ) {
      return Object.values(arguments)
    }

    let result = clownPuppiesEverywhere(
      'foo',
      'bar',
    )
    expect(result).to.be.eql(['foo', 'bar'])
  })
})
describe('`transform-async-to-generator` babel plugin usage example.', function () {
  const RESULT = { status: 'success' }
  function bar (e) {
    return new Promise((resolve, reject) => {
      if (e) {
        reject(new Error('Bar error.'))
      } else {
        setTimeout(() => {
          resolve(RESULT)
        }, 1000)
      }
    })
  }
  async function foo (e) {
    return bar(e)
  }
  async function foo2 (e) {
    return Promise.all([ bar(e), bar(e) ])
  }
  let asyncRequest = foo()
  it('`bar` should be an instanceOf `Function`', function () {
    expect(bar).to.be.instanceOf(Function)
  })
  it('`foo` should be an instanceOf `Function`', function () {
    expect(foo).to.be.instanceOf(Function)
  })
  it('`foo` should return instanceOf `Promise`.', function () {
    expect(asyncRequest).to.be.instanceOf(Promise)
  })
  it('Should be able to resolve `Promise` with single async request.', function (done) {
    asyncRequest = foo()
    asyncRequest.then((result) => {
      expect(result).to.be.eq(RESULT)
      done()
    })
  })
  it('Should be able to catch error from `Promise`.', function (done) {
    asyncRequest = foo(true)
    asyncRequest.catch((error) => {
      expect(error).to.be.instanceOf(Error)
      done()
    })
  })
  it('Should be able to resolve `Promise` of multiply async requests.', function (done) {
    let asyncRequest = foo2()
    asyncRequest.then((result) => {
      expect(result).to.be.instanceOf(Array)
      expect(result).to.be.eql([RESULT, RESULT])
      done()
    })
  })
})
xdescribe('Sequential test by `mocha-steps` usage example.', function () {
  step('first', () => {
    expect(true).to.be.eq(true)
  })
  step('second', () => {
    expect(true).to.be.eq(false)
  })
  step('third', () => {
    expect(true).to.be.eq(true)
  })
})

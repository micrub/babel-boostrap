import { expect } from 'chai'
import Core from '../src/index'
describe('"Core" module exports', () => {
  it('should an instance of "Object".', () => {
    expect(Core).to.be.instanceOf(Object)
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

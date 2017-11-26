import { expect } from 'chai'
import Core from '../src/index'
describe('"Core" module exports', () => {
  it('should an instance of "Object".', () => {
    expect(Core).to.be.instanceOf(Object)
  })
})

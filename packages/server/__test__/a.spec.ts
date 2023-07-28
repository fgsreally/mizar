import { describe, expect, it } from 'vitest'
import { Factory, Tag } from 'phecda-server'
@Tag('b')
class B {
  name = 'b'
}
@Tag('a')
class A {
  constructor(private b: B) {

  }
}

describe('', async () => {
  it('', async () => {
    const data = await Factory([
      A,

    ])
    expect(data.moduleMap.size).toBe(2)
    console.log(data.moduleMap.get('a').b.name === 'b')
  })
})

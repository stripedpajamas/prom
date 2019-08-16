const assert = require('assert')
const Prom = require('.')

function a () {
  return new Prom((resolve, reject) => {
    console.log('[a running] doing something good')
    resolve('done with a')
  }, 'a')
}

function b () {
  return new Prom((resolve, reject) => {
    console.log('[b running] doing something bad')
    reject('done with b')
  }, 'b')
}

function c () {
  return new Prom((resolve) => {
    setTimeout(() => {
      console.log('c log delayed by 2 seconds')
      resolve()
    }, 2000)
  }, 'c')
}

async function main () {
  // promise style
  a().then((res) => {
    console.log('(promise style) got this from a:', res)
    assert(res, 'done with a')
  })
  b().catch((e) => {
    console.log('(promise style) got this from b:', e)
    assert(e, 'done with b')
  })

  // async/await style
  const ares = await a()
  console.log('(await style) got this from a:', ares)
  assert.strictEqual(ares, 'done with a')
  try {
    await b()
  } catch (e) {
    console.log('(await style) got this from b:', e)
    assert.strictEqual(e, 'done with b')
  }

  // b rejects, right ?
  assert.rejects(b)

  // confirming prom is not synchronous
  c().then(() => { console.log('this must log AFTER the c log') })

  // resolve directly
  Prom.resolve(123).then((res) => {
    assert.strictEqual(res, 123)
    console.log('resolve directly passed')
  })

  // reject directly
  Prom.reject(123).catch((e) => {
    assert.strictEqual(e, 123)
    console.log('reject directly passed')
  })

  // single promise chaining
  Prom.resolve(123)
    .then((res) => {
      assert.strictEqual(res, 123)
      console.log('(single chain) then passed')
      throw new Error('an error')
    })
    .catch((e) => {
      assert.strictEqual(e.message, 'an error')
      console.log('(single chain) catch passed')
    })

  // double chaining
  // a().then((ares) => {
  //     console.log('(chain 1) got this from a:', ares)
  //     assert.strictEqual(ares, 'done with a')
  //     return b()
  //   }).then((bres) => {
  //     console.error('this should not be reachable')
  //   }).catch((berr) => {
  //     console.log('(chain 2) got this from b:', berr)
  //     assert.strictEqual(e, 'done with b')
  //   })
}

main()

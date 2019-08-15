const assert = require('assert')
const Prom = require('.')

function a () {
  return new Prom((resolve, reject) => {
    console.log('[a running] doing something good')
    resolve('done with a')
  })
}

function b () {
  return new Prom((resolve, reject) => {
    console.log('[b running] doing something bad')
    reject('done with b')
  })
}

function c () {
  return new Prom((resolve) => {
    setTimeout(() => {
      console.log('c log delayed by 2 seconds')
      resolve()
    }, 2000)
  })
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

  // chaining
  // a().then((ares) => {
  //     console.log('(chain 1) got this from a:', ares)
  //     assert.strictEqual(ares, 'done with a')
  //     return b()
  //   }).then((bres) => {
  //     throw new Error('this should not be reachable')
  //   }).catch((berr) => {
  //     console.log('(chain 2) got this from b:', berr)
  //     assert.strictEqual(e, 'done with b')
  //   })
}

main()

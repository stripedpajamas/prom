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

async function main () {
  a().then((res) => {
    console.log('(promise style) got this from a:', res)
    assert(res, 'done with a')
  })
  b().catch((e) => {
    console.log('(promise style) got this from b:', e)
    assert(e, 'done with b')
  })

  const ares = await a()
  console.log('(await style) got this from a:', ares)
  assert.strictEqual(ares, 'done with a')
  try {
    await b()
  } catch (e) {
    console.log('(await style) got this from b:', e)
    assert.strictEqual(e, 'done with b')
  }
}

main()

const assert = require('assert')
const Prom = require('.')

function a () {
  return new Prom((resolve, reject) => {
    console.log('doing something good')
    resolve('done with a')
  })
}

function b () {
  return new Prom((resolve, reject) => {
    console.log('doing something bad')
    reject('done with b')
  })
}

async function main () {
  console.log('Promise style tests:')
  a().then((res) => {
    console.log('got this from a:', res)
    assert(res, 'done with a')
  })
  b().catch((e) => {
    console.log('got this from b:', e)
    assert(e, 'done with b')
  })

  console.log('\n\n')

  console.log('Async/await style tests:')
  const ares = await a()
  console.log('got this from a:', ares)
  assert.strictEqual(ares, 'done with a')
  try {
    await b()
  } catch (e) {
    console.log('got this from b:', e)
    assert.strictEqual(e, 'done with b')
  }
}

main()

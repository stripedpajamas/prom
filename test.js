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
  const ares = await a()
  try {
    await b()
  } catch (e) {
    console.log('got this from b:', e)
  }
}

main()

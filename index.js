class Prom {
  constructor (cb) {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)

    setTimeout(() => cb(this.resolve, this.reject), 0)
  }
  resolve (data) {
    this.resolver(data)
  }
  reject (data) {
    if (!this.rejecter) throw new Error('unhandled promise rejection bs')
    this.rejecter(data)
  }
  then (resolve = () => {}, reject = () => {}) {
    this.resolver = resolve
    this.rejecter = reject
  }
  catch (reject = () => {}) {
    this.rejecter = reject
  }
}

module.exports = Prom

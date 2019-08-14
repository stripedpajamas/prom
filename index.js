class Prom {
  constructor (cb) {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)

    this.resolved = false
    this.rejected = false
    this.resolvedData = undefined
    this.rejectedData = undefined

    setTimeout(() => cb(this.resolve, this.reject), 0)
  }
  resolve (data) {
    this.resolved = true
    this.resolvedData = data
    if (this.resolver) {
      this.resolver(data)
    }
  }
  reject (data) {
    this.rejected = true
    this.rejectedData = data
    if (this.rejecter) {
      this.rejecter(data)
    }
  }
  then (resolve = () => {}, reject = () => {}) {
    this.resolver = resolve
    this.rejecter = reject
    if (this.resolved) {
      this.resolver(this.resolvedData)
    }
    if (this.rejected) {
      this.rejecter(this.rejectedData)
    }
  }
  catch (reject = () => {}) {
    this.rejecter = reject
    if (this.rejected) {
      this.rejecter(this.rejectedData)
    }
  }
}

module.exports = Prom

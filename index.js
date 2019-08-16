class Prom {
  constructor (cb) {
    this.resolvers = []
    this.rejectors = []

    setTimeout(() => cb(this.resolve.bind(this), this.reject.bind(this)), 0)
  }
  static resolve (data) {
    return new Prom((resolve) => resolve(data))
  }
  static reject (data) {
    return new Prom((_, reject) => reject(data))
  }
  resolve (data) {
    const resolver = this._getResolver()
    if (!resolver) return

    try {
      resolver(data)
    } catch (e) {
      this.reject(e)
    }
  }
  reject (data) {
    const rejector = this._getRejector()
    if (!rejector) throw new Error('unhandled promise rejection bs')

    rejector(data)
  }
  then (resolve, reject) {
    if (typeof resolve !== 'function') {
      return this
    }
    this.resolvers.push(resolve)
    this.catch(reject)

    return this
  }
  catch (reject) {
    if (typeof reject !== 'function') {
      return this
    }
    this.rejectors.push(reject)

    return this
  }
  _getResolver () {
    return this.resolvers.shift()
  }
  _getRejector () {
    return this.rejectors.shift()
  }
}

module.exports = Prom

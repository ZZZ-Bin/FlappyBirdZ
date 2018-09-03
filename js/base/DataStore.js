export default class DataStore {
  constructor () {
    this.data = new Map()
  }
  // 获取单例
  static getInstance () {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }

    return DataStore.instance
  }
  // 添加数据方法
  set (key, value) {
    if (typeof value === 'function') {
      value = new value()
    }
    this.data.set(key, value)
    return this
  }
  // 获取数据方法
  get (key) {
    return this.data.get(key)
  }
  // 清除数据方法
  destroy () {
    for (let value of this.data.values()) {
      value = null
    }
  }
}

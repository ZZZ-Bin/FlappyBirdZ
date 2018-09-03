import { Resources } from './Resources.js'

export default class ResourcesLoader {
  constructor () {
    this.resMap = new Map(Resources)
    for (let [key, value] of this.resMap) {
      let newImage = new Image()
      newImage.src = value
      this.resMap.set(key, newImage)
    }
    // Promise 对象(loaded: 加载器)
    this.loaded = new Promise((resolve, reject) => {
      // 记载计数器
      let loadedCount = 0
      for (let value of this.resMap.values()) {
        value.onload = () => {
          loadedCount++
          if (loadedCount >= this.resMap.size) {
            resolve(this.resMap)
          }
        }
        // 加载失败
        value.onerror = () => { reject(new Error('文件读取错误')) }
      }
    })
  }

  static create () {
    return new ResourcesLoader()
  }
}

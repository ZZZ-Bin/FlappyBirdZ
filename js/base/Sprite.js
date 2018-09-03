import DataStore from '../base/DataStore.js'

export default class Sprite {
  constructor (
    img = null,
    srcX = 0, srcY = 0,
    srcW = 0, srcH = 0,
    x = 0, y = 0,
    width = 0, height = 0
  ) {
    this.img = img
    this.srcX = srcX
    this.srcY = srcY
    this.srcW = srcW
    this.srcH = srcH
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  // 获取 Image 对象方法
  static getImage (key) {
    return DataStore.getInstance().resMap.get(key)
  }
  // 绘制对象方法
  draw (
    img = this.img,
    srcX = this.srcX,
    srcY = this.srcY,
    srcW = this.srcW,
    srcH = this.srcH,
    x = this.x,
    y = this.y,
    width = this.width,
    height = this.height
  ) {
    ctx.drawImage(
      img,
      srcX, srcY,
      srcW, srcH,
      x, y,
      width, height
    )
  }
}

import Sprite from '../base/Sprite.js'

export default class Bird extends Sprite {
  constructor () {
    let img = Sprite.getImage('birds')
    super(
      img,
      0, 0,
      img.width / 3, img.height,
      window['canvas'].width / 7, (window['canvas'].height - img.height) / 2,
      img.width / 3, img.height
    )
    // 用于计算下翅膀煽动频率
    this.time = 0
    this.downV = -5
    // 下降加速度
    this.yAcc = 0.2
    // 翅膀煽动间隔
    this.flySpeed = 8
  }
  // 小鸟跳动
  static birdEvent (dataStore) {
    // 避免连点
    if (dataStore.get('birds').downV < -2) {
      return false
    } else {
      dataStore.get('birds').downV = -5
    }
  }

  draw () {
    super.draw(
      this.img,
      this.srcX, this.srcY,
      this.imgW, this.imgH,
      this.x, this.y,
      this.width, this.height
    )

    this.time++
    // 避免精度溢出
    if (this.time >= 1000) this.time = 0
    // 加速下落
    this.downV += this.yAcc
    this.y += this.downV
    // 翅膀煽动
    if (this.srcX === this.width * 2) {
      this.srcX = 0
    } else if (!(this.time % this.flySpeed)) {
      this.srcX += this.srcW
    }
  }
}

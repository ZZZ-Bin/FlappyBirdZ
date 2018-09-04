import Sprite from '../base/Sprite.js'
import Director from '../runtime/Director.js'

export default class Pie extends Sprite {
  constructor (image, top) {
    super(
      image,
      0, 0,
      image.width, image.height,
      window['canvas'].width, 0,
      image.width, image.height
    )
    this.top = top
  }

  draw () {
    this.x += Director.getInstance().moveSpeed
    super.draw(
      this.image,
      0, 0,
      this.srcW, this.srcH,
      this.x, this.y,
      this.width, this.height
    )
  }

  // 铅笔创建方法
  static createPie (dataStore, child1, child2) {
    const minTop = window['canvas'].height / 8
    const maxTop = window['canvas'].height / 2
    const top = minTop + Math.random() * (maxTop - minTop)
    dataStore.get('pies').push(new child1(top))
    dataStore.get('pies').push(new child2(top))
  }
}

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
}

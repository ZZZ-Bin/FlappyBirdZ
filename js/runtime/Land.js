import Sprite from '../base/Sprite.js'
import Director from '../runtime/Director.js'

export default class Land extends Sprite {
  constructor () {
    let image = Sprite.getImage('land')
    super(
      image,
      0, 0,
      image.width, image.height,
      0, window['canvas'].height - image.height,
      window['canvas'].width, window['canvas'].height * 112 / 600
    )
  }
  draw () {
    super.draw(
      this.image,
      this.srcX, this.srcY,
      this.srcW, this.srcH,
      this.x, this.y,
      this.width, this.height
    )
    super.draw(
      this.image,
      this.srcX, this.srcY,
      this.srcW, this.srcH,
      this.x + window['canvas'].width, this.y,
      this.width, this.height
    )
    this.x += Director.getInstance().moveSpeed
    if (this.x <= -this.width) {
      this.x = 0
    }
  }
}
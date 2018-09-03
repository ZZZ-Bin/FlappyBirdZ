import Sprite from '../base/Sprite.js'

export default class StartButton extends Sprite {
  constructor () {
    let img = Sprite.getImage('start_button')
    super(
      img,
      img.srcX, img.srcY,
      img.width, img.height,
      (window['canvas'].width - img.width) / 2, (window['canvas'].height - img.height) / 2,
      img.width, img.height
    )
  }

  // draw () {
  //   ctx.shadowColor = '#222'
  //   ctx.shadowBlur = 10
  //   super.draw()
  //   ctx.shadowColor = '#'
  //   ctx.shadowBlur = 0
  // }

  static onButton (e, instance) {
    let figure = e.touches[0]
    if (
      figure.clientX >= instance.x &&
      figure.clientX <= instance.x + instance.width &&
      figure.clientY >= instance.y &&
      figure.clientY <= instance.y + instance.height
    ) {
      return true
    } else {
      return false
    }
  }
}

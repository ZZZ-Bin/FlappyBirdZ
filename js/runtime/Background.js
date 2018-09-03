import Sprit from '../base/Sprite.js'

export default class Background extends Sprit {
  constructor () {
    let image = Sprit.getImage('bg')
    super(
      image,
      0, 0, image.width, image.height,
      0, 0,
      window['canvas'].width, window['canvas'].height)
  }
}

import Pie from './Pie.js'

export default class PieUp extends Pie {
  constructor (top) {
    let image = Pie.getImage('pie_u')
    super(image, top)
  }

  draw () {
    this.y = this.top - this.height
    super.draw()
  }
}
